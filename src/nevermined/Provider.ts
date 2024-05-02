import { NvmAccount } from '../models/NvmAccount'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../models/Transactions'

/**
 * Providers API that allows the basic management of the provider accounts associated to an asset.
 */
export class Providers extends Instantiable {
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  /**
   * Add a new provider in the registry for a did.
   *
   * @param did - Identifier of the entity created
   * @param newProviderAddress - New provider address in the list of providers.
   * @param from - Sender account.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the call succeeded.
   */
  public async add(
    did: string,
    newProviderAddress: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ): Promise<boolean> {
    await this.nevermined.keeper.didRegistry.addProvider(did, newProviderAddress, from, txParams)
    return true
  }

  /**
   * Remove a provider in the registry for a did.
   * @param did - Identifier of the entity created
   * @param addressToRemove - New provider address in the list of providers.
   * @param from - Sender account
   * @param txParams - Transaction parameters
   * @returns {@link true} if the call succeeded.
   */
  public async remove(
    did: string,
    addressToRemove: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ): Promise<boolean> {
    await this.nevermined.keeper.didRegistry.removeProvider(did, addressToRemove, from, txParams)
    return true
  }

  /**
   * List the provider addresses for a did.
   * @param did - Identifier of the entity created
   */
  public async list(did: string) {
    return await this.nevermined.keeper.didRegistry.getProviders(did)
  }
}
