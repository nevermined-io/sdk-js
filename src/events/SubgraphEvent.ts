import { NeverminedEvent } from '../events/NeverminedEvent'
import { EventEmitter, EventOptions, EventResult } from '../types/EventTypes'
import { ContractBase } from '../keeper/contracts/ContractBase'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  HttpLink,
} from '@apollo/client/core'
import fetch from 'cross-fetch'
import _ from 'lodash'
import { GqlArgs, generateGql, getMethodName } from './utils'
import { GraphError } from '../errors/NeverminedErrors'

export class SubgraphEvent extends NeverminedEvent {
  public subgraph: ApolloClient<NormalizedCacheObject>

  public static getInstance(
    contract: ContractBase,
    eventEmitter: EventEmitter,
    graphHttpUri: string,
    networkName: string,
  ): SubgraphEvent {
    const instance = new SubgraphEvent(contract, eventEmitter)

    const networkNameLower = networkName.toLowerCase()
    const [majorVersion] = contract.version.split('.')
    const contractName = contract.contractName.toLowerCase()

    instance.subgraph = new ApolloClient({
      link: new HttpLink({
        uri: `${graphHttpUri}${networkNameLower}${majorVersion}${contractName}`,
        fetch,
      }),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
      },
    })

    return instance
  }

  public async getEventData(options: EventOptions): EventResult {
    if (!this.subgraph || !options.filterSubgraph) {
      throw new GraphError(`Subgraph client for ${this.contract.contractName} is not implemented!`)
    }

    try {
      const methodName = getMethodName(options.eventName)
      const query = generateGql(methodName, options.filterSubgraph, options.result as GqlArgs)

      const response = await this.subgraph.query({ query: gql`query ${query}` })
      return response.data[methodName]
    } catch (error) {
      const errorMessage = `Error getting subgraph event: ${options.eventName} - ${error}`
      throw new GraphError(errorMessage)
    }
  }

  public async getPastEvents(options: EventOptions): EventResult {
    return this.getEventData(options)
  }

  public async getBlockNumber(): Promise<bigint> {
    const result = await this.subgraph.query({
      query: gql`
        query {
          _meta {
            block {
              number
            }
          }
        }
      `,
    })

    return BigInt(result.data._meta.block.number)
  }
}
