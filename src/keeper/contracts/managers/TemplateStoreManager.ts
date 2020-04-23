import ContractBase from '../ContractBase'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export enum TemplateState {
    Uninitialized = 0,
    Proposed = 1,
    Approved = 2,
    Revoked = 3
}

export interface TemplateMetadata {
    state: TemplateState
    owner: string
    lastUpdatedBy: string
    blockNumberUpdated: number
}

export class TemplateStoreManager extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<TemplateStoreManager> {
        const templateStoreManeger: TemplateStoreManager = new TemplateStoreManager(
            'TemplateStoreManager'
        )
        await templateStoreManeger.init(config)
        return templateStoreManeger
    }

    public getOwner(): Promise<string> {
        return this.call('owner', [])
    }

    public async proposeTemplate(address: string, from?: string, ignoreExists?: boolean) {
        const template = await this.getTemplate(address)
        if (template.blockNumberUpdated !== 0) {
            this.logger.warn(`Template "${address}" already exist.`)
            if (!ignoreExists) {
                throw new Error('Template already exist.')
            }
        } else {
            return this.sendFrom('proposeTemplate', [zeroX(address)], from)
        }
    }

    public async approveTemplate(
        address: string,
        from?: string,
        ignoreApproved?: boolean
    ) {
        const template = await this.getTemplate(address)
        if (template.state !== TemplateState.Proposed) {
            this.logger.warn(`Template "${address}" is not in "proposed" state.`)
            if (!ignoreApproved) {
                throw new Error(`Template not in "proposed" state.`)
            }
        } else {
            return this.sendFrom('approveTemplate', [zeroX(address)], from)
        }
    }

    public revokeTemplate(address: string, from?: string) {
        return this.sendFrom('revokeTemplate', [zeroX(address)], from)
    }

    public async getTemplate(address: string) {
        const {
            state,
            owner,
            lastUpdatedBy,
            blockNumberUpdated
        } = await this.call('getTemplate', [zeroX(address)])
        return {
            state: +state,
            owner,
            lastUpdatedBy,
            blockNumberUpdated: +blockNumberUpdated
        } as TemplateMetadata
    }
}
