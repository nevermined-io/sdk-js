[@nevermined-io/sdk](../code-reference.md) / NFTContractsBase

# Class: NFTContractsBase

## Hierarchy

- [`ContractBase`](ContractBase.md)

  ↳ **`NFTContractsBase`**

  ↳↳ [`Nft721Contract`](Nft721Contract.md)

  ↳↳ [`Nft1155Contract`](Nft1155Contract.md)

## Table of contents

### Constructors

- [constructor](NFTContractsBase.md#constructor)

### Properties

- [address](NFTContractsBase.md#address)
- [contract](NFTContractsBase.md#contract)
- [contractName](NFTContractsBase.md#contractname)
- [events](NFTContractsBase.md#events)
- [version](NFTContractsBase.md#version)

### Accessors

- [artifactsFolder](NFTContractsBase.md#artifactsfolder)
- [circuitsFolder](NFTContractsBase.md#circuitsfolder)
- [config](NFTContractsBase.md#config)
- [instanceConfig](NFTContractsBase.md#instanceconfig)
- [instantiableConfig](NFTContractsBase.md#instantiableconfig)
- [logger](NFTContractsBase.md#logger)
- [nevermined](NFTContractsBase.md#nevermined)
- [web3](NFTContractsBase.md#web3)

### Methods

- [\_createClone](NFTContractsBase.md#_createclone)
- [call](NFTContractsBase.md#call)
- [getFromAddress](NFTContractsBase.md#getfromaddress)
- [getInputsOfMethod](NFTContractsBase.md#getinputsofmethod)
- [getMintedEntries](NFTContractsBase.md#getmintedentries)
- [getNFTAttributes](NFTContractsBase.md#getnftattributes)
- [getSignatureOfMethod](NFTContractsBase.md#getsignatureofmethod)
- [grantOperatorRole](NFTContractsBase.md#grantoperatorrole)
- [init](NFTContractsBase.md#init)
- [isOperator](NFTContractsBase.md#isoperator)
- [owner](NFTContractsBase.md#owner)
- [revokeOperatorRole](NFTContractsBase.md#revokeoperatorrole)
- [send](NFTContractsBase.md#send)
- [sendFrom](NFTContractsBase.md#sendfrom)
- [setInstanceConfig](NFTContractsBase.md#setinstanceconfig)
- [getInstance](NFTContractsBase.md#getinstance)
- [setInstanceConfig](NFTContractsBase.md#setinstanceconfig-1)

## Constructors

### constructor

• **new NFTContractsBase**(`contractName`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[ContractBase](ContractBase.md).[constructor](ContractBase.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L34)

## Properties

### address

• **address**: `string`

#### Inherited from

[ContractBase](ContractBase.md).[address](ContractBase.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[ContractBase](ContractBase.md).[contract](ContractBase.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[ContractBase](ContractBase.md).[contractName](ContractBase.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[ContractBase](ContractBase.md).[events](ContractBase.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[ContractBase](ContractBase.md).[version](ContractBase.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ContractBase.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ContractBase.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

ContractBase.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ContractBase.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ContractBase.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

ContractBase.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

ContractBase.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

ContractBase.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### \_createClone

▸ `Protected` **\_createClone**(`ercType`, `name`, `symbol`, `uri`, `cap`, `operators?`, `from?`, `txParams?`): `Promise`<`any`\>

Creates a contract clone of an existing contract instance

#### Parameters

| Name        | Type                                            | Default value | Description                                             |
| :---------- | :---------------------------------------------- | :------------ | :------------------------------------------------------ |
| `ercType`   | `721` \| `1155`                                 | `undefined`   | -                                                       |
| `name`      | `string`                                        | `undefined`   | NFT Contract name                                       |
| `symbol`    | `string`                                        | `undefined`   | NFT Contract symbol                                     |
| `uri`       | `string`                                        | `undefined`   | NFT Contract metadata uri                               |
| `cap`       | `bigint`                                        | `undefined`   | NFT cap (just for ERC-721)                              |
| `operators` | `string`[]                                      | `[]`          | Array of account addresses to be added as NFT operators |
| `from?`     | [`Account`](Account.md)                         | `undefined`   | Sender account                                          |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | `undefined`   | -                                                       |

#### Returns

`Promise`<`any`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L34)

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

[ContractBase](ContractBase.md).[call](ContractBase.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

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

[ContractBase](ContractBase.md).[getFromAddress](ContractBase.md#getfromaddress)

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

[ContractBase](ContractBase.md).[getInputsOfMethod](ContractBase.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L44)

---

### getMintedEntries

▸ **getMintedEntries**(`owner`, `did?`): `Promise`<[`MintedEntry`](../interfaces/MintedEntry.md)[]\>

It gets all the `MintedEntries` events from the NFT Contract

#### Parameters

| Name    | Type     | Description             |
| :------ | :------- | :---------------------- |
| `owner` | `string` | the user owning the NFT |
| `did?`  | `string` | the tokenId of the NFT  |

#### Returns

`Promise`<[`MintedEntry`](../interfaces/MintedEntry.md)[]\>

An array of `MintedEntry` objects

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:125](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L125)

---

### getNFTAttributes

▸ **getNFTAttributes**(`did`): `Promise`<{ `mintCap`: `bigint` ; `nftInitialized`: `boolean` ; `nftSupply`: `bigint` ; `nftURI`: `string` }\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<{ `mintCap`: `bigint` ; `nftInitialized`: `boolean` ; `nftSupply`: `bigint` ; `nftURI`: `string` }\>

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:82](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L82)

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

[ContractBase](ContractBase.md).[getSignatureOfMethod](ContractBase.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L39)

---

### grantOperatorRole

▸ **grantOperatorRole**(`operatorAddress`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Add an address as operator in the NFT Contract

#### Parameters

| Name              | Type                                            | Description        |
| :---------------- | :---------------------------------------------- | :----------------- |
| `operatorAddress` | `string`                                        | New minter address |
| `from?`           | [`Account`](Account.md)                         | Sender account     |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | -                  |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:69](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L69)

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

[ContractBase](ContractBase.md).[init](ContractBase.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L49)

---

### isOperator

▸ **isOperator**(`address`): `Promise`<`boolean`\>

Checks if an account is an operator in the NFT contract

#### Parameters

| Name      | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `address` | `string` | Account address to check if is an operator |

#### Returns

`Promise`<`boolean`\>

true if is an operator

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:78](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L78)

---

### owner

▸ **owner**(): `Promise`<`string`\>

Gets the contract owner

#### Returns

`Promise`<`string`\>

Address of the contract owner

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:19](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L19)

---

### revokeOperatorRole

▸ **revokeOperatorRole**(`operatorAddress`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Revoke an address as operator in the NFT Contract

#### Parameters

| Name              | Type                                            | Description              |
| :---------------- | :---------------------------------------------- | :----------------------- |
| `operatorAddress` | `string`                                        | Minter address to revoke |
| `from?`           | [`Account`](Account.md)                         | Sender account           |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | -                        |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:115](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L115)

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

[ContractBase](ContractBase.md).[send](ContractBase.md#send)

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

[ContractBase](ContractBase.md).[sendFrom](ContractBase.md#sendfrom)

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

[ContractBase](ContractBase.md).[setInstanceConfig](ContractBase.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### getInstance

▸ `Static` **getInstance**(`..._args`): `any`

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `..._args` | `any` |

#### Returns

`any`

#### Inherited from

[ContractBase](ContractBase.md).[getInstance](ContractBase.md#getinstance)

#### Defined in

[src/Instantiable.abstract.ts:86](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L86)

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

[ContractBase](ContractBase.md).[setInstanceConfig](ContractBase.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
