[@nevermined-io/sdk](../code-reference.md) / ComputeApi

# Class: ComputeApi

Nevermined Compute API. It allows the registration execution of compute jobs on top
of data registered in a Nevermined digital ecosystem.

You can find more information about the Nevermined compute solution here:
[https://docs.nevermined.io/docs/getting-started/remote-computation](https://docs.nevermined.io/docs/getting-started/remote-computation)

## Hierarchy

- [`RegistryBaseApi`](RegistryBaseApi.md)

  ↳ **`ComputeApi`**

## Table of contents

### Constructors

- [constructor](ComputeApi.md#constructor)

### Properties

- [servicePlugin](ComputeApi.md#serviceplugin)

### Accessors

- [artifactsFolder](ComputeApi.md#artifactsfolder)
- [circuitsFolder](ComputeApi.md#circuitsfolder)
- [config](ComputeApi.md#config)
- [instanceConfig](ComputeApi.md#instanceconfig)
- [instantiableConfig](ComputeApi.md#instantiableconfig)
- [logger](ComputeApi.md#logger)
- [nevermined](ComputeApi.md#nevermined)
- [web3](ComputeApi.md#web3)

### Methods

- [addRating](ComputeApi.md#addrating)
- [create](ComputeApi.md#create)
- [execute](ComputeApi.md#execute)
- [list](ComputeApi.md#list)
- [logs](ComputeApi.md#logs)
- [order](ComputeApi.md#order)
- [orderAsset](ComputeApi.md#orderasset)
- [registerNeverminedAsset](ComputeApi.md#registerneverminedasset)
- [resolveAsset](ComputeApi.md#resolveasset)
- [setInstanceConfig](ComputeApi.md#setinstanceconfig)
- [status](ComputeApi.md#status)
- [update](ComputeApi.md#update)
- [updateAsset](ComputeApi.md#updateasset)
- [getInstance](ComputeApi.md#getinstance)
- [getServicePlugin](ComputeApi.md#getserviceplugin)
- [setInstanceConfig](ComputeApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new ComputeApi**(`config`)

Creates a new ComputeApi

#### Parameters

| Name     | Type                                                        | Description                              |
| :------- | :---------------------------------------------------------- | :--------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | Configuration of the Nevermined instance |

#### Overrides

[RegistryBaseApi](RegistryBaseApi.md).[constructor](RegistryBaseApi.md#constructor)

#### Defined in

[src/nevermined/api/ComputeApi.ts:24](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ComputeApi.ts#L24)

## Properties

### servicePlugin

• **servicePlugin**: `Object`

#### Index signature

▪ [key: `string`]: [`ServicePlugin`](../interfaces/ServicePlugin.md)<[`Service`](../code-reference.md#service)\>

#### Inherited from

[RegistryBaseApi](RegistryBaseApi.md).[servicePlugin](RegistryBaseApi.md#serviceplugin)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L29)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

RegistryBaseApi.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

RegistryBaseApi.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

RegistryBaseApi.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

RegistryBaseApi.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

RegistryBaseApi.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

RegistryBaseApi.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

RegistryBaseApi.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

RegistryBaseApi.web3

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

#### Inherited from

[RegistryBaseApi](RegistryBaseApi.md).[addRating](RegistryBaseApi.md#addrating)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:514](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L514)

---

### create

▸ **create**(`assetAttributes`, `publisherAccount`, `publicationOptions?`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

Registers a new asset in Nevermined.
You can find more information about how different data is stored in Nevermined here:
[https://docs.nevermined.io/docs/architecture/nevermined-data](https://docs.nevermined.io/docs/architecture/nevermined-data)

#### Parameters

| Name                 | Type                                                    | Description                                                                       |
| :------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------- |
| `assetAttributes`    | [`AssetAttributes`](AssetAttributes.md)                 | Attributes describing the asset                                                   |
| `publisherAccount`   | [`Account`](Account.md)                                 | The account publishing the asset                                                  |
| `publicationOptions` | [`AssetPublicationOptions`](AssetPublicationOptions.md) | Allows to specify the publication options of the off-chain and the on-chain data. |
| `txParams?`          | [`TxParameters`](../interfaces/TxParameters.md)         | Optional transaction parameters                                                   |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

The metadata of the asset created (DDO)

[DDO](DDO.md)

**`See`**

[PublishOnChainOptions](../enums/PublishOnChainOptions.md) and [PublishMetadataOptions](../enums/PublishMetadataOptions.md)

#### Defined in

[src/nevermined/api/ComputeApi.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ComputeApi.ts#L43)

---

### execute

▸ **execute**(`agreementId`, `workflowDid`, `consumerAccount`): `Promise`<`string`\>

It triggers the execution of a compute job

#### Parameters

| Name              | Type                    | Description                                                  |
| :---------------- | :---------------------- | :----------------------------------------------------------- |
| `agreementId`     | `string`                | The unique identifier of the order placed for a service      |
| `workflowDid`     | `string`                | The unique identifier of the Asset representing the workflow |
| `consumerAccount` | [`Account`](Account.md) | The account of the user triggering the computation           |

#### Returns

`Promise`<`string`\>

If the execution is correct it returns the response given by the Nevermined Node

#### Defined in

[src/nevermined/api/ComputeApi.ts:120](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ComputeApi.ts#L120)

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

#### Inherited from

[RegistryBaseApi](RegistryBaseApi.md).[list](RegistryBaseApi.md#list)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:462](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L462)

---

### logs

▸ **logs**(`agreementId`, `executionId`, `consumerAccount`): `Promise`<`any`\>

It returns the logs resulted by the execution of a Job

#### Parameters

| Name              | Type                    | Description                                             |
| :---------------- | :---------------------- | :------------------------------------------------------ |
| `agreementId`     | `string`                | The unique identifier of the order placed for a service |
| `executionId`     | `string`                | The unique identifier of the job executed               |
| `consumerAccount` | [`Account`](Account.md) | The account of the user triggering the computation      |

#### Returns

`Promise`<`any`\>

The logs resulted of the execution of the job

#### Defined in

[src/nevermined/api/ComputeApi.ts:137](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ComputeApi.ts#L137)

---

### order

▸ **order**(`did`, `consumerAccount`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

Start the purchase/order of a compute service. Starts by signing the service agreement
then sends the request to the publisher via the service endpoint (Node http service).

#### Parameters

| Name              | Type                                            | Description                                |
| :---------------- | :---------------------------------------------- | :----------------------------------------- |
| `did`             | `string`                                        | Unique identifier of the asset to order    |
| `consumerAccount` | [`Account`](Account.md)                         | The account of the user ordering the asset |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters            |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

The agreement ID identifying the order

#### Defined in

[src/nevermined/api/ComputeApi.ts:105](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ComputeApi.ts#L105)

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

#### Inherited from

[RegistryBaseApi](RegistryBaseApi.md).[orderAsset](RegistryBaseApi.md#orderasset)

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

#### Inherited from

[RegistryBaseApi](RegistryBaseApi.md).[registerNeverminedAsset](RegistryBaseApi.md#registerneverminedasset)

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

#### Inherited from

[RegistryBaseApi](RegistryBaseApi.md).[resolveAsset](RegistryBaseApi.md#resolveasset)

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

[RegistryBaseApi](RegistryBaseApi.md).[setInstanceConfig](RegistryBaseApi.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### status

▸ **status**(`agreementId`, `executionId`, `consumerAccount`): `Promise`<`any`\>

It returns the status of a compute job

#### Parameters

| Name              | Type                    | Description                                             |
| :---------------- | :---------------------- | :------------------------------------------------------ |
| `agreementId`     | `string`                | The unique identifier of the order placed for a service |
| `executionId`     | `string`                | The unique identifier of the job executed               |
| `consumerAccount` | [`Account`](Account.md) | The account of the user triggering the computation      |

#### Returns

`Promise`<`any`\>

The status of the job

#### Defined in

[src/nevermined/api/ComputeApi.ts:152](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ComputeApi.ts#L152)

---

### update

▸ **update**(`did`, `metadata`, `publisherAccount`, `publishMetadata?`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

Given a DID, updates the metadata associated to the asset. It also can upload this metadata to a remote decentralized stored depending on the `publishMetadata` parameter.

#### Parameters

| Name               | Type                                                           | Default value                            | Description                                                                      |
| :----------------- | :------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------- |
| `did`              | `string`                                                       | `undefined`                              | Decentralized ID representing the unique id of an asset in a Nevermined network. |
| `metadata`         | [`MetaData`](../interfaces/MetaData.md)                        | `undefined`                              | Metadata describing the asset                                                    |
| `publisherAccount` | [`Account`](Account.md)                                        | `undefined`                              | Account of the user updating the metadata                                        |
| `publishMetadata`  | [`PublishMetadataOptions`](../enums/PublishMetadataOptions.md) | `PublishMetadataOptions.OnlyMetadataAPI` | It allows to specify where to store the metadata                                 |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)                | `undefined`                              | Optional transaction parameters                                                  |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

[DDO](DDO.md) The DDO updated

**`Example`**

```ts
const ddoUpdated = await nevermined.compute.update(
  ddo.shortId(),
  updatedMetadata,
  publisher,
  PublishMetadata.IPFS,
)
```

#### Defined in

[src/nevermined/api/ComputeApi.ts:87](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ComputeApi.ts#L87)

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

#### Inherited from

[RegistryBaseApi](RegistryBaseApi.md).[updateAsset](RegistryBaseApi.md#updateasset)

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

[RegistryBaseApi](RegistryBaseApi.md).[getInstance](RegistryBaseApi.md#getinstance)

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

#### Inherited from

[RegistryBaseApi](RegistryBaseApi.md).[getServicePlugin](RegistryBaseApi.md#getserviceplugin)

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

[RegistryBaseApi](RegistryBaseApi.md).[setInstanceConfig](RegistryBaseApi.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
