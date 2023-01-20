import { Account, DDO, MetaData, Nevermined, AssetPrice, NFTAttributes } from '../../src'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { config } from '../config'
import POAPUpgradeable from '../../test/resources/artifacts/NFT721SubscriptionUpgradeable.json'
import { assert } from 'chai'
import { BigNumber, ethers } from 'ethers'
import { getMetadata } from '../utils'
import { getRoyaltyAttributes, RoyaltyKind } from '../../src/nevermined'
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
        gatewayAddress = await nevermined.services.node.getProviderAddress()
        ;[editor, user] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(editor)

        await nevermined.services.marketplace.login(clientAssertion)
        const payload = decodeJwt(config.marketplaceAuthToken)

        metadata = getMetadata()
        metadata.userId = payload.sub
    })

    it('should deploy the contract', async () => {
        TestContractHandler.setConfig(config)
        poapContract = await TestContractHandler.deployArtifact(
            POAPUpgradeable,
            editor.getId(),
            [
                editor.getId(),
                nevermined.keeper.didRegistry.address,
                'NFT721',
                'NVM',
                '',
                0
            ]
        )
        assert.isDefined(poapContract)

        await nevermined.contracts.loadNft721(poapContract.address)

        // INFO: We allow transferNFT condition to mint NFTs
        // Typically this only needs to happen once per NFT contract
        const tx = await poapContract.grantOperatorRole(
            nevermined.keeper.conditions.transferNft721Condition.address,
            { from: editor.getId() }
        )
        const response = await tx.wait()
        assert.equal(response.status, 1)

        // INFO: We allow the gateway to fulfill the transfer condition in behalf of the user
        // Typically this only needs to happen once per NFT contract
        const transactionResponse = await poapContract.setApprovalForAll(
            gatewayAddress,
            true,
            {
                from: editor.getId()
            }
        )
        await transactionResponse.wait()

        const isApproved = await poapContract.isApprovedForAll(
            editor.getId(),
            gatewayAddress
        )
        assert.isTrue(isApproved)
    })

    it('editor should be able to register poap', async () => {
        const nftAttributes = NFTAttributes.getPOAPInstance({
            metadata,
            price: new AssetPrice(
                editor.getId(),
                BigNumber.from(0),
                nevermined.utils.token.getAddress()
            ),
            serviceTypes: ['nft-sales', 'nft-access'],
            providers: [gatewayAddress],
            nftContractAddress: poapContract.address,
            preMint: false,
            nftTransfer: false,
            royaltyAttributes: getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 0)
        })
        poapDDO = await nevermined.nfts721.create(nftAttributes, editor)

        assert.isDefined(poapDDO)
    })

    it('user should be able to redeem a poap', async () => {
        agreementId = await nevermined.nfts721.order(poapDDO.id, user)
        assert.isDefined(agreementId)
    })

    it('we should be able to claim the POAP via the Nevermined Node', async () => {
        const receipt = await nevermined.nfts721.claim(
            agreementId,
            editor.getId(),
            user.getId()
        )
        assert.isTrue(receipt)
    })

    it('user should have a balance of 1 poap', async () => {
        const balance = await poapContract.balanceOf(user.getId())
        assert.equal(balance.toNumber(), 1)
    })

    it('user should have access', async () => {
        const result = await nevermined.nfts721.access(
            poapDDO.id,
            user,
            '/tmp/',
            undefined,
            agreementId
        )
        assert.isTrue(result)
    })
})
