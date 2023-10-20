[@nevermined-io/sdk](../code-reference.md) / DIDRegistry

# Class: DIDRegistry

## Hierarchy

- [`ContractBase`](ContractBase.md)

  ↳ **`DIDRegistry`**

## Table of contents

### Constructors

- [constructor](DIDRegistry.md#constructor)

### Properties

- [address](DIDRegistry.md#address)
- [contract](DIDRegistry.md#contract)
- [contractName](DIDRegistry.md#contractname)
- [events](DIDRegistry.md#events)
- [version](DIDRegistry.md#version)

### Accessors

- [artifactsFolder](DIDRegistry.md#artifactsfolder)
- [circuitsFolder](DIDRegistry.md#circuitsfolder)
- [config](DIDRegistry.md#config)
- [instanceConfig](DIDRegistry.md#instanceconfig)
- [instantiableConfig](DIDRegistry.md#instantiableconfig)
- [logger](DIDRegistry.md#logger)
- [nevermined](DIDRegistry.md#nevermined)
- [web3](DIDRegistry.md#web3)

### Methods

- [actedOnBehalf](DIDRegistry.md#actedonbehalf)
- [addDidProvenanceDelegate](DIDRegistry.md#adddidprovenancedelegate)
- [addProvider](DIDRegistry.md#addprovider)
- [burn](DIDRegistry.md#burn)
- [call](DIDRegistry.md#call)
- [enableAndMintDidNft](DIDRegistry.md#enableandmintdidnft)
- [enableAndMintDidNft721](DIDRegistry.md#enableandmintdidnft721)
- [getAttributesByDid](DIDRegistry.md#getattributesbydid)
- [getAttributesByOwner](DIDRegistry.md#getattributesbyowner)
- [getBlockNumberUpdated](DIDRegistry.md#getblocknumberupdated)
- [getDIDOwner](DIDRegistry.md#getdidowner)
- [getDIDProvenanceEvents](DIDRegistry.md#getdidprovenanceevents)
- [getDIDProvenanceMethodEvents](DIDRegistry.md#getdidprovenancemethodevents)
- [getDIDRegister](DIDRegistry.md#getdidregister)
- [getDIDRoyalties](DIDRegistry.md#getdidroyalties)
- [getFromAddress](DIDRegistry.md#getfromaddress)
- [getInputsOfMethod](DIDRegistry.md#getinputsofmethod)
- [getNFTInfo](DIDRegistry.md#getnftinfo)
- [getPermission](DIDRegistry.md#getpermission)
- [getProvenanceEntry](DIDRegistry.md#getprovenanceentry)
- [getProvenanceOwner](DIDRegistry.md#getprovenanceowner)
- [getProviders](DIDRegistry.md#getproviders)
- [getSignatureOfMethod](DIDRegistry.md#getsignatureofmethod)
- [grantPermission](DIDRegistry.md#grantpermission)
- [grantRegistryOperatorRole](DIDRegistry.md#grantregistryoperatorrole)
- [hashDID](DIDRegistry.md#hashdid)
- [init](DIDRegistry.md#init)
- [isDIDProvider](DIDRegistry.md#isdidprovider)
- [isProvenanceDelegate](DIDRegistry.md#isprovenancedelegate)
- [mint](DIDRegistry.md#mint)
- [registerAttribute](DIDRegistry.md#registerattribute)
- [registerDID](DIDRegistry.md#registerdid)
- [registerMintableDID](DIDRegistry.md#registermintabledid)
- [registerMintableDID721](DIDRegistry.md#registermintabledid721)
- [removeDidProvenanceDelegate](DIDRegistry.md#removedidprovenancedelegate)
- [removeProvider](DIDRegistry.md#removeprovider)
- [revokePermission](DIDRegistry.md#revokepermission)
- [send](DIDRegistry.md#send)
- [sendFrom](DIDRegistry.md#sendfrom)
- [setDIDRoyalties](DIDRegistry.md#setdidroyalties)
- [setInstanceConfig](DIDRegistry.md#setinstanceconfig)
- [transferDIDOwnership](DIDRegistry.md#transferdidownership)
- [updateMetadataUrl](DIDRegistry.md#updatemetadataurl)
- [used](DIDRegistry.md#used)
- [wasAssociatedWith](DIDRegistry.md#wasassociatedwith)
- [wasDerivedFrom](DIDRegistry.md#wasderivedfrom)
- [getInstance](DIDRegistry.md#getinstance)
- [setInstanceConfig](DIDRegistry.md#setinstanceconfig-1)

## Constructors

### constructor

• **new DIDRegistry**(`contractName`)

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

### actedOnBehalf

▸ **actedOnBehalf**(`provId`, `did`, `delegateAgentId`, `responsibleAgentId`, `activityId`, `signatureDelegate`, `attributes`, `ownerAddress`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name                 | Type                                            |
| :------------------- | :---------------------------------------------- |
| `provId`             | `string`                                        |
| `did`                | `string`                                        |
| `delegateAgentId`    | `string`                                        |
| `responsibleAgentId` | `string`                                        |
| `activityId`         | `string`                                        |
| `signatureDelegate`  | `string`                                        |
| `attributes`         | `string`                                        |
| `ownerAddress`       | `string`                                        |
| `params?`            | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:533](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L533)

---

### addDidProvenanceDelegate

▸ **addDidProvenanceDelegate**(`did`, `delegateAddress`, `ownerAddress`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name              | Type                                            |
| :---------------- | :---------------------------------------------- |
| `did`             | `string`                                        |
| `delegateAddress` | `string`                                        |
| `ownerAddress`    | `string`                                        |
| `params?`         | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:560](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L560)

---

### addProvider

▸ **addProvider**(`did`, `provider`, `from`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name       | Type                                            |
| :--------- | :---------------------------------------------- |
| `did`      | `string`                                        |
| `provider` | `string`                                        |
| `from`     | `string`                                        |
| `params?`  | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:604](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L604)

---

### burn

▸ **burn**(`did`, `amount`, `from`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name      | Type                                            |
| :-------- | :---------------------------------------------- |
| `did`     | `string`                                        |
| `amount`  | `bigint`                                        |
| `from`    | `string`                                        |
| `params?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:600](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L600)

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

### enableAndMintDidNft

▸ **enableAndMintDidNft**(`did`, `cap`, `royalties`, `preMint`, `ownerAddress`, `nftMetadata`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It activates a NFT associated to a NFT (ERC-1155) and allows to pre-mint. This method only can be called once per DID, so if this was called
or executed before internally the method will fail.
Only use if the intention is to register a mintable asset and it was registered via `registerDID` or `registerAttribute`

#### Parameters

| Name           | Type                                            | Description                             |
| :------------- | :---------------------------------------------- | :-------------------------------------- |
| `did`          | `string`                                        | The unique identifier of the asset      |
| `cap`          | `number`                                        | Max number of editions                  |
| `royalties`    | `number`                                        | Asset royalties in the secondary market |
| `preMint`      | `boolean`                                       | If true pre-mints the editions of NFT   |
| `ownerAddress` | `string`                                        | Address of the user registering the DID |
| `nftMetadata`  | `string`                                        | URL to the metadata describing the NFT  |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) | Transaction additional parameters       |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:215](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L215)

---

### enableAndMintDidNft721

▸ **enableAndMintDidNft721**(`did`, `royalties`, `preMint`, `ownerAddress`, `nftMetadata`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It activates a NFT associated to a NFT (ERC-721) and allows to pre-mint. This method only can be called once per DID, so if this was called
or executed before internally the method will fail.
Only use if the intention is to register a mintable asset and it was registered via `registerDID` or `registerAttribute`

#### Parameters

| Name           | Type                                            | Description                             |
| :------------- | :---------------------------------------------- | :-------------------------------------- |
| `did`          | `string`                                        | The unique identifier of the asset      |
| `royalties`    | `number`                                        | Asset royalties in the secondary market |
| `preMint`      | `boolean`                                       | If true pre-mints the editions of NFT   |
| `ownerAddress` | `string`                                        | Address of the user registering the DID |
| `nftMetadata`  | `string`                                        | URL to the metadata describing the NFT  |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) | Transaction additional parameters       |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:245](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L245)

---

### getAttributesByDid

▸ **getAttributesByDid**(`did`): `Promise`<{ `checksum`: `string` ; `did`: `string` ; `immutableUrl`: `string` ; `nftInitialized`: `boolean` ; `owner`: `string` ; `providers`: `string`[] ; `royalties`: `bigint` ; `serviceEndpoint`: `string` }\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<{ `checksum`: `string` ; `did`: `string` ; `immutableUrl`: `string` ; `nftInitialized`: `boolean` ; `owner`: `string` ; `providers`: `string`[] ; `royalties`: `bigint` ; `serviceEndpoint`: `string` }\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:298](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L298)

---

### getAttributesByOwner

▸ **getAttributesByOwner**(`owner`): `Promise`<`string`[]\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `owner` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:273](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L273)

---

### getBlockNumberUpdated

▸ **getBlockNumberUpdated**(`did`): `Promise`<`number`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:265](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L265)

---

### getDIDOwner

▸ **getDIDOwner**(`did`): `Promise`<`string`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:261](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L261)

---

### getDIDProvenanceEvents

▸ **getDIDProvenanceEvents**(`did`): `Promise`<{ `activityId`: `string` ; `agentId`: `string` ; `agentInvolvedId`: `string` ; `attributes?`: `string` ; `blockNumberUpdated`: `number` ; `did`: `string` ; `id`: `string` ; `method`: `number` ; `provId`: `string` ; `relatedDid`: `string` }[]\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<{ `activityId`: `string` ; `agentId`: `string` ; `agentInvolvedId`: `string` ; `attributes?`: `string` ; `blockNumberUpdated`: `number` ; `did`: `string` ; `id`: `string` ; `method`: `number` ; `provId`: `string` ; `relatedDid`: `string` }[]\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:374](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L374)

---

### getDIDProvenanceMethodEvents

▸ **getDIDProvenanceMethodEvents**<`T`\>(`did`, `method`): `Promise`<[`ProvenanceEvent`](../code-reference.md#provenanceevent)<`T`\>[]\>

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `T`  | extends [`ProvenanceMethod`](../enums/ProvenanceMethod.md) |

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `did`    | `string` |
| `method` | `T`      |

#### Returns

`Promise`<[`ProvenanceEvent`](../code-reference.md#provenanceevent)<`T`\>[]\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:409](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L409)

---

### getDIDRegister

▸ **getDIDRegister**(`did`): `Promise`<`unknown`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:617](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L617)

---

### getDIDRoyalties

▸ **getDIDRoyalties**(`did`): `Promise`<`unknown`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:351](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L351)

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

### getNFTInfo

▸ **getNFTInfo**(`did`): `Promise`<`unknown`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:621](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L621)

---

### getPermission

▸ **getPermission**(`did`, `grantee`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `did`     | `string` |
| `grantee` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:355](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L355)

---

### getProvenanceEntry

▸ **getProvenanceEntry**(`provId`): `Promise`<[`ProvenanceRegistry`](../interfaces/ProvenanceRegistry.md)\>

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `provId` | `string` |

#### Returns

`Promise`<[`ProvenanceRegistry`](../interfaces/ProvenanceRegistry.md)\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:458](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L458)

---

### getProvenanceOwner

▸ **getProvenanceOwner**(`did`): `Promise`<`unknown`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:592](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L592)

---

### getProviders

▸ **getProviders**(`did`): `Promise`<`any`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:612](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L612)

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

### grantPermission

▸ **grantPermission**(`did`, `grantee`, `ownerAddress`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `did`          | `string`                                        |
| `grantee`      | `string`                                        |
| `ownerAddress` | `string`                                        |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:324](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L324)

---

### grantRegistryOperatorRole

▸ **grantRegistryOperatorRole**(`manager`, `from`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name      | Type                                            |
| :-------- | :---------------------------------------------- |
| `manager` | `string`                                        |
| `from`    | `string`                                        |
| `params?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:629](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L629)

---

### hashDID

▸ **hashDID**(`didSeed`, `creator`): `Promise`<`string`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `didSeed` | `string` |
| `creator` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:625](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L625)

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

### isDIDProvider

▸ **isDIDProvider**(`did`, `provider`): `Promise`<`string`\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `did`      | `string` |
| `provider` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:269](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L269)

---

### isProvenanceDelegate

▸ **isProvenanceDelegate**(`did`, `delegateAddress`): `Promise`<`unknown`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `did`             | `string` |
| `delegateAddress` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:588](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L588)

---

### mint

▸ **mint**(`did`, `amount`, `from`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name      | Type                                            |
| :-------- | :---------------------------------------------- |
| `did`     | `string`                                        |
| `amount`  | `bigint`                                        |
| `from`    | `string`                                        |
| `params?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:596](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L596)

---

### registerAttribute

▸ **registerAttribute**(`did`, `checksum`, `providers`, `url`, `ownerAddress`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract

#### Parameters

| Name           | Type                                            | Description                                            |
| :------------- | :---------------------------------------------- | :----------------------------------------------------- |
| `did`          | `string`                                        | The unique identifier of the asset                     |
| `checksum`     | `string`                                        | Checksum resulted of hash the asset metadata           |
| `providers`    | `string`[]                                      | List of addresses in charge of interact with the asset |
| `url`          | `string`                                        | URL to the metadata in the Metadata/Marketplace API    |
| `ownerAddress` | `string`                                        | Address of the user registering the DID                |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) | Transaction additional parameters                      |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:33](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L33)

---

### registerDID

▸ **registerDID**(`did`, `checksum`, `providers`, `ownerAddress`, `url`, `immutableUrl?`, `activityId?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract

#### Parameters

| Name           | Type                                            | Default value                      | Description                                                                           |
| :------------- | :---------------------------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------ |
| `did`          | `string`                                        | `undefined`                        | The unique identifier of the asset                                                    |
| `checksum`     | `string`                                        | `undefined`                        | Checksum resulted of hash the asset metadata                                          |
| `providers`    | `string`[]                                      | `undefined`                        | List of addresses in charge of interact with the asset                                |
| `ownerAddress` | `string`                                        | `undefined`                        | Address of the user registering the DID                                               |
| `url`          | `string`                                        | `undefined`                        | URL to the metadata in the Metadata/Marketplace API                                   |
| `immutableUrl` | `string`                                        | `''`                               | Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc |
| `activityId`   | `string`                                        | `DEFAULT_REGISTRATION_ACTIVITY_ID` | Provenance identifier about the asset registration action                             |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) | `undefined`                        | Transaction additional parameters                                                     |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:62](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L62)

---

### registerMintableDID

▸ **registerMintableDID**(`did`, `nftContractAddress`, `checksum`, `providers`, `ownerAddress`, `nftAttributes`, `url`, `immutableUrl?`, `activityId?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract with a ERC-1155 NFT attached to it

#### Parameters

| Name                 | Type                                            | Default value                      | Description                                                                           |
| :------------------- | :---------------------------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------ |
| `did`                | `string`                                        | `undefined`                        | The unique identifier of the asset                                                    |
| `nftContractAddress` | `string`                                        | `undefined`                        | -                                                                                     |
| `checksum`           | `string`                                        | `undefined`                        | Checksum resulted of hash the asset metadata                                          |
| `providers`          | `string`[]                                      | `undefined`                        | List of addresses in charge of interact with the asset                                |
| `ownerAddress`       | `string`                                        | `undefined`                        | Address of the user registering the DID                                               |
| `nftAttributes`      | [`NFTAttributes`](NFTAttributes.md)             | `undefined`                        | Attributes of the NFT associated to the NFT                                           |
| `url`                | `string`                                        | `undefined`                        | URL to the metadata in the Metadata/Marketplace API                                   |
| `immutableUrl`       | `string`                                        | `''`                               | Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc |
| `activityId`         | `string`                                        | `DEFAULT_REGISTRATION_ACTIVITY_ID` | Provenance identifier about the asset registration action                             |
| `txParams?`          | [`TxParameters`](../interfaces/TxParameters.md) | `undefined`                        | Transaction additional parameters                                                     |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:94](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L94)

---

### registerMintableDID721

▸ **registerMintableDID721**(`did`, `nftContractAddress`, `checksum`, `providers`, `ownerAddress`, `nftAttributes`, `url`, `immutableUrl?`, `activityId?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract with a ERC-721 NFT attached to it

#### Parameters

| Name                 | Type                                            | Default value                      | Description                                                                           |
| :------------------- | :---------------------------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------ |
| `did`                | `string`                                        | `undefined`                        | The unique identifier of the asset                                                    |
| `nftContractAddress` | `string`                                        | `undefined`                        | -                                                                                     |
| `checksum`           | `string`                                        | `undefined`                        | Checksum resulted of hash the asset metadata                                          |
| `providers`          | `string`[]                                      | `undefined`                        | List of addresses in charge of interact with the asset                                |
| `ownerAddress`       | `string`                                        | `undefined`                        | Address of the user registering the DID                                               |
| `nftAttributes`      | [`NFTAttributes`](NFTAttributes.md)             | `undefined`                        | Attributes of the NFT associated to the NFT                                           |
| `url`                | `string`                                        | `undefined`                        | URL to the metadata in the Metadata/Marketplace API                                   |
| `immutableUrl`       | `string`                                        | `''`                               | Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc |
| `activityId`         | `string`                                        | `DEFAULT_REGISTRATION_ACTIVITY_ID` | Provenance identifier about the asset registration action                             |
| `txParams?`          | [`TxParameters`](../interfaces/TxParameters.md) | `undefined`                        | Transaction additional parameters                                                     |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:142](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L142)

---

### removeDidProvenanceDelegate

▸ **removeDidProvenanceDelegate**(`did`, `delegateAddress`, `ownerAddress`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name              | Type                                            |
| :---------------- | :---------------------------------------------- |
| `did`             | `string`                                        |
| `delegateAddress` | `string`                                        |
| `ownerAddress`    | `string`                                        |
| `params?`         | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:574](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L574)

---

### removeProvider

▸ **removeProvider**(`did`, `provider`, `from`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name       | Type                                            |
| :--------- | :---------------------------------------------- |
| `did`      | `string`                                        |
| `provider` | `string`                                        |
| `from`     | `string`                                        |
| `params?`  | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:608](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L608)

---

### revokePermission

▸ **revokePermission**(`did`, `grantee`, `ownerAddress`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `did`          | `string`                                        |
| `grantee`      | `string`                                        |
| `ownerAddress` | `string`                                        |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:333](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L333)

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

### setDIDRoyalties

▸ **setDIDRoyalties**(`did`, `scheme`, `ownerAddress`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `did`          | `string`                                        |
| `scheme`       | `string`                                        |
| `ownerAddress` | `string`                                        |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:342](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L342)

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

### transferDIDOwnership

▸ **transferDIDOwnership**(`did`, `newOwnerAddress`, `ownerAddress`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name              | Type                                            |
| :---------------- | :---------------------------------------------- |
| `did`             | `string`                                        |
| `newOwnerAddress` | `string`                                        |
| `ownerAddress`    | `string`                                        |
| `params?`         | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:359](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L359)

---

### updateMetadataUrl

▸ **updateMetadataUrl**(`did`, `checksum`, `ownerAddress`, `url`, `immutableUrl?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract with a ERC-721 NFT attached to it

#### Parameters

| Name           | Type                                            | Default value | Description                                                                           |
| :------------- | :---------------------------------------------- | :------------ | :------------------------------------------------------------------------------------ |
| `did`          | `string`                                        | `undefined`   | The unique identifier of the asset                                                    |
| `checksum`     | `string`                                        | `undefined`   | Checksum resulted of hash the asset metadata                                          |
| `ownerAddress` | `string`                                        | `undefined`   | Address of the user registering the DID                                               |
| `url`          | `string`                                        | `undefined`   | URL to the metadata in the Metadata/Marketplace API                                   |
| `immutableUrl` | `string`                                        | `''`          | Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) | `undefined`   | Transaction additional parameters                                                     |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Contract Receipt

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:185](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L185)

---

### used

▸ **used**(`provId`, `did`, `agentId`, `activityId`, `signatureUsing`, `attributes`, `ownerAddress`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `provId`         | `string`                                        |
| `did`            | `string`                                        |
| `agentId`        | `string`                                        |
| `activityId`     | `string`                                        |
| `signatureUsing` | `string`                                        |
| `attributes`     | `string`                                        |
| `ownerAddress`   | `string`                                        |
| `params?`        | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:466](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L466)

---

### wasAssociatedWith

▸ **wasAssociatedWith**(`provId`, `did`, `agentId`, `activityId`, `attributes`, `ownerAddress`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `provId`       | `string`                                        |
| `did`          | `string`                                        |
| `agentId`      | `string`                                        |
| `activityId`   | `string`                                        |
| `attributes`   | `string`                                        |
| `ownerAddress` | `string`                                        |
| `params?`      | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:516](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L516)

---

### wasDerivedFrom

▸ **wasDerivedFrom**(`provId`, `newEntityDid`, `usedEntityDid`, `agentId`, `activityId`, `attributes`, `ownerAddress`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `provId`        | `string`                                        |
| `newEntityDid`  | `string`                                        |
| `usedEntityDid` | `string`                                        |
| `agentId`       | `string`                                        |
| `activityId`    | `string`                                        |
| `attributes`    | `string`                                        |
| `ownerAddress`  | `string`                                        |
| `params?`       | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:491](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L491)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`DIDRegistry`](DIDRegistry.md)\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`DIDRegistry`](DIDRegistry.md)\>

#### Overrides

[ContractBase](ContractBase.md).[getInstance](ContractBase.md#getinstance)

#### Defined in

[src/keeper/contracts/DIDRegistry.ts:16](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/DIDRegistry.ts#L16)

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
