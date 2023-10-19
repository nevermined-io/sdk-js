[@nevermined-io/sdk](../code-reference.md) / NFT721HolderCondition

# Class: NFT721HolderCondition

Allows to fulfill a condition to users holding some amount of NFTs for a specific DID.

## Hierarchy

- [`ConsumerCondition`](ConsumerCondition.md)<`NFT721HolderConditionContext`\>

  ↳ **`NFT721HolderCondition`**

## Table of contents

### Constructors

- [constructor](NFT721HolderCondition.md#constructor)

### Properties

- [address](NFT721HolderCondition.md#address)
- [contract](NFT721HolderCondition.md#contract)
- [contractName](NFT721HolderCondition.md#contractname)
- [events](NFT721HolderCondition.md#events)
- [version](NFT721HolderCondition.md#version)

### Accessors

- [artifactsFolder](NFT721HolderCondition.md#artifactsfolder)
- [circuitsFolder](NFT721HolderCondition.md#circuitsfolder)
- [config](NFT721HolderCondition.md#config)
- [instanceConfig](NFT721HolderCondition.md#instanceconfig)
- [instantiableConfig](NFT721HolderCondition.md#instantiableconfig)
- [logger](NFT721HolderCondition.md#logger)
- [nevermined](NFT721HolderCondition.md#nevermined)
- [web3](NFT721HolderCondition.md#web3)

### Methods

- [abortByTimeOut](NFT721HolderCondition.md#abortbytimeout)
- [call](NFT721HolderCondition.md#call)
- [fulfill](NFT721HolderCondition.md#fulfill)
- [fulfillInstance](NFT721HolderCondition.md#fulfillinstance)
- [fulfillPlain](NFT721HolderCondition.md#fulfillplain)
- [fulfillWithNode](NFT721HolderCondition.md#fulfillwithnode)
- [generateId](NFT721HolderCondition.md#generateid)
- [generateIdHash](NFT721HolderCondition.md#generateidhash)
- [generateIdWithSeed](NFT721HolderCondition.md#generateidwithseed)
- [getConditionFulfilledEvent](NFT721HolderCondition.md#getconditionfulfilledevent)
- [getFromAddress](NFT721HolderCondition.md#getfromaddress)
- [getInputsOfMethod](NFT721HolderCondition.md#getinputsofmethod)
- [getSignatureOfMethod](NFT721HolderCondition.md#getsignatureofmethod)
- [hashValues](NFT721HolderCondition.md#hashvalues)
- [hashValuesPlain](NFT721HolderCondition.md#hashvaluesplain)
- [init](NFT721HolderCondition.md#init)
- [instance](NFT721HolderCondition.md#instance)
- [instanceFromDDO](NFT721HolderCondition.md#instancefromddo)
- [nftContractFromService](NFT721HolderCondition.md#nftcontractfromservice)
- [params](NFT721HolderCondition.md#params)
- [paramsFromDDO](NFT721HolderCondition.md#paramsfromddo)
- [send](NFT721HolderCondition.md#send)
- [sendFrom](NFT721HolderCondition.md#sendfrom)
- [setInstanceConfig](NFT721HolderCondition.md#setinstanceconfig)
- [getInstance](NFT721HolderCondition.md#getinstance)
- [setInstanceConfig](NFT721HolderCondition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new NFT721HolderCondition**(`contractName`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[constructor](ConsumerCondition.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L34)

## Properties

### address

• **address**: `string`

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[address](ConsumerCondition.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[contract](ConsumerCondition.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[contractName](ConsumerCondition.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[events](ConsumerCondition.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[version](ConsumerCondition.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ConsumerCondition.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ConsumerCondition.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

ConsumerCondition.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ConsumerCondition.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ConsumerCondition.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

ConsumerCondition.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

ConsumerCondition.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

ConsumerCondition.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### abortByTimeOut

▸ **abortByTimeOut**(`conditionId`, `from?`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name          | Type                                            |
| :------------ | :---------------------------------------------- |
| `conditionId` | `string`                                        |
| `from?`       | [`Account`](Account.md)                         |
| `params?`     | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[abortByTimeOut](ConsumerCondition.md#abortbytimeout)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L88)

---

### call

▸ **call**<`T`\>(`name`, `args`, `from?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `name`  | `string` |
| `args`  | `any`[]  |
| `from?` | `string` |

#### Returns

`Promise`<`T`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[call](ConsumerCondition.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

---

### fulfill

▸ **fulfill**(`agreementId`, `did`, `holderAddress`, `nftTokenAddress`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Fulfill requires a validation that holder as enough NFTs for a specific DID.

#### Parameters

| Name              | Type                                            | Description                                      |
| :---------------- | :---------------------------------------------- | :----------------------------------------------- |
| `agreementId`     | `string`                                        | SEA agreement identifier.                        |
| `did`             | `string`                                        | The Decentralized Identifier of the asset.       |
| `holderAddress`   | `string`                                        | The contract address where the reward is locked. |
| `nftTokenAddress` | `string`                                        | The contract address of the nft to use.          |
| `from?`           | [`Account`](Account.md)                         | Account sending the transaction                  |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | Transacion parameters                            |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

condition state

#### Overrides

[ConsumerCondition](ConsumerCondition.md).[fulfill](ConsumerCondition.md#fulfill)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:52](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L52)

---

### fulfillInstance

▸ **fulfillInstance**(`cond`, `additionalParams`, `from?`, `txParams?`, `method?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name               | Type                                                                                       | Default value |
| :----------------- | :----------------------------------------------------------------------------------------- | :------------ |
| `cond`             | [`ConditionInstance`](../interfaces/ConditionInstance.md)<`Record`<`string`, `unknown`\>\> | `undefined`   |
| `additionalParams` | `Record`<`string`, `unknown`\>                                                             | `undefined`   |
| `from?`            | [`Account`](Account.md)                                                                    | `undefined`   |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)                                            | `undefined`   |
| `method`           | [`ConditionMethod`](../code-reference.md#conditionmethod)                                  | `'fulfill'`   |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[fulfillInstance](ConsumerCondition.md#fulfillinstance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:150](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L150)

---

### fulfillPlain

▸ **fulfillPlain**(`agreementId`, `args`, `from?`, `txParams?`, `method?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name          | Type                                                      | Default value |
| :------------ | :-------------------------------------------------------- | :------------ |
| `agreementId` | `string`                                                  | `undefined`   |
| `args`        | `any`[]                                                   | `undefined`   |
| `from?`       | [`Account`](Account.md)                                   | `undefined`   |
| `txParams?`   | [`TxParameters`](../interfaces/TxParameters.md)           | `undefined`   |
| `method`      | [`ConditionMethod`](../code-reference.md#conditionmethod) | `'fulfill'`   |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[fulfillPlain](ConsumerCondition.md#fulfillplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L63)

---

### fulfillWithNode

▸ **fulfillWithNode**(`_cond`, `_additionalParams`, `_from?`, `_txParams?`): `Promise`<`void`\>

#### Parameters

| Name                | Type                                                                                       |
| :------------------ | :----------------------------------------------------------------------------------------- |
| `_cond`             | [`ConditionInstance`](../interfaces/ConditionInstance.md)<`Record`<`string`, `unknown`\>\> |
| `_additionalParams` | `Record`<`string`, `unknown`\>                                                             |
| `_from?`            | [`Account`](Account.md)                                                                    |
| `_txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)                                            |

#### Returns

`Promise`<`void`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[fulfillWithNode](ConsumerCondition.md#fulfillwithnode)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:217](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L217)

---

### generateId

▸ **generateId**(`agreementId`, `valueHash`): `Promise`<`string`\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |
| `valueHash`   | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[generateId](ConsumerCondition.md#generateid)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L77)

---

### generateIdHash

▸ **generateIdHash**(`agreementId`, `...values`): `Promise`<`string`\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |
| `...values`   | `any`[]  |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[generateIdHash](ConsumerCondition.md#generateidhash)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L73)

---

### generateIdWithSeed

▸ **generateIdWithSeed**(`agreementId`, `valueHash`): `Promise`<[`string`, `string`]\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |
| `valueHash`   | `string` |

#### Returns

`Promise`<[`string`, `string`]\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[generateIdWithSeed](ConsumerCondition.md#generateidwithseed)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L81)

---

### getConditionFulfilledEvent

▸ **getConditionFulfilledEvent**(`agreementId`): [`EventResult`](../code-reference.md#eventresult)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |

#### Returns

[`EventResult`](../code-reference.md#eventresult)

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[getConditionFulfilledEvent](ConsumerCondition.md#getconditionfulfilledevent)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:92](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L92)

---

### getFromAddress

▸ `Protected` **getFromAddress**(`from?`): `Promise`<`string`\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `from?` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[getFromAddress](ConsumerCondition.md#getfromaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:80](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L80)

---

### getInputsOfMethod

▸ **getInputsOfMethod**(`methodName`): readonly `ParamType`[]

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `methodName` | `string` |

#### Returns

readonly `ParamType`[]

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[getInputsOfMethod](ConsumerCondition.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L44)

---

### getSignatureOfMethod

▸ **getSignatureOfMethod**(`methodName`, `args?`): `string`

#### Parameters

| Name         | Type     | Default value |
| :----------- | :------- | :------------ |
| `methodName` | `string` | `undefined`   |
| `args`       | `any`[]  | `[]`          |

#### Returns

`string`

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[getSignatureOfMethod](ConsumerCondition.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L39)

---

### hashValues

▸ **hashValues**(`...args`): `Promise`<`string`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[hashValues](ConsumerCondition.md#hashvalues)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L129)

---

### hashValuesPlain

▸ **hashValuesPlain**(`...args`): `Promise`<`string`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[hashValuesPlain](ConsumerCondition.md#hashvaluesplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:133](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L133)

---

### init

▸ `Protected` **init**(`config`, `optional?`): `Promise`<`void`\>

#### Parameters

| Name       | Type                                                        | Default value |
| :--------- | :---------------------------------------------------------- | :------------ |
| `config`   | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | `undefined`   |
| `optional` | `boolean`                                                   | `false`       |

#### Returns

`Promise`<`void`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[init](ConsumerCondition.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L49)

---

### instance

▸ **instance**(`agreementId`, `params`): `Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name          | Type                                                                                           |
| :------------ | :--------------------------------------------------------------------------------------------- |
| `agreementId` | `string`                                                                                       |
| `params`      | [`ConditionParameters`](../interfaces/ConditionParameters.md)<`Record`<`string`, `unknown`\>\> |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[instance](ConsumerCondition.md#instance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:174](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L174)

---

### instanceFromDDO

▸ **instanceFromDDO**(`agreementId`, `ctx`, `...args`): `Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name          | Type                                                                  |
| :------------ | :-------------------------------------------------------------------- |
| `agreementId` | `string`                                                              |
| `ctx`         | `NFT721HolderConditionContext`                                        |
| `...args`     | [`ConditionInstanceSmall`](../interfaces/ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[instanceFromDDO](ConsumerCondition.md#instancefromddo)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L142)

---

### nftContractFromService

▸ **nftContractFromService**(`service`): `string`

#### Parameters

| Name      | Type                                              |
| :-------- | :------------------------------------------------ |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) |

#### Returns

`string`

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L32)

---

### params

▸ **params**(`did`, `holderAddress`, `nftTokenAddress`): [`ConditionParameters`](../interfaces/ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

Generate the hash of condition inputs with the following parameters.

#### Parameters

| Name              | Type     | Description                                |
| :---------------- | :------- | :----------------------------------------- |
| `did`             | `string` | The Decentralized Identifier of the asset. |
| `holderAddress`   | `string` | The address of the NFT holder .            |
| `nftTokenAddress` | `string` | The address of the nft 721 token to use    |

#### Returns

[`ConditionParameters`](../interfaces/ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

hash of all the values

#### Overrides

[ConsumerCondition](ConsumerCondition.md).[params](ConsumerCondition.md#params)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L28)

---

### paramsFromDDO

▸ **paramsFromDDO**(`«destructured»`): `Promise`<[`ConditionParameters`](../interfaces/ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name             | Type                           |
| :--------------- | :----------------------------- |
| `«destructured»` | `NFT721HolderConditionContext` |

#### Returns

`Promise`<[`ConditionParameters`](../interfaces/ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Overrides

[ConsumerCondition](ConsumerCondition.md).[paramsFromDDO](ConsumerCondition.md#paramsfromddo)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:38](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L38)

---

### send

▸ **send**(`name`, `from`, `args`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `name`   | `string`                                        |
| `from`   | `string`                                        |
| `args`   | `any`[]                                         |
| `params` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[send](ConsumerCondition.md#send)

#### Defined in

[src/keeper/contracts/ContractBase.ts:235](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L235)

---

### sendFrom

▸ **sendFrom**(`name`, `args`, `from?`, `value?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `name`   | `string`                                        |
| `args`   | `any`[]                                         |
| `from?`  | [`Account`](Account.md)                         |
| `value?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[sendFrom](ConsumerCondition.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L88)

---

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`void`

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[setInstanceConfig](ConsumerCondition.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`NFT721HolderCondition`](NFT721HolderCondition.md)\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`NFT721HolderCondition`](NFT721HolderCondition.md)\>

#### Overrides

[ConsumerCondition](ConsumerCondition.md).[getInstance](ConsumerCondition.md#getinstance)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts:16](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/NFT721HolderCondition.ts#L16)

---

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type                                      |
| :--- | :---------------------------------------- |
| `T`  | extends [`Instantiable`](Instantiable.md) |

#### Parameters

| Name                 | Type                                                        |
| :------------------- | :---------------------------------------------------------- |
| `instance`           | `T`                                                         |
| `instantiableConfig` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`void`

#### Inherited from

[ConsumerCondition](ConsumerCondition.md).[setInstanceConfig](ConsumerCondition.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
