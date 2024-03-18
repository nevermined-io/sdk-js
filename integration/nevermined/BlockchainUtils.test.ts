import { config } from '../config'
import { ContractHandler, KeeperError, Nevermined, NvmAccount, Token } from '../../src'
import { assert } from 'chai'
import {
  searchAbiFunction,
  getAddress,
  isAddress,
  getSignatureOfFunction,
  getInputsOfFunction,
  getInputsOfFunctionFormatted,
  getBytes,
  zeroPadValue,
  makeWallets,
  keccak256,
  keccak256Packed,
  parseUnits,
  parseEther,
  formatEther,
} from '../../src/nevermined/utils/BlockchainEthersUtils'
import { ethers, formatUnits } from 'ethers'

describe('Blockchain Utils', () => {
  let nvm: Nevermined
  let nftContract
  let contractAddress
  let userAccount: NvmAccount

  before(async () => {
    nvm = await Nevermined.getInstance(config)
    ;[userAccount] = await nvm.accounts.list()
    assert.isDefined(nvm.utils.blockchain)
    assert.isDefined(userAccount)
  })

  describe('Class tests', () => {
    it(`Should deploy an ABI`, async () => {
      const networkName = await nvm.keeper.getNetworkName()
      const erc1155ABI = await ContractHandler.getABIArtifact(
        'NFT1155Upgradeable',
        config.artifactsFolder,
        networkName,
      )

      nftContract = await nvm.utils.blockchain.deployAbi(erc1155ABI, userAccount, [
        userAccount.getId(),
        nvm.keeper.didRegistry.address,
        'NFT1155 Test',
        'NVM',
        '',
        nvm.keeper.nvmConfig.address,
      ])

      assert.isDefined(nftContract)
      contractAddress = await nftContract.getAddress()
      console.log(`NFT (ERC-1155) deployed at address ${contractAddress}`)
    })

    it(`Should load a contract`, async () => {
      const contract = await nvm.utils.blockchain.loadContract(
        contractAddress,
        nftContract.interface,
      )
      assert.isDefined(contract)
    })

    it(`Should check that exists`, async () => {
      const exists = await nvm.utils.blockchain.checkExists(contractAddress)
      assert.isTrue(exists)
    })

    it(`It should not exist`, async () => {
      const exists = await nvm.utils.blockchain.checkExists(userAccount.getId())
      assert.isFalse(exists)
    })
  })

  describe('ABI functions', () => {
    const iface = new ethers.Interface(Token.ERC20_ABI)

    it(`Should not find a function if doesnt exist`, async () => {
      assert.throws(() => searchAbiFunction(iface, 'transferXXX'), KeeperError)
    })

    it(`Should find an existing function`, async () => {
      const func = searchAbiFunction(iface, 'transfer')
      assert.isDefined(func)
    })

    it(`Should get a function signature`, async () => {
      const signature = getSignatureOfFunction(iface, 'balanceOf', [userAccount.getId()])
      // console.log('Signature:', signature)
      assert.isDefined(signature)
    })

    it(`Should get the function inputs`, async () => {
      const inputs = getInputsOfFunction(iface, 'approve')
      assert.isDefined(inputs)

      const inputsFormatted = getInputsOfFunctionFormatted(iface, 'approve')
      // console.log('Inputs Formatted:', inputsFormatted)
      assert.isDefined(inputsFormatted)
    })
    // 0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0
  })

  describe('Utility functions', () => {
    const testAddress = '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'

    it(`Get Address`, async () => {
      assert.strictEqual(getAddress(testAddress.toLowerCase()), testAddress)
    })

    it(`Is Address`, async () => {
      assert.isTrue(isAddress(testAddress))
      assert.isFalse(isAddress('0x222222'))
    })

    it(`Get Bytes`, async () => {
      assert.isTrue(getBytes('0x1234').length > 0)
    })

    it(`ZeroPad`, async () => {
      assert.strictEqual(
        zeroPadValue('0x', 32),
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      )
    })
  })

  describe('Make Wallets', () => {
    const TEST_SEED_WORDS =
      'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'

    it(`Make Wallets`, async () => {
      const wallets = makeWallets(TEST_SEED_WORDS, 5)
      assert.isDefined(wallets)
      assert.strictEqual(wallets.length, 5)
    })
  })

  describe('Hashes', () => {
    it(`keccak256`, async () => {
      const hash = keccak256('0x1234')
      console.log('Hash:', hash)
      assert.isDefined(hash)
      assert.isTrue(hash.startsWith('0x'))
    })

    it(`keccak256Packed`, async () => {
      const args: any = [
        { type: 'address', value: userAccount.getId() },
        { type: 'bytes32[]', value: [keccak256('0x1234')] },
        { type: 'uint256[]', value: [0, 1, 0] },
        { type: 'uint256[]', value: [1, 0, 1] },
        { type: 'bytes32', value: keccak256('0x1234') },
      ]
      const hash = keccak256Packed(
        args.map((arg: { type: string }) => arg.type),
        args.map((arg: { value: any }) => arg.value),
      )
      console.log('Hash:', hash)
      assert.isDefined(hash)
      assert.isTrue(hash.startsWith('0x'))
    })
  })

  describe('Units', () => {
    it(`Parse & Format Units`, async () => {
      const amount = '2.5'
      const units = parseUnits(amount, 6)
      console.log('Units:', units)
      assert.isTrue(units === 2500000n)

      const formatted = formatUnits(units, 6)
      console.log('Formatted:', formatted)
      assert.strictEqual(formatted, '2.5')
    })

    it(`Parse & Format Ether`, async () => {
      const amount = '1.5'
      const units = parseEther(amount)
      assert.isTrue(units === 1500000000000000000n)

      const formatted = formatEther(units)
      console.log('Formatted:', formatted)
      assert.strictEqual(formatted, '1.5')
    })
  })
})
