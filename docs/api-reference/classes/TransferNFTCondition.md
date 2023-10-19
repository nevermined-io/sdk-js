[@nevermined-io/sdk](../code-reference.md) / TransferNFTCondition

# Class: TransferNFTCondition

Condition allowing to transfer an NFT between the original owner and a receiver

## Hierarchy

- [`ProviderCondition`](ProviderCondition.md)<`TransferNFTConditionContext`\>

  ↳ **`TransferNFTCondition`**

## Table of contents

### Constructors

- [constructor](TransferNFTCondition.md#constructor)

### Properties

- [address](TransferNFTCondition.md#address)
- [contract](TransferNFTCondition.md#contract)
- [contractName](TransferNFTCondition.md#contractname)
- [events](TransferNFTCondition.md#events)
- [version](TransferNFTCondition.md#version)
- [NO_EXPIRY](TransferNFTCondition.md#no_expiry)

### Accessors

- [artifactsFolder](TransferNFTCondition.md#artifactsfolder)
- [circuitsFolder](TransferNFTCondition.md#circuitsfolder)
- [config](TransferNFTCondition.md#config)
- [instanceConfig](TransferNFTCondition.md#instanceconfig)
- [instantiableConfig](TransferNFTCondition.md#instantiableconfig)
- [logger](TransferNFTCondition.md#logger)
- [nevermined](TransferNFTCondition.md#nevermined)
- [web3](TransferNFTCondition.md#web3)

### Methods

- [abortByTimeOut](TransferNFTCondition.md#abortbytimeout)
- [call](TransferNFTCondition.md#call)
- [fulfill](TransferNFTCondition.md#fulfill)
- [fulfillForDelegate](TransferNFTCondition.md#fulfillfordelegate)
- [fulfillInstance](TransferNFTCondition.md#fulfillinstance)
- [fulfillPlain](TransferNFTCondition.md#fulfillplain)
- [fulfillWithNode](TransferNFTCondition.md#fulfillwithnode)
- [generateId](TransferNFTCondition.md#generateid)
- [generateIdHash](TransferNFTCondition.md#generateidhash)
- [generateIdWithSeed](TransferNFTCondition.md#generateidwithseed)
- [getConditionFulfilledEvent](TransferNFTCondition.md#getconditionfulfilledevent)
- [getFromAddress](TransferNFTCondition.md#getfromaddress)
- [getInputsOfMethod](TransferNFTCondition.md#getinputsofmethod)
- [getSignatureOfMethod](TransferNFTCondition.md#getsignatureofmethod)
- [hashValues](TransferNFTCondition.md#hashvalues)
- [hashValuesPlain](TransferNFTCondition.md#hashvaluesplain)
- [init](TransferNFTCondition.md#init)
- [instance](TransferNFTCondition.md#instance)
- [instanceFromDDO](TransferNFTCondition.md#instancefromddo)
- [nftContractFromService](TransferNFTCondition.md#nftcontractfromservice)
- [nodeMethod](TransferNFTCondition.md#nodemethod)
- [params](TransferNFTCondition.md#params)
- [paramsFromDDO](TransferNFTCondition.md#paramsfromddo)
- [send](TransferNFTCondition.md#send)
- [sendFrom](TransferNFTCondition.md#sendfrom)
- [setInstanceConfig](TransferNFTCondition.md#setinstanceconfig)
- [getInstance](TransferNFTCondition.md#getinstance)
- [setInstanceConfig](TransferNFTCondition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new TransferNFTCondition**(`contractName`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[ProviderCondition](ProviderCondition.md).[constructor](ProviderCondition.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L34)

## Properties

### address

• **address**: `string`

#### Inherited from

[ProviderCondition](ProviderCondition.md).[address](ProviderCondition.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[ProviderCondition](ProviderCondition.md).[contract](ProviderCondition.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[ProviderCondition](ProviderCondition.md).[contractName](ProviderCondition.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[ProviderCondition](ProviderCondition.md).[events](ProviderCondition.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[ProviderCondition](ProviderCondition.md).[version](ProviderCondition.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

---

### NO_EXPIRY

▪ `Static` `Readonly` **NO_EXPIRY**: `0`

#### Defined in

[src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts:26](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts#L26)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ProviderCondition.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ProviderCondition.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

ProviderCondition.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ProviderCondition.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ProviderCondition.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

ProviderCondition.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

ProviderCondition.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

ProviderCondition.web3

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

[ProviderCondition](ProviderCondition.md).[abortByTimeOut](ProviderCondition.md#abortbytimeout)

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

[ProviderCondition](ProviderCondition.md).[call](ProviderCondition.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

---

### fulfill

▸ **fulfill**(`agreementId`, `did`, `nftReceiver`, `nftAmount`, `nftContractAddress`, `lockPaymentCondition`, `willBeTransferred?`, `expiration?`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Fulfill the transfer NFT condition.

#### Parameters

| Name                   | Type                                            | Default value | Description                                          |
| :--------------------- | :---------------------------------------------- | :------------ | :--------------------------------------------------- |
| `agreementId`          | `string`                                        | `undefined`   | The agreement identifier.                            |
| `did`                  | `string`                                        | `undefined`   | The DID of the asset with NFTs.                      |
| `nftReceiver`          | `string`                                        | `undefined`   | The address of the account to receive the NFT.       |
| `nftAmount`            | `bigint`                                        | `undefined`   | amount of NFTs to transfer.                          |
| `nftContractAddress`   | `string`                                        | `undefined`   | Address of the nft contract                          |
| `lockPaymentCondition` | `string`                                        | `undefined`   | lock payment condition identifier.                   |
| `willBeTransferred`    | `boolean`                                       | `true`        | Indicates if the asset will be transferred or minted |
| `expiration`           | `number`                                        | `0`           | -                                                    |
| `from?`                | [`Account`](Account.md)                         | `undefined`   |                                                      |
| `txParams?`            | [`TxParameters`](../interfaces/TxParameters.md) | `undefined`   | -                                                    |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Condition state.

**`Remarks`**

Only DID owner or DID provider can call this method.

#### Overrides

[ProviderCondition](ProviderCondition.md).[fulfill](ProviderCondition.md#fulfill)

#### Defined in

[src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts:141](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts#L141)

---

### fulfillForDelegate

▸ **fulfillForDelegate**(`agreementId`, `did`, `nftHolder`, `nftReceiver`, `nftAmount`, `lockPaymentCondition`, `nftAddress`, `willBeTransferred?`, `expiration?`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Fulfill the transfer NFT condition.

#### Parameters

| Name                   | Type                                            | Default value | Description                                                   |
| :--------------------- | :---------------------------------------------- | :------------ | :------------------------------------------------------------ |
| `agreementId`          | `string`                                        | `undefined`   | The agreement identifier.                                     |
| `did`                  | `string`                                        | `undefined`   | The DID of the asset with NFTs.                               |
| `nftHolder`            | `string`                                        | `undefined`   | The address of the account currently holding the NFT.         |
| `nftReceiver`          | `string`                                        | `undefined`   | The address of the account to receive the NFT.                |
| `nftAmount`            | `bigint`                                        | `undefined`   | The amount of NFTs to transfer.                               |
| `lockPaymentCondition` | `string`                                        | `undefined`   | The lock payment condition identifier.                        |
| `nftAddress`           | `string`                                        | `undefined`   | -                                                             |
| `willBeTransferred`    | `boolean`                                       | `true`        | Indicates if the asset will be transferred or minted          |
| `expiration`           | `bigint`                                        | `undefined`   | Block in which the token expires. If zero means no expiration |
| `from?`                | [`Account`](Account.md)                         | `undefined`   | Account sending the transaction                               |
| `txParams?`            | [`TxParameters`](../interfaces/TxParameters.md) | `undefined`   | Transaction parameters                                        |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Condition state.

**`Remarks`**

Only DID owner or DID provider can call this method.

#### Defined in

[src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts:187](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts#L187)

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

[ProviderCondition](ProviderCondition.md).[fulfillInstance](ProviderCondition.md#fulfillinstance)

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

[ProviderCondition](ProviderCondition.md).[fulfillPlain](ProviderCondition.md#fulfillplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L63)

---

### fulfillWithNode

▸ **fulfillWithNode**(`cond`, `additionalParams`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name               | Type                                                                                       |
| :----------------- | :----------------------------------------------------------------------------------------- |
| `cond`             | [`ConditionInstance`](../interfaces/ConditionInstance.md)<`Record`<`string`, `unknown`\>\> |
| `additionalParams` | `Record`<`string`, `unknown`\>                                                             |
| `from?`            | [`Account`](Account.md)                                                                    |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)                                            |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ProviderCondition](ProviderCondition.md).[fulfillWithNode](ProviderCondition.md#fulfillwithnode)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:194](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L194)

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

[ProviderCondition](ProviderCondition.md).[generateId](ProviderCondition.md#generateid)

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

[ProviderCondition](ProviderCondition.md).[generateIdHash](ProviderCondition.md#generateidhash)

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

[ProviderCondition](ProviderCondition.md).[generateIdWithSeed](ProviderCondition.md#generateidwithseed)

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

[ProviderCondition](ProviderCondition.md).[getConditionFulfilledEvent](ProviderCondition.md#getconditionfulfilledevent)

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

[ProviderCondition](ProviderCondition.md).[getFromAddress](ProviderCondition.md#getfromaddress)

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

[ProviderCondition](ProviderCondition.md).[getInputsOfMethod](ProviderCondition.md#getinputsofmethod)

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

[ProviderCondition](ProviderCondition.md).[getSignatureOfMethod](ProviderCondition.md#getsignatureofmethod)

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

[ProviderCondition](ProviderCondition.md).[hashValues](ProviderCondition.md#hashvalues)

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

[ProviderCondition](ProviderCondition.md).[hashValuesPlain](ProviderCondition.md#hashvaluesplain)

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

[ProviderCondition](ProviderCondition.md).[init](ProviderCondition.md#init)

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

[ProviderCondition](ProviderCondition.md).[instance](ProviderCondition.md#instance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:174](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L174)

---

### instanceFromDDO

▸ **instanceFromDDO**(`agreementId`, `ctx`, `...args`): `Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name          | Type                                                                  |
| :------------ | :-------------------------------------------------------------------- |
| `agreementId` | `string`                                                              |
| `ctx`         | `TransferNFTConditionContext`                                         |
| `...args`     | [`ConditionInstanceSmall`](../interfaces/ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[ProviderCondition](ProviderCondition.md).[instanceFromDDO](ProviderCondition.md#instancefromddo)

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

[src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts:92](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts#L92)

---

### nodeMethod

▸ **nodeMethod**(): [`ConditionMethod`](../code-reference.md#conditionmethod)

#### Returns

[`ConditionMethod`](../code-reference.md#conditionmethod)

#### Overrides

[ProviderCondition](ProviderCondition.md).[nodeMethod](ProviderCondition.md#nodemethod)

#### Defined in

[src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts:213](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts#L213)

---

### params

▸ **params**(`did`, `nftHolder`, `nftReceiver`, `nftAmount`, `lockCondition`, `nftContractAddress?`, `willBeTransferred?`, `expiration?`): [`ConditionParameters`](../interfaces/ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

Generates the hash of condition inputs.

#### Parameters

| Name                  | Type      | Default value | Description                                          |
| :-------------------- | :-------- | :------------ | :--------------------------------------------------- |
| `did`                 | `string`  | `undefined`   | The DID of the asset with NFTs.                      |
| `nftHolder`           | `string`  | `undefined`   | The address of the holder of the NFT.                |
| `nftReceiver`         | `string`  | `undefined`   | The address of the granted user or the DID provider. |
| `nftAmount`           | `bigint`  | `undefined`   | Amount of NFTs to transfer.                          |
| `lockCondition`       | `string`  | `undefined`   | Lock condition identifier.                           |
| `nftContractAddress?` | `string`  | `undefined`   | The address of the NFT token to use.                 |
| `willBeTransferred`   | `boolean` | `true`        | Indicates if the asset will be transferred or minted |
| `expiration`          | `number`  | `0`           | -                                                    |

#### Returns

[`ConditionParameters`](../interfaces/ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

Hash of all the values

#### Overrides

[ProviderCondition](ProviderCondition.md).[params](ProviderCondition.md#params)

#### Defined in

[src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts#L44)

---

### paramsFromDDO

▸ **paramsFromDDO**(`«destructured»`, `lockCondition`): `Promise`<[`ConditionParameters`](../interfaces/ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name             | Type                          |
| :--------------- | :---------------------------- |
| `«destructured»` | `TransferNFTConditionContext` |
| `lockCondition`  | `any`                         |

#### Returns

`Promise`<[`ConditionParameters`](../interfaces/ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Overrides

[ProviderCondition](ProviderCondition.md).[paramsFromDDO](ProviderCondition.md#paramsfromddo)

#### Defined in

[src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts#L99)

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

[ProviderCondition](ProviderCondition.md).[send](ProviderCondition.md#send)

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

[ProviderCondition](ProviderCondition.md).[sendFrom](ProviderCondition.md#sendfrom)

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

[ProviderCondition](ProviderCondition.md).[setInstanceConfig](ProviderCondition.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`TransferNFTCondition`](TransferNFTCondition.md)\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`TransferNFTCondition`](TransferNFTCondition.md)\>

#### Overrides

[ProviderCondition](ProviderCondition.md).[getInstance](ProviderCondition.md#getinstance)

#### Defined in

[src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/NFTs/TransferNFTCondition.ts#L28)

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

[ProviderCondition](ProviderCondition.md).[setInstanceConfig](ProviderCondition.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
