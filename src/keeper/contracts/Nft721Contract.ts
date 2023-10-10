import { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../utils'
import { Account } from '../../nevermined'
import { ethers } from 'ethers'
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
    nft.events = ContractEvent.getInstance(nft, eventEmitter, config.nevermined, config.web3)

    const solidityABI = await ContractHandler.getABI(contractName, artifactsFolder, networkName)

    console.log(`Checking Address =${address}=`)
    await new ContractHandler(config).checkExists(address)
    nft.contract = new ethers.Contract(address, solidityABI.abi, nft.web3)
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
    nft.events = ContractEvent.getInstance(nft, eventEmitter, config.nevermined, config.web3)

    await new ContractHandler(config).checkExists(address)
    nft.contract = new ethers.Contract(address, solidityABI.abi, nft.web3)
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
    from?: Account,
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
    from?: Account,
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
  public async burn(tokenId: string, from?: Account, txParams?: TxParameters) {
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
