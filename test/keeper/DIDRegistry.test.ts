import { assert } from 'chai'

import TestContractHandler from './TestContractHandler'
import { Nevermined } from '@/nevermined/Nevermined'
import { DIDRegistry } from '@/keeper/contracts/DIDRegistry'
import { generateId } from '@/common/helpers'
import { TxParameters } from '@/models/Transactions'
import { ZeroAddress } from '@/constants/AssetConstants'


let nevermined: Nevermined
let didRegistry: DIDRegistry
let checksum: string

describe('DIDRegistry', () => {
  before(async () => {
    const deployer = await TestContractHandler.prepareContracts()
    nevermined = deployer.nevermined
    ;({ didRegistry } = nevermined.keeper)
    checksum = generateId()
  })

  describe('#registerAttribute()', () => {
    it('should register an attribute in a new did', async () => {
      const [ownerAccount] = await nevermined.accounts.list()
      const did = generateId()
      const data = 'my nice provider, is nice'
      const txReceipt = await didRegistry.registerAttribute(
        did,
        checksum,
        [],
        data,
        ownerAccount,
      )
      console.log(txReceipt)
      assert.equal(txReceipt.status, 'success')
      
      const logs = didRegistry.getTransactionLogs(txReceipt, 'DIDAttributeRegistered')
      assert.isTrue(logs.length > 0)
      // assert.isTrue(
      //   (contractReceipt.logs).some(
      //     (e) => e.eventName === 'DIDAttributeRegistered',
      //   ),
      // )
    })

    it('should register an attribute in a new did modifying the nonce', async () => {
      const [ownerAccount] = await nevermined.accounts.list()
      const did = generateId()
      const data = 'hola hola'
      // const provider = await getWeb3EthersProvider(config)
      // const txCount = await provider.getTransactionCount(ownerAccount.getId(), 'pending')
      const txCount = await nevermined.client.public.getTransactionCount({ 
        address: ownerAccount.getAddress(),
        blockTag: 'pending'        
       })
      const txParams: TxParameters = { nonce: txCount }

      const txReceipt = await didRegistry.registerAttribute(
        did,
        checksum,
        [],
        data,
        ownerAccount,
        txParams,
      )
      assert.equal(txReceipt.status, 'success')
      const logs = didRegistry.getTransactionLogs(txReceipt, 'DIDAttributeRegistered')
      assert.isTrue(logs.length > 0)
    })
  })

  describe('#getDIDOwner()', () => {
    it('should get the owner of a did properly', async () => {
      const [ownerAccount] = await nevermined.accounts.list()
      const didSeed = generateId()
      const data = 'my nice provider, is nice'
      await didRegistry.registerAttribute(didSeed, checksum, [], data, ownerAccount)
      const did = await didRegistry.hashDID(didSeed, ownerAccount.getId())

      const owner = await didRegistry.getDIDOwner(did)

      assert.equal(owner, ownerAccount.getId(), `Got ${owner} but expected ${ownerAccount.getId()}`)
    })

    it('should get 0x0 for a not registered did', async () => {
      const owner = await didRegistry.getDIDOwner(generateId())
      assert.equal(owner, ZeroAddress)
    })
  })

  describe('#transferDIDOwnership()', () => {
    it('should be able to transfer ownership', async () => {
      // create and register DID
      const [ownerAccount] = await nevermined.accounts.list()
      const didSeed = generateId()
      const data = 'my nice provider, is nice'
      await didRegistry.registerAttribute(didSeed, checksum, [], data, ownerAccount)
      const did = await didRegistry.hashDID(didSeed, ownerAccount.getId())

      // transfer
      const [, newOwnerAccount] = await nevermined.accounts.list()
      // const logger = new Logger(LogLevel.Error)
      console.log('New Owner Account: ' + newOwnerAccount.getId())
      await didRegistry.transferDIDOwnership(did, newOwnerAccount.getId(), ownerAccount)

      // check
      const newOwner = await didRegistry.getDIDOwner(did)
      console.log('DID Owner Account: ' + newOwner)

      assert.equal(
        newOwner,
        newOwnerAccount.getId(),
        `Got ${newOwner} but expected ${newOwnerAccount.getId()}`,
      )
    })
  })
})
