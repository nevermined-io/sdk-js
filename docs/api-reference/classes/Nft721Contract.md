[@nevermined-io/sdk](../code-reference.md) / Nft721Contract

# Class: Nft721Contract

## Hierarchy

- [`NFTContractsBase`](NFTContractsBase.md)

  ↳ **`Nft721Contract`**

## Table of contents

### Constructors

- [constructor](Nft721Contract.md#constructor)

### Properties

- [address](Nft721Contract.md#address)
- [contract](Nft721Contract.md#contract)
- [contractName](Nft721Contract.md#contractname)
- [events](Nft721Contract.md#events)
- [version](Nft721Contract.md#version)

### Accessors

- [artifactsFolder](Nft721Contract.md#artifactsfolder)
- [circuitsFolder](Nft721Contract.md#circuitsfolder)
- [config](Nft721Contract.md#config)
- [instanceConfig](Nft721Contract.md#instanceconfig)
- [instantiableConfig](Nft721Contract.md#instantiableconfig)
- [logger](Nft721Contract.md#logger)
- [nevermined](Nft721Contract.md#nevermined)
- [web3](Nft721Contract.md#web3)

### Methods

- [\_createClone](Nft721Contract.md#_createclone)
- [balanceOf](Nft721Contract.md#balanceof)
- [burn](Nft721Contract.md#burn)
- [call](Nft721Contract.md#call)
- [createClone](Nft721Contract.md#createclone)
- [getFromAddress](Nft721Contract.md#getfromaddress)
- [getInputsOfMethod](Nft721Contract.md#getinputsofmethod)
- [getMintedEntries](Nft721Contract.md#getmintedentries)
- [getNFTAttributes](Nft721Contract.md#getnftattributes)
- [getSignatureOfMethod](Nft721Contract.md#getsignatureofmethod)
- [grantOperatorRole](Nft721Contract.md#grantoperatorrole)
- [init](Nft721Contract.md#init)
- [isApprovedForAll](Nft721Contract.md#isapprovedforall)
- [isOperator](Nft721Contract.md#isoperator)
- [mint](Nft721Contract.md#mint)
- [mintWithURL](Nft721Contract.md#mintwithurl)
- [owner](Nft721Contract.md#owner)
- [ownerOf](Nft721Contract.md#ownerof)
- [revokeOperatorRole](Nft721Contract.md#revokeoperatorrole)
- [send](Nft721Contract.md#send)
- [sendFrom](Nft721Contract.md#sendfrom)
- [setApprovalForAll](Nft721Contract.md#setapprovalforall)
- [setInstanceConfig](Nft721Contract.md#setinstanceconfig)
- [tokenURI](Nft721Contract.md#tokenuri)
- [getInstance](Nft721Contract.md#getinstance)
- [getInstanceUsingABI](Nft721Contract.md#getinstanceusingabi)
- [setInstanceConfig](Nft721Contract.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Nft721Contract**(`contractName`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[constructor](NFTContractsBase.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L34)

## Properties

### address

• **address**: `string`

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[address](NFTContractsBase.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[contract](NFTContractsBase.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[contractName](NFTContractsBase.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[events](NFTContractsBase.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[version](NFTContractsBase.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

NFTContractsBase.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

NFTContractsBase.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

NFTContractsBase.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

NFTContractsBase.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

NFTContractsBase.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

NFTContractsBase.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

NFTContractsBase.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

NFTContractsBase.web3

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

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[\_createClone](NFTContractsBase.md#_createclone)

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L34)

---

### balanceOf

▸ **balanceOf**(`owner`): `Promise`<`bigint`\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `owner` | `string` |

#### Returns

`Promise`<`bigint`\>

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:117](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L117)

---

### burn

▸ **burn**(`tokenId`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It burns some editions of a NFT (ERC-721)

#### Parameters

| Name        | Type                                            | Description                       |
| :---------- | :---------------------------------------------- | :-------------------------------- |
| `tokenId`   | `string`                                        | The NFT id to burn                |
| `from?`     | [`Account`](Account.md)                         | The account burning the NFT       |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Transaction additional parameters |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:100](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L100)

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

[NFTContractsBase](NFTContractsBase.md).[call](NFTContractsBase.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

---

### createClone

▸ **createClone**(`name`, `symbol`, `uri`, `cap`, `operators?`, `from?`, `txParams?`): `Promise`<`any`\>

Creates a contract clone of an existing contract instance

#### Parameters

| Name        | Type                                            | Default value | Description                                             |
| :---------- | :---------------------------------------------- | :------------ | :------------------------------------------------------ |
| `name`      | `string`                                        | `undefined`   | NFT Contract name                                       |
| `symbol`    | `string`                                        | `undefined`   | NFT Contract symbol                                     |
| `uri`       | `string`                                        | `undefined`   | NFT Contract metadata uri                               |
| `cap`       | `bigint`                                        | `undefined`   | NFT cap                                                 |
| `operators` | `string`[]                                      | `[]`          | Array of account addresses to be added as NFT operators |
| `from?`     | [`Account`](Account.md)                         | `undefined`   | Sender account                                          |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | `undefined`   | -                                                       |

#### Returns

`Promise`<`any`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:66](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L66)

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

[NFTContractsBase](NFTContractsBase.md).[getFromAddress](NFTContractsBase.md#getfromaddress)

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

[NFTContractsBase](NFTContractsBase.md).[getInputsOfMethod](NFTContractsBase.md#getinputsofmethod)

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

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[getMintedEntries](NFTContractsBase.md#getmintedentries)

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

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[getNFTAttributes](NFTContractsBase.md#getnftattributes)

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

[NFTContractsBase](NFTContractsBase.md).[getSignatureOfMethod](NFTContractsBase.md#getsignatureofmethod)

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

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[grantOperatorRole](NFTContractsBase.md#grantoperatorrole)

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

[NFTContractsBase](NFTContractsBase.md).[init](NFTContractsBase.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L49)

---

### isApprovedForAll

▸ **isApprovedForAll**(`accountAddress`, `operatorAddress`): `Promise`<`unknown`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `accountAddress`  | `string` |
| `operatorAddress` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:113](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L113)

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

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[isOperator](NFTContractsBase.md#isoperator)

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:78](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L78)

---

### mint

▸ **mint**(`did`, `from`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `did`       | `string`                                        |
| `from`      | `string`                                        |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:78](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L78)

---

### mintWithURL

▸ **mintWithURL**(`to`, `did`, `url`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `to`        | `string`                                        |
| `did`       | `string`                                        |
| `url`       | `string`                                        |
| `from?`     | [`Account`](Account.md)                         |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:82](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L82)

---

### owner

▸ **owner**(): `Promise`<`string`\>

Gets the contract owner

#### Returns

`Promise`<`string`\>

Address of the contract owner

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[owner](NFTContractsBase.md#owner)

#### Defined in

[src/keeper/contracts/NFTContractsBase.ts:19](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/NFTContractsBase.ts#L19)

---

### ownerOf

▸ **ownerOf**(`did`): `Promise`<`string`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:121](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L121)

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

#### Inherited from

[NFTContractsBase](NFTContractsBase.md).[revokeOperatorRole](NFTContractsBase.md#revokeoperatorrole)

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

[NFTContractsBase](NFTContractsBase.md).[send](NFTContractsBase.md#send)

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

[NFTContractsBase](NFTContractsBase.md).[sendFrom](NFTContractsBase.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L88)

---

### setApprovalForAll

▸ **setApprovalForAll**(`target`, `state`, `from`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `target`    | `string`                                        |
| `state`     | `boolean`                                       |
| `from`      | `string`                                        |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:104](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L104)

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

[NFTContractsBase](NFTContractsBase.md).[setInstanceConfig](NFTContractsBase.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### tokenURI

▸ **tokenURI**(`did`): `Promise`<`string`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:125](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L125)

---

### getInstance

▸ `Static` **getInstance**(`config`, `address`, `contractName?`, `artifactsFolder?`): `Promise`<[`Nft721Contract`](Nft721Contract.md)\>

#### Parameters

| Name              | Type                                                        | Default value            |
| :---------------- | :---------------------------------------------------------- | :----------------------- |
| `config`          | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | `undefined`              |
| `address`         | `string`                                                    | `undefined`              |
| `contractName`    | `string`                                                    | `'NFT721Upgradeable'`    |
| `artifactsFolder` | `string`                                                    | `config.artifactsFolder` |

#### Returns

`Promise`<[`Nft721Contract`](Nft721Contract.md)\>

#### Overrides

[NFTContractsBase](NFTContractsBase.md).[getInstance](NFTContractsBase.md#getinstance)

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:11](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L11)

---

### getInstanceUsingABI

▸ `Static` **getInstanceUsingABI**(`config`, `address`, `solidityABI`): `Promise`<[`Nft721Contract`](Nft721Contract.md)\>

#### Parameters

| Name          | Type                                                        |
| :------------ | :---------------------------------------------------------- |
| `config`      | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |
| `address`     | `string`                                                    |
| `solidityABI` | `any`                                                       |

#### Returns

`Promise`<[`Nft721Contract`](Nft721Contract.md)\>

#### Defined in

[src/keeper/contracts/Nft721Contract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Nft721Contract.ts#L35)

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

[NFTContractsBase](NFTContractsBase.md).[setInstanceConfig](NFTContractsBase.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
