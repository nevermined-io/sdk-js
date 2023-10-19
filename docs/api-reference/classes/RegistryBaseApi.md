[@nevermined-io/sdk](../code-reference.md) / RegistryBaseApi

# Class: RegistryBaseApi

Abstract class proving common functionality related with Assets registration.

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`RegistryBaseApi`**

  ↳↳ [`NFTsBaseApi`](NFTsBaseApi.md)

  ↳↳ [`AssetsApi`](AssetsApi.md)

  ↳↳ [`ComputeApi`](ComputeApi.md)

## Table of contents

### Constructors

- [constructor](RegistryBaseApi.md#constructor)

### Properties

- [servicePlugin](RegistryBaseApi.md#serviceplugin)

### Accessors

- [artifactsFolder](RegistryBaseApi.md#artifactsfolder)
- [circuitsFolder](RegistryBaseApi.md#circuitsfolder)
- [config](RegistryBaseApi.md#config)
- [instanceConfig](RegistryBaseApi.md#instanceconfig)
- [instantiableConfig](RegistryBaseApi.md#instantiableconfig)
- [logger](RegistryBaseApi.md#logger)
- [nevermined](RegistryBaseApi.md#nevermined)
- [web3](RegistryBaseApi.md#web3)

### Methods

- [addRating](RegistryBaseApi.md#addrating)
- [getPriced](RegistryBaseApi.md#getpriced)
- [list](RegistryBaseApi.md#list)
- [orderAsset](RegistryBaseApi.md#orderasset)
- [registerNeverminedAsset](RegistryBaseApi.md#registerneverminedasset)
- [resolveAsset](RegistryBaseApi.md#resolveasset)
- [setInstanceConfig](RegistryBaseApi.md#setinstanceconfig)
- [updateAsset](RegistryBaseApi.md#updateasset)
- [getInstance](RegistryBaseApi.md#getinstance)
- [getServicePlugin](RegistryBaseApi.md#getserviceplugin)
- [setInstanceConfig](RegistryBaseApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new RegistryBaseApi**()

#### Inherited from

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

## Properties

### servicePlugin

• **servicePlugin**: `Object`

#### Index signature

▪ [key: `string`]: [`ServicePlugin`](../interfaces/ServicePlugin.md)<[`Service`](../code-reference.md#service)\>

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L29)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### addRating

▸ **addRating**(`did`, `newRating`, `numVotesAdded?`, `publisher`, `publishMetadata?`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

Given a DID, it adds a vote to the asset curation information.

#### Parameters

| Name              | Type                                                           | Default value                            | Description                                                                      |
| :---------------- | :------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------- |
| `did`             | `string`                                                       | `undefined`                              | Decentralized ID representing the unique id of an asset in a Nevermined network. |
| `newRating`       | `number`                                                       | `undefined`                              | New average rating of the asset                                                  |
| `numVotesAdded`   | `number`                                                       | `1`                                      | Number of new votes added to the rating, typically just 1                        |
| `publisher`       | [`Account`](Account.md)                                        | `undefined`                              | Account of the user updating the metadata                                        |
| `publishMetadata` | [`PublishMetadataOptions`](../enums/PublishMetadataOptions.md) | `PublishMetadataOptions.OnlyMetadataAPI` | It allows to specify where to store the metadata                                 |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md)                | `undefined`                              | Optional transaction parameters                                                  |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

[DDO](DDO.md) The DDO updated

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:514](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L514)

---

### getPriced

▸ `Private` **getPriced**(`assetPrice`): `Promise`<[`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation)\>

#### Parameters

| Name         | Type                          |
| :----------- | :---------------------------- |
| `assetPrice` | [`AssetPrice`](AssetPrice.md) |

#### Returns

`Promise`<[`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation)\>

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:629](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L629)

---

### list

▸ **list**(`did`, `list`, `publisher`, `publishMetadata?`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

Given a DID, updates the metadata associated to the asset allowing to list or unlist it. It also can upload this metadata to a remote decentralized stored depending on the `publishMetadata` parameter.
In a Nevermined environment, when an asset is unlisted, it is not possible to be found and accessed by any user.

#### Parameters

| Name              | Type                                                           | Default value                            | Description                                                                      |
| :---------------- | :------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------- |
| `did`             | `string`                                                       | `undefined`                              | Decentralized ID representing the unique id of an asset in a Nevermined network. |
| `list`            | `boolean`                                                      | `undefined`                              | Needs the asset to be listed or unlisted                                         |
| `publisher`       | [`Account`](Account.md)                                        | `undefined`                              | Account of the user updating the metadata                                        |
| `publishMetadata` | [`PublishMetadataOptions`](../enums/PublishMetadataOptions.md) | `PublishMetadataOptions.OnlyMetadataAPI` | It allows to specify where to store the metadata                                 |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md)                | `undefined`                              | Optional transaction parameters                                                  |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

[DDO](DDO.md) The DDO updated

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:462](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L462)

---

### orderAsset

▸ **orderAsset**(`did`, `serviceReference`, `consumer`, `params?`): [`SubscribablePromise`](SubscribablePromise.md)<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

Start the purchase/order of an asset's service. Starts by signing the service agreement
then sends the request to the publisher via the service endpoint (Node http service).

#### Parameters

| Name               | Type                                                          | Description       |
| :----------------- | :------------------------------------------------------------ | :---------------- |
| `did`              | `string`                                                      | Decentralized ID. |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | Service.          |
| `consumer`         | [`Account`](Account.md)                                       | Consumer account. |
| `params?`          | [`TxParameters`](../interfaces/TxParameters.md)               | -                 |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

The agreement ID.

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:563](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L563)

---

### registerNeverminedAsset

▸ `Protected` **registerNeverminedAsset**(`assetAttributes`, `publisher`, `publicationOptions`, `nftAttributes?`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

It registers a new asset in a Nevermined network. This method is protected and not exposed
via the Nevermined APIs directly. It must accessed via the `assets`, `compute`, and `nfts` APIs.

#### Parameters

| Name                 | Type                                                    | Description                                                                       |
| :------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------- |
| `assetAttributes`    | [`AssetAttributes`](AssetAttributes.md)                 | Attributes describing the asset                                                   |
| `publisher`          | [`Account`](Account.md)                                 | The account publishing the asset                                                  |
| `publicationOptions` | [`AssetPublicationOptions`](AssetPublicationOptions.md) | Allows to specify the publication options of the off-chain and the on-chain data. |
| `nftAttributes?`     | [`NFTAttributes`](NFTAttributes.md)                     | Attributes describing the NFT (ERC-721) associated to the asset                   |
| `txParams?`          | [`TxParameters`](../interfaces/TxParameters.md)         | Optional transaction parameters                                                   |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

The metadata of the asset created (DDO)

**`See`**

[PublishOnChainOptions](../enums/PublishOnChainOptions.md) and [PublishMetadataOptions](../enums/PublishMetadataOptions.md)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L42)

---

### resolveAsset

▸ `Protected` **resolveAsset**(`did`, `policy?`): `Promise`<[`DDO`](DDO.md)\>

Returns a DDO by DID. Depending of the resolution policy it prioritize the Metadata API or Immutable urls.

#### Parameters

| Name     | Type                                               | Default value                       | Description                                                                                                                                                        |
| :------- | :------------------------------------------------- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `did`    | `string`                                           | `undefined`                         | Decentralized ID.                                                                                                                                                  |
| `policy` | [`DIDResolvePolicy`](../enums/DIDResolvePolicy.md) | `DIDResolvePolicy.MetadataAPIFirst` | It specifies the resolve policy to apply. It allows to select that priorities during the asset resolution via Metadata API or Immutable URLs (IPFS, Filecoin, etc) |

#### Returns

`Promise`<[`DDO`](DDO.md)\>

[DDO](DDO.md)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:310](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L310)

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

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### updateAsset

▸ `Protected` **updateAsset**(`did`, `metadata`, `publisher`, `publishMetadataOptions?`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

Given a DID, updates the metadata associated to the asset. It also can upload this metadata to a remote decentralized stored depending on the `publishMetadata` parameter.

#### Parameters

| Name                     | Type                                                           | Default value                            | Description                                                                      |
| :----------------------- | :------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------- |
| `did`                    | `string`                                                       | `undefined`                              | Decentralized ID representing the unique id of an asset in a Nevermined network. |
| `metadata`               | [`MetaData`](../interfaces/MetaData.md)                        | `undefined`                              | Metadata describing the asset                                                    |
| `publisher`              | [`Account`](Account.md)                                        | `undefined`                              | Account of the user updating the metadata                                        |
| `publishMetadataOptions` | [`PublishMetadataOptions`](../enums/PublishMetadataOptions.md) | `PublishMetadataOptions.OnlyMetadataAPI` | It allows to specify where to store the metadata                                 |
| `txParams?`              | [`TxParameters`](../interfaces/TxParameters.md)                | `undefined`                              | Optional transaction parameters                                                  |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

[DDO](DDO.md) The DDO updated

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:353](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L353)

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

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

#### Defined in

[src/Instantiable.abstract.ts:86](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L86)

---

### getServicePlugin

▸ `Static` `Protected` **getServicePlugin**(`config`): `Object`

Initializes the default Nevermined service plugins and return that instance

#### Parameters

| Name     | Type                                                        | Description       |
| :------- | :---------------------------------------------------------- | :---------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | Nevermined config |

#### Returns

`Object`

The Nevermined Service Plugin instance

| Name          | Type                                                                                                          |
| :------------ | :------------------------------------------------------------------------------------------------------------ |
| `aave-credit` | [`ServicePlugin`](../interfaces/ServicePlugin.md)<[`ServiceAaveCredit`](../interfaces/ServiceAaveCredit.md)\> |
| `access`      | [`AccessService`](AccessService.md)                                                                           |
| `compute`     | [`EscrowComputeExecutionTemplate`](EscrowComputeExecutionTemplate.md)                                         |
| `nft-access`  | [`NFTAccessService`](NFTAccessService.md)                                                                     |
| `nft-sales`   | [`NFTSalesService`](NFTSalesService.md)                                                                       |

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:618](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L618)

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

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
