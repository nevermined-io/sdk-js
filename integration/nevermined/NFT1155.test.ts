import chai, { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import chaiAsPromised from 'chai-as-promised'
import { Account, DDO, Nevermined } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'
import { getRoyaltyAttributes, RoyaltyKind } from '../../src/nevermined/Assets'
import { ethers } from 'ethers'
import BigNumber from '../../src/utils/BigNumber'
import '../globals'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import ERC1155 from '../../src/artifacts/ERC1155.json'


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
    let assetRewards: AssetRewards

    let payload: JWTPayload

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[deployer, publisher, someone, minter, , ] = await nevermined.accounts.list()
        ;({ token, nftUpgradeable } = nevermined.keeper)

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

        await nevermined.marketplace.login(clientAssertion)

        payload = decodeJwt(config.marketplaceAuthToken)

        metadata.userId = payload.sub

        receivers = [publisher.getId(), deployer.getId()]
        assetRewards = new AssetRewards(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        )
        
    })

    describe('As user I can deploy Nevermined ERC-1155 NFT contract instances', () => {
        it('Using the ABI', async () => {
            TestContractHandler.setConfig(config)
            nftContract = await TestContractHandler.deployArtifact(ERC1155, deployer.getId())
            
            assert.isDefined(nftContract)
            console.log(`NFT (ERC-1155) deployed at address ${nftContract.address}`)
        })

        it('Clonning an instance', async () => {
            const cloneAddress = await nftUpgradeable.createClone(nftUpgradeable.address, 'My New NFT', 'xyz', '', deployer)
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

            ddo = await nevermined.assets.createNft(
                metadata,
                publisher,
                assetRewards,
                undefined,
                cappedAmount,
                undefined,
                numberNFTs,
                royaltyAttributes,
                token.getAddress(),
                nftUpgradeable.address,
                preMint
            )
            assert.isDefined(ddo.shortId())
        })

        it('Should be able to approve permissions', async () => {
            await nftUpgradeable.setApprovalForAll(
                someone.getId(),
                true,
                deployer
            )

            const isApproved = await nftUpgradeable.isApprovedForAll(deployer.getId(), someone.getId());
            assert.isTrue(isApproved)
        })

        it('Should be able to revoke permissions', async () => {
            await nftUpgradeable.setApprovalForAll(
                someone.getId(),
                false,
                deployer
            )

            const isApproved = await nftUpgradeable.isApprovedForAll(deployer.getId(), someone.getId());
            assert.isFalse(isApproved)
        })


        it('Should be able to mint', async () => {
            const beforeBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())
            console.log(`Contract owner ${await nftUpgradeable.owner()}`)
            const owner = new Account(await nftUpgradeable.owner())
            await nftUpgradeable.addMinter(minter.getId(), owner)

            await nftUpgradeable.mint(
                someone.getId(),
                ddo.shortId(),
                BigNumber.from(1),                
                minter.getId()
            )

            const afterBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())
            assert.isTrue(beforeBalance.add(1).eq(afterBalance))            
        })

        it('Should be able to burn', async () => {
            const beforeBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())

            await nftUpgradeable.burn(
                someone.getId(),
                ddo.shortId(),
                BigNumber.from(1)
            )

            const afterBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())
            assert.isTrue(beforeBalance.sub(1).eq(afterBalance))
        })

    })

})
