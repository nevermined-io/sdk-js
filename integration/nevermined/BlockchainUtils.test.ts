import config from '../../test/config'
import { assert } from 'chai'
import {
  searchAbiFunction,
  getChecksumAddress,
  isValidAddress,
  getSignatureOfFunction,
  getInputsOfFunction,
  getInputsOfFunctionFormatted,
  getBytes,
  zeroPadValue,
  makeWallets,
  keccak256,
  keccak256Packed,
  parseUnits,
  formatUnits,
  parseEther,
  formatEther,
  keccak256WithEncode,
} from '../../src/nevermined/utils/BlockchainViemUtils'
import { parseAbi } from 'viem'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { ContractHandler } from '../../src/keeper/ContractHandler'
import { KeeperError } from '../../src/errors/NeverminedErrors'
import { Token } from '../../src/keeper/contracts/Token'

describe('Blockchain Utils', () => {
  let nvm: Nevermined
  let nftContractViem
  let contractAddressViem
  let userAccount: NvmAccount

  before(async () => {
    nvm = await Nevermined.getInstance(config)
    ;[userAccount] = nvm.accounts.list()
    assert.isDefined(nvm.utils.blockchain)
    assert.isDefined(nvm.utils.blockchain)
    assert.isDefined(userAccount)
  })

  describe('VIEM :: Class tests', () => {
    it(`Should deploy an ABI`, async () => {
      const networkName = await nvm.keeper.getNetworkName()
      const erc1155ABI = await ContractHandler.getABIArtifact(
        'NFT1155Upgradeable',
        config.artifactsFolder,
        networkName,
      )

      nftContractViem = await nvm.utils.blockchain.deployAbi(erc1155ABI, userAccount, [
        userAccount.getId(),
        nvm.keeper.didRegistry.address,
        'NFT1155 Viem',
        'NVM',
        '',
        nvm.keeper.nvmConfig.address,
      ])

      assert.isDefined(nftContractViem)
      contractAddressViem = await nftContractViem.address
      console.log(`Viem NFT (ERC-1155) deployed at address ${contractAddressViem}`)
    })

    it(`Should load a contract`, async () => {
      const contract = await nvm.utils.blockchain.loadContract(
        contractAddressViem,
        nftContractViem.abi,
      )
      assert.isDefined(contract)
    })

    it(`Should check that exists`, async () => {
      const exists = await nvm.utils.blockchain.checkExists(contractAddressViem)
      assert.isTrue(exists)
    })
  })

  describe('VIEM ABI functions', () => {
    const viemAbi = parseAbi(Token.ERC20_ABI)
    it(`Should not find a function if doesnt exist`, async () => {
      assert.throws(() => searchAbiFunction(viemAbi, 'transferXXX'), KeeperError)
    })

    it(`Should find an existing function`, async () => {
      const func = searchAbiFunction(viemAbi, 'transfer')
      assert.isDefined(func)
    })

    it(`Should get a function signature`, async () => {
      const signature = getSignatureOfFunction(viemAbi, 'balanceOf', [userAccount.getId()])
      // console.log('Signature:', signature)
      assert.isDefined(signature)
    })

    it(`Should get the function inputs`, async () => {
      const inputs = getInputsOfFunction(viemAbi, 'approve')
      assert.isDefined(inputs)

      const inputsFormatted = getInputsOfFunctionFormatted(viemAbi, 'approve')
      // console.log('Inputs Formatted:', inputsFormatted)
      assert.isDefined(inputsFormatted)
    })
    // 0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0
  })

  describe('Utility functions', () => {
    const testAddress = '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'

    it(`Get Address`, async () => {
      assert.strictEqual(getChecksumAddress(testAddress.toLowerCase()), testAddress)
    })

    it(`Is Address`, async () => {
      assert.isTrue(isValidAddress(testAddress))
      assert.isFalse(isValidAddress('0x222222'))
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

    it(`keccak256WithEncode`, async () => {
      const hash = keccak256WithEncode(
        [{ type: 'bytes32' }, { type: 'address' }],
        [
          '0x6ad6447f2c65454a2c145d50babbfd82471030cc4300f1fbec486d43abb58098',
          '0xF97c4991B8a8A0360A66Adbef26cc11Eea029C37',
        ],
      )
      console.log('Hash:', hash)
      assert.isDefined(hash)
      assert.isTrue(hash.startsWith('0x'))
    })

    it(`keccak256Packed`, async () => {
      const _types = [
        { type: 'address' },
        { type: 'bytes32[]' },
        { type: 'uint256[]' },
        { type: 'uint256[]' },
        { type: 'bytes32' },
      ]
      const _values = [
        userAccount.getId(),
        [keccak256('0x1234')],
        [0, 1, 0],
        [1, 0, 1],
        keccak256('0x1234'),
      ]

      const hash = keccak256Packed(_types, _values)

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
