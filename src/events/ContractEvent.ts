import { EventEmitter, EventOptions, EventResult, FilterContractEvent } from '../types/EventTypes'
import { NeverminedEvent } from './NeverminedEvent'
import { KeeperError } from '../errors/NeverminedErrors'
import { ContractBase } from '../keeper/contracts/ContractBase'
import { searchAbiEvent } from '../nevermined/utils/BlockchainViemUtils'
import { Nevermined } from '../nevermined/Nevermined'
import { Web3Clients } from '../Instantiable.abstract'

/**
 * Class to handle Smart Contract events directly connected to a blockchain node
 */
export class ContractEvent extends NeverminedEvent {
  /**
   * It gets a new instance of ContractEvent
   * @param contract contract instance
   * @param eventEmitter events emitter implementation
   * @param nevermined the Nevermined instance
   * @param client the blockchain client
   * @returns the ContractEvent instance
   */
  public static getInstance(
    contract: ContractBase,
    eventEmitter: EventEmitter,
    nevermined: Nevermined,
    client: Web3Clients,
  ): ContractEvent {
    const instance = new ContractEvent(contract, eventEmitter)
    instance.setInstanceConfig({
      nevermined,
      client,
    })

    return instance
  }

  /**
   * It returns the events matching a given filter
   * @param options event filter options
   * @returns {@link EventResult}
   */
  public async getEventData(options: EventOptions): EventResult {
    if (!this.eventExists(options.eventName) || !options.filterJsonRpc) {
      throw new KeeperError(
        `Event "${options.eventName}" not found on contract "${this.contract.contractName}"`,
      )
    }

    try {
      const args = this.filterToArgs(options.eventName, options.filterJsonRpc)

      const contractEvents = await this.contract.publicClient.getContractEvents({
        address: this.contract.contract.address,
        abi: this.contract.contract.abi,
        eventName: options.eventName,
        args,
        fromBlock: options.fromBlock,
        toBlock: options.toBlock,
      })
      return contractEvents
    } catch (error) {
      const errorMessage = `Error getting event: ${options.eventName} - ${error}`
      throw new KeeperError(errorMessage)
    }
  }

  /**
   * It returns the events matching a given filter depending on the blockchain network connected
   * This necessary for some networks and/or web3 providers which limit the number of blocks to query
   * @param options event filter options
   * @returns {@link EventResult}
   */
  public async getPastEvents(options: EventOptions): EventResult {
    try {
      const chainId = this.client.chain?.id
      options.fromBlock = options.fromBlock ? options.fromBlock : 1n
      options.toBlock = options.toBlock ? options.toBlock : 'latest'

      // Temporary workaround to work with mumbai
      // Infura as a 1000 blocks limit on their api
      if (
        chainId === 80001 ||
        chainId === 42 ||
        chainId === 8453 ||
        chainId === 10 ||
        chainId === 42220
      ) {
        const latestBlock = await this.client.public.getBlockNumber()
        options.fromBlock = latestBlock - 999n
        this.logger.debug(`Getting events from block ${options.fromBlock} to ${latestBlock}`)
      }
      return await this.getEventData(options)
    } catch (error) {
      this.logger.warn(`Error getting past events for ${options.eventName}: ${error}`)
      return []
    }
  }

  /**
   * It returns the current block chain block number
   * @returns the block number
   */
  public async getBlockNumber(): Promise<bigint> {
    return await this.client.public.getBlockNumber()
  }

  /**
   * It checks if an event exists on the contract definition
   * @param eventName the event name
   * @returns true if the event exists, false otherwise
   */
  private eventExists(eventName: string): boolean {
    try {
      const signature = searchAbiEvent(this.contract.contract.abi, eventName)
      return signature ? true : false
    } catch {
      return false
    }
  }

  /**
   * It returns the indexed parameters of an event
   * @param eventName the name of the event
   * @param filter tge event filter
   * @returns the array of indexed parameters
   */
  private filterToArgs(eventName: string, filter: FilterContractEvent): Array<any> {
    const signature = searchAbiEvent(this.contract.contract.abi, eventName)
    // @ts-ignore
    return signature.inputs.filter((i) => i.indexed).map((i) => filter[i.name])
  }
}
