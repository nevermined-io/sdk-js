[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [conditions](../modules/conditions.md) / NFT721HolderCondition

# Class: NFT721HolderCondition

[conditions](../modules/conditions.md).NFT721HolderCondition

Allows to fulfill a condition to users holding some amount of NFTs for a specific DID.

## Hierarchy

- [`ConsumerCondition`](conditions.ConsumerCondition.md)<`NFT721HolderConditionContext`\>

  ↳ **`NFT721HolderCondition`**

## Table of contents

### Constructors

- [constructor](conditions.NFT721HolderCondition.md#constructor)

### Properties

- [contract](conditions.NFT721HolderCondition.md#contract)
- [contractName](conditions.NFT721HolderCondition.md#contractname)
- [events](conditions.NFT721HolderCondition.md#events)
- [version](conditions.NFT721HolderCondition.md#version)

### Accessors

- [address](conditions.NFT721HolderCondition.md#address)
- [artifactsFolder](conditions.NFT721HolderCondition.md#artifactsfolder)
- [config](conditions.NFT721HolderCondition.md#config)
- [instanceConfig](conditions.NFT721HolderCondition.md#instanceconfig)
- [instantiableConfig](conditions.NFT721HolderCondition.md#instantiableconfig)
- [logger](conditions.NFT721HolderCondition.md#logger)
- [nevermined](conditions.NFT721HolderCondition.md#nevermined)
- [web3](conditions.NFT721HolderCondition.md#web3)

### Methods

- [abortByTimeOut](conditions.NFT721HolderCondition.md#abortbytimeout)
- [addresses](conditions.NFT721HolderCondition.md#addresses)
- [call](conditions.NFT721HolderCondition.md#call)
- [checkExists](conditions.NFT721HolderCondition.md#checkexists)
- [findSigner](conditions.NFT721HolderCondition.md#findsigner)
- [fulfill](conditions.NFT721HolderCondition.md#fulfill)
- [fulfillGateway](conditions.NFT721HolderCondition.md#fulfillgateway)
- [fulfillInstance](conditions.NFT721HolderCondition.md#fulfillinstance)
- [fulfillPlain](conditions.NFT721HolderCondition.md#fulfillplain)
- [generateId](conditions.NFT721HolderCondition.md#generateid)
- [generateIdHash](conditions.NFT721HolderCondition.md#generateidhash)
- [generateIdWithSeed](conditions.NFT721HolderCondition.md#generateidwithseed)
- [getAddress](conditions.NFT721HolderCondition.md#getaddress)
- [getConditionFulfilledEvent](conditions.NFT721HolderCondition.md#getconditionfulfilledevent)
- [getContract](conditions.NFT721HolderCondition.md#getcontract)
- [getFromAddress](conditions.NFT721HolderCondition.md#getfromaddress)
- [getInputsOfMethod](conditions.NFT721HolderCondition.md#getinputsofmethod)
- [getSignatureOfMethod](conditions.NFT721HolderCondition.md#getsignatureofmethod)
- [hashValues](conditions.NFT721HolderCondition.md#hashvalues)
- [hashValuesPlain](conditions.NFT721HolderCondition.md#hashvaluesplain)
- [init](conditions.NFT721HolderCondition.md#init)
- [instance](conditions.NFT721HolderCondition.md#instance)
- [instanceFromDDO](conditions.NFT721HolderCondition.md#instancefromddo)
- [nftContractFromService](conditions.NFT721HolderCondition.md#nftcontractfromservice)
- [params](conditions.NFT721HolderCondition.md#params)
- [paramsFromDDO](conditions.NFT721HolderCondition.md#paramsfromddo)
- [send](conditions.NFT721HolderCondition.md#send)
- [sendFrom](conditions.NFT721HolderCondition.md#sendfrom)
- [setInstanceConfig](conditions.NFT721HolderCondition.md#setinstanceconfig)
- [addressesStatic](conditions.NFT721HolderCondition.md#addressesstatic)
- [findSignerStatic](conditions.NFT721HolderCondition.md#findsignerstatic)
- [getInstance](conditions.NFT721HolderCondition.md#getinstance)
- [setInstanceConfig](conditions.NFT721HolderCondition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new NFT721HolderCondition**(`contractName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[constructor](conditions.ConsumerCondition.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L32)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[contract](conditions.ConsumerCondition.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[contractName](conditions.ConsumerCondition.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[events](conditions.ConsumerCondition.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[version](conditions.ConsumerCondition.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

ConsumerCondition.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ConsumerCondition.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

ConsumerCondition.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

ConsumerCondition.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

ConsumerCondition.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

ConsumerCondition.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

ConsumerCondition.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

ConsumerCondition.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L63)

## Methods

### abortByTimeOut

▸ **abortByTimeOut**(`agreementId`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `from?` | [`Account`](Account.md) |
| `params?` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[abortByTimeOut](conditions.ConsumerCondition.md#abortbytimeout)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L97)

___

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[addresses](conditions.ConsumerCondition.md#addresses)

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L129)

___

### call

▸ **call**<`T`\>(`name`, `args`, `from?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `args` | `any`[] |
| `from?` | `string` |

#### Returns

`Promise`<`T`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[call](conditions.ConsumerCondition.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:244](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L244)

___

### checkExists

▸ `Protected` **checkExists**(`address`): `Promise`<`boolean`\>

Returns true of contract exists else it throws.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

true if the contract exists.

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[checkExists](conditions.ConsumerCondition.md#checkexists)

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

___

### findSigner

▸ **findSigner**(`from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[findSigner](conditions.ConsumerCondition.md#findsigner)

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

___

### fulfill

▸ **fulfill**(`agreementId`, `did`, `holderAddress`, `nftTokenAddress`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

Fulfill requires a validation that holder as enough NFTs for a specific DID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | SEA agreement identifier. |
| `did` | `string` | The Decentralized Identifier of the asset. |
| `holderAddress` | `string` | The contract address where the reward is locked. |
| `nftTokenAddress` | `string` | The contract address of the nft to use. |
| `from?` | [`Account`](Account.md) |  |
| `params?` | `TxParameters` | - |

#### Returns

`Promise`<`ContractReceipt`\>

condition state

#### Overrides

[ConsumerCondition](conditions.ConsumerCondition.md).[fulfill](conditions.ConsumerCondition.md#fulfill)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:71](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L71)

___

### fulfillGateway

▸ **fulfillGateway**(`_cond`, `_additionalParams`, `_from?`, `_params?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_cond` | [`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\> |
| `_additionalParams` | `Record`<`string`, `unknown`\> |
| `_from?` | [`Account`](Account.md) |
| `_params?` | `TxParameters` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[fulfillGateway](conditions.ConsumerCondition.md#fulfillgateway)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:230](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L230)

___

### fulfillInstance

▸ **fulfillInstance**(`cond`, `additionalParams`, `from?`, `params?`, `method?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cond` | [`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\> | `undefined` |
| `additionalParams` | `Record`<`string`, `unknown`\> | `undefined` |
| `from?` | [`Account`](Account.md) | `undefined` |
| `params?` | `TxParameters` | `undefined` |
| `method` | [`ConditionMethod`](../modules/conditions.md#conditionmethod) | `'fulfill'` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[fulfillInstance](conditions.ConsumerCondition.md#fulfillinstance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L162)

___

### fulfillPlain

▸ **fulfillPlain**(`agreementId`, `args`, `from?`, `params?`, `method?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `agreementId` | `string` | `undefined` |
| `args` | `any`[] | `undefined` |
| `from?` | [`Account`](Account.md) | `undefined` |
| `params?` | `TxParameters` | `undefined` |
| `method` | [`ConditionMethod`](../modules/conditions.md#conditionmethod) | `'fulfill'` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[fulfillPlain](conditions.ConsumerCondition.md#fulfillplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:69](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L69)

___

### generateId

▸ **generateId**(`agreementId`, `valueHash`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `valueHash` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[generateId](conditions.ConsumerCondition.md#generateid)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:83](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L83)

___

### generateIdHash

▸ **generateIdHash**(`agreementId`, ...`values`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `...values` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[generateIdHash](conditions.ConsumerCondition.md#generateidhash)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:79](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L79)

___

### generateIdWithSeed

▸ **generateIdWithSeed**(`agreementId`, `valueHash`): `Promise`<[`string`, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `valueHash` | `string` |

#### Returns

`Promise`<[`string`, `string`]\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[generateIdWithSeed](conditions.ConsumerCondition.md#generateidwithseed)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L87)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getAddress](conditions.ConsumerCondition.md#getaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:41](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L41)

___

### getConditionFulfilledEvent

▸ **getConditionFulfilledEvent**(`agreementId`): [`EventResult`](../modules/events.md#eventresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |

#### Returns

[`EventResult`](../modules/events.md#eventresult)

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getConditionFulfilledEvent](conditions.ConsumerCondition.md#getconditionfulfilledevent)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:101](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L101)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getContract](conditions.ConsumerCondition.md#getcontract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:37](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L37)

___

### getFromAddress

▸ `Protected` **getFromAddress**(`from?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from?` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getFromAddress](conditions.ConsumerCondition.md#getfromaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:90](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L90)

___

### getInputsOfMethod

▸ **getInputsOfMethod**(`methodName`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `methodName` | `string` |

#### Returns

`any`[]

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getInputsOfMethod](conditions.ConsumerCondition.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L50)

___

### getSignatureOfMethod

▸ **getSignatureOfMethod**(`methodName`, `args?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `methodName` | `string` | `undefined` |
| `args` | `any`[] | `[]` |

#### Returns

`string`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getSignatureOfMethod](conditions.ConsumerCondition.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:45](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L45)

___

### hashValues

▸ **hashValues**(...`args`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[hashValues](conditions.ConsumerCondition.md#hashvalues)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:141](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L141)

___

### hashValuesPlain

▸ **hashValuesPlain**(...`args`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[hashValuesPlain](conditions.ConsumerCondition.md#hashvaluesplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:145](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L145)

___

### init

▸ `Protected` **init**(`config`, `optional?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config` | `InstantiableConfig` | `undefined` |
| `optional` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[init](conditions.ConsumerCondition.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L55)

___

### instance

▸ **instance**(`agreementId`, `params`): `Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `params` | [`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\> |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[instance](conditions.ConsumerCondition.md#instance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:184](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L184)

___

### instanceFromDDO

▸ **instanceFromDDO**(`agreementId`, `ctx`, ...`args`): `Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `ctx` | `NFT721HolderConditionContext` |
| `...args` | [`ConditionInstanceSmall`](../interfaces/conditions.ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[instanceFromDDO](conditions.ConsumerCondition.md#instancefromddo)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:154](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L154)

___

### nftContractFromService

▸ **nftContractFromService**(`service`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `ServiceCommon` |

#### Returns

`string`

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L44)

___

### params

▸ **params**(`did`, `holderAddress`, `nftTokenAddress`): [`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

Generate the hash of condition inputs with the following parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The Decentralized Identifier of the asset. |
| `holderAddress` | `string` | The address of the NFT holder . |
| `nftTokenAddress` | `string` | The address of the nft 721 token to use |

#### Returns

[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

hash of all the values

#### Overrides

[ConsumerCondition](conditions.ConsumerCondition.md).[params](conditions.ConsumerCondition.md#params)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:35](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L35)

___

### paramsFromDDO

▸ **paramsFromDDO**(`__namedParameters`): `Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `NFT721HolderConditionContext` |

#### Returns

`Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Overrides

[ConsumerCondition](conditions.ConsumerCondition.md).[paramsFromDDO](conditions.ConsumerCondition.md#paramsfromddo)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:50](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L50)

___

### send

▸ **send**(`name`, `from`, `args`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `from` | `string` |
| `args` | `any`[] |
| `params` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[send](conditions.ConsumerCondition.md#send)

#### Defined in

[src/keeper/contracts/ContractBase.ts:117](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L117)

___

### sendFrom

▸ **sendFrom**(`name`, `args`, `from?`, `value?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `args` | `any`[] |
| `from?` | [`Account`](Account.md) |
| `value?` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[sendFrom](conditions.ConsumerCondition.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L97)

___

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[setInstanceConfig](conditions.ConsumerCondition.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L171)

___

### addressesStatic

▸ `Static` **addressesStatic**(`config`, `web3`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[addressesStatic](conditions.ConsumerCondition.md#addressesstatic)

#### Defined in

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L142)

___

### findSignerStatic

▸ `Static` **findSignerStatic**(`config`, `web3`, `from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[findSignerStatic](conditions.ConsumerCondition.md#findsignerstatic)

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`NFT721HolderCondition`](conditions.NFT721HolderCondition.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`NFT721HolderCondition`](conditions.NFT721HolderCondition.md)\>

#### Overrides

[ConsumerCondition](conditions.ConsumerCondition.md).[getInstance](conditions.ConsumerCondition.md#getinstance)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:16](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L16)

___

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Instantiable`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` |
| `instantiableConfig` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[setInstanceConfig](conditions.ConsumerCondition.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
