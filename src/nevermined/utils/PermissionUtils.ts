import { KernelAccountAbi, KernelFactoryAbi } from '@zerodev/sdk'
import {
  KernelSmartAccount,
  createKernelAccount,
  toKernelPluginManager,
} from '@zerodev/sdk/accounts'
import { ValidatorInitData } from '@zerodev/sdk/types'
import {
  base64ToBytes,
  bytesToBase64,
  isSessionKeyValidatorPlugin,
  signerToSessionKeyValidator,
} from '@zerodev/session-key'
import { SmartAccountSigner } from 'permissionless/accounts'
import { EntryPoint } from 'permissionless/types'
import { Address, Chain, Hex, Transport, decodeFunctionData } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const permissionsComposed = {
  paymaster: '0x0000000000000000000000000000000000000001',
  validAfter: 0,
  validUntil: 0,
  permissions: [
    {
      target: '0x93605C644181f3dD03A37228528649A76822Fcf1',
      abi: [
        {
          name: 'registerMintableDID',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'bytes32',
              name: '_1',
            },
            {
              type: 'address',
              name: '_2',
            },
            {
              type: 'bytes32',
              name: '_3',
            },
            {
              type: 'address[]',
              name: '_4',
            },
            {
              type: 'string',
              name: '_5',
            },
            {
              type: 'uint256',
              name: '_6',
            },
            {
              type: 'uint256',
              name: '_7',
            },
            {
              type: 'bool',
              name: '_8',
            },
            {
              type: 'bytes32',
              name: '_9',
            },
            {
              type: 'string',
              name: '_10',
            },
            {
              type: 'string',
              name: '_11',
            },
          ],
          outputs: [],
        },
      ],
      functionName: 'registerMintableDID',
      valueLimit: 0n,
      sig: '0xcffe1eb3',
      rules: [],
      index: 0,
      executionRule: {
        validAfter: 0,
        interval: 0,
        runs: 0,
      },
      operation: 0,
    },
    {
      target: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
      abi: [
        {
          name: 'approve',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'address',
              name: '_1',
            },
            {
              type: 'uint256',
              name: '_2',
            },
          ],
          outputs: [
            {
              type: 'bool',
            },
          ],
        },
      ],
      functionName: 'approve',
      valueLimit: 0n,
      sig: '0x095ea7b3',
      rules: [],
      index: 1,
      executionRule: {
        validAfter: 0,
        interval: 0,
        runs: 0,
      },
      operation: 0,
    },
    {
      target: '0x1c52ed414EDd1bCC20Ea670d42289e8bFC03C095',
      abi: [
        {
          name: 'createAgreementAndPayEscrow',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'bytes32',
              name: '_1',
            },
            {
              type: 'bytes32',
              name: '_2',
            },
            {
              type: 'bytes32[]',
              name: '_3',
            },
            {
              type: 'uint256[]',
              name: '_4',
            },
            {
              type: 'uint256[]',
              name: '_5',
            },
            {
              type: 'address',
              name: '_6',
            },
            {
              type: 'uint256',
              name: '_7',
            },
            {
              type: 'address',
              name: '_8',
            },
            {
              type: 'address',
              name: '_9',
            },
            {
              type: 'uint256[]',
              name: '_10',
            },
            {
              type: 'address[]',
              name: '_11',
            },
          ],
          outputs: [],
        },
      ],
      functionName: 'createAgreementAndPayEscrow',
      valueLimit: 0n,
      sig: '0xf8fe1070',
      rules: [],
      index: 2,
      executionRule: {
        validAfter: 0,
        interval: 0,
        runs: 0,
      },
      operation: 0,
    },
    {
      target: '0x1bcA156f746C6Eb8b18d61654293e2Fc5b653fF5',
      abi: [
        {
          name: 'mint',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'address',
              name: '_1',
            },
            {
              type: 'uint256',
              name: '_2',
            },
            {
              type: 'uint256',
              name: 'amount_3',
            },
            {
              type: 'bytes',
              name: '_4',
            },
          ],
          outputs: [],
        },
      ],
      functionName: 'mint',
      valueLimit: '0',
      sig: '0x731133e9',
      rules: [],
      index: 3,
      executionRule: {
        validAfter: 0,
        interval: 0,
        runs: 0,
      },
      operation: 0,
    },
    {
      target: '0x1bcA156f746C6Eb8b18d61654293e2Fc5b653fF5',
      abi: [
        {
          name: 'burn',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'address',
              name: '_1',
            },
            {
              type: 'uint256',
              name: '_2',
            },
            {
              type: 'uint256',
              name: '_3',
            },
          ],
          outputs: [],
        },
      ],
      functionName: 'burn',
      valueLimit: '0',
      sig: '0xf5298aca',
      rules: [],
      index: 4,
      executionRule: {
        validAfter: 0,
        interval: 0,
        runs: 0,
      },
      operation: 0,
    },
  ],
}

const mapAbis = (sig: string): any => {
  switch (sig) {
    case '0xcffe1eb3':
      return [
        {
          name: 'registerMintableDID',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'bytes32',
              name: '_1',
            },
            {
              type: 'address',
              name: '_2',
            },
            {
              type: 'bytes32',
              name: '_3',
            },
            {
              type: 'address[]',
              name: '_4',
            },
            {
              type: 'string',
              name: '_5',
            },
            {
              type: 'uint256',
              name: '_6',
            },
            {
              type: 'uint256',
              name: '_7',
            },
            {
              type: 'bool',
              name: '_8',
            },
            {
              type: 'bytes32',
              name: '_9',
            },
            {
              type: 'string',
              name: '_10',
            },
            {
              type: 'string',
              name: '_11',
            },
          ],
          outputs: [],
        },
      ]
    case '0x095ea7b3':
      return [
        {
          name: 'approve',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'address',
              name: '_1',
            },
            {
              type: 'uint256',
              name: '_2',
            },
          ],
          outputs: [
            {
              type: 'bool',
            },
          ],
        },
      ]
    case '0xf8fe1070':
      return [
        {
          name: 'createAgreementAndPayEscrow',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'bytes32',
              name: '_1',
            },
            {
              type: 'bytes32',
              name: '_2',
            },
            {
              type: 'bytes32[]',
              name: '_3',
            },
            {
              type: 'uint256[]',
              name: '_4',
            },
            {
              type: 'uint256[]',
              name: '_5',
            },
            {
              type: 'address',
              name: '_6',
            },
            {
              type: 'uint256',
              name: '_7',
            },
            {
              type: 'address',
              name: '_8',
            },
            {
              type: 'address',
              name: '_9',
            },
            {
              type: 'uint256[]',
              name: '_10',
            },
            {
              type: 'address[]',
              name: '_11',
            },
          ],
          outputs: [],
        },
      ]
    case '0x731133e9':
      return [
        {
          name: 'mint',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'address',
              name: '_1',
            },
            {
              type: 'uint256',
              name: '_2',
            },
            {
              type: 'uint256',
              name: 'amount_3',
            },
            {
              type: 'bytes',
              name: '_4',
            },
          ],
          outputs: [],
        },
      ]
    case '0xf5298aca':
      return [
        {
          name: 'burn',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            {
              type: 'address',
              name: '_1',
            },
            {
              type: 'uint256',
              name: '_2',
            },
            {
              type: 'uint256',
              name: '_3',
            },
          ],
          outputs: [],
        },
      ]
    default:
      return null
  }
}

interface OriginalData {
  target: string
  abi: [object]
  functionName: string
  valueLimit: bigint
  sig: string
  rules: any[]
  index: number
  executionRule: {
    validAfter: number
    interval: number
    runs: number
  }
  operation: number
}

function mapToKeyMap(data: OriginalData[]): any[] {
  return data.map((item) => {
    return {
      target: item.target,
      sig: item.sig,
      index: item.index,
    }
  })
}

function recoverFromKeyMap(mappedData: any[]): OriginalData[] {
  return mappedData.map((item, _i) => {
    const abi = mapAbis(item.sig)
    return {
      target: item.target,
      abi,
      functionName: abi[0].name,
      valueLimit: 0n,
      sig: item.sig,
      rules: [],
      index: item.index,
      executionRule: {
        validAfter: 0,
        interval: 0,
        runs: 0,
      },
      operation: 0,
    }
  })
}

function createValidatorData(mappedData: any[]): any {
  return {
    paymaster: '0x0000000000000000000000000000000000000001',
    validAfter: 0,
    validUntil: 0,
    permissions: mappedData,
  }
}

export const serializeSessionKeyAccount2 = async <entryPoint extends EntryPoint>(
  account: KernelSmartAccount<entryPoint>,
  privateKey?: Hex,
): Promise<string> => {
  if (!isSessionKeyValidatorPlugin(account.kernelPluginManager))
    throw new Error('Account plugin is not a session key validator')
  const sessionKeyParams = account.kernelPluginManager.getPluginSerializationParams()
  const action = account.kernelPluginManager.getAction()
  const validityData = account.kernelPluginManager.getValidityData()
  const enableSignature = await account.kernelPluginManager.getPluginEnableSignature(
    account.address,
  )
  const accountParams = {
    initCode: await account.getInitCode(),
    accountAddress: account.address,
  }
  const permissionsKeyMap = mapToKeyMap(sessionKeyParams.permissions)

  const paramsToBeSerialized = {
    permissionsKeyMap,
    // sessionKeyParams,
    action,
    validityData,
    accountParams,
    enableSignature,
    privateKey,
  }

  return serializeSessionKeyAccountParams2(paramsToBeSerialized)
}

export const serializeSessionKeyAccountParams2 = (params: any) => {
  const jsonString = JSON.stringify(params)
  const uint8Array = new TextEncoder().encode(jsonString)
  const base64String = bytesToBase64(uint8Array)
  return base64String
}

export const deserializeSessionKeyAccountParams2 = (params: string) => {
  const uint8Array = base64ToBytes(params)
  const jsonString = new TextDecoder().decode(uint8Array)
  return JSON.parse(jsonString) as any
}

export const deserializeSessionKeyAccount2 = async <
  entryPoint extends EntryPoint,
  TSource extends string = 'custom',
  TAddress extends Address = Address,
>(
  client: Parameters<typeof createKernelAccount>[0],
  entryPointAddress: entryPoint,
  sessionKeyAccountParams: string,
  sessionKeySigner?: SmartAccountSigner<TSource, TAddress>,
): Promise<KernelSmartAccount<entryPoint, Transport, Chain | undefined>> => {
  const params = deserializeSessionKeyAccountParams2(sessionKeyAccountParams)
  let signer: SmartAccountSigner<string, Hex>
  if (params.privateKey) signer = privateKeyToAccount(params.privateKey)
  else if (sessionKeySigner) signer = sessionKeySigner
  else throw new Error('No signer or serialized sessionKey provided')

  //   console.warn('All in: ', JSON.stringify(recoverFromKeyMap(params.permissionsKeyMap)))

  const sessionKeyPlugin = await signerToSessionKeyValidator(client, {
    signer,
    // validatorData: params.sessionKeyParams,
    // @ts-ignore
    validatorData: createValidatorData(recoverFromKeyMap(params.permissionsKeyMap)),
    // validatorData: {"paymaster":"0x0000000000000000000000000000000000000001","validAfter":0,"validUntil":0,"permissions":[{"target":"0x93605C644181f3dD03A37228528649A76822Fcf1","abi":[{"name":"registerMintableDID","type":"function","stateMutability":"nonpayable","inputs":[{"type":"bytes32","name":"_didSeed"},{"type":"address","name":"_nftContractAddress"},{"type":"bytes32","name":"_checksum"},{"type":"address[]","name":"_providers"},{"type":"string","name":"_url"},{"type":"uint256","name":"_cap"},{"type":"uint256","name":"_royalties"},{"type":"bool","name":"_mint"},{"type":"bytes32","name":"_activityId"},{"type":"string","name":"_nftMetadata"},{"type":"string","name":"_immutableUrl"}],"outputs":[]}],"functionName":"registerMintableDID","valueLimit": "0","sig":"0xcffe1eb3","rules":[],"index":0,"executionRule":{"validAfter":0,"interval":0,"runs":0},"operation":0},{"target":"0x93605C644181f3dD03A37228528649A76822Fcf1","abi":[{"name":"registerMintableDID","type":"function","stateMutability":"nonpayable","inputs":[{"type":"bytes32","name":"_didSeed"},{"type":"address","name":"_nftContractAddress"},{"type":"bytes32","name":"_checksum"},{"type":"address[]","name":"_providers"},{"type":"string","name":"_url"},{"type":"uint256","name":"_cap"},{"type":"uint256","name":"_royalties"},{"type":"bytes32","name":"_activityId"},{"type":"string","name":"_nftMetadata"},{"type":"string","name":"_immutableUrl"}],"outputs":[]}],"functionName":"registerMintableDID","valueLimit": "0","sig":"0x3bd02c41","rules":[],"index":1,"executionRule":{"validAfter":0,"interval":0,"runs":0},"operation":0},{"target":"0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d","abi":[{"name":"approve","type":"function","stateMutability":"nonpayable","inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"amount"}],"outputs":[{"type":"bool"}]}],"functionName":"approve","valueLimit": "0","sig":"0x095ea7b3","rules":[],"index":2,"executionRule":{"validAfter":0,"interval":0,"runs":0},"operation":0},{"target":"0x1c52ed414EDd1bCC20Ea670d42289e8bFC03C095","abi":[{"name":"createAgreementAndPayEscrow","type":"function","stateMutability":"nonpayable","inputs":[{"type":"bytes32","name":"_id"},{"type":"bytes32","name":"_did"},{"type":"bytes32[]","name":"_conditionIds"},{"type":"uint256[]","name":"_timeLocks"},{"type":"uint256[]","name":"_timeOuts"},{"type":"address","name":"_accessConsumer"},{"type":"uint256","name":"_idx"},{"type":"address","name":"_rewardAddress"},{"type":"address","name":"_tokenAddress"},{"type":"uint256[]","name":"_amounts"},{"type":"address[]","name":"_receivers"}],"outputs":[]}],"functionName":"createAgreementAndPayEscrow","valueLimit": "0","sig":"0xf8fe1070","rules":[],"index":3,"executionRule":{"validAfter":0,"interval":0,"runs":0},"operation":0},{"target":"0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d","abi":[{"name":"transfer","type":"function","stateMutability":"nonpayable","inputs":[{"type":"address","name":"to"},{"type":"uint256","name":"amount"}],"outputs":[{"type":"bool"}]}],"functionName":"transfer","valueLimit":"0","sig":"0xa9059cbb","rules":[],"index":4,"executionRule":{"validAfter":0,"interval":0,"runs":0},"operation":0}]},
    entryPoint: entryPointAddress,
  })

  const { index, validatorInitData } = decodeParamsFromInitCode2(params.accountParams.initCode)

  const kernelPluginManager = await toKernelPluginManager(client, {
    regular: sessionKeyPlugin,
    pluginEnableSignature: params.enableSignature,
    validatorInitData,
    action: params.action,
    entryPoint: entryPointAddress,
    ...params.validityData,
  })

  return createKernelAccount(client, {
    plugins: kernelPluginManager,
    index,
    deployedAccountAddress: params.accountParams.accountAddress,
    entryPoint: entryPointAddress,
  }) as unknown as KernelSmartAccount<entryPoint, Transport, Chain | undefined>
}

export const decodeParamsFromInitCode2 = (initCode: Hex) => {
  let index: bigint | undefined
  let validatorInitData: ValidatorInitData | undefined
  if (initCode === '0x') return { index, validatorInitData }
  const createAccountFunctionData = decodeFunctionData({
    abi: KernelFactoryAbi,
    data: `0x${initCode.slice(42)}`,
  })
  if (createAccountFunctionData.functionName === 'createAccount') {
    index = createAccountFunctionData.args[2]
    const initializeFunctionData = decodeFunctionData({
      abi: KernelAccountAbi,
      data: createAccountFunctionData.args[1],
    })
    if (!initializeFunctionData) throw new Error('Invalid initCode')
    if (initializeFunctionData.functionName === 'initialize') {
      validatorInitData = {
        validatorAddress: initializeFunctionData.args[0],
        identifier: initializeFunctionData.args[0],
        enableData: initializeFunctionData.args[1],
      }
    }
  }
  return { index, validatorInitData }
}
