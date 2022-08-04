import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, Nevermined } from '../../src'
import { EscrowPaymentCondition } from '../../src/keeper/contracts/conditions'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import ERC721 from '../../src/artifacts/NFT721SubscriptionUpgradeable.json'
import { ethers } from 'ethers'
import Nft721 from '../../src/keeper/contracts/Nft721'
import BigNumber from '../../src/utils/BigNumber'
import { zeroX } from '../../src/utils'

describe('Subscriptions using NFT ERC-721 End-to-End', () => {
    let editor: Account
    let subscriber: Account
    let reseller: Account

    let nevermined: Nevermined
    let token: Token
    let escrowPaymentCondition: EscrowPaymentCondition
    let subscriptionDDO: DDO
    let assetDDO: DDO

    const metadata = getMetadata()
    let agreementId: string

    // Configuration of First Sale:
    // Editor -> Subscriber, the Reseller get a cut (25%)
    let subscriptionPrice = BigNumber.from(20)
    let amounts = [BigNumber.from(15), BigNumber.from(5)]
    let receivers: string[]
    let assetRewards1: AssetRewards

    const preMint = false
    const royalties = 0
    const nftTransfer = false
    const subscriptionDuration = 1000 // in blocks

    let initialBalances: any
    let scale: BigNumber

    let nft: ethers.Contract
    let nftContract: Nft721

    let payload: JWTPayload

    before(async () => {
        TestContractHandler.setConfig(config)

        nevermined = await Nevermined.getInstance(config)
        ;[, editor, subscriber, , reseller] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(editor)

        await nevermined.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
        metadata.userId = payload.sub

        // conditions
        ;({ escrowPaymentCondition } = nevermined.keeper.conditions)

        // components
        ;({ token } = nevermined.keeper)

        scale = BigNumber.from(10).pow(await token.decimals())

        subscriptionPrice = subscriptionPrice.mul(scale)
        amounts = amounts.map(v => v.mul(scale))
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
            console.log(`Deploying Subscriptions NFT Contract`)
            TestContractHandler.setConfig(config)
            nft = await TestContractHandler.deployAbi(ERC721, editor.getId(), ['Subscription', 'NVM'])

            console.log(`Subscriptions NFT Contract deployed at address ${nft.address}`)
            nftContract = await Nft721.getInstance(
                (nevermined.keeper as any).instanceConfig,
                nft.address
            )
            const gatewayAddress = await nevermined.gateway.getProviderAddress()
            subscriptionDDO = await nevermined.assets.createNft721(
                metadata,
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

            // await nftContract.mint(zeroX(ddo.shortId()), editor.getId())
            console.log(`Subscription DID: ${subscriptionDDO.id}`)
            console.log(`NFT Address: ${nft.address}`)
            const owner = await nevermined.nfts.ownerOf(subscriptionDDO.id, nft.address)
            console.log(`Owner: ${owner}`)
            // const owner = await nevermined.nfts.ownerOf(
            //     zeroX(subscriptionDDO.shortId()),
            //     nft.address
            // )
            assert.equal(owner, editor.getId())
        })

        it('I want to register a new asset and tokenize (via NFT)', async () => {
            assetDDO = await nevermined.assets.createNft721(
                metadata,
                editor,
                new AssetRewards(),
                'PSK-RSA',
                nft.address,
                token.address,
                preMint,
                [await nevermined.gateway.getProviderAddress()],
                royalties,
                undefined,
                undefined,
                ['nft721-access'],
                nftTransfer,
                subscriptionDuration
            )
            assert.isDefined(assetDDO)

            const owner = await nevermined.nfts.ownerOf(
                zeroX(assetDDO.shortId()), 
                nft.address
            )
            assert.equal(owner, editor.getId())
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
            assert.equal(
                await nevermined.nfts.ownerOf(
                    zeroX(subscriptionDDO.shortId()),
                    nft.address
                ),
                editor.getId()
            )

            // Let's use the gateway to mint the subscription and release the payments
            const receipt = await nevermined.nfts.transferForDelegate(
                agreementId,
                editor.getId(),
                subscriber.getId(),
                1,
                721
            )
            assert.isTrue(receipt)

            assert.equal(
                await nevermined.nfts.ownerOf(
                    zeroX(subscriptionDDO.shortId()),
                    nft.address
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
                receiver0Balance.eq(initialBalances.editor(assetRewards1.getAmounts()[0]))
            )

            assert.isTrue(
                receiver1Balance.eq(
                    initialBalances.reseller(assetRewards1.getAmounts()[1])
                )
            )
        })
    })

    describe('As subscriber I want to get access to assets include as part of my subscription', () => {
        it('The collector access the files', async () => {
            const result = await nevermined.nfts.access(assetDDO.id, subscriber, '/tmp/')
            assert.isTrue(result)
        })
    })
})
