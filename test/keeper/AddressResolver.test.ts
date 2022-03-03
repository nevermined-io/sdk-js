import { assert } from 'chai'
import config from '../config'
import {
    getAddressBook,
    createAddressBookFromArtifacts,
    getContractAddress
} from '../../src/keeper/AddressResolver'

describe('AddressResolver', () => {
    describe('#createAddressBookFromArtifacts()', () => {
        it('expect empty mapping when no artifacts are found in the given folder', () => {
            assert.isTrue(
                Object.keys(createAddressBookFromArtifacts('./test/testdata')).length ===
                    0
            )
        })

        it('extract the network-contract-address mapping correctly', () => {
            assert.equal(
                JSON.stringify(
                    createAddressBookFromArtifacts('./test/testdata/artifacts/')
                ),
                JSON.stringify({
                    mainnet: {
                        TransferNFTCondition: '0x3c8D330419f59C1586C1D4F8e4f3f70F09606455'
                    },
                    mumbai: {
                        TransferNFTCondition: '0xeCD2dAaaB6Ca862AB9Bf6F5CaeC2B0691de29e80'
                    },
                    rinkeby: {
                        TransferNFTCondition: '0x6e81A4571C35F5786043fC9f6545F95c7B4E90A7'
                    }
                })
            )
        })
    })
    describe('#getAddressBook()', () => {
        it('get the default addressBook', () => {
            const addressMap = getAddressBook({ ...config, addressBook: '' })
            assert.equal(
                addressMap.mainnet.AccessCondition,
                '0xBa635a16ad65fc44776F4577E006e54B739170e1'
            )
            assert.equal(
                addressMap.mainnet.AccessTemplate,
                '0x5cc43778946671Ab88Be0d98B2Bc25C0c67095bb'
            )
        })
        it('get the addressBook using file from config', () => {
            const abook = getAddressBook(config)
            assert.equal(
                JSON.stringify(abook['rinkeby']),
                JSON.stringify({
                        AccessCondition: '0x6fD85bdc2181955d1e13e69cF6b7D823065C3Ca7',
                        AccessTemplate: '0xb0c62D9396C2FEcBb51eD6EB26c0Ed4f5eA4a346'
                    }
                )
            )
            assert.equal(
                JSON.stringify(abook['mainnet']),
                JSON.stringify({
                        AccessCondition: '0xBa635a16ad65fc44776F4577E006e54B739170e1',
                        AccessTemplate: '0x5cc43778946671Ab88Be0d98B2Bc25C0c67095bb'
                    }
                )
            )
            assert.equal(
                JSON.stringify(abook['mumbai']),
                JSON.stringify({
                        AccessCondition: '0xe12C1Ff0867DFFFb8EEf9752f1Fa9A392aaF0C1d',
                        AccessProofCondition: '0x2C26e52b6985e2989321437404612bDD25E424d4'
                    }
                )
            )
        })
    })
    describe('#getContractAddress()', () => {
        it('get contract address at specific network', () => {
            assert.equal(
                getContractAddress(config, 'AccessCondition', 'rinkeby'),
                '0x6fD85bdc2181955d1e13e69cF6b7D823065C3Ca7'
            )
        })
        it('get contract address at unknown network', () => {
            assert.isNull(getContractAddress(config, 'AccessCondition', 'nono'))
        })
    })
})
