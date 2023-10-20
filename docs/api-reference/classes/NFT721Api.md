[@nevermined-io/sdk](../code-reference.md) / NFT721Api

# Class: NFT721Api

Allows the interaction with external ERC-721 NFT contracts built on top of the Nevermined NFT extra features.

## Hierarchy

- [`NFTsBaseApi`](NFTsBaseApi.md)

  ↳ **`NFT721Api`**

  ↳↳ [`SubscriptionNFTApi`](SubscriptionNFTApi.md)

## Table of contents

### Constructors

- [constructor](NFT721Api.md#constructor)

### Properties

- [nftContract](NFT721Api.md#nftcontract)
- [servicePlugin](NFT721Api.md#serviceplugin)

### Accessors

- [address](NFT721Api.md#address)
- [artifactsFolder](NFT721Api.md#artifactsfolder)
- [circuitsFolder](NFT721Api.md#circuitsfolder)
- [config](NFT721Api.md#config)
- [getContract](NFT721Api.md#getcontract)
- [instanceConfig](NFT721Api.md#instanceconfig)
- [instantiableConfig](NFT721Api.md#instantiableconfig)
- [logger](NFT721Api.md#logger)
- [nevermined](NFT721Api.md#nevermined)
- [web3](NFT721Api.md#web3)

### Methods

- [\_details](NFT721Api.md#_details)
- [access](NFT721Api.md#access)
- [addRating](NFT721Api.md#addrating)
- [balanceOf](NFT721Api.md#balanceof)
- [burn](NFT721Api.md#burn)
- [buySecondaryMarketNft](NFT721Api.md#buysecondarymarketnft)
- [claim](NFT721Api.md#claim)
- [claimNFT](NFT721Api.md#claimnft)
- [create](NFT721Api.md#create)
- [details](NFT721Api.md#details)
- [getSubscriptionToken](NFT721Api.md#getsubscriptiontoken)
- [grantOperatorRole](NFT721Api.md#grantoperatorrole)
- [isApprovedForAll](NFT721Api.md#isapprovedforall)
- [isOperator](NFT721Api.md#isoperator)
- [isOperatorOfDID](NFT721Api.md#isoperatorofdid)
- [list](NFT721Api.md#list)
- [listOnSecondaryMarkets](NFT721Api.md#listonsecondarymarkets)
- [mint](NFT721Api.md#mint)
- [mintWithURL](NFT721Api.md#mintwithurl)
- [order](NFT721Api.md#order)
- [orderAsset](NFT721Api.md#orderasset)
- [ownerOf](NFT721Api.md#ownerof)
- [ownerOfAsset](NFT721Api.md#ownerofasset)
- [ownerOfAssetByAgreement](NFT721Api.md#ownerofassetbyagreement)
- [ownerOfTokenId](NFT721Api.md#owneroftokenid)
- [registerNeverminedAsset](NFT721Api.md#registerneverminedasset)
- [releaseRewards](NFT721Api.md#releaserewards)
- [releaseSecondaryMarketRewards](NFT721Api.md#releasesecondarymarketrewards)
- [resolveAsset](NFT721Api.md#resolveasset)
- [revokeOperatorRole](NFT721Api.md#revokeoperatorrole)
- [setApprovalForAll](NFT721Api.md#setapprovalforall)
- [setInstanceConfig](NFT721Api.md#setinstanceconfig)
- [transfer](NFT721Api.md#transfer)
- [updateAsset](NFT721Api.md#updateasset)
- [getInstance](NFT721Api.md#getinstance)
- [getNFTContractAddress](NFT721Api.md#getnftcontractaddress)
- [getServicePlugin](NFT721Api.md#getserviceplugin)
- [setInstanceConfig](NFT721Api.md#setinstanceconfig-1)

## Constructors

### constructor

• **new NFT721Api**()

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[constructor](NFTsBaseApi.md#constructor)

## Properties

### nftContract

• **nftContract**: [`Nft721Contract`](Nft721Contract.md)

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:22](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L22)

---

### servicePlugin

• **servicePlugin**: `Object`

#### Index signature

▪ [key: `string`]: [`ServicePlugin`](../interfaces/ServicePlugin.md)<[`Service`](../code-reference.md#service)\>

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[servicePlugin](NFTsBaseApi.md#serviceplugin)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L29)

## Accessors

### address

• `get` **address**(): `string`

Gets the ERC-721 NFT Contract address

#### Returns

`string`

The NFT contract address

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:55](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L55)

---

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

NFTsBaseApi.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

NFTsBaseApi.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

NFTsBaseApi.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### getContract

• `get` **getContract**(): [`Nft721Contract`](Nft721Contract.md)

Gets the instance of the ERC-721 NFT Contract where the API is connected

#### Returns

[`Nft721Contract`](Nft721Contract.md)

The `Nft721Contract` instance

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:63](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L63)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

NFTsBaseApi.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

NFTsBaseApi.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

NFTsBaseApi.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

NFTsBaseApi.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

NFTsBaseApi.web3

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

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[\_details](NFTsBaseApi.md#_details)

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

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[access](NFTsBaseApi.md#access)

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

[NFTsBaseApi](NFTsBaseApi.md).[addRating](NFTsBaseApi.md#addrating)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:514](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L514)

---

### balanceOf

▸ **balanceOf**(`account`): `Promise`<`bigint`\>

Get the NFT balance for a particular account/address

#### Parameters

| Name      | Type                                | Description                                  |
| :-------- | :---------------------------------- | :------------------------------------------- |
| `account` | `string` \| [`Account`](Account.md) | The account/address to check the balance of. |

#### Returns

`Promise`<`bigint`\>

The balance of NFTs owned by the account.

**`Example`**

```ts
const balance = await nevermined.nfts721.balance(artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:506](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L506)

---

### burn

▸ **burn**(`tokenId`, `account`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Burn NFTs associated with an asset.

#### Parameters

| Name        | Type                                            | Description                              |
| :---------- | :---------------------------------------------- | :--------------------------------------- |
| `tokenId`   | `string`                                        | The identifier of the token to burn      |
| `account`   | [`Account`](Account.md)                         | The account of the publisher of the NFT. |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters.         |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceipt

**`Remarks`**

The publisher can only burn NFTs that it owns. NFTs that were already transferred cannot be burned by the publisher.

**`Example`**

```ts
await nevermined.nfts721.burn(tokenId, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:347](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L347)

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

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[buySecondaryMarketNft](NFTsBaseApi.md#buysecondarymarketnft)

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:341](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L341)

---

### claim

▸ **claim**(`agreementId`, `nftHolder`, `nftReceiver`, `did?`, `serviceIndex?`): `Promise`<`boolean`\>

Claims the transfer of a NFT to the Nevermined Node on behalf of the publisher.

#### Parameters

| Name            | Type     | Description                                              |
| :-------------- | :------- | :------------------------------------------------------- |
| `agreementId`   | `string` | The NFT sales agreement id.                              |
| `nftHolder`     | `string` | The address of the current owner of the NFT.             |
| `nftReceiver`   | `string` | The address where the NFT should be transferred.         |
| `did?`          | `string` | The Decentralized Identifier of the asset.               |
| `serviceIndex?` | `any`    | The index of the service in the DDO that will be claimed |

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
const receipt = await nevermined.nfts721.claim(agreementId, editor.getId(), subscriber.getId())
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:193](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L193)

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

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[claimNFT](NFTsBaseApi.md#claimnft)

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L50)

---

### create

▸ **create**(`nftAttributes`, `publisher`, `publicationOptions?`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

Creates a new Nevermined asset associated to a NFT (ERC-721).

#### Parameters

| Name                 | Type                                                    | Description                                                                       |
| :------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------- |
| `nftAttributes`      | [`NFTAttributes`](NFTAttributes.md)                     | Attributes describing the NFT (ERC-721) associated to the asset                   |
| `publisher`          | [`Account`](Account.md)                                 | The account publishing the asset                                                  |
| `publicationOptions` | [`AssetPublicationOptions`](AssetPublicationOptions.md) | Allows to specify the publication options of the off-chain and the on-chain data. |
| `txParams?`          | [`TxParameters`](../interfaces/TxParameters.md)         | Optional transaction parameters                                                   |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

The newly registered [DDO](DDO.md).

**`Example`**

```ts

// We define how the Asset is and the properties
// of the NFT attached to it
const nftAttributes = NFTAttributes.getNFT721Instance({
     metadata,
     price: assetPrice1,
     serviceTypes: ['nft-sales', 'nft-access']
     nftContractAddress: nftContract.address
})

// And register the asset
ddo = await nevermined.nfts721.create(
          nftAttributes,
          artist,
          { metadata: PublishMetadata.IPFS }
)
```

**`See`**

[PublishOnChainOptions](../enums/PublishOnChainOptions.md) and [PublishMetadataOptions](../enums/PublishMetadataOptions.md)

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:97](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L97)

---

### details

▸ **details**(`did`): `Promise`<{ `blockNumberUpdated`: `number` ; `lastChecksum`: `any` ; `lastUpdatedBy`: `any` ; `mintCap`: `bigint` ; `nftContractAddress`: `any` ; `nftInitialized`: `any` ; `nftSupply`: `bigint` ; `nftURI`: `string` ; `owner`: `any` ; `providers`: `any` ; `royalties`: `number` ; `royaltyScheme`: [`RoyaltyKind`](../enums/RoyaltyKind.md) ; `url`: `any` }\>

Get the details of an NFT

#### Parameters

| Name  | Type     | Description                                    |
| :---- | :------- | :--------------------------------------------- |
| `did` | `string` | The Decentralized Identifier of the NFT asset. |

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

[src/nevermined/api/nfts/NFT721Api.ts:639](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L639)

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

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[getSubscriptionToken](NFTsBaseApi.md#getsubscriptiontoken)

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:478](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L478)

---

### grantOperatorRole

▸ **grantOperatorRole**(`operatorAddress`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Adds a operator (`operatorAddress`) to the NFT Contract.
Granting and revoking operator permissions only can be done by the NFT Contract owner

#### Parameters

| Name              | Type                                            | Description                                                            |
| :---------------- | :---------------------------------------------- | :--------------------------------------------------------------------- |
| `operatorAddress` | `string`                                        | The address of the account to be added as operator in the NFT Contract |
| `from?`           | [`Account`](Account.md)                         | The account giving operator permissions                                |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters.                                       |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceipt

**`Example`**

```ts
await nevermined.nfts721.grantOperatorRole(someoneElse, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:585](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L585)

---

### isApprovedForAll

▸ **isApprovedForAll**(`operatorAddress`, `from`): `Promise`<`unknown`\>

Returns if the `operatorAddress` is approved

#### Parameters

| Name              | Type     | Description                                                                              |
| :---------------- | :------- | :--------------------------------------------------------------------------------------- |
| `operatorAddress` | `string` | The address to check the permissions                                                     |
| `from`            | `string` | The address of the account granting or revoking the permissions via `setApprovalForAll`. |

#### Returns

`Promise`<`unknown`\>

Boolean saying if the `operatorAddress` is approved

**`Example`**

```ts
await nevermined.nfts721.isApprovedForAll(someoneElse, artist.getId())
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:490](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L490)

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

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[isOperator](NFTsBaseApi.md#isoperator)

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:116](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L116)

---

### isOperatorOfDID

▸ **isOperatorOfDID**(`did`, `address`): `Promise`<`boolean`\>

Check if a particular address is the operator of a DID.

#### Parameters

| Name      | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `did`     | `string` | The DID of the NFT to check             |
| `address` | `string` | The address to check if operator status |

#### Returns

`Promise`<`boolean`\>

operator status of address as a boolean

#### Overrides

[NFTsBaseApi](NFTsBaseApi.md).[isOperatorOfDID](NFTsBaseApi.md#isoperatorofdid)

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:643](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L643)

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

[NFTsBaseApi](NFTsBaseApi.md).[list](NFTsBaseApi.md#list)

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

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[listOnSecondaryMarkets](NFTsBaseApi.md#listonsecondarymarkets)

#### Defined in

[src/nevermined/api/nfts/NFTsBaseApi.ts:260](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFTsBaseApi.ts#L260)

---

### mint

▸ **mint**(`did`, `publisher`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Mint NFTs associated with an asset.

This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.

#### Parameters

| Name        | Type                                            | Description                                    |
| :---------- | :---------------------------------------------- | :--------------------------------------------- |
| `did`       | `string`                                        | The Decentralized Identifier of the NFT asset. |
| `publisher` | [`Account`](Account.md)                         | The account of the minter                      |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters.               |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceipt

**`Example`**

```ts
await nevermined.nfts721.mint(ddo.id, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:319](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L319)

---

### mintWithURL

▸ **mintWithURL**(`to`, `did`, `url`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Mint NFTs associated with an asset allowing to specify some metadata

This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.

#### Parameters

| Name        | Type                                            | Description                                    |
| :---------- | :---------------------------------------------- | :--------------------------------------------- |
| `to`        | `string`                                        | The address receiving the NFT minted           |
| `did`       | `string`                                        | The Decentralized Identifier of the NFT asset. |
| `url`       | `string`                                        | The URL with NFT metadata                      |
| `from?`     | [`Account`](Account.md)                         | The account of the minter                      |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters.               |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceipt

**`Example`**

```ts
await nevermined.nfts721.mintWithURL(receiverAddress, ddo.id, nftMetadata, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:367](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L367)

---

### order

▸ **order**(`did`, `consumer`, `serviceReference?`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

Order a NFT-721.

#### Parameters

| Name               | Type                                                          | Default value | Description                                                    |
| :----------------- | :------------------------------------------------------------ | :------------ | :------------------------------------------------------------- |
| `did`              | `string`                                                      | `undefined`   | The Decentralized Identifier of the NFT asset.                 |
| `consumer`         | [`Account`](Account.md)                                       | `undefined`   | The account of the NFT buyer.                                  |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | `'nft-sales'` | The reference to identify wich service within the DDO to order |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)               | `undefined`   | Optional transaction parameters.                               |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

The agreement ID.

**`Remarks`**

This will lock the funds of the consumer in escrow pending the transfer of the NFTs
from the publisher.

**`Example`**

```ts
const agreementId = await nevermined.nfts721.order(ddo.id, collector)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:134](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L134)

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

[NFTsBaseApi](NFTsBaseApi.md).[orderAsset](NFTsBaseApi.md#orderasset)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:563](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L563)

---

### ownerOf

▸ **ownerOf**(`did`): `Promise`<`string`\>

Gets the contract owner

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`string`\>

Address of the contract owner

**`Example`**

```ts
const nftContractOwner = new Account(await nevermined.nfts721.ownerOf())
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:416](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L416)

---

### ownerOfAsset

▸ **ownerOfAsset**(`did`): `Promise`<`string`\>

Given a DID it gets the owner of the NFT if that DID is used as tokenId

#### Parameters

| Name  | Type     | Description                                    |
| :---- | :------- | :--------------------------------------------- |
| `did` | `string` | The Decentralized identifier of the NFT asset. |

#### Returns

`Promise`<`string`\>

The address of the NFT owner.

**`Example`**

```ts
const owner = await nevermined.nfts721.ownerOfAsset(ddo.id, nftTokenAddress)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:450](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L450)

---

### ownerOfAssetByAgreement

▸ **ownerOfAssetByAgreement**(`did`, `agreementId`): `Promise`<`string`\>

Given a DID and an agreement id it gets the owner of the NFT

#### Parameters

| Name          | Type     | Description                                    |
| :------------ | :------- | :--------------------------------------------- |
| `did`         | `string` | The Decentralized identifier of the NFT asset. |
| `agreementId` | `string` | The NFT sales agreement id.                    |

#### Returns

`Promise`<`string`\>

The address of the NFT owner.

**`Example`**

```ts
const owner = await nevermined.nfts721.ownerOfAssetByAgreement(ddo.id, agreementId)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:468](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L468)

---

### ownerOfTokenId

▸ **ownerOfTokenId**(`tokenId`): `Promise`<`string`\>

Given some information, it gets the owner of the NFT

#### Parameters

| Name      | Type     | Description  |
| :-------- | :------- | :----------- |
| `tokenId` | `string` | The token id |

#### Returns

`Promise`<`string`\>

The address of the NFT owner.

**`Example`**

```ts
const owner = await nevermined.nfts721.ownerOfTokenId(tokenId)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:433](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L433)

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

[NFTsBaseApi](NFTsBaseApi.md).[registerNeverminedAsset](NFTsBaseApi.md#registerneverminedasset)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L42)

---

### releaseRewards

▸ **releaseRewards**(`agreementId`, `did`, `publisher`, `serviceReference?`, `txParams?`): `Promise`<`boolean`\>

Release the funds from escrow.

#### Parameters

| Name               | Type                                                          | Default value | Description                                                              |
| :----------------- | :------------------------------------------------------------ | :------------ | :----------------------------------------------------------------------- |
| `agreementId`      | `string`                                                      | `undefined`   | The NFT sales agreement id.                                              |
| `did`              | `string`                                                      | `undefined`   | The Decentralized identifier of the NFT asset.                           |
| `publisher`        | [`Account`](Account.md)                                       | `undefined`   | The current owner of the NFTs.                                           |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | `'nft-sales'` | The reference to identify wich service within the DDO to release rewards |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)               | `undefined`   | Optional transaction parameters.                                         |

#### Returns

`Promise`<`boolean`\>

true if the funds release was successful.

**`Remarks`**

A publisher is able to release the funds put on escrow by the consumer after transferring the NFTs.

**`Example`**

```ts
const receipt = await nevermined.nfts721.releaseRewards(agreementId, ddo.id, artist)
```

**`Throws`**

[NFTError](NFTError.md)
Thrown if there is an error releasing the rewards.

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:277](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L277)

---

### releaseSecondaryMarketRewards

▸ **releaseSecondaryMarketRewards**(`owner`, `account`, `agreementIdSeed`, `txParams?`): `Promise`<`boolean`\>

Used to release the secondary market NFT & the locked rewards.

#### Parameters

| Name              | Type                                            | Description                                                       |
| :---------------- | :---------------------------------------------- | :---------------------------------------------------------------- |
| `owner`           | [`Account`](Account.md)                         | The owner account.                                                |
| `account`         | [`Account`](Account.md)                         | Account of the user sending the transaction                       |
| `agreementIdSeed` | `string`                                        | the seed of the Agreement Id of the underlying service agreement. |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                                            |

#### Returns

`Promise`<`boolean`\>

true if the transaction was successful.

**`Example`**

```ts
// TODO
```

**`Throws`**

[NFTError](NFTError.md)
Thrown if there is an error releasing the rewards.

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:529](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L529)

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

[NFTsBaseApi](NFTsBaseApi.md).[resolveAsset](NFTsBaseApi.md#resolveasset)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:310](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L310)

---

### revokeOperatorRole

▸ **revokeOperatorRole**(`operatorAddress`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Revokes a minter (`operatorAddress`) of the NFT Contract.
Granting and revoking minting permissions only can be done by the NFT Contract owner

#### Parameters

| Name              | Type                                            | Description                                                              |
| :---------------- | :---------------------------------------------- | :----------------------------------------------------------------------- |
| `operatorAddress` | `string`                                        | The address of the account to be revoked as operator in the NFT Contract |
| `from?`           | [`Account`](Account.md)                         | The account revoking operator permissions                                |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters.                                         |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceipt

**`Example`**

```ts
await nevermined.nfts721.revokeOperatorRole(someoneElse, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:611](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L611)

---

### setApprovalForAll

▸ **setApprovalForAll**(`target`, `approved`, `from`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Enable or disable NFT permissions for an operator.

#### Parameters

| Name        | Type                                            | Description                                                          |
| :---------- | :---------------------------------------------- | :------------------------------------------------------------------- |
| `target`    | `string`                                        | The address that of the operator we want to give transfer rights to. |
| `approved`  | `boolean`                                       | Give or remove transfer rights from the operator.                    |
| `from`      | [`Account`](Account.md)                         | The account that wants to give transfer rights to the operator.      |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters.                                     |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceipt

**`Example`**

```ts
await nevermined.nfts721.setApprovalForAll(someoneElse, true, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:395](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L395)

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

[NFTsBaseApi](NFTsBaseApi.md).[setInstanceConfig](NFTsBaseApi.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### transfer

▸ **transfer**(`agreementId`, `did`, `publisher`, `serviceReference?`, `txParams?`): `Promise`<`boolean`\>

Transfer NFT-721 to the consumer.

#### Parameters

| Name               | Type                                                          | Default value | Description                                                       |
| :----------------- | :------------------------------------------------------------ | :------------ | :---------------------------------------------------------------- |
| `agreementId`      | `string`                                                      | `undefined`   | The NFT sales agreement id.                                       |
| `did`              | `string`                                                      | `undefined`   | The Decentralized identifier of the NFT asset.                    |
| `publisher`        | [`Account`](Account.md)                                       | `undefined`   | The current owner of the NFTs.                                    |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | `'nft-sales'` | The reference to identify wich service within the DDO to transfer |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)               | `undefined`   | Optional transaction parameters.                                  |

#### Returns

`Promise`<`boolean`\>

true if the transfer was successful.

**`Remarks`**

A publisher/provider will check if the consumer put the funds in escrow and
execute the transfer in order to be able to release the rewards.

**`Example`**

```ts
const receipt = await nevermined.nfts721.transfer(agreementId, ddo.id, artist)
```

**`Throws`**

[NFTError](NFTError.md)
Thrown if there is an error transferring the NFT

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:226](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L226)

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

[NFTsBaseApi](NFTsBaseApi.md).[updateAsset](NFTsBaseApi.md#updateasset)

#### Defined in

[src/nevermined/api/RegistryBaseApi.ts:353](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/RegistryBaseApi.ts#L353)

---

### getInstance

▸ `Static` **getInstance**(`config`, `nftContractAddress`): `Promise`<[`NFT721Api`](NFT721Api.md)\>

Create a new Nevermined NFTs (ERC-721) instance allowing to interact with that kind of NFTs.

#### Parameters

| Name                 | Type                                                        | Description                                                                       |
| :------------------- | :---------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `config`             | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | The Nevermined config                                                             |
| `nftContractAddress` | `string`                                                    | If the Nft721 Contract is deployed in an address it will connect to that contract |

#### Returns

`Promise`<[`NFT721Api`](NFT721Api.md)\>

The NFTs 721 API instance [NFT721Api](NFT721Api.md).

**`Example`**

```ts
nfts721 = await Nft721Api.getInstance(instanceConfig, nftContractAddress)
```

#### Overrides

[NFTsBaseApi](NFTsBaseApi.md).[getInstance](NFTsBaseApi.md#getinstance)

#### Defined in

[src/nevermined/api/nfts/NFT721Api.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT721Api.ts#L39)

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

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[getNFTContractAddress](NFTsBaseApi.md#getnftcontractaddress)

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

[NFTsBaseApi](NFTsBaseApi.md).[getServicePlugin](NFTsBaseApi.md#getserviceplugin)

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

[NFTsBaseApi](NFTsBaseApi.md).[setInstanceConfig](NFTsBaseApi.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
