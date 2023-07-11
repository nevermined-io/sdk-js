import ContractBase, { TxParameters } from './ContractBase'
import { didZeroX, zeroX } from '../../utils'
import { Account } from '../../nevermined'
import { ContractReceipt } from 'ethers'
import { KeeperError } from '../../errors'

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
    name: string,
    symbol: string,
    uri: string,
    cap: bigint | undefined,
    operators: string[] = [],
    from?: Account,
    txParams?: TxParameters,
  ) {
    try {
      const contractReceipt: ContractReceipt = await this.sendFrom(
        'createClone',
        cap ? [name, symbol, uri, String(cap), operators] : [name, symbol, uri, operators],
        from,
        txParams,
      )
      const event = contractReceipt.events.find((e) => e.event === 'NFTCloned')
      return event.args._newAddress
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
  public grantOperatorRole(operatorAddress: string, from?: Account, txParams?: TxParameters) {
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
  public revokeOperatorRole(operatorAddress: string, from?: Account, txParams?: TxParameters) {
    return this.sendFrom('revokeOperatorRole', [zeroX(operatorAddress)], from, txParams)
  }
}
