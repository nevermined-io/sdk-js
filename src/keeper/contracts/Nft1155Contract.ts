import { InstantiableConfig } from '@/Instantiable.abstract'
import { ContractEvent } from '@/events/ContractEvent'
import { EventHandler } from '@/events/EventHandler'
import { ContractHandler } from '@/keeper/ContractHandler'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'
import { didToTokenId, getContractInstance } from '@/nevermined/utils/BlockchainViemUtils'
import { didZeroX, zeroX } from '@/utils/ConversionTypeHelpers'
import { NFTContractsBase } from './NFTContractsBase'

/**
 * NFTs contracts DTO allowing to manage Nevermined ERC-1155 NFTs
 */
export class Nft1155Contract extends NFTContractsBase {
  public static async getInstance(
    config: InstantiableConfig,
    address?: string,
    contractName = 'NFT1155Upgradeable',
    artifactsFolder = config.artifactsFolder,
  ): Promise<Nft1155Contract> {
    const nft: Nft1155Contract = new Nft1155Contract(contractName)
    await nft.init(config)

    if (address) {
      const networkName = await nft.nevermined.keeper.getNetworkName()

      // We don't have a subgraph for NFT1155 so we can only use ContractEvent
      const eventEmitter = new EventHandler()
      nft.events = ContractEvent.getInstance(nft, eventEmitter) //, config.nevermined, nft.client)

      const solidityABI = await ContractHandler.getABIArtifact(
        contractName,
        artifactsFolder,
        networkName,
      )

      nft.contract = await getContractInstance(address, solidityABI.abi, nft.client)
      nft.address = await nft.contract.getAddress()
    }

    return nft
  }

  public static async getInstanceUsingABI(
    config: InstantiableConfig,
    address: string,
    solidityABI: any,
  ): Promise<Nft1155Contract> {
    const contractName = solidityABI.contractName
    const nft: Nft1155Contract = new Nft1155Contract(contractName)
    nft.setInstanceConfig(config)

    // We don't have a subgraph for NFT1155 so we can only use ContractEvent
    const eventEmitter = new EventHandler()
    nft.events = ContractEvent.getInstance(nft, eventEmitter) //, config.nevermined, nft.client)

    nft.contract = await getContractInstance(address, solidityABI.abi, nft.client)
    nft.address = await nft.contract.getAddress()

    return nft
  }

  /**
   * Creates a contract clone of an existing contract instance
   *
   * @param name - NFT Contract name
   * @param symbol - NFT Contract symbol
   * @param uri - NFT Contract metadata uri
   * @param operators - Array of account addresses to be added as NFT operators
   * @param from - Sender account
   * @returns Contract Receipt
   */
  public createClone(
    name: string,
    symbol: string,
    uri: string,
    operators: string[] = [],
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this._createClone(1155, name, symbol, uri, undefined, operators, from, txParams)
  }

  /**
   * Checks if the operator is approved for an account address
   *
   * @param accountAddress - Account address
   * @param operatorAddress - Operator address
   * @returns Boolean
   */
  public isApprovedForAll(accountAddress: string, operatorAddress: string) {
    return this.call('isApprovedForAll', [zeroX(accountAddress), zeroX(operatorAddress)])
  }

  /**
   * Configure approval for a specific operator address
   *
   * @param operatorAddress - Operator address
   * @param approved - Is approved
   * @param from - Sender account
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public setApprovalForAll(
    operatorAddress: string,
    approved: boolean,
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.sendFrom('setApprovalForAll', [zeroX(operatorAddress), approved], from, txParams)
  }

  /**
   * Get an address balance for a specific NFT with id `did`
   *
   * @param address - Account address to check the balance
   * @param did - The NFT id
   * @returns
   */
  public async balance(address: string, did: string): Promise<bigint> {
    return this.call('balanceOf', [zeroX(address), didZeroX(did)])
  }

  /**
   * It transfers a NFT
   *
   * @param did - The NFT id
   * @param to - Account address of the NFT receiver
   * @param amount - Number of editions to transfer. Typically just 1
   * @param from - Account transferring the NFT
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async transferNft(
    did: string,
    to: string,
    amount: bigint,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.send('safeTransferFrom', from, [from, to, didZeroX(did), amount, []], txParams)
  }

  /**
   * It mints some editions of a NFT (ERC-1155)
   *
   * @param to - Account address of the NFT receiver
   * @param did - The NFT id to mint
   * @param amount - Number of editions to mint
   * @param from - Account minting the NFT
   * @param data - Data
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async mint(
    to: string,
    did: string,
    amount: bigint,
    from: NvmAccount,
    data?: string,
    txParams?: TxParameters,
  ) {
    const args: any[] = [to, didToTokenId(did), amount, data || '0x']
    return this.send('mint', from, args, txParams)
  }

  /**
   * It burns some editions of a NFT (ERC-1155)
   *
   * @param from - Account burning the NFT editions
   * @param tokenId - The NFT id to burn
   * @param amount - Number of editions to burn
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async burn(from: NvmAccount, tokenId: string, amount: bigint, txParams?: TxParameters) {
    return this.send('burn', from, [from, didZeroX(tokenId), amount], txParams)
  }

  /**
   * It burns some editions of a NFT (ERC-1155)
   *
   * @param holder - Address of the account holding the NFT editions that are going to be burned
   * @param tokenId - The NFT id to burn
   * @param amount - Number of editions to burn
   * @param from - Account burning the NFT editions
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async burnFromHolder(
    holder: string,
    tokenId: string,
    amount: bigint,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.send('burn', from, [holder, didZeroX(tokenId), amount], txParams)
  }

  /**
   * It returns the NFT metadata uri
   *
   * @param did - The NFT id
   * @returns The NFT metadata url
   */
  public async uri(did: string): Promise<string> {
    return this.call('uri', [didZeroX(did)])
  }
}
