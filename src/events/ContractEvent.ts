import { EventEmitter, EventOptions, EventResult, FilterContractEvent } from '../types/EventTypes'
import { NeverminedEvent } from './NeverminedEvent'
import { KeeperError } from '../errors/NeverminedErrors'
import { ContractBase } from '../keeper/contracts/ContractBase'
import { searchAbiEvent } from '../nevermined/utils/BlockchainViemUtils'
import { Nevermined } from '../nevermined/Nevermined'
import { Web3Clients } from '../Instantiable.abstract'

export class ContractEvent extends NeverminedEvent {
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

  public async getEventData(options: EventOptions): EventResult {
    if (!this.eventExists(options.eventName)) {
      throw new KeeperError(
        `Event "${options.eventName}" not found on contract "${this.contract.contractName}"`,
      )
    }
    const args = this.filterToArgs(options.eventName, options.filterJsonRpc)

    return await this.contract.publicClient.getContractEvents({
      address: this.contract.contract.address,
      abi: this.contract.contract.abi,
      eventName: options.eventName,
      args,
      fromBlock: options.fromBlock,
      toBlock: options.toBlock,
    })

    // const eventFilter = this.contract.contract.filters[options.eventName](...args)

    // const logs = await publicClient.getContractEvents({
    //   address: usdcContractAddress,
    //   abi: erc20Abi,
    //   eventName: 'Transfer',
    //   args: {
    //     from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    //     to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
    //   },
    //   fromBlock: 16330000n,
    //   toBlock: 16330050n
    // })
    // return this.contract.contract.queryFilter(eventFilter, options.fromBlock, options.toBlock)
  }

  public async getPastEvents(options: EventOptions): EventResult {
    try {
      const chainId = this.client.chain.id
      options.fromBlock = options.fromBlock ? options.fromBlock : 1n
      options.toBlock = options.toBlock ? options.toBlock : 'latest'

      // Temporary workaround to work with mumbai
      // Infura as a 1000 blocks limit on their api
      if (chainId === 80001 || chainId === 42 || chainId === 8453) {
        const latestBlock = await this.client.public.getBlockNumber()
        options.fromBlock = latestBlock - 99n
      }
      return await this.getEventData(options)
    } catch {
      return []
    }
  }

  public async getBlockNumber(): Promise<bigint> {
    return await this.client.public.getBlockNumber()
  }

  private eventExists(eventName: string): boolean {
    try {
      const signature = searchAbiEvent(this.contract.contract.abi, eventName)
      return signature ? true : false
    } catch {
      return false
    }
  }

  private filterToArgs(eventName: string, filter: FilterContractEvent): Array<any> {
    const signature = searchAbiEvent(this.contract.contract.abi, eventName)
    return signature.inputs.filter((i) => i.indexed).map((i) => filter[i.name])
  }
}
