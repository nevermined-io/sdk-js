import { EventEmitter, EventOptions, EventResult, Filter, NeverminedEvent } from './NeverminedEvent'
import { ContractBase } from '../keeper'
import { KeeperError } from '../errors'
import { Nevermined } from '../nevermined'
import { ethers } from 'ethers'

export class ContractEvent extends NeverminedEvent {
  public static getInstance(
    contract: ContractBase,
    eventEmitter: EventEmitter,
    nevermined: Nevermined,
    web3: ethers.JsonRpcProvider | ethers.BrowserProvider,
  ): ContractEvent {
    const instance = new ContractEvent(contract, eventEmitter)
    instance.setInstanceConfig({
      nevermined,
      web3,
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
    const eventFilter = this.contract.contract.filters[options.eventName](...args)

    return this.contract.contract.queryFilter(eventFilter, options.fromBlock, options.toBlock)
  }

  public async getPastEvents(options: EventOptions): EventResult {
    try {
      const chainId = await this.nevermined.keeper.getNetworkId()
      options.fromBlock = 0
      options.toBlock = 'latest'

      // Temporary workaround to work with mumbai
      // Infura as a 1000 blocks limit on their api
      if (chainId === 80001 || chainId === 42) {
        const latestBlock = await this.web3.getBlockNumber()
        options.fromBlock = latestBlock - 99
      }
      return await this.getEventData(options)
    } catch (error) {
      return []
    }
  }

  public async getBlockNumber(): Promise<number> {
    return this.web3.getBlockNumber()
  }

  private eventExists(eventName: string): boolean {
    return !!this.contract.contract.interface.getEvent(eventName)
  }

  private filterToArgs(eventName: string, filter: Filter): Array<any> {
    const event = this.contract.contract.interface.getEvent(eventName)
    return event.inputs.filter((i) => i.indexed).map((i) => filter[i.name])
  }
}
