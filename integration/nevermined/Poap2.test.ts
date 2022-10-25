import { Account, DDO, MetaData, Nevermined } from '../../src'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { config } from '../config'
import POAPUpgradeable from '../../test/testdata/POAPUpgradeable.json'
import { assert } from 'chai'
import { BigNumber, ethers } from 'ethers'
import { getMetadata } from '../utils'
import AssetRewards from '../../src/models/AssetRewards'
import { getRoyaltyAttributes, RoyaltyKind } from '../../src/nevermined/Assets'
import { decodeJwt } from 'jose'

describe('POAPs with Assets', () => {
    let nevermined: Nevermined
    let poapContract: ethers.Contract
    let editor: Account
    let user: Account
    let gatewayAddress: string
    let poapDDO: DDO
    let agreementId: string
    let metadata: MetaData

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        gatewayAddress = await nevermined.gateway.getProviderAddress()
        ;[editor, user] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(editor)

        await nevermined.marketplace.login(clientAssertion)
        const payload = decodeJwt(config.marketplaceAuthToken)

        metadata = getMetadata()
        metadata.userId = payload.sub
    })

    it('should deploy the contract', async () => {
        TestContractHandler.setConfig(config)
        poapContract = await TestContractHandler.deployArtifact(
            POAPUpgradeable,
            editor.getId()
        )
        assert.isDefined(poapContract)

        // INFO: We allow transferNFT condition to mint NFTs
        // Typically this only needs to happen once per NFT contract
        const tx = await poapContract.addMinter(
            nevermined.keeper.conditions.transferNft721Condition.address,
            { from: editor.getId() }
        )
        const response = await tx.wait()
        assert.equal(response.status, 1)

        // INFO: We allow the gateway to fulfill the transfer condition in behalf of the user
        // Typically this only needs to happen once per NFT contract
        await poapContract.setApprovalForAll(gatewayAddress, true, {
            from: editor.getId()
        })
        const isApproved = await poapContract.isApprovedForAll(
            editor.getId(),
            gatewayAddress
        )
        assert.isTrue(isApproved)
    })

    it('editor should be able to register poap', async () => {
        poapDDO = await nevermined.assets.createNft721(
            metadata,
            editor,
            new AssetRewards(editor.getId(), BigNumber.from(0)),
            'PSK-RSA',
            poapContract.address,
            nevermined.token.getAddress(),
            false,
            [gatewayAddress],
            getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 0),
            undefined,
            ['nft-sales', 'nft-access'],
            false
        )
        assert.isDefined(poapDDO)
    })

    it('user should be able to redeem a poap', async () => {
        agreementId = await nevermined.nfts.order721(poapDDO.id, user)
        assert.isDefined(agreementId)
    })

    it('we should be able to ask the gateway to transfer the poap', async () => {
        const receipt = await nevermined.nfts.transferForDelegate(
            agreementId,
            editor.getId(),
            user.getId(),
            BigNumber.from(1),
            721
        )
        assert.isTrue(receipt)
    })

    it('user should have a balance of 1 poap', async () => {
        const balance = await poapContract.balanceOf(user.getId())
        assert.equal(balance.toNumber(), 1)
    })

    it('user should have access', async () => {
        const result = await nevermined.nfts.access(
            poapDDO.id,
            user,
            '/tmp/',
            undefined,
            agreementId
        )
        assert.isTrue(result)
    })
})
