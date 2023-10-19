[@nevermined-io/sdk](../code-reference.md) / NFTsBaseApi

# Class: NFTsBaseApi

Abstract class providing common NFT methods for different ERC implementations.

## Hierarchy

- [`RegistryBaseApi`](RegistryBaseApi.md)

  ↳ **`NFTsBaseApi`**

  ↳↳ [`NFT721Api`](NFT721Api.md)

  ↳↳ [`NFT1155Api`](NFT1155Api.md)

## Table of contents

### Constructors

- [constructor](NFTsBaseApi.md#constructor)

### Properties

- [servicePlugin](NFTsBaseApi.md#serviceplugin)

### Accessors

- [artifactsFolder](NFTsBaseApi.md#artifactsfolder)
- [circuitsFolder](NFTsBaseApi.md#circuitsfolder)
- [config](NFTsBaseApi.md#config)
- [instanceConfig](NFTsBaseApi.md#instanceconfig)
- [instantiableConfig](NFTsBaseApi.md#instantiableconfig)
- [logger](NFTsBaseApi.md#logger)
- [nevermined](NFTsBaseApi.md#nevermined)
- [web3](NFTsBaseApi.md#web3)

### Methods

- [\_details](NFTsBaseApi.md#_details)
- [access](NFTsBaseApi.md#access)
- [addRating](NFTsBaseApi.md#addrating)
- [buySecondaryMarketNft](NFTsBaseApi.md#buysecondarymarketnft)
- [claimNFT](NFTsBaseApi.md#claimnft)
- [getSubscriptionToken](NFTsBaseApi.md#getsubscriptiontoken)
- [isOperator](NFTsBaseApi.md#isoperator)
- [isOperatorOfDID](NFTsBaseApi.md#isoperatorofdid)
- [list](NFTsBaseApi.md#list)
- [listOnSecondaryMarkets](NFTsBaseApi.md#listonsecondarymarkets)
- [orderAsset](NFTsBaseApi.md#orderasset)
- [registerNeverminedAsset](NFTsBaseApi.md#registerneverminedasset)
- [resolveAsset](NFTsBaseApi.md#resolveasset)
- [setInstanceConfig](NFTsBaseApi.md#setinstanceconfig)
- [updateAsset](NFTsBaseApi.md#updateasset)
- [getInstance](NFTsBaseApi.md#getinstance)
- [getNFTContractAddress](NFTsBaseApi.md#getnftcontractaddress)
- [getServicePlugin](NFTsBaseApi.md#getserviceplugin)
- [setInstanceConfig](NFTsBaseApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new NFTsBaseApi**()

#### Inherited from

[RegistryBaseApi](RegistryBaseApi.md).[constructor](RegistryBaseApi.md#constructor)

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

### \_details

▸ `Protected` **\_details**(`did`, `ercType`): `Promise`<{ `blockNumberUpdated`: `number` ; `lastChecksum`: `any` ; `lastUpdatedBy`: `any` ; `mintCap`: `bigint` ; `nftContractAddress`: `any` ; `nftInitialized`: `any` ; `nftSupply`: `bigint` ; `nftURI`: `string` ; `owner`: `any` ; `providers`: `any` ; `royalties`: `number` ; `royaltyScheme`: [`RoyaltyKind`](../enums/RoyaltyKind.md) ; `url`: `any` }\>

Get the details of an NFT

#### Parameters

| Name      | Type                             | Description                                    |
| :-------- | :------------------------------- | :--------------------------------------------- |
| `did`     | `string`                         | The Decentralized Identifier of the NFT asset. |
| `ercType` | [`ERCType`](../enums/ERCType.md) | The type of NFT used                           |

#### Returns

`Promise`<{ `blockNumberUpdated`: `number` ; `lastChecksum`: `any` ; `lastUpdatedBy`: `any` ; `mintCap`: `bigint` ; `nftContractAddress`: `any` ; `nftInitialized`: `any` ; `nftSupply`: `bigint` ; `nftURI`: `string` ; `owner`: `any` ; `providers`: `any` ; `royalties`: `number` ; `royaltyScheme`: [`RoyaltyKind`](../enums/RoyaltyKind.md) ; `url`: `any` }\>

The details of the NFT.

**`Example`**

```ts
const details = await nevermined.nfts1155.details(ddo.id)

// The `details` object includes the NFT information

assert.equal(details.mintCap, 5)
assert.equal(details.nftSupply, 5)
assert.equal(details.royaltyScheme, RoyaltyKind.Standard)
assert.equal(details.royalties, 100000)
assert.equal(details.owner, artist.getId())
```

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:150](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L150)

---

### access

▸ **access**(`did`, `consumer`, `destination?`, `fileIndex?`, `agreementId?`, `buyer?`, `babysig?`, `serviceReference?`): `Promise`<`boolean`\>

Access the files associated with an NFT.

#### Parameters

| Name               | Type                                                          | Default value  | Description                                                               |
| :----------------- | :------------------------------------------------------------ | :------------- | :------------------------------------------------------------------------ |
| `did`              | `string`                                                      | `undefined`    | The Decentralized Identifier of the NFT asset.                            |
| `consumer`         | [`Account`](Account.md)                                       | `undefined`    | The NFT holder account.                                                   |
| `destination?`     | `string`                                                      | `undefined`    | The download destination for the files.                                   |
| `fileIndex?`       | `number`                                                      | `undefined`    | The index of the file. If unset will download all the files in the asset. |
| `agreementId`      | `string`                                                      | `'0x'`         | The NFT sales agreement id.                                               |
| `buyer?`           | `string`                                                      | `undefined`    | Key which represent the buyer                                             |
| `babysig?`         | [`Babysig`](../interfaces/Babysig.md)                         | `undefined`    | -                                                                         |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | `'nft-access'` | The service reference to use. By default is nft-access.                   |

#### Returns

`Promise`<`boolean`\>

true if the access was successful or file if isToDownload is false.

**`Remarks`**

This function will call the Node that will check if all the access conditions where fulfilled
before providing the files.

**`Example`**

```ts
const result = await nevermined.nfts1155.access(ddo.id, collector, '/tmp/')
```

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:419](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L419)

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

### buySecondaryMarketNft

▸ **buySecondaryMarketNft**(`consumer`, `nftAmount?`, `agreementIdSeed`, `conditionsTimeout?`, `txParams?`): `Promise`<`boolean`\>

Buys a number of listed NFTs on secondary markets.

#### Parameters

| Name                | Type                                            | Description                                |
| :------------------ | :---------------------------------------------- | :----------------------------------------- |
| `consumer`          | [`Account`](Account.md)                         | The account of the buyer/consumer.         |
| `nftAmount`         | `bigint`                                        | The number of assets to buy. 1 by default. |
| `agreementIdSeed`   | `string`                                        | -                                          |
| `conditionsTimeout` | `number`[]                                      | -                                          |
| `txParams?`         | [`TxParameters`](../interfaces/TxParameters.md) | -                                          |

#### Returns

`Promise`<`boolean`\>

true if the buy was successful.

**`Example`**

```ts
const result = await nevermined.nfts1155.buySecondaryMarketNft(collector, 1n, agreementId)
```

**`Throws`**

[NFTError](NFTError.md)
Thrown if there is an error buying the NFT.

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:341](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L341)

---

### claimNFT

▸ `Protected` **claimNFT**(`agreementId`, `nftHolder`, `nftReceiver`, `numberEditions?`, `ercType?`, `did?`, `serviceIndex?`): `Promise`<`boolean`\>

Claims the transfer of a NFT to the Nevermined Node on behalf of the publisher.

#### Parameters

| Name             | Type                             | Default value | Description                                                                  |
| :--------------- | :------------------------------- | :------------ | :--------------------------------------------------------------------------- |
| `agreementId`    | `string`                         | `undefined`   | The NFT sales agreement id.                                                  |
| `nftHolder`      | `string`                         | `undefined`   | The address of the current owner of the NFT.                                 |
| `nftReceiver`    | `string`                         | `undefined`   | The address where the NFT should be transferred.                             |
| `numberEditions` | `bigint`                         | `undefined`   | The number of NFT editions to transfer. If the NFT is ERC-721 it should be 1 |
| `ercType`        | [`ERCType`](../enums/ERCType.md) | `1155`        | The Type of the NFT ERC (1155 or 721).                                       |
| `did?`           | `string`                         | `undefined`   | The DID of the asset.                                                        |
| `serviceIndex?`  | `number`                         | `undefined`   | The index of the service in the DDO that will be claimed                     |

#### Returns

`Promise`<`boolean`\>

true if the transfer was successful.

**`Remarks`**

This is useful when the consumer does not want to wait for the publisher
to transfer the NFT once the payment is made. Assuming the publisher delegated
transfer permissions to the Node.

One example would be a marketplace where the user wants to get access to the NFT
as soon as the payment is made

**`Example`**

```ts
const receipt = await nevermined.nfts721.claim(
  agreementId,
  editor.getId(),
  subscriber.getId(),
  nftAmount,
  721,
)
```

**`Throws`**

[NFTError](NFTError.md) if Nevermined is not an operator for this NFT

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L50)

---

### getSubscriptionToken

▸ **getSubscriptionToken**(`did`, `account`): `Promise`<[`SubscriptionToken`](../interfaces/SubscriptionToken.md)\>

Get a JWT token for an asset associated with a webService

#### Parameters

| Name      | Type                    | Description                                                                    |
| :-------- | :---------------------- | :----------------------------------------------------------------------------- |
| `did`     | `string`                | The did of the asset with a webService resource and an associated subscription |
| `account` | [`Account`](Account.md) | Account of the user requesting the token                                       |

#### Returns

`Promise`<[`SubscriptionToken`](../interfaces/SubscriptionToken.md)\>

[SubscriptionToken](../interfaces/SubscriptionToken.md)

**`Example`**

```ts
const response = await nevermined.nfts721.getSubscriptionToken(serviceDDO.id, subscriber)

assert.isDefined(response.accessToken)
assert.isDefined(response.neverminedProxyUri)
```

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:478](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L478)

---

### isOperator

▸ **isOperator**(`nftContractAddress`, `operatorAddress`, `ercType?`): `Promise`<`boolean`\>

Check if a particular address is the operator of given a NFT address.

#### Parameters

| Name                 | Type                             | Default value | Description                             |
| :------------------- | :------------------------------- | :------------ | :-------------------------------------- |
| `nftContractAddress` | `string`                         | `undefined`   | The DID of the NFT to check             |
| `operatorAddress`    | `string`                         | `undefined`   | The address to check if operator status |
| `ercType`            | [`ERCType`](../enums/ERCType.md) | `1155`        | The erc type of the NFT.                |

#### Returns

`Promise`<`boolean`\>

operator status of address as a boolean

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:116](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L116)

---

### isOperatorOfDID

▸ **isOperatorOfDID**(`did`, `address`, `ercType?`): `Promise`<`boolean`\>

Check if a particular address is the operator of a DID.

#### Parameters

| Name      | Type                             | Default value | Description                             |
| :-------- | :------------------------------- | :------------ | :-------------------------------------- |
| `did`     | `string`                         | `undefined`   | The DID of the NFT to check             |
| `address` | `string`                         | `undefined`   | The address to check if operator status |
| `ercType` | [`ERCType`](../enums/ERCType.md) | `1155`        | The erc type of the NFT.                |

#### Returns

`Promise`<`boolean`\>

operator status of address as a boolean

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:91](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L91)

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

### listOnSecondaryMarkets

▸ **listOnSecondaryMarkets**(`ddo`, `assetPrice`, `nftAmount`, `nftTransfer`, `provider`, `token`, `owner`): `Promise`<`string`\>

After purchase re-list an NFT to enable secondary market sales.

#### Parameters

| Name          | Type                          | Description                                                  |
| :------------ | :---------------------------- | :----------------------------------------------------------- |
| `ddo`         | [`DDO`](DDO.md)               | The DDO of the asset.                                        |
| `assetPrice`  | [`AssetPrice`](AssetPrice.md) | The current setup of asset rewards.                          |
| `nftAmount`   | `bigint`                      | The number of NFTs put up for secondary sale.                |
| `nftTransfer` | `boolean`                     | -                                                            |
| `provider`    | `string`                      | The address that will be the provider of the secondary sale. |
| `token`       | [`Token`](Token.md)           | -                                                            |
| `owner`       | [`Account`](Account.md)       | The account of the current owner.                            |

#### Returns

`Promise`<`string`\>

the agreementId of the secondary sale.

**`Example`**

```ts
const agreementId = await nevermined.nfts1155.listOnSecondaryMarkets(
  ddo,
  assetPrice,
  numberNFTs,
  collector.getId(),
  token,
  collector.getId(),
)
```

**`Throws`**

[NFTError](NFTError.md)
Thrown if there is an error listing the NFT.

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:260](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L260)

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

### getNFTContractAddress

▸ `Static` **getNFTContractAddress**(`ddo`, `serviceReference?`): `any`

Gets the NFT contract address associated with a Nevermined asset from the DDO.

#### Parameters

| Name               | Type                                                          | Default value  | Description                                       |
| :----------------- | :------------------------------------------------------------ | :------------- | :------------------------------------------------ |
| `ddo`              | [`DDO`](DDO.md)                                               | `undefined`    | The DDO of the asset.                             |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | `'nft-access'` | The service type to look for the contract address |

#### Returns

`any`

The NFT contract address.

**`Example`**

```ts
const nftContractAddress = NFT1155Api.getNFTContractAddress(ddo)
```

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:219](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L219)

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
