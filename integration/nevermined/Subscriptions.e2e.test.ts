import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, Nevermined } from '../../src'
import { EscrowPaymentCondition } from '../../src/keeper/contracts/conditions'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import SubscriptionNFT from '../../src/artifacts/NFT721SubscriptionUpgradeable.json'
import { ethers } from 'ethers'
import SubscriptionNft721 from '../../src/keeper/contracts/SubscriptionNft721'
import BigNumber from '../../src/utils/BigNumber'

describe('Subscriptions using NFT ERC-721 End-to-End', () => {
    let editor: Account
    let subscriber: Account
    let reseller: Account

    let nevermined: Nevermined
    let token: Token
    let escrowPaymentCondition: EscrowPaymentCondition
    let subscriptionDDO: DDO
    let assetDDO: DDO

    let agreementId: string

    // Configuration of First Sale:
    // Editor -> Subscriber, the Reseller get a cut (25%)
    let subscriptionPrice = BigNumber.from(20)
    let amounts = [BigNumber.from(15), BigNumber.from(5)]
    let receivers: string[]
    let assetRewards1: AssetRewards

    const subscriptionMetadata = getMetadata(
        subscriptionPrice.toNumber(),
        Math.random(),
        'Subscription NFT'
    )
    const assetMetadata = getMetadata(0)

    const preMint = false
    const royalties = 0
    const nftTransfer = false
    const subscriptionDuration = 1000 // in blocks
    const nftAmount = 1

    let initialBalances: any
    let scale: BigNumber

    let nft: ethers.Contract
    let subscriptionNFT: SubscriptionNft721
    let gatewayAddress

    let payload: JWTPayload

    before(async () => {
        TestContractHandler.setConfig(config)

        nevermined = await Nevermined.getInstance(config)
        ;[, editor, subscriber, , reseller] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(editor)

        await nevermined.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
        assetMetadata.userId = payload.sub
        gatewayAddress = await nevermined.gateway.getProviderAddress()

        // conditions
        ;({ escrowPaymentCondition } = nevermined.keeper.conditions)

        // components
        ;({ token } = nevermined.keeper)

        scale = BigNumber.from(10).pow(await token.decimals())

        subscriptionPrice = subscriptionPrice.mul(scale)
        amounts = amounts.map((v) => v.mul(scale))
        receivers = [editor.getId(), reseller.getId()]
        assetRewards1 = new AssetRewards(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        )

        initialBalances = {
            editor: await token.balanceOf(editor.getId()),
            subscriber: await token.balanceOf(subscriber.getId()),
            reseller: await token.balanceOf(reseller.getId()),
            escrowPaymentCondition: Number(
                await token.balanceOf(escrowPaymentCondition.getAddress())
            )
        }
    })

    describe('As an editor I want to register new content and provide a subscriptions to my content', () => {
        it('I want to register a subscriptions NFT that gives acess to exclusive contents to the holders', async () => {
            // Deploy NFT
            TestContractHandler.setConfig(config)
            nft = await TestContractHandler.deployAbi(SubscriptionNFT, editor.getId(), [
                'Subscription',
                'NVM'
            ])

            subscriptionNFT = await SubscriptionNft721.getInstance(
                (nevermined.keeper as any).instanceConfig,
                nft.address
            )
            subscriptionDDO = await nevermined.assets.createNft721(
                subscriptionMetadata,
                editor,
                assetRewards1,
                'PSK-RSA',
                nft.address,
                token.address,
                preMint,
                [gatewayAddress],
                royalties,
                undefined,
                undefined,
                ['nft721-sales'],
                nftTransfer,
                subscriptionDuration
            )
            assert.isDefined(subscriptionDDO)

            // INFO: We allow transferNFT condition to mint NFTs
            // Typically this only needs to happen once per NFT contract
            await subscriptionNFT.addMinter(
                nevermined.keeper.conditions.transferNft721Condition.address,
                editor.getId()
            )

            // INFO: We allow the gateway to fulfill the transfer condition in behalf of the user
            // Typically this only needs to happen once per NFT contract
            await subscriptionNFT.setApprovalForAll(gatewayAddress, true, editor.getId())
            const isApproved = await subscriptionNFT.isApprovedForAll(
                editor.getId(),
                gatewayAddress
            )
            assert.isTrue(isApproved)
        })

        it('I want to register a new asset and tokenize (via NFT)', async () => {
            assetDDO = await nevermined.assets.createNft721(
                assetMetadata,
                editor,
                new AssetRewards(),
                'PSK-RSA',
                nft.address,
                token.address,
                preMint,
                [gatewayAddress],
                royalties,
                undefined,
                undefined,
                ['nft721-access'],
                nftTransfer,
                subscriptionDuration
            )
            assert.isDefined(assetDDO)
        })
    })

    describe('As a subscriber I want to get access to some contents', () => {
        it('I check the details of the subscription NFT', async () => {
            const details = await nevermined.nfts.details(subscriptionDDO.id)
            assert.equal(details.owner, editor.getId())
        })

        it('I am ordering the subscription NFT', async () => {
            await subscriber.requestTokens(subscriptionPrice.div(scale))

            const subscriberBalanceBefore = await token.balanceOf(subscriber.getId())
            assert.isTrue(
                subscriberBalanceBefore.eq(
                    initialBalances.subscriber.add(subscriptionPrice)
                )
            )

            agreementId = await nevermined.nfts.order721(subscriptionDDO.id, subscriber)

            assert.isDefined(agreementId)

            const subscriberBalanceAfter = await token.balanceOf(subscriber.getId())

            assert.isTrue(subscriberBalanceAfter.sub(initialBalances.subscriber).eq(0))
        })

        it('The seller can check the payment and transfer the NFT to the subscriber', async () => {
            // Let's use the gateway to mint the subscription and release the payments

            const receipt = await nevermined.nfts.transferForDelegate(
                agreementId,
                editor.getId(),
                subscriber.getId(),
                nftAmount,
                721
            )
            assert.isTrue(receipt)

            assert.equal(
                await nevermined.nfts.ownerOf(
                    subscriptionDDO.shortId(),
                    nft.address,
                    agreementId
                ),
                subscriber.getId()
            )
        })

        it('the editor and reseller can receive their payment', async () => {
            const receiver0Balance = await token.balanceOf(
                assetRewards1.getReceivers()[0]
            )
            const receiver1Balance = await token.balanceOf(
                assetRewards1.getReceivers()[1]
            )

            assert.isTrue(
                receiver0Balance.eq(
                    initialBalances.editor.add(assetRewards1.getAmounts()[0])
                )
            )

            assert.isTrue(
                receiver1Balance.eq(
                    initialBalances.reseller.add(assetRewards1.getAmounts()[1])
                )
            )
        })
    })

    describe('As subscriber I want to get access to assets include as part of my subscription', () => {
        it('The collector access the files', async () => {
            const result = await nevermined.nfts.access(
                assetDDO.id,
                subscriber,
                '/tmp/'
                // undefined,
                // agreementId
            )
            assert.isTrue(result)
        })
    })
})
