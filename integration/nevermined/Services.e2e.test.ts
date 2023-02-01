import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, MetaData, Nevermined, AssetPrice, NFTAttributes } from '../../src'
import { EscrowPaymentCondition, TransferNFT721Condition, Token } from '../../src/keeper'
import { config } from '../config'
import { generateWebServiceMetadata, getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { ethers } from 'ethers'
import { BigNumber } from '../../src/utils'
import { didZeroX } from '../../src/utils'
import { EventOptions } from '../../src/events'
import {
    getRoyaltyAttributes,
    RoyaltyAttributes,
    RoyaltyKind,
    NFT721Api,
    SubscriptionNFTApi
} from '../../src/nevermined'
import ProxyAgent from 'proxy-agent'
import { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'

describe('Gate-keeping of Web Services using NFT ERC-721 End-to-End', () => {
    let publisher: Account
    let subscriber: Account
    let reseller: Account

    let nevermined: Nevermined
    let token: Token
    let escrowPaymentCondition: EscrowPaymentCondition
    let transferNft721Condition: TransferNFT721Condition
    let subscriptionDDO: DDO
    let serviceDDO: DDO

    let agreementId: string

    // Configuration of First Sale:
    // Editor -> Subscriber, the Reseller get a cut (25%)
    let subscriptionPrice = BigNumber.from(20)
    let amounts = [BigNumber.from(15), BigNumber.from(5)]
    let receivers: string[]
    let assetPrice: AssetPrice
    let royaltyAttributes: RoyaltyAttributes

    let subscriptionMetadata: MetaData
    let serviceMetadata: MetaData

    const preMint = false
    const royalties = 0
    const nftTransfer = false
    const subscriptionDuration = 1000 // in blocks

    const ENDPOINT = 'http://marketplace.nevermined.localnet/api/v1/metadata/assets/ddo?query=%7B%22match_all%22%3A%20%7B%7D%7D&offset=100&page=1&sort=%7B%20%22id%22%3A%20%22asc%22%20%7D'

    const proxyUrl = process.env.http_proxy || 'http://localhost:3128'

    let proxyAgent
    const opts: RequestInit = {}

    let initialBalances: any
    let scale: BigNumber

    // let nft: ethers.Contract
    let subscriptionNFT: NFT721Api
    let neverminedNodeAddress

    let payload: JWTPayload

    before(async () => {
        TestContractHandler.setConfig(config)
        
        proxyAgent = new ProxyAgent(proxyUrl)
        opts.agent = proxyAgent

        nevermined = await Nevermined.getInstance(config)
        ;[, publisher, subscriber, , reseller] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

        await nevermined.services.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
                
        neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

        // conditions
        ;({ escrowPaymentCondition, transferNft721Condition } =
            nevermined.keeper.conditions)

        // components
        ;({ token } = nevermined.keeper)

        scale = BigNumber.from(10).pow(await token.decimals())

        subscriptionPrice = subscriptionPrice.mul(scale)
        amounts = amounts.map(v => v.mul(scale))
        receivers = [publisher.getId(), reseller.getId()]
        assetPrice = new AssetPrice(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        ).setTokenAddress(token.address)

        royaltyAttributes = getRoyaltyAttributes(
            nevermined,
            RoyaltyKind.Standard,
            royalties
        )

        initialBalances = {
            editor: await token.balanceOf(publisher.getId()),
            subscriber: await token.balanceOf(subscriber.getId()),
            reseller: await token.balanceOf(reseller.getId()),
            escrowPaymentCondition: Number(
                await token.balanceOf(escrowPaymentCondition.getAddress())
            )
        }
    })

    describe('As Subscriber I want to get access to a web service I am not subscribed', () => {
        it('The subscriber can not access the service endpoints because doesnt have a subscription yet', async () => {

            let isOkay = false
            try {
                const result = await fetch(`${ENDPOINT}`, opts)
                isOkay = result.ok
                // console.log(JSON.stringify(result))
            } catch (error) {
                console.log(`Unable to connect to web service: ${error}`)
            }
            
            assert.isFalse(isOkay)
        })        
    })

    describe('As Publisher I want to register new web service and provide access via subscriptions to it', () => {
        it('I want to register a subscription NFT that gives access to a web service to the holders', async () => {
            // Deploy NFT
            TestContractHandler.setConfig(config)

            const contractABI = await TestContractHandler.getABI(
                'NFT721SubscriptionUpgradeable',
                './test/resources/artifacts/'
            )
            subscriptionNFT = await SubscriptionNFTApi.deployInstance(
                config,
                contractABI,
                publisher,
                [ publisher.getId(), nevermined.keeper.didRegistry.getAddress(), 'Subscription Service NFT', '', '', 0 ]
            )


            await nevermined.contracts.loadNft721Api(subscriptionNFT)

            await subscriptionNFT.grantOperatorRole(transferNft721Condition.address, publisher)

            const isOperator = await subscriptionNFT.getContract.isOperator(transferNft721Condition.address)
            assert.isTrue(isOperator)

            subscriptionMetadata = getMetadata(undefined, 'Service Subscription NFT')
            const nftAttributes = NFTAttributes.getSubscriptionInstance({
                metadata: subscriptionMetadata,
                price: assetPrice,
                serviceTypes: ['nft-sales'],
                providers: [neverminedNodeAddress],
                duration: subscriptionDuration,
                nftContractAddress: subscriptionNFT.address,
                preMint,
                nftTransfer,
                royaltyAttributes: royaltyAttributes
            })
            subscriptionDDO = await nevermined.nfts721.create(nftAttributes, publisher)
            console.log(`Subscription registered with DID: ${subscriptionDDO.id}`)
            assert.isDefined(subscriptionDDO)
        })

        it('I want to register a new web service and tokenize (via NFT)', async () => {
            serviceMetadata = generateWebServiceMetadata('Nevermined Marketplace Metadata') as MetaData
            serviceMetadata.userId = payload.sub
    
            const nftAttributes = NFTAttributes.getSubscriptionInstance({
                metadata: serviceMetadata,
                serviceTypes: ['nft-access'],
                providers: [neverminedNodeAddress],
                duration: subscriptionDuration,
                nftContractAddress: subscriptionNFT.address,
                preMint,
                nftTransfer,
                royaltyAttributes: royaltyAttributes
            })
            serviceDDO = await nevermined.nfts721.create(nftAttributes, publisher)
            console.log(`Using NFT contract address: ${subscriptionNFT.address}`)
            console.log(`Service registered with DID: ${serviceDDO.id}`)
            assert.isDefined(serviceDDO)
        })
    })

    describe('As a Subscriber I want to get access to a web service', () => {
        it('I check the details of the subscription NFT', async () => {
            const details = await nevermined.nfts721.details(subscriptionDDO.id)
            assert.equal(details.owner, publisher.getId())
        })

        it('I am ordering the subscription NFT', async () => {
            await subscriber.requestTokens(subscriptionPrice.div(scale))

            const subscriberBalanceBefore = await token.balanceOf(subscriber.getId())
            assert.isTrue(
                subscriberBalanceBefore.eq(
                    initialBalances.subscriber.add(subscriptionPrice)
                )
            )

            agreementId = await nevermined.nfts721.order(subscriptionDDO.id, subscriber)

            assert.isDefined(agreementId)

            const subscriberBalanceAfter = await token.balanceOf(subscriber.getId())

            assert.isTrue(subscriberBalanceAfter.sub(initialBalances.subscriber).eq(0))
        })

        it('The Publisher can check the payment and transfer the NFT to the Subscriber', async () => {
            // Let's use the Node to mint the subscription and release the payments

            const receipt = await nevermined.nfts721.claim(
                agreementId,
                publisher.getId(),
                subscriber.getId()
            )
            assert.isTrue(receipt)

            assert.equal(
                await nevermined.nfts721.ownerOfAssetByAgreement(
                    subscriptionDDO.shortId(),
                    agreementId
                ),
                subscriber.getId()
            )
        })

        it('the Publisher and reseller can receive their payment', async () => {
            const receiver0Balance = await token.balanceOf(assetPrice.getReceivers()[0])
            const receiver1Balance = await token.balanceOf(assetPrice.getReceivers()[1])

            assert.isTrue(
                receiver0Balance.eq(
                    initialBalances.editor.add(assetPrice.getAmounts()[0])
                )
            )

            assert.isTrue(
                receiver1Balance.eq(
                    initialBalances.reseller.add(assetPrice.getAmounts()[1])
                )
            )
        })

        it('the subscription can be checked on chain', async () => {
            const eventOptions: EventOptions = {
                methodName: 'getFulfilleds',
                eventName: 'Fulfilled',
                filterSubgraph: {
                    where: {
                        _did: didZeroX(subscriptionDDO.id),
                        _receiver: subscriber.getId()
                    }
                },
                filterJsonRpc: {
                    _did: didZeroX(subscriptionDDO.id),
                    _receiver: subscriber.getId()
                },
                result: {
                    _agreementId: true,
                    _did: true,
                    _receiver: true
                }
            }
            // wait for the event to be picked by the subgraph
            await nevermined.keeper.conditions.transferNft721Condition.events.once(
                e => e,
                eventOptions
            )
            const [event] =
                await nevermined.keeper.conditions.transferNft721Condition.events.getPastEvents(
                    eventOptions
                )

            // subgraph event or json-rpc event?
            const eventValues = event.args || event

            assert.equal(eventValues._agreementId, agreementId)
            assert.equal(eventValues._did, didZeroX(subscriptionDDO.id))

            // thegraph stores the addresses in lower case
            assert.equal(
                ethers.utils.getAddress(eventValues._receiver),
                subscriber.getId()
            )
        })
    })

    describe('As Subscriber I want to get access to the web service as part of my subscription', () => {
        it.skip('The subscriber access the service endpoints available', async () => {
            opts.headers = {'Authorization': 'Bearer xxxxx'}
            const result = await fetch(`${ENDPOINT}`, opts)
            assert.isTrue(result.ok)
        })

        it.skip('The subscriber can not access the service endpoints not available', async () => {
            const protectedEndpoint = `http://marketplace.nevermined.localnet/api/v1/metadata/assets?query=%7B%22match_all%22%3A%20%7B%7D%7D&offset=100&page=1&sort=%7B%20%22id%22%3A%20%22asc%22%20%7D            `
            const result = await fetch(protectedEndpoint, opts)
            assert.isFalse(result.ok)

        })        
    })
})
