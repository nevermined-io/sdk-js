import { Web3Clients } from '@/Instantiable.abstract'
import { EventEmitter, EventOptions, EventResult, FilterContractEvent } from '@/types/EventTypes'
import { NeverminedEvent } from './NeverminedEvent'
import { KeeperError } from '@/errors/NeverminedErrors'
import { ContractBase } from '@/keeper/contracts/ContractBase'

export class ContractEvent extends NeverminedEvent {
  public static getInstance(
    contract: ContractBase,
    eventEmitter: EventEmitter,
    // nevermined: Nevermined,
    // client: Web3Clients,
  ): ContractEvent {
    const instance = new ContractEvent(contract, eventEmitter)
    // instance.setInstanceConfig({
    //   nevermined,
    //   client,
    // })

    return instance
  }

  public async getEventData(options: EventOptions): EventResult {
    if (!this.eventExists(options.eventName)) {
      throw new KeeperError(
        `Event "${options.eventName}" not found on contract "${this.contract.contractName}"`,
      )
    }
    const args = this.filterToArgs(options.eventName, options.filterJsonRpc)
    const eventFilter = this.contract.contract.filters[options.eventName](...args)

    return this.contract.contract.queryFilter(eventFilter, options.fromBlock, options.toBlock)
  }

  public async getPastEvents(options: EventOptions, client?: Web3Clients): EventResult {
    try {
      const chainId = client.chain.id
      options.fromBlock = 0n
      options.toBlock = 'latest'

      // Temporary workaround to work with mumbai
      // Infura as a 1000 blocks limit on their api
      if (chainId === 80001 || chainId === 42) {
        const latestBlock = await client.public.getBlockNumber()
        options.fromBlock = latestBlock - 99n
      }
      return await this.getEventData(options)
    } catch (error) {
      return []
    }
  }

  public async getBlockNumber(client: Web3Clients): Promise<bigint> {
    return client.public.getBlockNumber()
  }

  private eventExists(eventName: string): boolean {
    return !!this.contract.contract.interface.getEvent(eventName)
  }

  private filterToArgs(eventName: string, filter: FilterContractEvent): Array<any> {
    const event = this.contract.contract.interface.getEvent(eventName)
    return event.inputs.filter((i) => i.indexed).map((i) => filter[i.name])
  }
}
