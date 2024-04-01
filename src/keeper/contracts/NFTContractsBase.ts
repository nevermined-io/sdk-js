import { KeeperError } from '@/errors/NeverminedErrors'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'
import { didZeroX, zeroX } from '@/utils/ConversionTypeHelpers'
import { ContractBase } from './ContractBase'

export interface MintedEntry {
  amountMinted: bigint
  expirationBlock: bigint
  mintBlock: bigint
}

export class NFTContractsBase extends ContractBase {
  /**
   * Gets the contract owner
   *
   * @returns Address of the contract owner
   */
  public async owner(): Promise<string> {
    return this.call('owner', [])
  }

  /**
   * Creates a contract clone of an existing contract instance
   *
   * @param name - NFT Contract name
   * @param symbol - NFT Contract symbol
   * @param uri - NFT Contract metadata uri
   * @param cap - NFT cap (just for ERC-721)
   * @param operators - Array of account addresses to be added as NFT operators
   * @param from - Sender account
   * @returns Contract Receipt
   */
  protected async _createClone(
    ercType: 721 | 1155,
    name: string,
    symbol: string,
    uri: string,
    cap: bigint | undefined,
    operators: string[] = [],
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    try {
      const txReceipt = await this.sendFrom(
        'createClone',
        ercType === 721
          ? [name, symbol, uri, String(cap), operators]
          : [name, symbol, uri, operators],
        from,
        txParams,
      )
      // const tx = await this.client.public.getTransaction({hash: txReceipt.transactionHash})
      //const logs = parseEventLogs({ abi: this.contract.interface.abi, logs: txReceipt.logs, eventName: 'NFTCloned', strict: false })
      const logs = this.getTransactionLogs(txReceipt, 'NFTCloned')
      logs.some((e: any) => {
        return e.args['_newAddress'] // = decodeEventLog({ abi: this.contract.interface.abi, data: e.data, topics: e.topics })
      })
      throw new KeeperError(
        `Unable to get address of the cloned contract: ${txReceipt.transactionHash}`,
      )
      // logs.find((e) => e. === 'NFTCloned')
      // txReceipt.logs.find((e) => e.)
      // const event = txReceipt.logs.find(
      //   (e: EventLog) => e.eventName === 'NFTCloned',
      // ) as EventLog
      // return event.args._newAddress
    } catch (error) {
      throw new KeeperError(`Unable to clone contract: ${(error as Error).message}`)
    }
  }

  /**
   * Add an address as operator in the NFT Contract
   *
   * @param operatorAddress - New minter address
   * @param from - Sender account
   * @returns Contract Receipt
   */
  public grantOperatorRole(operatorAddress: string, from?: NvmAccount, txParams?: TxParameters) {
    return this.sendFrom('grantOperatorRole', [zeroX(operatorAddress)], from, txParams)
  }

  /**
   * Checks if an account is an operator in the NFT contract
   * @param address Account address to check if is an operator
   * @returns true if is an operator
   */
  public isOperator(address: string): Promise<boolean> {
    return this.call('isOperator', [zeroX(address)])
  }

  public async getNFTAttributes(did: string): Promise<{
    nftInitialized: boolean
    nftSupply: bigint
    mintCap: bigint
    nftURI: string
  }> {
    const registeredValues = await this.call('getNFTAttributes', [didZeroX(did)])
    if (!registeredValues[0]) {
      // If `nftInitialized` is because the NFT information is not on-chain
      // It could be also a ERC-721 NFT
      return {
        nftInitialized: false,
        nftSupply: 0n,
        mintCap: 0n,
        nftURI: '',
      }
    }

    return {
      nftInitialized: registeredValues[0],
      nftSupply: BigInt(registeredValues[1]),
      mintCap: BigInt(registeredValues[2]),
      nftURI: registeredValues[3],
    }
  }

  /**
   * Revoke an address as operator in the NFT Contract
   *
   * @param operatorAddress - Minter address to revoke
   * @param from - Sender account
   * @returns Contract Receipt
   */
  public revokeOperatorRole(operatorAddress: string, from?: NvmAccount, txParams?: TxParameters) {
    return this.sendFrom('revokeOperatorRole', [zeroX(operatorAddress)], from, txParams)
  }

  /**
   * It gets all the `MintedEntries` events from the NFT Contract
   * @param owner the user owning the NFT
   * @param did the tokenId of the NFT
   * @returns An array of `MintedEntry` objects
   */
  public async getMintedEntries(owner: string, did?: string): Promise<MintedEntry[]> {
    const minted: string[][] = await this.call(
      'getMintedEntries',
      did ? [owner, didZeroX(did)] : [owner],
    )

    const entries: MintedEntry[] = []
    for (let i = 0; i < minted.length; i++) {
      entries.push({
        amountMinted: BigInt(minted[i][0]),
        expirationBlock: BigInt(minted[i][1]),
        mintBlock: BigInt(minted[i][2]),
      })
    }
    return entries
  }
}
