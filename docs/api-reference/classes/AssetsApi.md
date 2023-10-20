[@nevermined-io/sdk](../code-reference.md) / AssetsApi

# Class: AssetsApi

Nevermined Assets API. It allows the registration and management of digital assets in a
Nevermined digital ecosystem.
You can find more information about you can do in a Nevermined information here:
[https://docs.nevermined.io/docs/architecture/what-can-i-do](https://docs.nevermined.io/docs/architecture/what-can-i-do)

## Hierarchy

- [`RegistryBaseApi`](RegistryBaseApi.md)

  ↳ **`AssetsApi`**

## Table of contents

### Constructors

- [constructor](AssetsApi.md#constructor)

### Properties

- [providers](AssetsApi.md#providers)
- [servicePlugin](AssetsApi.md#serviceplugin)

### Accessors

- [artifactsFolder](AssetsApi.md#artifactsfolder)
- [circuitsFolder](AssetsApi.md#circuitsfolder)
- [config](AssetsApi.md#config)
- [instanceConfig](AssetsApi.md#instanceconfig)
- [instantiableConfig](AssetsApi.md#instantiableconfig)
- [logger](AssetsApi.md#logger)
- [nevermined](AssetsApi.md#nevermined)
- [web3](AssetsApi.md#web3)

### Methods

- [access](AssetsApi.md#access)
- [addRating](AssetsApi.md#addrating)
- [consumerAssets](AssetsApi.md#consumerassets)
- [create](AssetsApi.md#create)
- [download](AssetsApi.md#download)
- [getNftContractAddress](AssetsApi.md#getnftcontractaddress)
- [getPermissions](AssetsApi.md#getpermissions)
- [grantPermissions](AssetsApi.md#grantpermissions)
- [list](AssetsApi.md#list)
- [order](AssetsApi.md#order)
- [orderAsset](AssetsApi.md#orderasset)
- [owner](AssetsApi.md#owner)
- [ownerAssets](AssetsApi.md#ownerassets)
- [ownerSignature](AssetsApi.md#ownersignature)
- [registerNeverminedAsset](AssetsApi.md#registerneverminedasset)
- [resolve](AssetsApi.md#resolve)
- [resolveAsset](AssetsApi.md#resolveasset)
- [retire](AssetsApi.md#retire)
- [revokePermissions](AssetsApi.md#revokepermissions)
- [setInstanceConfig](AssetsApi.md#setinstanceconfig)
- [transferOwnership](AssetsApi.md#transferownership)
- [update](AssetsApi.md#update)
- [updateAsset](AssetsApi.md#updateasset)
- [getInstance](AssetsApi.md#getinstance)
- [getServicePlugin](AssetsApi.md#getserviceplugin)
- [setInstanceConfig](AssetsApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new AssetsApi**(`config`)

Creates a new AssetsApi

#### Parameters

| Name     | Type                                                        | Description                              |
| :------- | :---------------------------------------------------------- | :--------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | Configuration of the Nevermined instance |

#### Overrides

[RegistryBaseApi](RegistryBaseApi.md).[constructor](RegistryBaseApi.md#constructor)

#### Defined in

[src/nevermined/api/AssetsApi.ts:121](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L121)

## Properties

### providers

• **providers**: [`Providers`](Providers.md)

Utilities about the providers associated to an asset

#### Defined in

[src/nevermined/api/AssetsApi.ts:114](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L114)

---

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

### access

▸ **access**(`agreementId`, `did`, `serviceReference`, `consumerAccount`, `resultPath?`, `fileIndex?`, `buyer?`, `babysig?`): `Promise`<`string` \| `true`\>

Having previously ordered an "access" service (referenced via an "agreementId").
This method allows to download the assets associated to that service.

#### Parameters

| Name               | Type                                                          | Default value | Description                                                                                                                                |
| :----------------- | :------------------------------------------------------------ | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `agreementId`      | `string`                                                      | `undefined`   | The unique identifier of the order placed for a service                                                                                    |
| `did`              | `string`                                                      | `undefined`   | Unique identifier of the asset ordered                                                                                                     |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | `undefined`   | The service to download. By default is the access service, but it can be specified the service.index to refer a different specific service |
| `consumerAccount`  | [`Account`](Account.md)                                       | `undefined`   | The account of the user who ordered the asset and is downloading the files                                                                 |
| `resultPath?`      | `string`                                                      | `undefined`   | Where the files will be downloaded                                                                                                         |
| `fileIndex`        | `number`                                                      | `-1`          | The file to download. If not given or is -1 it will download all of them.                                                                  |
| `buyer?`           | `string`                                                      | `undefined`   | Key which represent the buyer                                                                                                              |
| `babysig?`         | [`Babysig`](../interfaces/Babysig.md)                         | `undefined`   | An elliptic curve signature                                                                                                                |

#### Returns

`Promise`<`string` \| `true`\>

The result path or true if everything went okay

#### Defined in

[src/nevermined/api/AssetsApi.ts:235](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L235)

---

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

### consumerAssets

▸ **consumerAssets**(`consumerAccount`): `Promise`<`string`[]\>

Returns the assets of a consumer.

#### Parameters

| Name              | Type     | Description       |
| :---------------- | :------- | :---------------- |
| `consumerAccount` | `string` | Consumer address. |

#### Returns

`Promise`<`string`[]\>

List of DIDs.

#### Defined in

[src/nevermined/api/AssetsApi.ts:352](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L352)

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

[src/nevermined/api/AssetsApi.ts:154](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L154)

---

### download

▸ **download**(`did`, `ownerAccount`, `resultPath?`, `fileIndex?`, `serviceType?`, `buyer?`, `babysig?`): `Promise`<`string`\>

It allows to download of the files attached to the asset by their owner or provider.
This method only can be called successfully by the owner of the asset or a provider.

#### Parameters

| Name           | Type                                              | Default value | Description                                |
| :------------- | :------------------------------------------------ | :------------ | :----------------------------------------- |
| `did`          | `string`                                          | `undefined`   | The Decentralized Identifier of the asset. |
| `ownerAccount` | [`Account`](Account.md)                           | `undefined`   | The receiver account owner                 |
| `resultPath?`  | `string`                                          | `undefined`   | Path to be the files downloader            |
| `fileIndex`    | `number`                                          | `-1`          | The index of the file                      |
| `serviceType`  | [`ServiceType`](../code-reference.md#servicetype) | `'access'`    | Service type. 'access' by default          |
| `buyer?`       | `string`                                          | `undefined`   | Key which represent the buyer              |
| `babysig?`     | [`Babysig`](../interfaces/Babysig.md)             | `undefined`   | An elliptic curve signature                |

#### Returns

`Promise`<`string`\>

Status, path destination if resultPath is provided

#### Defined in

[src/nevermined/api/AssetsApi.ts:377](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L377)

---

### getNftContractAddress

▸ **getNftContractAddress**(`ddo`, `serviceType?`): `string`

Get the NFT contract address associated with a Nevermined asset.

#### Parameters

| Name          | Type                                              | Default value  | Description                                              |
| :------------ | :------------------------------------------------ | :------------- | :------------------------------------------------------- |
| `ddo`         | [`DDO`](DDO.md)                                   | `undefined`    | The DDO of the asset.                                    |
| `serviceType` | [`ServiceType`](../code-reference.md#servicetype) | `'nft-access'` | The service type to use to get the NFT contract address. |

#### Returns

`string`

The NFT contract address.

**`Example`**

```ts
nevermined.assets.getNftContractAddress(ddo)
```

**`Throws`**

DDOError - If the NFT contract address is not found in the DDO.

#### Defined in

[src/nevermined/api/AssetsApi.ts:490](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L490)

---

### getPermissions

▸ **getPermissions**(`did`, `address`): `Promise`<`boolean`\>

Checks if an account with a specific address has permissions to a specific asset represented by a DID

#### Parameters

| Name      | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `did`     | `string` | The unique identifier of the asset to check the permissions |
| `address` | `string` | The address of the account to check the permissions         |

#### Returns

`Promise`<`boolean`\>

True if the address has permissions on the asset

#### Defined in

[src/nevermined/api/AssetsApi.ts:472](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L472)

---

### grantPermissions

▸ **grantPermissions**(`did`, `address`, `ownerAccount`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It grants permissions to an account for a specific asset represented by a DID.
Only can be called by the asset owner.

#### Parameters

| Name           | Type                                            | Description                                                    |
| :------------- | :---------------------------------------------- | :------------------------------------------------------------- |
| `did`          | `string`                                        | The unique identifier of the assert                            |
| `address`      | `string`                                        | The account to grant the permissions                           |
| `ownerAccount` | [`Account`](Account.md)                         | Account sending the request. It must be the owner of the asset |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                                         |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/nevermined/api/AssetsApi.ts:430](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L430)

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

### order

▸ **order**(`did`, `serviceReference?`, `consumerAccount`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

Start the purchase/order of an access service. Starts by signing the service agreement
then sends the request to the publisher via the service endpoint (Node http service).
If the access service to purchase is having associated some price, it will make the payment
for that service.

#### Parameters

| Name               | Type                                                          | Default value | Description                                                                                                                             |
| :----------------- | :------------------------------------------------------------ | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `did`              | `string`                                                      | `undefined`   | Unique identifier of the asset to order                                                                                                 |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | `'access'`    | The service to order. By default is the access service, but it can be specified the service.index to refer a different specific service |
| `consumerAccount`  | [`Account`](Account.md)                                       | `undefined`   | The account of the user ordering the asset                                                                                              |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)               | `undefined`   | Optional transaction parameters                                                                                                         |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

The agreement ID identifying the order

#### Defined in

[src/nevermined/api/AssetsApi.ts:213](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L213)

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

### owner

▸ **owner**(`did`): `Promise`<`string`\>

Returns the owner of an asset.

#### Parameters

| Name  | Type     | Description       |
| :---- | :------- | :---------------- |
| `did` | `string` | Decentralized ID. |

#### Returns

`Promise`<`string`\>

The address of the owner of the asset

#### Defined in

[src/nevermined/api/AssetsApi.ts:290](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L290)

---

### ownerAssets

▸ **ownerAssets**(`owner`): `Promise`<`string`[]\>

Returns the assets owned by an address

#### Parameters

| Name    | Type     | Description          |
| :------ | :------- | :------------------- |
| `owner` | `string` | The address to check |

#### Returns

`Promise`<`string`[]\>

List of DIDs owned by the address

#### Defined in

[src/nevermined/api/AssetsApi.ts:319](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L319)

---

### ownerSignature

▸ **ownerSignature**(`did`): `Promise`<`string`\>

Returns the owner of an asset.

#### Parameters

| Name  | Type     | Description       |
| :---- | :------- | :---------------- |
| `did` | `string` | Decentralized ID. |

#### Returns

`Promise`<`string`\>

The address of the owner of the asset

#### Defined in

[src/nevermined/api/AssetsApi.ts:299](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L299)

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

### resolve

▸ **resolve**(`did`, `policy?`): `Promise`<[`DDO`](DDO.md)\>

Returns a DDO by DID. Depending of the resolution policy it prioritize the Metadata API or Immutable urls.

#### Parameters

| Name     | Type                                               | Default value                 | Description                                                                                                                                                        |
| :------- | :------------------------------------------------- | :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `did`    | `string`                                           | `undefined`                   | Decentralized ID.                                                                                                                                                  |
| `policy` | [`DIDResolvePolicy`](../enums/DIDResolvePolicy.md) | `DIDResolvePolicy.NoRegistry` | It specifies the resolve policy to apply. It allows to select that priorities during the asset resolution via Metadata API or Immutable URLs (IPFS, Filecoin, etc) |

#### Returns

`Promise`<[`DDO`](DDO.md)\>

[DDO](DDO.md)

#### Defined in

[src/nevermined/api/AssetsApi.ts:134](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L134)

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

### retire

▸ **retire**(`did`): `Promise`<`Response`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/nevermined/api/AssetsApi.ts:360](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L360)

---

### revokePermissions

▸ **revokePermissions**(`did`, `address`, `ownerAccount`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

It revokes permissions to an account for a specific asset represented by a DID.
Only can be called by the asset owner.

#### Parameters

| Name           | Type                                            | Description                                                    |
| :------------- | :---------------------------------------------- | :------------------------------------------------------------- |
| `did`          | `string`                                        | The unique identifier of the assert                            |
| `address`      | `string`                                        | The account to revoke the permissions                          |
| `ownerAccount` | [`Account`](Account.md)                         | Account sending the request. It must be the owner of the asset |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                                         |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/nevermined/api/AssetsApi.ts:452](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L452)

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

### transferOwnership

▸ **transferOwnership**(`did`, `newOwner`, `owner`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Transfer ownership of an asset.

#### Parameters

| Name        | Type                                            | Description                                                |
| :---------- | :---------------------------------------------- | :--------------------------------------------------------- |
| `did`       | `string`                                        | Asset DID.                                                 |
| `newOwner`  | `string`                                        | Ethereum address of the new owner of the DID.              |
| `owner`     | `string` \| [`Account`](Account.md)             | Account owning the DID and doing the transfer of ownership |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                                     |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

Returns ethers transaction receipt.

#### Defined in

[src/nevermined/api/AssetsApi.ts:331](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L331)

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
const ddoUpdated = await nevermined.assets.update(
  ddo.shortId(),
  updatedMetadata,
  publisher,
  PublishMetadata.IPFS,
)
```

#### Defined in

[src/nevermined/api/AssetsApi.ts:192](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AssetsApi.ts#L192)

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
