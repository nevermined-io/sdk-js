import { config } from '../config'
import { ContractHandler, KeeperError, Nevermined, NvmAccount, Token } from '../../src'
import { assert } from 'chai'
import {
  searchAbiFunction as ethersSearchAbiFunction,
  getAddress as ethersGetAddress,
  isAddress as ethersIsAddress,
  getSignatureOfFunction as ethersGetSignatureOfFunction,
  getInputsOfFunction as ethersGetInputsOfFunction,
  getInputsOfFunctionFormatted as ethersGetInputsOfFunctionFormatted,
  getBytes as ethersGetBytes,
  zeroPadValue as ethersZeroPadValue,
  makeWallets as ethersMakeWallets,
  keccak256 as ethersKeccak256,
  keccak256Packed as ethersKeccak256Packed,
  parseUnits as ethersParseUnits,
  formatUnits as ethersFormatUnits,
  parseEther as ethersParseEther,
  formatEther as ethersFormatEther,
} from '../../src/nevermined/utils/BlockchainEthersUtils'
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
  formatUnits,
  parseEther,
  formatEther,
} from '../../src/nevermined/utils/BlockchainViemUtils'
import { ethers } from 'ethers'
import { parseAbi } from 'viem'

describe('Blockchain Utils', () => {
  let nvm: Nevermined
  let nftContractEthers
  let contractAddressEthers
  let nftContractViem
  let contractAddressViem
  let userAccount: NvmAccount

  before(async () => {
    nvm = await Nevermined.getInstance(config)
    ;[userAccount] = await nvm.accounts.list()
    assert.isDefined(nvm.utils.blockchain)
    assert.isDefined(nvm.utils.viem)
    assert.isDefined(userAccount)
  })

  describe.skip('ETHERS :: Class tests', () => {
    it(`Should deploy an ABI`, async () => {
      const networkName = await nvm.keeper.getNetworkName()
      const erc1155ABI = await ContractHandler.getABIArtifact(
        'NFT1155Upgradeable',
        config.artifactsFolder,
        networkName,
      )

      nftContractEthers = await nvm.utils.blockchain.deployAbi(erc1155ABI, userAccount, [
        userAccount.getId(),
        nvm.keeper.didRegistry.address,
        'NFT1155 Ethers',
        'NVM',
        '',
        nvm.keeper.nvmConfig.address,
      ])

      assert.isDefined(nftContractEthers)
      contractAddressEthers = await nftContractEthers.getAddress()
      console.log(`Ethers NFT (ERC-1155) deployed at address ${contractAddressEthers}`)

    })

    it(`Should load a contract`, async () => {
      const contract = await nvm.utils.blockchain.loadContract(
        contractAddressEthers,
        nftContractEthers.interface,
      )
      assert.isDefined(contract)
    })

    it(`Should check that exists`, async () => {
      const exists = await nvm.utils.blockchain.checkExists(contractAddressEthers)
      assert.isTrue(exists)
    })

    it(`It should not exist`, async () => {
      const exists = await nvm.utils.blockchain.checkExists(userAccount.getId())
      assert.isFalse(exists)
    })
  })

  describe('VIEM :: Class tests', () => {
    it(`Should deploy an ABI`, async () => {
      const networkName = await nvm.keeper.getNetworkName()
      const erc1155ABI = await ContractHandler.getABIArtifact(
        'NFT1155Upgradeable',
        config.artifactsFolder,
        networkName,
      )
    
      nftContractViem = await nvm.utils.viem.deployAbi(erc1155ABI, userAccount, [
        userAccount.getId(),
        nvm.keeper.didRegistry.address,
        'NFT1155 Viem',
        'NVM',
        '',
        nvm.keeper.nvmConfig.address,
      ])

      assert.isDefined(nftContractViem)
      contractAddressViem = await nftContractViem.getAddress()
      console.log(`Viem NFT (ERC-1155) deployed at address ${contractAddressViem}`)

    })

    it(`Should load a contract`, async () => {
      const contract = await nvm.utils.viem.loadContract(
        contractAddressEthers,
        nftContractEthers.interface,
      )
      assert.isDefined(contract)
    })

    it(`Should check that exists`, async () => {
      const exists = await nvm.utils.viem.checkExists(contractAddressEthers)
      assert.isTrue(exists)
    })

    it(`It should not exist`, async () => {
      const exists = await nvm.utils.viem.checkExists(userAccount.getId())
      assert.isFalse(exists)
    })
  })

  describe.skip('ETHERS ABI functions', () => {
    
    const iface = new ethers.Interface(Token.ERC20_ABI)
    it(`Should not find a function if doesnt exist`, async () => {
      assert.throws(() => ethersSearchAbiFunction(iface, 'transferXXX'), KeeperError)
    })

    it(`Should find an existing function`, async () => {
      const func = ethersSearchAbiFunction(iface, 'transfer')
      assert.isDefined(func)
    })

    it(`Should get a function signature`, async () => {
      const signature = ethersGetSignatureOfFunction(iface, 'balanceOf', [userAccount.getId()])
      // console.log('Signature:', signature)
      assert.isDefined(signature)
    })

    it(`Should get the function inputs`, async () => {
      const inputs = ethersGetInputsOfFunction(iface, 'approve')
      assert.isDefined(inputs)

      const inputsFormatted = ethersGetInputsOfFunctionFormatted(iface, 'approve')
      // console.log('Inputs Formatted:', inputsFormatted)
      assert.isDefined(inputsFormatted)
    })
    // 0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0
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

  describe.skip('Utility functions', () => {
    const testAddress = '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'

    it(`Get Address`, async () => {
      assert.strictEqual(ethersGetAddress(testAddress.toLowerCase()), testAddress)
    })

    it(`Is Address`, async () => {
      assert.isTrue(ethersIsAddress(testAddress))
      assert.isFalse(ethersIsAddress('0x222222'))
    })

    it(`Get Bytes`, async () => {
      assert.isTrue(ethersGetBytes('0x1234').length > 0)
    })

    it(`ZeroPad`, async () => {
      assert.strictEqual(
        ethersZeroPadValue('0x', 32),
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      )
    })
  })

  describe.skip('Make Wallets', () => {
    const TEST_SEED_WORDS =
      'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'

    it(`Make Wallets`, async () => {
      const wallets = ethersMakeWallets(TEST_SEED_WORDS, 5)
      assert.isDefined(wallets)
      assert.strictEqual(wallets.length, 5)
    })
  })

  describe.skip('Hashes', () => {
    it(`keccak256`, async () => {
      const hash = ethersKeccak256('0x1234')
      console.log('Hash:', hash)
      assert.isDefined(hash)
      assert.isTrue(hash.startsWith('0x'))
    })

    it(`keccak256Packed`, async () => {
      const args: any = [
        { type: 'address', value: userAccount.getId() },
        { type: 'bytes32[]', value: [ethersKeccak256('0x1234')] },
        { type: 'uint256[]', value: [0, 1, 0] },
        { type: 'uint256[]', value: [1, 0, 1] },
        { type: 'bytes32', value: ethersKeccak256('0x1234') },
      ]
      const hash = ethersKeccak256Packed(
        args.map((arg: { type: string }) => arg.type),
        args.map((arg: { value: any }) => arg.value),
      )
      console.log('Hash:', hash)
      assert.isDefined(hash)
      assert.isTrue(hash.startsWith('0x'))
    })
  })

  describe.skip('Units', () => {
    it(`Parse & Format Units`, async () => {
      const amount = '2.5'
      const units = ethersParseUnits(amount, 6)
      console.log('Units:', units)
      assert.isTrue(units === 2500000n)

      const formatted = ethersFormatUnits(units, 6)
      console.log('Formatted:', formatted)
      assert.strictEqual(formatted, '2.5')
    })

    it(`Parse & Format Ether`, async () => {
      const amount = '1.5'
      const units = ethersParseEther(amount)
      assert.isTrue(units === 1500000000000000000n)

      const formatted = ethersFormatEther(units)
      console.log('Formatted:', formatted)
      assert.strictEqual(formatted, '1.5')
    })
  })
})
