import { InstantiableConfig } from '../../../Instantiable.abstract'
import { NvmAccount } from '../../../models/NvmAccount'
import { TxParameters } from '../../../models/Transactions'
import { KeeperError } from '../../../errors/NeverminedErrors'
import { zeroX, didZeroX } from '../../../utils/ConversionTypeHelpers'
import { ContractBase } from '../../../keeper/contracts/ContractBase'
import { getChecksumAddress } from '../../../nevermined/utils/BlockchainViemUtils'

export interface AgreementData {
  did: string
  agreementId: string
  agreementIdSeed: string
  creator: string
  didOwner: string
  templateId: string
  conditionIds: string[]
  conditionIdSeeds: string[]
}

export class AgreementStoreManager extends ContractBase {
  templates: any

  public static async getInstance(config: InstantiableConfig): Promise<AgreementStoreManager> {
    const templateStoreManager: AgreementStoreManager = new AgreementStoreManager(
      'AgreementStoreManager',
    )
    await templateStoreManager.init(config)
    return templateStoreManager
  }

  public setTemplates(temp: any) {
    this.templates = temp
  }

  public addTemplate(name: string, obj: any) {
    this.templates[name] = obj
  }

  public getOwner(): Promise<string> {
    return this.call('owner', [])
  }

  public async getAgreement(agreementId: string): Promise<AgreementData> {
    const templateId: string = getChecksumAddress(
      await this.call('getAgreementTemplate', [zeroX(agreementId)]),
    )
    const template = this.templates[templateId]

    if (!template) {
      throw new KeeperError(
        `Could not find template for agreementId: ${agreementId} and templateId: ${templateId}`,
      )
    }
    // TODO: Evaluate getting this information from the contracts and not the events
    const events = await template.getAgreementCreatedEvent(agreementId)

    if (!Array.isArray(events) || events.length == 0) {
      throw new KeeperError(`Could not find agreement with id: ${agreementId}`)
    }

    const values = events.map((e) => e.args || e)
    const [{ _did, _didOwner, _conditionIds, _conditionIdSeeds, _idSeed, _creator }] = values

    return {
      did: _did,
      agreementId,
      agreementIdSeed: _idSeed,
      creator: _creator,
      didOwner: _didOwner,
      templateId,
      conditionIdSeeds: _conditionIdSeeds,
      conditionIds: _conditionIds,
    } as AgreementData
  }

  public async getAgreements(did: string): Promise<AgreementData[]> {
    let res = []
    for (const a of Object.values(this.templates) as any[]) {
      res = res.concat(await a.getAgreementsForDID(did))
    }
    return Promise.all(res.map(async (a) => await this.getAgreement(a)))
  }

  public async agreementId(agreementIdSeed: string, creator: string): Promise<string> {
    return await this.call('agreementId', [zeroX(agreementIdSeed), creator])
  }

  public async createAgreement(
    agreementId: string,
    did: string,
    conditionTypes: string[],
    conditionIds: string[],
    timeLocks: number[],
    timeOuts: number[],
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.send(
      'createAgreement',
      from,
      [
        zeroX(agreementId),
        didZeroX(did),
        conditionTypes.map(zeroX),
        conditionIds,
        timeLocks,
        timeOuts,
      ],
      txParams,
    )
  }
}
