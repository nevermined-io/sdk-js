import { assert } from 'chai'
import { decodeJwt } from 'jose'
import {
    Account,
    DDO,
    Nevermined,
    generateId,
    NeverminedNFT721Type,
    NFTAttributes,
    AssetPrice
} from '../../src'
import {
    ConditionState,
    EscrowPaymentCondition,
    LockPaymentCondition,
    NFT721HolderCondition,
    NFTAccessCondition,
    TransferNFT721Condition,
    ConditionStoreManager,
    Token,
    NFT721AccessTemplate,
    NFT721SalesTemplate
} from '../../src/keeper'
import { config } from '../config'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { NFT721Api } from '../../src'
import { getMetadata } from '../utils'
import { setNFTRewardsFromDDOByService } from '../../src/utils'
import { BigNumber } from '../../src/utils'
import {
    getRoyaltyAttributes,
    RoyaltyAttributes,
    RoyaltyKind
} from '../../src/nevermined'

describe('NFT721Templates E2E', () => {
    let nftContractOwner: Account
    let owner: Account
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account

    let nevermined: Nevermined
    let token: Token
    let nft: NFT721Api
    let conditionStoreManager: ConditionStoreManager
    let lockPaymentCondition: LockPaymentCondition
    let escrowPaymentCondition: EscrowPaymentCondition

    let nftAccessCondition: NFTAccessCondition

    let transferNft721Condition: TransferNFT721Condition
    let nft721HolderCondition: NFT721HolderCondition
    let nft721SalesTemplate: NFT721SalesTemplate
    let nft721AccessTemplate: NFT721AccessTemplate

    let conditionIdLockPayment: [string, string]
    let conditionIdTransferNFT: [string, string]
    let conditionIdEscrow: [string, string]
    let conditionIdNFTHolder: [string, string]
    let conditionIdNFTAccess: [string, string]
    let conditionIdLockPayment2: [string, string]
    let conditionIdTransferNFT2: [string, string]
    let conditionIdEscrow2: [string, string]
    let ddo: DDO

    let royaltyAttributes: RoyaltyAttributes
    const royalties = 10 // 10% of royalties in the secondary market
    let agreementId: string
    let agreementAccessId: string
    let agreementId2: string
    let agreementIdSeed: string
    let agreementAccessIdSeed: string
    let agreementId2Seed: string
    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    let nftPrice = BigNumber.from(20)
    let amounts = [BigNumber.from(15), BigNumber.from(5)]
    let receivers: string[]
    let assetPrice1: AssetPrice

    // Configuration of Sale in secondary market:
    // Collector1 -> Collector2, the artist get 10% royalties
    let nftPrice2 = BigNumber.from(100)
    let amounts2 = [BigNumber.from(90), BigNumber.from(10)]
    let receivers2: string[]
    let assetPrice2: AssetPrice

    let initialBalances: any
    let scale: BigNumber

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        TestContractHandler.setConfig(config)

        const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
        const erc721ABI = await TestContractHandler.getABI(
            'NFT721Upgradeable',
            config.artifactsFolder,
            networkName
        )

        // deploy a nft contract we can use
        const nftContract = await TestContractHandler.deployArtifact(
            erc721ABI,
            artist.getId(),
            [ artist.getId(), nevermined.keeper.didRegistry.address, 'NFT721', 'NVM', '', 0 ]
        )

        ;[owner, artist, collector1, collector2, gallery] =
            await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        await nevermined.services.marketplace.login(clientAssertion)

        receivers = [artist.getId(), gallery.getId()]
        receivers2 = [collector1.getId(), artist.getId()]

        // load the nft contract at given address
        nft = await nevermined.contracts.loadNft721(nftContract.address)
        nftContractOwner = new Account((await nft.nftContract.owner()) as string)

        // components
        ;({ conditionStoreManager, token } = nevermined.keeper)

        // conditions
        ;({
            transferNft721Condition,
            lockPaymentCondition,
            escrowPaymentCondition,
            nft721HolderCondition,
            nftAccessCondition
        } = nevermined.keeper.conditions)

        await nft.nftContract.grantOperatorRole(
            transferNft721Condition.address,
            nftContractOwner
        )

        // templates
        ;({ nft721SalesTemplate, nft721AccessTemplate } = nevermined.keeper.templates)

        scale = BigNumber.from(10).pow(await token.decimals())

        nftPrice = nftPrice.mul(scale)
        amounts = amounts.map(v => v.mul(scale))
        nftPrice2 = nftPrice2.mul(scale)
        amounts2 = amounts2.map(v => v.mul(scale))

        assetPrice1 = new AssetPrice(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        ).setTokenAddress(token.address)

        assetPrice2 = new AssetPrice(
            new Map([
                [receivers2[0], amounts2[0]],
                [receivers2[1], amounts2[1]]
            ])
        ).setTokenAddress(token.address)
    })

    describe('Full flow', () => {
        before(async () => {
            // initial balances
            initialBalances = {
                artist: await token.balanceOf(artist.getId()),
                collector1: await token.balanceOf(collector1.getId()),
                collector2: await token.balanceOf(collector2.getId()),
                gallery: await token.balanceOf(gallery.getId()),
                escrowPaymentCondition: Number(
                    await token.balanceOf(escrowPaymentCondition.getAddress())
                )
            }
            agreementIdSeed = generateId()
            agreementAccessIdSeed = generateId()
            agreementId2Seed = generateId()

            agreementId = await nevermined.keeper.agreementStoreManager.agreementId(
                agreementIdSeed,
                collector1.getId()
            )
            agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(
                agreementAccessIdSeed,
                collector1.getId()
            )
            agreementId2 = await nevermined.keeper.agreementStoreManager.agreementId(
                agreementId2Seed,
                collector2.getId()
            )

            const payload = decodeJwt(config.marketplaceAuthToken)
            const metadata = getMetadata()
            metadata.userId = payload.sub

            royaltyAttributes = getRoyaltyAttributes(
                nevermined,
                RoyaltyKind.Standard,
                royalties
            )

            const nftAttributes = NFTAttributes.getInstance({
                metadata,
                price: assetPrice1,
                serviceTypes: ['nft-sales', 'nft-access'],
                ercType: 721,
                nftType: NeverminedNFT721Type.nft721,
                nftContractAddress: nft.address,
                preMint: false,
                nftTransfer: false,
                royaltyAttributes: getRoyaltyAttributes(
                    nevermined,
                    RoyaltyKind.Standard,
                    0
                )
            })
            ddo = await nevermined.nfts721.create(nftAttributes, artist)
        })

        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await nft.nftContract.grantOperatorRole(artist.getId(), nftContractOwner)

                await nft.mint(ddo.shortId(), artist)

                const balance = await nft.balanceOf(artist)
                assert.deepEqual(balance, BigNumber.from(1))
            })
        })

        describe('As a collector I want to buy some art', () => {
            it('I am setting an agreement for buying a NFT', async () => {
                conditionIdLockPayment = await lockPaymentCondition.generateIdWithSeed(
                    agreementId,
                    await lockPaymentCondition.hashValues(
                        ddo.shortId(),
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts,
                        receivers
                    )
                )
                conditionIdTransferNFT = await transferNft721Condition.generateIdWithSeed(
                    agreementId,
                    await transferNft721Condition.hashValues(
                        ddo.shortId(),
                        artist.getId(),
                        collector1.getId(),
                        conditionIdLockPayment[1],
                        nft.address
                    )
                )
                conditionIdEscrow = await escrowPaymentCondition.generateIdWithSeed(
                    agreementId,
                    await escrowPaymentCondition.hashValues(
                        ddo.shortId(),
                        amounts,
                        receivers,
                        collector1.getId(),
                        escrowPaymentCondition.getAddress(),
                        token.getAddress(),
                        conditionIdLockPayment[1],
                        conditionIdTransferNFT[1]
                    )
                )

                await collector1.requestTokens(nftPrice.div(scale))
                const collector1BalanceBefore = await token.balanceOf(collector1.getId())
                assert.isTrue(
                    collector1BalanceBefore.eq(initialBalances.collector1.add(nftPrice))
                )

                await token.approve(
                    lockPaymentCondition.getAddress(),
                    nftPrice,
                    collector1
                )
                await token.approve(
                    escrowPaymentCondition.getAddress(),
                    nftPrice,
                    collector1
                )
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )

                const result = await nft721SalesTemplate.createAgreementAndPay(
                    agreementIdSeed,
                    ddo.shortId(),
                    [
                        conditionIdLockPayment[0],
                        conditionIdTransferNFT[0],
                        conditionIdEscrow[0]
                    ],
                    [0, 0, 0],
                    [0, 0, 0],
                    collector1.getId(),
                    0,
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    amounts,
                    receivers,
                    collector1
                )
                assert.equal(result.status, 1)
                assert.isTrue(result.events.some(e => e.event === 'AgreementCreated'))
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdEscrow[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdTransferNFT[1]))
                        .state,
                    ConditionState.Unfulfilled
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdLockPayment[1]
                )
                assert.equal(state, ConditionState.Fulfilled)

                const collector1BalanceAfter = await token.balanceOf(collector1.getId())
                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.isTrue(
                    collector1BalanceAfter.sub(initialBalances.collector1).eq(0)
                )
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .add(AssetPrice.sumAmounts(amounts))
                        .eq(escrowPaymentConditionBalanceAfter)
                )
            })

            it('The artist can check the payment and transfer the NFT to the collector', async () => {
                const ownerBefore = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerBefore, artist.getId())

                await nft.setApprovalForAll(transferNft721Condition.address, true, artist)

                await transferNft721Condition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    collector1.getId(),
                    conditionIdLockPayment[1],
                    nft.address,
                    true,
                    artist
                )
                await nft.setApprovalForAll(
                    transferNft721Condition.address,
                    false,
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT[1]
                )
                assert.equal(state, ConditionState.Fulfilled)

                const ownerAfter = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerAfter, collector1.getId())
            })

            it('the artist asks and receives the payment', async () => {
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                await escrowPaymentCondition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    amounts,
                    receivers,
                    collector1.getId(),
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    conditionIdLockPayment[1],
                    conditionIdTransferNFT[1],
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdEscrow[1]
                )
                assert.equal(state, ConditionState.Fulfilled)

                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers[0])
                const receiver1Balance = await token.balanceOf(receivers[1])
                const collectorBalance = await token.balanceOf(collector1.getId())

                assert.isTrue(receiver0Balance.eq(initialBalances.artist.add(amounts[0])))
                assert.isTrue(
                    receiver1Balance.eq(initialBalances.gallery.add(amounts[1]))
                )
                assert.isTrue(collectorBalance.sub(initialBalances.collector1).eq(0))
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .sub(AssetPrice.sumAmounts(amounts))
                        .eq(escrowPaymentConditionBalanceAfter)
                )
            })
        })

        describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
            it('The collector sets up the NFT access agreement', async () => {
                // Collector1: Create NFT access agreement
                conditionIdNFTHolder = await nft721HolderCondition.generateIdWithSeed(
                    agreementAccessId,
                    await nft721HolderCondition.hashValues(
                        ddo.shortId(),
                        collector1.getId(),
                        nft.address
                    )
                )
                conditionIdNFTAccess = await nftAccessCondition.generateIdWithSeed(
                    agreementAccessId,
                    await nftAccessCondition.hashValues(ddo.shortId(), collector1.getId())
                )

                const result = await nft721AccessTemplate.createAgreement(
                    agreementAccessIdSeed,
                    ddo.shortId(),
                    [conditionIdNFTHolder[0], conditionIdNFTAccess[0]],
                    [0, 0],
                    [0, 0],
                    [collector1.getId()],
                    collector1
                )
                assert.equal(result.status, 1)
                assert.isTrue(result.events.some(e => e.event === 'AgreementCreated'))

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTAccess[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTHolder[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
            })

            it('The collector demonstrates it onws the NFT', async function () {
                // TODO: Not sure why we need to wait here but without this the
                // the fulfillment will fail
                await new Promise(r => setTimeout(r, 10000))
                await nft721HolderCondition.fulfill(
                    agreementAccessId,
                    ddo.shortId(),
                    collector1.getId(),
                    nft.address,
                    collector1
                )

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTHolder[1]))
                        .state,
                    ConditionState.Fulfilled
                )
            })

            it(' The artist gives access to the collector to the content', async function () {
                await nftAccessCondition.fulfill(
                    agreementAccessId,
                    ddo.shortId(),
                    collector1.getId(),
                    artist
                )

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTAccess[1]))
                        .state,
                    ConditionState.Fulfilled
                )
            })
        })

        describe('As collector1 I want to sell my NFT to collector2 for a higher price', () => {
            before(async () => {
                // initial balances
                initialBalances = {
                    artist: await token.balanceOf(artist.getId()),
                    collector1: await token.balanceOf(collector1.getId()),
                    collector2: await token.balanceOf(collector2.getId()),
                    gallery: await token.balanceOf(gallery.getId()),
                    owner: await token.balanceOf(owner.getId()),
                    lockPaymentCondition: await token.balanceOf(
                        lockPaymentCondition.getAddress()
                    ),
                    escrowPaymentCondition: await token.balanceOf(
                        escrowPaymentCondition.getAddress()
                    )
                }
            })
            it('As collector2 I setup an agreement for buying an NFT from collector1', async () => {
                conditionIdLockPayment2 = await lockPaymentCondition.generateIdWithSeed(
                    agreementId2,
                    await lockPaymentCondition.hashValues(
                        ddo.shortId(),
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts2,
                        receivers2
                    )
                )
                conditionIdTransferNFT2 =
                    await transferNft721Condition.generateIdWithSeed(
                        agreementId2,
                        await transferNft721Condition.hashValues(
                            ddo.shortId(),
                            collector1.getId(),
                            collector2.getId(),
                            conditionIdLockPayment2[1],
                            nft.address
                        )
                    )
                conditionIdEscrow2 = await escrowPaymentCondition.generateIdWithSeed(
                    agreementId2,
                    await escrowPaymentCondition.hashValues(
                        ddo.shortId(),
                        amounts2,
                        receivers2,
                        collector2.getId(),
                        escrowPaymentCondition.getAddress(),
                        token.getAddress(),
                        conditionIdLockPayment2[1],
                        conditionIdTransferNFT2[1]
                    )
                )

                const result = await nft721SalesTemplate.createAgreement(
                    agreementId2Seed,
                    ddo.shortId(),
                    [
                        conditionIdLockPayment2[0],
                        conditionIdTransferNFT2[0],
                        conditionIdEscrow2[0]
                    ],
                    [0, 0, 0],
                    [0, 0, 0],
                    [collector2.getId()],
                    collector2
                )
                assert.equal(result.status, 1)
                assert.isTrue(result.events.some(e => e.event === 'AgreementCreated'))

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdLockPayment2[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdEscrow2[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdTransferNFT2[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
            })

            it('As collector2 I am locking the payment', async () => {
                await collector2.requestTokens(nftPrice2.div(scale))
                const collector2BalanceBefore = await token.balanceOf(collector2.getId())
                assert.isTrue(
                    collector2BalanceBefore.eq(initialBalances.collector2.add(nftPrice2))
                )

                await token.approve(
                    lockPaymentCondition.getAddress(),
                    nftPrice2,
                    collector2
                )
                await lockPaymentCondition.fulfill(
                    agreementId2,
                    ddo.shortId(),
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    amounts2,
                    receivers2,
                    collector2
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdLockPayment2[1]
                )
                assert.equal(state, ConditionState.Fulfilled)

                const collector2BalanceAfter = await token.balanceOf(collector2.getId())
                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.isTrue(
                    collector2BalanceAfter.sub(initialBalances.collector2).eq(0)
                )
                assert.isTrue(
                    escrowPaymentConditionBalance
                        .sub(initialBalances.escrowPaymentCondition)
                        .eq(nftPrice2)
                )
            })

            it('As collector1 I can check the payment and transfer the NFT to collector2', async () => {
                const ownerBefore = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerBefore, collector1.getId())

                await nft.setApprovalForAll(
                    transferNft721Condition.address,
                    true,
                    collector1
                )

                await transferNft721Condition.fulfill(
                    agreementId2,
                    ddo.shortId(),
                    collector2.getId(),
                    conditionIdLockPayment2[1],
                    nft.address,
                    true,
                    collector1
                )

                await nft.setApprovalForAll(
                    transferNft721Condition.address,
                    false,
                    collector1
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT2[1]
                )
                assert.equal(state, ConditionState.Fulfilled)

                const ownerAfter = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerAfter, collector2.getId())
            })

            it('Collector1 and Artist get the payment', async () => {
                await escrowPaymentCondition.fulfill(
                    agreementId2,
                    ddo.shortId(),
                    amounts2,
                    receivers2,
                    collector2.getId(),
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    conditionIdLockPayment2[1],
                    conditionIdTransferNFT2[1],
                    collector1
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdEscrow2[1]
                )
                assert.equal(state, ConditionState.Fulfilled)

                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers2[0])
                const receiver1Balance = await token.balanceOf(receivers2[1])
                const collectorBalance = await token.balanceOf(collector2.getId())

                assert.isTrue(
                    receiver0Balance.eq(initialBalances.collector1.add(amounts2[0]))
                )
                assert.isTrue(
                    receiver1Balance.eq(initialBalances.artist.add(amounts2[1]))
                )
                assert.isTrue(collectorBalance.sub(initialBalances.collector2).eq(0))
                assert.isTrue(
                    escrowPaymentConditionBalance
                        .sub(initialBalances.escrowPaymentCondition)
                        .eq(0)
                )
            })
        })
    })

    describe('Short flow', () => {
        before(async () => {
            // initial balances
            initialBalances = {
                artist: await token.balanceOf(artist.getId()),
                collector1: await token.balanceOf(collector1.getId()),
                collector2: await token.balanceOf(collector2.getId()),
                gallery: await token.balanceOf(gallery.getId()),
                escrowPaymentCondition: Number(
                    await token.balanceOf(escrowPaymentCondition.getAddress())
                )
            }
            agreementIdSeed = generateId()
            agreementAccessIdSeed = generateId()
            agreementId2Seed = generateId()

            agreementId = await nevermined.keeper.agreementStoreManager.agreementId(
                agreementIdSeed,
                collector1.getId()
            )
            agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(
                agreementAccessIdSeed,
                collector1.getId()
            )
            agreementId2 = await nevermined.keeper.agreementStoreManager.agreementId(
                agreementId2Seed,
                collector2.getId()
            )

            const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
            const erc721ABI = await TestContractHandler.getABI(
                'NFT721Upgradeable',
                config.artifactsFolder,
                networkName
            )
            
            const nftContract = await TestContractHandler.deployArtifact(
                erc721ABI,
                artist.getId(),
                [ artist.getId(), nevermined.keeper.didRegistry.address, 'NFT721', 'NVM', '', 0 ]
            )            
            nft = await nevermined.contracts.loadNft721(nftContract.address)

            nftContractOwner = new Account((await nft.nftContract.owner()) as string)
            await nft.nftContract.grantOperatorRole(
                transferNft721Condition.address,
                nftContractOwner
            )

            const payload = decodeJwt(config.marketplaceAuthToken)
            const metadata = getMetadata()
            metadata.userId = payload.sub

            const nftAttributes = NFTAttributes.getInstance({
                metadata,
                price: assetPrice1,
                serviceTypes: ['nft-sales', 'nft-access'],
                ercType: 721,
                nftType: NeverminedNFT721Type.nft721,
                nftContractAddress: nft.address,
                preMint: true,
                royaltyAttributes
            })
            ddo = await nevermined.nfts721.create(nftAttributes, artist)

            await collector1.requestTokens(nftPrice.div(scale))
        })

        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await nft.nftContract.grantOperatorRole(artist.getId(), nftContractOwner)
                await nft.mint(ddo.shortId(), artist)

                const balance = await nft.balanceOf(artist)
                assert.deepEqual(balance, BigNumber.from(1))
            })
        })

        describe('As a collector I want to buy some art', () => {
            it('I am setting an agreement for buying a NFT and paying it in the same transaction', async () => {
                const collector1BalanceBefore = await token.balanceOf(collector1.getId())
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.isTrue(
                    collector1BalanceBefore.eq(initialBalances.collector1.add(nftPrice))
                )
                const result =
                    await nft721SalesTemplate.createAgreementWithPaymentFromDDO(
                        agreementIdSeed,
                        ddo,
                        nft721SalesTemplate.params(collector1.getId()),
                        collector1,
                        collector1
                    )
                assert.isDefined(result)

                const status = await nft721SalesTemplate.getAgreementStatus(agreementId)
                assert.equal(status && status.lockPayment.state, ConditionState.Fulfilled)
                assert.equal(
                    status && status.transferNFT.state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    status && status.escrowPayment.state,
                    ConditionState.Unfulfilled
                )

                const collector1BalanceAfter = await token.balanceOf(collector1.getId())
                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.isTrue(
                    collector1BalanceAfter.sub(initialBalances.collector1).eq(0)
                )
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .add(assetPrice1.getTotalPrice())
                        .eq(escrowPaymentConditionBalanceAfter)
                )
            })

            it('The artist can check the payment and transfer the NFT to the collector', async () => {
                const ownerBefore = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerBefore, artist.getId())

                const receipt = await nevermined.agreements.conditions.transferNft721(
                    agreementId,
                    ddo,
                    artist
                )
                assert.isTrue(receipt)

                const ownerAfter = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerAfter, collector1.getId())
            })

            it('the artist asks and receives the payment', async () => {
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receipt =
                    await nevermined.agreements.conditions.releaseNft721Reward(
                        agreementId,
                        ddo,
                        artist
                    )
                assert.isTrue(receipt)

                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers[0])
                const receiver1Balance = await token.balanceOf(receivers[1])
                const collectorBalance = await token.balanceOf(collector1.getId())

                assert.isTrue(receiver0Balance.eq(initialBalances.artist.add(amounts[0])))
                assert.isTrue(
                    receiver1Balance.eq(initialBalances.gallery.add(amounts[1]))
                )
                assert.isTrue(collectorBalance.sub(initialBalances.collector1).eq(0))
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .sub(assetPrice1.getTotalPrice())
                        .eq(escrowPaymentConditionBalanceAfter)
                )
            })
        })

        describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
            it('The collector sets up the NFT access agreement', async () => {
                // Collector1: Create NFT access agreement
                const result = await nft721AccessTemplate.createAgreementFromDDO(
                    agreementAccessIdSeed,
                    ddo,
                    nft721AccessTemplate.params(collector1.getId()),
                    collector1,
                    collector1
                )
                assert.isDefined(result)

                const status = await nft721AccessTemplate.getAgreementStatus(
                    agreementAccessId
                )
                assert.equal(status && status.nftHolder.state, ConditionState.Unfulfilled)
                assert.equal(status && status.nftAccess.state, ConditionState.Unfulfilled)
            })

            it('The collector demonstrates it onws the NFT', async function () {
                // TODO: Not sure why we need to wait here but without this the
                // the fulfillment will fail
                await new Promise(r => setTimeout(r, 10000))
                const result = await nevermined.agreements.conditions.holderNft721(
                    agreementAccessId,
                    ddo,
                    collector1.getId(),
                    collector1
                )
                assert.isTrue(result)
            })

            it(' The artist gives access to the collector to the content', async function () {
                const result = await nevermined.agreements.conditions.grantNftAccess(
                    agreementAccessId,
                    ddo.shortId(),
                    collector1.getId(),
                    artist
                )
                assert.isTrue(result)
            })
        })

        describe('As collector1 I want to sell my NFT to collector2 for a higher price', () => {
            before(async () => {
                // initial balances
                initialBalances = {
                    artist: await token.balanceOf(artist.getId()),
                    collector1: await token.balanceOf(collector1.getId()),
                    collector2: await token.balanceOf(collector2.getId()),
                    gallery: await token.balanceOf(gallery.getId()),
                    owner: await token.balanceOf(owner.getId()),
                    lockPaymentCondition: Number(
                        await token.balanceOf(lockPaymentCondition.getAddress())
                    ),
                    escrowPaymentCondition: Number(
                        await token.balanceOf(escrowPaymentCondition.getAddress())
                    )
                }
                setNFTRewardsFromDDOByService(
                    ddo,
                    'nft-sales',
                    assetPrice2,
                    collector1.getId()
                )
            })
            it('As collector2 I setup an agreement for buying an NFT from collector1', async () => {
                const result = await nft721SalesTemplate.createAgreementFromDDO(
                    agreementId2Seed,
                    ddo,
                    nft721SalesTemplate.params(collector2.getId()),
                    collector2,
                    collector2
                )
                assert.isDefined(result)

                const status = await nft721SalesTemplate.getAgreementStatus(agreementId2)
                assert.equal(
                    status && status.lockPayment.state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    status && status.transferNFT.state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    status && status.escrowPayment.state,
                    ConditionState.Unfulfilled
                )
            })

            it('As collector2 I am locking the payment', async () => {
                await collector2.requestTokens(nftPrice2.div(scale))

                const collector2BalanceBefore = await token.balanceOf(collector2.getId())
                assert.isTrue(
                    collector2BalanceBefore.eq(initialBalances.collector2.add(nftPrice2))
                )
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )

                const receipt = await nevermined.agreements.conditions.lockPayment(
                    agreementId2,
                    ddo.shortId(),
                    assetPrice2.getAmounts(),
                    assetPrice2.getReceivers(),
                    token.getAddress(),
                    collector2
                )
                assert.isTrue(receipt)

                const collector2BalanceAfter = await token.balanceOf(collector2.getId())
                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.isTrue(
                    collector2BalanceAfter.sub(initialBalances.collector2).eq(0)
                )
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .add(assetPrice2.getTotalPrice())
                        .eq(escrowPaymentConditionBalanceAfter)
                )
            })

            it('As collector1 I can check the payment and transfer the NFT to collector2', async () => {
                const ownerBefore = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerBefore, collector1.getId())

                const receipt = await nevermined.agreements.conditions.transferNft721(
                    agreementId2,
                    ddo,
                    collector1
                )
                assert.isTrue(receipt)

                const ownerAfter = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerAfter, collector2.getId())
            })

            it('Collector1 and Artist get the payment', async () => {
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receipt =
                    await nevermined.agreements.conditions.releaseNft721Reward(
                        agreementId2,
                        ddo,
                        collector1
                    )
                assert.isTrue(receipt)

                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers2[0])
                const receiver1Balance = await token.balanceOf(receivers2[1])
                const collectorBalance = await token.balanceOf(collector2.getId())

                assert.isTrue(
                    receiver0Balance.eq(initialBalances.collector1.add(amounts2[0]))
                )
                assert.isTrue(
                    receiver1Balance.eq(initialBalances.artist.add(amounts2[1]))
                )
                assert.isTrue(collectorBalance.sub(initialBalances.collector2).eq(0))
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .sub(assetPrice2.getTotalPrice())
                        .eq(escrowPaymentConditionBalanceAfter)
                )
            })
        })
    })
})
