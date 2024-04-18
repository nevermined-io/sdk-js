import { KeeperError } from '../../errors/NeverminedErrors'
import { NvmAccount } from '../../models/NvmAccount'
import { TxParameters } from '../../models/Transactions'
import { didZeroX, zeroX } from '../../utils/ConversionTypeHelpers'
import { ContractBase } from './ContractBase'
import { isValidAddress } from '../../nevermined/utils/BlockchainViemUtils'

export interface NFT721MintedEntry {
  tokenId: string
  expirationBlock: bigint
  mintBlock: bigint
}

export interface NFT1155MintedEntry {
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
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    try {
      const txReceipt = await this.sendFrom(
        'createClone',
        ercType === 721 ? [name, symbol, uri, cap, operators] : [name, symbol, uri, operators],
        from,
        txParams,
      )
      const logs = this.getTransactionLogs(txReceipt, 'NFTCloned')

      let newContractAddress
      const found = logs
        .filter((e: any) => e.args._newAddress)
        .some((e: any) => {
          newContractAddress = e.args._newAddress
          return true
        })
      if (!found || !isValidAddress(newContractAddress))
        throw new KeeperError(
          `Unable to get address of the cloned contract on tx: ${txReceipt.transactionHash}`,
        )
      return newContractAddress
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
  public grantOperatorRole(operatorAddress: string, from: NvmAccount, txParams?: TxParameters) {
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
    const registeredValues: any = await this.call('getNFTAttributes', [didZeroX(did)])
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
  public revokeOperatorRole(operatorAddress: string, from: NvmAccount, txParams?: TxParameters) {
    return this.sendFrom('revokeOperatorRole', [zeroX(operatorAddress)], from, txParams)
  }
}
