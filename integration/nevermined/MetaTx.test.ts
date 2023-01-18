import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO, NFTAttributes } from '../../src'
import { BigNumber, makeAccounts } from '../../src/utils'
import {
    getRoyaltyAttributes,
    RoyaltyAttributes,
    RoyaltyKind
} from '../../src/nevermined'
import { ethers } from 'ethers'
import fs from 'fs'
import { RelayProvider } from '@opengsn/provider'
import { Web3ProviderWrapper } from '../../src/keeper'

describe('MetaTx test with nfts', () => {
    let nevermined: Nevermined

    let artist: Account
    let collector: Account
    let ddo: DDO

    let payload: JWTPayload
    let royaltyAttributes: RoyaltyAttributes
    const paymasterAddress = JSON.parse(
        fs.readFileSync('artifacts/opengsn.json').toString()
    ).paymasterAddress
    let wallets

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        wallets = makeAccounts(process.env.SEED_WORDS)

        // Accounts
        ;[artist, collector] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        await nevermined.services.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)

        const nftContractOwner = new Account(await nevermined.nfts1155.owner())
        await nevermined.keeper.nftUpgradeable.grantOperatorRole(
            artist.getId(),            
            nftContractOwner
        )
    })

    describe('with default token', async () => {
        before(async () => {
            const metadata = getMetadata(Math.random())
            metadata.userId = payload.sub
            royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 0)

            const nftAttributes = NFTAttributes.getNFT1155Instance({
                metadata,
                serviceTypes: ['nft-sales', 'nft-access'],
                nftContractAddress: nevermined.nfts1155.nftContract.address,
                cap: BigNumber.from(10),
                royaltyAttributes
            })
            ddo = await nevermined.nfts1155.create(nftAttributes, artist)
        })

        it('should mint 10 nft tokens', async () => {
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(10)
            )
        })

        it('should transfer 2 nft tokens with default token', async () => {
            const agreementId = await nevermined.nfts1155.order(
                ddo.id,
                BigNumber.from(2),
                collector
            )

            await nevermined.nfts1155.transfer(
                agreementId,
                ddo.id,
                BigNumber.from(2),
                artist
            )

            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(8)
            )
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, collector),
                BigNumber.from(2)
            )
        })

        it('metatransactions should work', async () => { 
                                           
            const wallet = wallets[1]

            await nevermined.keeper.nftUpgradeable.transferNft(
                ddo.id,
                await wallet.getAddress(),
                BigNumber.from(2),
                artist.getId()
            )

            assert.deepEqual(
                BigNumber.from(
                    await nevermined.keeper.nftUpgradeable.balance(
                        await wallet.getAddress(),
                        ddo.id
                    )
                ),
                BigNumber.from(4)
            )

            const config = await {
                paymasterAddress: paymasterAddress,
                auditorsCount: 0,
                preferredRelays: ['http://opengsn.nevermined.localnet']
            }
            const gsnProvider = RelayProvider.newProvider({
                provider: new Web3ProviderWrapper(nevermined.web3),
                config
            })
            
            await gsnProvider.init()
            gsnProvider.addAccount(wallet.privateKey)
            const etherProvider = new ethers.providers.Web3Provider(gsnProvider)
            const signer = etherProvider.getSigner(wallet.address)
            
            const signerAccount = new Account(await signer.getAddress())

            await nevermined.nfts1155.burn(
                ddo.id, 
                BigNumber.from(2), 
                signerAccount
                )
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(6)
            )
            assert.deepEqual(
                BigNumber.from(
                    await nevermined.keeper.nftUpgradeable.balance(
                        await wallet.getAddress(),
                        ddo.id
                    )
                ),
                BigNumber.from(2)
            )
        })
    })
})
