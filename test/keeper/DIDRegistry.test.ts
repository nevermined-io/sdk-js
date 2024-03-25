import { assert } from 'chai'
import { DIDRegistry } from '../../src/keeper'
import { Nevermined } from '../../src/nevermined'
import { generateId } from '../../src/utils'
import config from '../config'
import TestContractHandler from './TestContractHandler'
import { Logger, LogLevel } from '../../src/utils'
import { ContractTransactionReceipt, ethers, EventLog } from 'ethers'
import { TxParameters } from '../../src/keeper'

let nevermined: Nevermined
let didRegistry: DIDRegistry
let checksum: string

describe('DIDRegistry', () => {
  before(async () => {
    await TestContractHandler.prepareContracts()
    nevermined = await Nevermined.getInstance(config)
    ;({ didRegistry } = nevermined.keeper)
    checksum = ethers.hexlify(ethers.randomBytes(32))
  })

  describe('#registerAttribute()', () => {
    it('should register an attribute in a new did', async () => {
      const [ownerAccount] = await nevermined.accounts.list()
      const did = generateId()
      const data = 'my nice provider, is nice'
      const contractReceipt = await didRegistry.registerAttribute(
        did,
        checksum,
        [],
        data,
        ownerAccount.getId(),
      )
      assert.equal(contractReceipt.status, 1)
      assert.isTrue(
        (contractReceipt.logs as EventLog[]).some(
          (e: EventLog) => e.eventName === 'DIDAttributeRegistered',
        ),
      )
    })

    it('should register an attribute in a new did modifying the nonce', async () => {
      const [ownerAccount] = await nevermined.accounts.list()
      const did = generateId()
      const data = 'hola hola'
      const provider = await getWeb3EthersProvider(config)
      const txCount = await provider.getTransactionCount(ownerAccount.getId(), 'pending')
      const txParams: TxParameters = { nonce: txCount }

      const contractReceipt: ContractTransactionReceipt = await didRegistry.registerAttribute(
        did,
        checksum,
        [],
        data,
        ownerAccount.getId(),
        txParams,
      )
      assert.equal(contractReceipt.status, 1)
      assert.isTrue(
        (contractReceipt.logs as EventLog[]).some(
          (e: EventLog) => e.eventName === 'DIDAttributeRegistered',
        ),
      )
    })
  })

  describe('#getDIDOwner()', () => {
    it('should get the owner of a did properly', async () => {
      const [ownerAccount] = await nevermined.accounts.list()
      const didSeed = generateId()
      const data = 'my nice provider, is nice'
      await didRegistry.registerAttribute(didSeed, checksum, [], data, ownerAccount.getId())
      const did = await didRegistry.hashDID(didSeed, ownerAccount.getId())

      const owner = await didRegistry.getDIDOwner(did)

      assert.equal(owner, ownerAccount.getId(), `Got ${owner} but expected ${ownerAccount.getId()}`)
    })

    it('should get 0x0 for a not registered did', async () => {
      const owner = await didRegistry.getDIDOwner(generateId())
      assert.equal(owner, ethers.ZeroAddress)
    })
  })

  describe('#transferDIDOwnership()', () => {
    it('should be able to transfer ownership', async () => {
      // create and register DID
      const [ownerAccount] = await nevermined.accounts.list()
      const didSeed = generateId()
      const data = 'my nice provider, is nice'
      await didRegistry.registerAttribute(didSeed, checksum, [], data, ownerAccount.getId())
      const did = await didRegistry.hashDID(didSeed, ownerAccount.getId())

      // transfer
      const [, newOwnerAccount] = await nevermined.accounts.list()
      const logger = new Logger(LogLevel.Error)
      logger.log('New Owner Account: ' + newOwnerAccount.getId())
      await didRegistry.transferDIDOwnership(did, newOwnerAccount.getId(), ownerAccount.getId())

      // check
      const newOwner = await didRegistry.getDIDOwner(did)
      logger.log('DID Owner Account: ' + newOwner)

      assert.equal(
        newOwner,
        newOwnerAccount.getId(),
        `Got ${newOwner} but expected ${newOwnerAccount.getId()}`,
      )
    })
  })
})
