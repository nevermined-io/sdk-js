import ContractBase, { TxParameters } from '../ContractBase'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { Account } from '../../../nevermined'

export enum TemplateState {
  Uninitialized = 0,
  Proposed = 1,
  Approved = 2,
  Revoked = 3,
}

export interface TemplateMetadata {
  state: TemplateState
  owner: string
  lastUpdatedBy: string
  blockNumberUpdated: number
}

export class TemplateStoreManager extends ContractBase {
  public static async getInstance(config: InstantiableConfig): Promise<TemplateStoreManager> {
    const templateStoreManeger: TemplateStoreManager = new TemplateStoreManager(
      'TemplateStoreManager',
    )
    await templateStoreManeger.init(config)
    return templateStoreManeger
  }

  public getOwner(): Promise<string> {
    return this.call('owner', [])
  }

  public async proposeTemplate(
    address: string,
    from?: Account,
    ignoreExists?: boolean,
    txParams?: TxParameters,
  ) {
    const template = await this.getTemplate(address)
    if (template.blockNumberUpdated !== 0) {
      this.logger.warn(`Template "${address}" already exist.`)
      if (!ignoreExists) {
        throw new Error('Template already exist.')
      }
    } else {
      return this.sendFrom('proposeTemplate', [zeroX(address)], from, txParams)
    }
  }

  public async approveTemplate(
    address: string,
    from?: Account,
    ignoreApproved?: boolean,
    txParams?: TxParameters,
  ) {
    const template = await this.getTemplate(address)
    if (template.state !== TemplateState.Proposed) {
      this.logger.warn(`Template "${address}" is not in "proposed" state.`)
      if (!ignoreApproved) {
        throw new Error(`Template not in "proposed" state.`)
      }
    } else {
      return this.sendFrom('approveTemplate', [zeroX(address)], from, txParams)
    }
  }

  public revokeTemplate(address: string, from?: Account, txParams?: TxParameters) {
    return this.sendFrom('revokeTemplate', [zeroX(address)], from, txParams)
  }

  public async getTemplate(templateId: string) {
    const t: any = await this.call('getTemplate', [zeroX(templateId)])
    return {
      state: Number(t.state),
      owner: t.owner,
      lastUpdatedBy: t.lastUpdatedBy,
      blockNumberUpdated: Number(t.blockNumberUpdated),
    } as TemplateMetadata
  }

  public async isApproved(templateId: string): Promise<boolean> {
    return await this.call('isTemplateApproved', [templateId])
  }

  public async getListSize() {
    return await this.call('getListSize', [])
  }
}
