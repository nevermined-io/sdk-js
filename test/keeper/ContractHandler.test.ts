import { assert } from 'chai'
import { FormatTypes, Interface } from 'ethers/lib/utils'
import { ContractHandler } from '../../src/keeper'
import { Nevermined } from '../../src/nevermined'
import config from '../config'

describe('ContractHandler', () => {
    let contractHandler: ContractHandler
    let nevermined: Nevermined
    let networkName: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        const { instanceConfig } = nevermined as any
        contractHandler = new ContractHandler(instanceConfig)
        networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
    })

    describe('ABIs parsing', () => {
        it('should parse a Subscription NFT contract', async () => {
            const solidityABI = await ContractHandler.getABI(
                'NFT721SubscriptionUpgradeable',
                './test/resources/artifacts/'
            )
            const iface = new Interface(solidityABI.abi)
            const output = iface.format(FormatTypes.full)
            assert(output)
        })

        it('should parse the NeverminedToken contract', async () => {
            const solidityABI = await ContractHandler.getABI(
                'NeverminedToken',
                './artifacts/',
                networkName
            )
            const iface = new Interface(solidityABI.abi)
            const output = iface.format(FormatTypes.full)
            assert(output)
        })
    })

    describe('#get()', () => {
        it('should load and get NeverminedToken correctly', async () => {
            assert(
                await contractHandler.get(
                    'NeverminedToken',
                    false,
                    './node_modules/@neverminde-io/contracts/artifacts'
                )
            )
        })

        it('should fail to load an unknown contract', done => {
            contractHandler
                .get(
                    'NeverminedXXX',
                    false,
                    './node_modules/@neverminde-io/contracts/artifacts'
                )
                .catch(() => {
                    done()
                })
        })
    })
})
