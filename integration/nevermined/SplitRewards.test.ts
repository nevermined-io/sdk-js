import { assert } from 'chai'
import { config } from '../config'
import { getMetadata, getSplitAssetRewards } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'

describe('Split Rewards', () => {
    let nevermined: Nevermined

    let account1: Account
    let account2: Account

    let newMetadata = () => getMetadata()

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()

        if (!nevermined.keeper.dispenser) {
            newMetadata = () => getMetadata(0)
        }
    })

    it('should create an asset', async () => {
        ;[account1] = await nevermined.accounts.list()
        const receiverValue = '14000000000000000000'
        const marketplaceValue = '7000000000000000000'
        const assetRewards: AssetRewards = getSplitAssetRewards(
            account1.getId(),
            receiverValue,
            account2.getId(),
            marketplaceValue
        )

        const asset = await nevermined.assets.create(
            newMetadata() as any,
            account1,
            assetRewards
        )
        const ddo = new DDO(asset)
        const service = ddo.findServiceByType('access')
        assert.equal(
            service.attributes.serviceAgreementTemplate.conditions
                .find(cond => cond.name === 'lockPayment')
                .parameters.find(param => param.name === '_amounts')
                .value[0],
            receiverValue
        )
        assert.equal(
            service.attributes.serviceAgreementTemplate.conditions
                .find(cond => cond.name === 'lockPayment')
                .parameters.find(param => param.name === '_amounts')
                .value[1],
            marketplaceValue
        )
    })
})
