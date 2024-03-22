import { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../utils'
import { NvmAccount, getContractInstance } from '../../nevermined'
import { ContractEvent, EventHandler } from '../../events'
import { NFTContractsBase } from './NFTContractsBase'
import { ContractHandler } from '../ContractHandler'

export class Nft721Contract extends NFTContractsBase {
  public static async getInstance(
    config: InstantiableConfig,
    address: string,
    contractName = 'NFT721Upgradeable',
    artifactsFolder = config.artifactsFolder,
  ): Promise<Nft721Contract> {
    const nft: Nft721Contract = new Nft721Contract(contractName)
    nft.setInstanceConfig(config)
    const networkName = await nft.nevermined.keeper.getNetworkName()

    // We don't have a subgraph for NFT721 so we can only use ContractEvent
    const eventEmitter = new EventHandler()
    nft.events = ContractEvent.getInstance(nft, eventEmitter, config.nevermined, nft.client)

    const solidityABI = await ContractHandler.getABIArtifact(
      contractName,
      artifactsFolder,
      networkName,
    )

    console.log(`Checking Address =${address}=`)
    nft.contract = await getContractInstance(address, solidityABI.abi)
    nft.address = await nft.contract.getAddress()

    return nft
  }

  public static async getInstanceUsingABI(
    config: InstantiableConfig,
    address: string,
    solidityABI: any,
  ): Promise<Nft721Contract> {
    const contractName = solidityABI.contractName
    const nft: Nft721Contract = new Nft721Contract(contractName)
    nft.setInstanceConfig(config)

    // We don't have a subgraph for NFT721 so we can only use ContractEvent
    const eventEmitter = new EventHandler()
    nft.events = ContractEvent.getInstance(nft, eventEmitter, config.nevermined, nft.client)

    nft.contract = await getContractInstance(address, solidityABI.abi)
    nft.address = await nft.contract.getAddress()

    return nft
  }

  /**
   * Creates a contract clone of an existing contract instance
   *
   * @param name - NFT Contract name
   * @param symbol - NFT Contract symbol
   * @param uri - NFT Contract metadata uri
   * @param cap - NFT cap
   * @param operators - Array of account addresses to be added as NFT operators
   * @param from - Sender account
   * @returns Contract Receipt
   */
  public createClone(
    name: string,
    symbol: string,
    uri: string,
    cap: bigint,
    operators: string[] = [],
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this._createClone(721, name, symbol, uri, cap, operators, from, txParams)
  }

  public async mint(did: string, from: string, txParams?: TxParameters) {
    return this.send('mint', from, [didZeroX(did)], txParams)
  }

  public async mintWithURL(
    to: string,
    did: string,
    url: string,
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.sendFrom('mint', [to, didZeroX(did), url], from, txParams)
  }

  /**
   * It burns some editions of a NFT (ERC-721)
   *
   * @param tokenId - The NFT id to burn
   * @param from - The account burning the NFT
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async burn(tokenId: string, from?: NvmAccount, txParams?: TxParameters) {
    return this.sendFrom('burn', [zeroX(tokenId)], from, txParams)
  }

  public async setApprovalForAll(
    target: string,
    state: boolean,
    from: string,
    txParams?: TxParameters,
  ) {
    return this.send('setApprovalForAll', from, [target, state], txParams)
  }

  public isApprovedForAll(accountAddress: string, operatorAddress: string) {
    return this.call('isApprovedForAll', [didZeroX(accountAddress), didZeroX(operatorAddress)])
  }

  public async balanceOf(owner: string): Promise<bigint> {
    return this.call('balanceOf', [owner])
  }

  public async ownerOf(did: string): Promise<string> {
    return this.call('ownerOf', [didZeroX(did)])
  }

  public async tokenURI(did: string): Promise<string> {
    return this.call('tokenURI', [didZeroX(did)])
  }
}
