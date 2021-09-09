import { assert } from 'chai'

import { config } from '../config'

import { Nevermined, utils, Account, Keeper, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import Token from '../../src/keeper/contracts/Token'
import { getMetadata } from '../utils'
import {
    makeKey,
    hashKey,
    secretToPublic,
    encryptKey,
    ecdh,
    prove,
    verify
} from '../../src/utils'
import {
    AccessProofCondition,
    EscrowPaymentCondition,
    LockPaymentCondition
} from '../../src/keeper/contracts/conditions'
import { AccessProofTemplate } from '../../src/keeper/contracts/templates'
import { BabyjubPublicKey } from '../../src/models/KeyTransfer'

describe('Register Escrow Access Proof Template', () => {
    let nevermined: Nevermined
    let keeper: Keeper

    let accessProofTemplate: AccessProofTemplate

    const url = 'https://example.com/did/nevermined/test-attr-example.txt'
    const checksum = 'b'.repeat(32)
    const totalAmount = 12
    const amounts = [10, 2]

    let templateManagerOwner: Account
    let publisher: Account
    let consumer: Account
    let provider: Account
    let receivers: string[]

    let accessProofCondition: AccessProofCondition
    let lockPaymentCondition: LockPaymentCondition
    let escrowPaymentCondition: EscrowPaymentCondition
    let token: Token

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;({ keeper } = nevermined)
        ;({ accessProofTemplate } = keeper.templates)
        ;({ token } = keeper)

        // Accounts
        ;[
            templateManagerOwner,
            publisher,
            consumer,
            provider
        ] = await nevermined.accounts.list()

        receivers = [publisher.getId(), provider.getId()]

        // Conditions
        ;({
            accessProofCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = keeper.conditions)
    })

    describe('Propose and approve template', () => {
        it('should propose the template', async () => {
            await keeper.templateStoreManager.proposeTemplate(
                accessProofTemplate.getAddress(),
                consumer,
                true
            )
            // TODO: Use a event to detect template mined
            await new Promise(resolve => setTimeout(resolve, 2 * 1000))
        })

        it('should approve the template', async () => {
            await keeper.templateStoreManager.approveTemplate(
                accessProofTemplate.getAddress(),
                templateManagerOwner,
                true
            )
            // TODO: Use a event to detect template mined
            await new Promise(resolve => setTimeout(resolve, 2 * 1000))
        })
    })

    describe.only('Full flow', () => {
        let agreementId: string
        let didSeed: string
        let did: string

        let conditionIdAccess: string
        let conditionIdLock: string
        let conditionIdEscrow: string

        let buyerK: string
        let providerK: string
        let buyerPub: BabyjubPublicKey
        let providerPub: BabyjubPublicKey
        const data = Buffer.from('4e657665726d696e65640a436f707972696768742032303230204b65796b6f20476d62482e0a0a546869732070726f6475637420696e636c75646573', 'hex')
        let hash: string

        before(async () => {
            agreementId = utils.generateId()
            didSeed = utils.generateId()
            did = await keeper.didRegistry.hashDID(didSeed, publisher.getId())

            buyerK = makeKey('abd')
            providerK = makeKey('abc')
            buyerPub = secretToPublic(buyerK)
            providerPub = secretToPublic(providerK)

            hash = hashKey(data)
        })

        it('should register a DID', async () => {
            await keeper.didRegistry.registerAttribute(
                didSeed,
                checksum,
                [],
                url,
                publisher.getId()
            )
        })

        it('should generate the condition IDs', async () => {
            conditionIdAccess = await accessProofCondition.generateIdHash(
                agreementId,
                hash,
                buyerPub,
                providerPub
            )
            conditionIdLock = await lockPaymentCondition.generateIdHash(
                agreementId,
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                amounts,
                receivers
            )
            conditionIdEscrow = await escrowPaymentCondition.generateIdHash(
                agreementId,
                did,
                amounts,
                receivers,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                conditionIdLock,
                conditionIdAccess
            )
            console.log('condition ids', conditionIdAccess, conditionIdLock, conditionIdEscrow)
        })

        it('should have conditions types', async () => {
            const conditionTypes = await accessProofTemplate.getConditionTypes()

            assert.equal(conditionTypes.length, 3, 'Expected 3 conditions.')
            assert.deepEqual(
                [...conditionTypes].sort(),
                [
                    accessProofCondition.getAddress(),
                    escrowPaymentCondition.getAddress(),
                    lockPaymentCondition.getAddress()
                ].sort(),
                "The conditions doesn't match"
            )
        })

        it('should have condition instances associated', async () => {
            const conditionInstances = await accessProofTemplate.getConditions()

            assert.equal(conditionInstances.length, 3, 'Expected 3 conditions.')

            const conditionClasses = [
                AccessProofCondition,
                EscrowPaymentCondition,
                LockPaymentCondition
            ]
            conditionClasses.forEach(conditionClass => {
                if (
                    !conditionInstances.find(
                        condition => condition instanceof conditionClass
                    )
                ) {
                    throw new Error(
                        `${conditionClass.name} is not part of the conditions.`
                    )
                }
            })
        })

        it('should create a new agreement', async () => {
            const agreement = await accessProofTemplate.createAgreement(
                agreementId,
                did,
                [conditionIdAccess, conditionIdLock, conditionIdEscrow],
                [0, 0, 0],
                [0, 0, 0],
                consumer.getId(),
                publisher
            )

            assert.isTrue(agreement.status)
        })

        it('should fulfill LockPaymentCondition', async () => {
            try {
                await consumer.requestTokens(totalAmount)
            } catch {}

            await keeper.token.approve(
                lockPaymentCondition.getAddress(),
                totalAmount,
                consumer
            )

            const fulfill = await lockPaymentCondition.fulfill(
                agreementId,
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                amounts,
                receivers,
                consumer
            )

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })

        it.only('debug', async () => {
            const cipher = encryptKey(data, ecdh(providerK, buyerPub))
            let agreementId = '0xc54127cda45e4f549944bcd87c4ae5c6bf0d417c172940dabe70f3a9add63ffb'
            let proof = '0x1b003f366d21270041331b4f879515ddf9d6a54c24f0554f920775e477881cb503cf93de62a0e2763b5eed2cf2251713d01c433297487f2748ed5a6c266c44760678288b11a5bd8b554a2d5e046be74fb1037fd6b0b27549e3ca7fda32dabd261dc8124aa742390a71355e5f53fb626b2d05bec1035a0898d759424728d8091c0da0d10c44d7749959e9f24fc0aba8b56341ac3f6f905b6168a2d6c5b7ac8af227c005e732b6a73592d6bd9333a5020c290ceb591c06b55c1b85da5a983517350780cad26eec3d281a5d5561fe700f259d210f06faa0e78777bcff3edf39ce3319aaa7d398241b1d76f0dece3f06d32f892b9822e9783072deed0971ada9b48d0a64b3e180d0f7cfde9a22a27db5874b01585db577a5bdc6630321799f0506060af7b0cecb4466db38bc826ea69a65db82f569b562e9c4f5cb53a36b738ab2110ab19be890520d65d16c5d49ae35cf1caf1b5fa3f2ef4487c6048dd60a643829095acc95d5f0bb1c6573b3d0ed605a1c6e75ed323719ae297d6c6547a557bf371a7a5d43d8ef32991764024685c60fad49c06e0c1346b6bfddf200fc5b51957713735533c187459a0e9fcb6199e445f7e3e90de5d4ec0c23b8f2ff82c1bf8105254badc90cf8eac3c20c1dbfab02b950707e3a704c97d091be51b35d993adad81dd8b4e0ea3722cc409e6a8bd1951072a00f468bcd3b68e6ecfc3690c9b90f230648fd4aac9143066b2f52265aa9fcd6042667a3e5ddd003d7fcc9afe3903de81c7fb84d2e1865252318eb222dc89849f0db6f83af992fe1986340df7f70b0ad0ed4d37c2a54ff23ca6237893403f6a0c6be27daab4e81a1a3ecee40ec2a59222638fc3960422e4b04cc01ef475a7e5535003e399e0c2724309ad0a0a56767f522944dbebce0e3aec8910c9fe3d8276ed194482182a1434cd51d66c8c76aa7760ba0164a02bdd9360b4c623ff242f4110fbf50924e98f746667d7a3d2212405d2edcd85dc433814116ba5b332e036d3b1afedcf5efeee83a99380c1d63e273501a534690e734e1e68e47d5d573d9f60461faaaac76f3f235c90ec2161ee2d56614b03d80b662831221ec98cac536c6c9461cda636394683ef61615337b106b00'
          
            const id = await accessProofCondition.generateId(agreementId, '0xadce001cfbdb86cb694f9a592504e8ded6aff0974b5c52ce95193a5b0be9056f')
            console.log(await keeper.conditionStoreManager.getCondition(id))
            await accessProofCondition.abortByTimeOut(id)

            const fulfill = await accessProofCondition.fulfill(
                agreementId,
                hash,
                buyerPub,
                providerPub,
                cipher,
                proof
            )
            console.log(fulfill)
        })

        it('debug2', async () => {
            const cipher = encryptKey(data, ecdh(providerK, buyerPub))
            let [agreementId, proof] = ['0xc54127cda45e4f549944bcd87c4ae5c6bf0d417c172940dabe70f3a9add63ffb', '0x0b9a276515bcac371b237f97a28a3bc76284be79921234cfedf08d85351f8617', ['0x0d7cdd240c2f5b0640839c49fbaaf016a8c5571b8f592e2b62ea939063545981', '0x14b14fa0a30ec744dde9f32d519c65ebaa749bfe991a32deea44b83a4e5c65bb'], ['0x2e3133fbdaeb5486b665ba78c0e7e749700a5c32b1998ae14f7d1532972602bb', '0x0b932f02e59f90cdd761d9d5e7c15c8e620efce4ce018bf54015d68d9cb35561'], ['0x21cacaf28a4e8bef398438f9281b638b0fd94a5c15c273054cfeff8a0205f6e8', '0x058dbdbe25514a85d4a978d873035c8ba3cb77622702bc149ef9734737c4dd3c'], '0x1b003f366d21270041331b4f879515ddf9d6a54c24f0554f920775e477881cb503cf93de62a0e2763b5eed2cf2251713d01c433297487f2748ed5a6c266c44760678288b11a5bd8b554a2d5e046be74fb1037fd6b0b27549e3ca7fda32dabd261dc8124aa742390a71355e5f53fb626b2d05bec1035a0898d759424728d8091c0da0d10c44d7749959e9f24fc0aba8b56341ac3f6f905b6168a2d6c5b7ac8af227c005e732b6a73592d6bd9333a5020c290ceb591c06b55c1b85da5a983517350780cad26eec3d281a5d5561fe700f259d210f06faa0e78777bcff3edf39ce3319aaa7d398241b1d76f0dece3f06d32f892b9822e9783072deed0971ada9b48d0a64b3e180d0f7cfde9a22a27db5874b01585db577a5bdc6630321799f0506060af7b0cecb4466db38bc826ea69a65db82f569b562e9c4f5cb53a36b738ab2110ab19be890520d65d16c5d49ae35cf1caf1b5fa3f2ef4487c6048dd60a643829095acc95d5f0bb1c6573b3d0ed605a1c6e75ed323719ae297d6c6547a557bf371a7a5d43d8ef32991764024685c60fad49c06e0c1346b6bfddf200fc5b51957713735533c187459a0e9fcb6199e445f7e3e90de5d4ec0c23b8f2ff82c1bf8105254badc90cf8eac3c20c1dbfab02b950707e3a704c97d091be51b35d993adad81dd8b4e0ea3722cc409e6a8bd1951072a00f468bcd3b68e6ecfc3690c9b90f230648fd4aac9143066b2f52265aa9fcd6042667a3e5ddd003d7fcc9afe3903de81c7fb84d2e1865252318eb222dc89849f0db6f83af992fe1986340df7f70b0ad0ed4d37c2a54ff23ca6237893403f6a0c6be27daab4e81a1a3ecee40ec2a59222638fc3960422e4b04cc01ef475a7e5535003e399e0c2724309ad0a0a56767f522944dbebce0e3aec8910c9fe3d8276ed194482182a1434cd51d66c8c76aa7760ba0164a02bdd9360b4c623ff242f4110fbf50924e98f746667d7a3d2212405d2edcd85dc433814116ba5b332e036d3b1afedcf5efeee83a99380c1d63e273501a534690e734e1e68e47d5d573d9f60461faaaac76f3f235c90ec2161ee2d56614b03d80b662831221ec98cac536c6c9461cda636394683ef61615337b106b00']
            let proof_ = {
                A: [
                  '17177659050500533403338294142757370694245882344092506373896726948282760800156',
                  '20259554502627978408506682909817514590293338351495709991159816088765430999355',
                  '1'
                ],
                B: [
                  '1836978917686900767489453005154031579878508555551800811399857671015142412541',
                  '21082699757027883789509706309097587792557181099755164798287848620260770288230',
                  '1'
                ],
                C: [
                  '48831309353729707997877241260592764383198222901490881666142104945596626999',
                  '5832838786697149895227426624349669015744627614331819400099930629950323215844',
                  '1'
                ],
                Z: [
                  '21223995978772983725821360155172349156326311458350650044218980305978000572120',
                  '3873929839219092838740021657644390049996080970323015251805019546630091078371',
                  '1'
                ],
                T1: [
                  '11150415988525264534804336551310661770777633454639939734328464041962479209632',
                  '10682599145191321324084217402897995518997732806202465271878419085889746133673',
                  '1'
                ],
                T2: [
                  '12652772911045395632266291982617007754527059047750745975399523470745329299142',
                  '19989800812663632067619198428811660855212406583380615716294631550287214656189',
                  '1'
                ],
                T3: [
                  '3041201338777008043275696485065455893362217062355689623978934118009077331542',
                  '1448100145190104604209218053741179671567862314093287324127449017328971690301',
                  '1'
                ],
                eval_a: '16874132340376338254743384661467886520619521702427123184815845722111068392651',
                eval_b: '9583640868536166621104143867530598098421581005055974735164418570818044473268',
                eval_c: '14864121394041618199717741850673230560541578494029258042496747291517392741092',
                eval_s1: '2324584723952557757769559022468180804656177081692529896729874303021605921801',
                eval_s2: '16353113606487581842866739563761043972233019009434439774242840585329396068342',
                eval_zw: '18420917786941680013366071125320152895934238152804665194450198823135207942190',
                eval_r: '11671184124384673014133724782359849213448764079609150182253671654153245511263',
                Wxi: [
                  '21863129585015168637972960674942470755612481143311250106043137293515723362712',
                  '12269794530076682922902265016459768661696464202205545367546497018899932458034',
                  '1'
                ],
                Wxiw: [
                  '12110076473254807718443714047011187429516944495683252112958478543907526067829',
                  '7106521703250029077960510434614315828905261892960548975647178338796972005045',
                  '1'
                ],
                protocol: 'plonk',
                curve: 'bn128'
              }
              
            await verify(
                buyerPub,
                providerPub,
                providerK,
                data,
                proof_
            )

        })

        it('should fulfill AccessCondition', async () => {
            const cipher = encryptKey(data, ecdh(providerK, buyerPub))
            const proof = await prove(buyerPub, providerPub, providerK, data)
            console.log('cipher', cipher, 'hash', hash)
            console.log('buyer', buyerPub, 'provider', providerPub)
            const fulfill = await accessProofCondition.fulfill(
                agreementId,
                hash,
                buyerPub,
                providerPub,
                cipher,
                proof
            )
            console.log(fulfill)

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })

        it('should fulfill EscrowPaymentCondition', async () => {
            const fulfill = await escrowPaymentCondition.fulfill(
                agreementId,
                did,
                amounts,
                receivers,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                conditionIdLock,
                conditionIdAccess,
                consumer
            )

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })
    })

    describe('Short flow', () => {
        let agreementId: string
        let ddo: DDO

        let buyerK: string
        let providerK: string
        let buyerPub: BabyjubPublicKey
        let providerPub: BabyjubPublicKey
        const data = Buffer.from('12345678901234567890123456789012')
        let hash: string

        before(async () => {
            ddo = await nevermined.assets.create(getMetadata(), publisher)
            buyerK = makeKey('a b c')
            providerK = makeKey('e f g')
            buyerPub = secretToPublic(buyerK)
            providerPub = secretToPublic(providerK)

            hash = hashKey(data)
        })

        it('should create a new agreement (short way)', async () => {
            agreementId = await accessProofTemplate.createFullAgreement(
                ddo,
                new AssetRewards(
                    new Map([
                        [receivers[0], amounts[0]],
                        [receivers[1], amounts[1]]
                    ])
                ),
                consumer.getId(),
                hash,
                buyerPub,
                providerPub,
                undefined,
                publisher
            )

            assert.match(agreementId, /^0x[a-f0-9]{64}$/i)
        })

        it('should fulfill the conditions from consumer side', async () => {
            try {
                await consumer.requestTokens(totalAmount)
            } catch {}

            await nevermined.agreements.conditions.lockPayment(
                agreementId,
                ddo.shortId(),
                amounts,
                receivers,
                token.getAddress(),
                consumer
            )
        })

        it('should fulfill the conditions from publisher side', async () => {
            await nevermined.agreements.conditions.transferKey(
                agreementId,
                data,
                providerK,
                buyerPub,
                providerPub,
                publisher
            )
            await nevermined.agreements.conditions.releaseReward(
                agreementId,
                amounts,
                receivers,
                ddo.shortId(),
                consumer.getId(),
                publisher.getId(),
                token.getAddress(),
                publisher
            )
        })

        it('buyer should have the key', async () => {
            const key = await nevermined.agreements.conditions.readKey(
                agreementId,
                buyerK,
                providerPub
            )
            assert.equal(key.toString(), data.toString())
        })
    })
})
