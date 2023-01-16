import chai, { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import chaiAsPromised from 'chai-as-promised'
import {
    Account,
    DDO,
    Nevermined,
    AssetPrice,
    AssetAttributes,
    NFTAttributes
} from '../../src'
import { config } from '../config'
import { getMetadata } from '../utils'
import { getRoyaltyAttributes, RoyaltyKind } from '../../src/nevermined'
import { ethers } from 'ethers'
import { BigNumber } from '../../src/utils'
import '../globals'
import TestContractHandler from '../../test/keeper/TestContractHandler'

chai.use(chaiAsPromised)

describe('NFT1155 End-to-End', () => {
    let deployer: Account
    let publisher: Account
    let someone: Account
    let minter: Account
    let nftContract: ethers.Contract

    let nevermined: Nevermined
    let ddo: DDO
    let token
    let nftUpgradeable

    const amounts = [BigNumber.from(15), BigNumber.from(5)]

    const metadata = getMetadata()
    const royalties = 0 // 10% of royalties in the secondary market
    const cappedAmount = BigNumber.from(10)
    const preMint = false
    const numberNFTs = BigNumber.from(1)

    let royaltyAttributes
    let receivers: string[]
    let assetPrice: AssetPrice

    let payload: JWTPayload

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[deployer, publisher, someone, minter, ,] = await nevermined.accounts.list()
        ;({ token, nftUpgradeable } = nevermined.keeper)
<<<<<<< HEAD

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )
||||||| 2c6317ee

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)
=======
        
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)
>>>>>>> feature/create_contracts

        await nevermined.services.marketplace.login(clientAssertion)

        payload = decodeJwt(config.marketplaceAuthToken)

        metadata.userId = payload.sub

        receivers = [publisher.getId(), deployer.getId()]
        assetPrice = new AssetPrice(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        ).setTokenAddress(token.getAddress())
    })

    describe('As user I can deploy Nevermined ERC-1155 NFT contract instances', () => {
        it('Using the ABI', async () => {
            TestContractHandler.setConfig(config)
            const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
            const erc1155ABI = await TestContractHandler.getABI(
                'NFT1155Upgradeable',
                config.artifactsFolder,
                networkName
            )

            nftContract = await TestContractHandler.deployArtifact(
                erc1155ABI,
                deployer.getId(),
                [ deployer.getId(), nevermined.keeper.didRegistry.getAddress(), 'NFT1155', 'NVM', '' ]
            )

            assert.isDefined(nftContract)
            console.log(`NFT (ERC-1155) deployed at address ${nftContract.address}`)
        })

<<<<<<< HEAD
        it('Clonning an instance', async () => {            
            const cloneAddress = await nevermined.nfts1155.getContract.createClone(
                'My New NFT',
                'xyz',
                '',
                [ ],
                deployer
            )
||||||| 2c6317ee
        it('Clonning an instance', async () => {
            const cloneAddress = await nftUpgradeable.createClone('My New NFT', 'xyz', '', deployer)
=======
        it('Clonning an instance', async () => {
            
            const cloneAddress = await nevermined.nfts1155.getContract.createClone('My New NFT', 'xyz', '', deployer)
>>>>>>> feature/create_contracts
            assert.isDefined(cloneAddress)
            console.log(`NFT (ERC-1155) clonned into address ${cloneAddress}`)
        })
    })

    describe('As user I can register a mintable asset and manage some permissions', () => {
        it('Should be able to publish a mintable DID attached to the new NFT1155 contract', async () => {
            royaltyAttributes = getRoyaltyAttributes(
                nevermined,
                RoyaltyKind.Standard,
                royalties
            )

            const assetAttributes = AssetAttributes.getInstance({
                metadata,
                price: assetPrice,
                serviceTypes: ['nft-sales', 'nft-access']
            })
            const nftAttributes = NFTAttributes.getNFT1155Instance({
                ...assetAttributes,
                nftContractAddress: nftUpgradeable.address,
                cap: cappedAmount,
                amount: numberNFTs,
                royaltyAttributes,
                preMint
            })
            ddo = await nevermined.nfts1155.create(nftAttributes, publisher)

            assert.isDefined(ddo.shortId())
        })

        it('Should be able to approve permissions', async () => {
            await nftUpgradeable.setApprovalForAll(someone.getId(), true, deployer)

            const isApproved = await nftUpgradeable.isApprovedForAll(
                deployer.getId(),
                someone.getId()
            )
            assert.isTrue(isApproved)
        })

        it('Should be able to revoke permissions', async () => {
            await nftUpgradeable.setApprovalForAll(someone.getId(), false, deployer)

            const isApproved = await nftUpgradeable.isApprovedForAll(
                deployer.getId(),
                someone.getId()
            )
            assert.isFalse(isApproved)
        })

        it('Should be able to mint', async () => {
            const beforeBalance = await nftUpgradeable.balance(
                someone.getId(),
                ddo.shortId()
            )
            console.log(`Contract owner ${await nftUpgradeable.owner()}`)
            const owner = new Account(await nftUpgradeable.owner())
            await nftUpgradeable.grantOperatorRole(minter.getId(), owner)

            await nftUpgradeable.mint(
                someone.getId(),
                ddo.shortId(),
                BigNumber.from(1),
                minter.getId()
            )

            const afterBalance = await nftUpgradeable.balance(
                someone.getId(),
                ddo.shortId()
            )
            assert.isTrue(beforeBalance.add(1).eq(afterBalance))
        })

        it('Should be able to burn', async () => {
            const beforeBalance = await nftUpgradeable.balance(
                someone.getId(),
                ddo.shortId()
            )

            await nftUpgradeable.burn(someone.getId(), ddo.shortId(), BigNumber.from(1))

            const afterBalance = await nftUpgradeable.balance(
                someone.getId(),
                ddo.shortId()
            )
            assert.isTrue(beforeBalance.sub(1).eq(afterBalance))
        })
    })
})
