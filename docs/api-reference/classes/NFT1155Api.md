[@nevermined-io/sdk](../code-reference.md) / NFT1155Api

# Class: NFT1155Api

Allows the interaction with external ERC-1155 NFT contracts built on top of the Nevermined NFT extra features.

## Hierarchy

- [`NFTsBaseApi`](NFTsBaseApi.md)

  ↳ **`NFT1155Api`**

  ↳↳ [`SubscriptionCreditsNFTApi`](SubscriptionCreditsNFTApi.md)

## Table of contents

### Constructors

- [constructor](NFT1155Api.md#constructor)

### Properties

- [nftContract](NFT1155Api.md#nftcontract)
- [servicePlugin](NFT1155Api.md#serviceplugin)

### Accessors

- [address](NFT1155Api.md#address)
- [artifactsFolder](NFT1155Api.md#artifactsfolder)
- [circuitsFolder](NFT1155Api.md#circuitsfolder)
- [config](NFT1155Api.md#config)
- [getContract](NFT1155Api.md#getcontract)
- [instanceConfig](NFT1155Api.md#instanceconfig)
- [instantiableConfig](NFT1155Api.md#instantiableconfig)
- [logger](NFT1155Api.md#logger)
- [nevermined](NFT1155Api.md#nevermined)
- [web3](NFT1155Api.md#web3)

### Methods

- [\_details](NFT1155Api.md#_details)
- [access](NFT1155Api.md#access)
- [addRating](NFT1155Api.md#addrating)
- [balance](NFT1155Api.md#balance)
- [burn](NFT1155Api.md#burn)
- [burnFromHolder](NFT1155Api.md#burnfromholder)
- [buySecondaryMarketNft](NFT1155Api.md#buysecondarymarketnft)
- [claim](NFT1155Api.md#claim)
- [claimNFT](NFT1155Api.md#claimnft)
- [create](NFT1155Api.md#create)
- [details](NFT1155Api.md#details)
- [getSubscriptionToken](NFT1155Api.md#getsubscriptiontoken)
- [grantOperatorRole](NFT1155Api.md#grantoperatorrole)
- [isApprovedForAll](NFT1155Api.md#isapprovedforall)
- [isOperator](NFT1155Api.md#isoperator)
- [isOperatorOfDID](NFT1155Api.md#isoperatorofdid)
- [list](NFT1155Api.md#list)
- [listOnSecondaryMarkets](NFT1155Api.md#listonsecondarymarkets)
- [mint](NFT1155Api.md#mint)
- [order](NFT1155Api.md#order)
- [orderAsset](NFT1155Api.md#orderasset)
- [owner](NFT1155Api.md#owner)
- [registerNeverminedAsset](NFT1155Api.md#registerneverminedasset)
- [releaseRewards](NFT1155Api.md#releaserewards)
- [releaseSecondaryMarketRewards](NFT1155Api.md#releasesecondarymarketrewards)
- [resolveAsset](NFT1155Api.md#resolveasset)
- [revokeOperatorRole](NFT1155Api.md#revokeoperatorrole)
- [setApprovalForAll](NFT1155Api.md#setapprovalforall)
- [setInstanceConfig](NFT1155Api.md#setinstanceconfig)
- [transfer](NFT1155Api.md#transfer)
- [updateAsset](NFT1155Api.md#updateasset)
- [getInstance](NFT1155Api.md#getinstance)
- [getNFTContractAddress](NFT1155Api.md#getnftcontractaddress)
- [getServicePlugin](NFT1155Api.md#getserviceplugin)
- [setInstanceConfig](NFT1155Api.md#setinstanceconfig-1)

## Constructors

### constructor

• **new NFT1155Api**()

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[constructor](NFTsBaseApi.md#constructor)

## Properties

### nftContract

• **nftContract**: [`Nft1155Contract`](Nft1155Contract.md)

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:22](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L22)

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

[src/nevermined/api/nfts/NFT1155Api.ts:60](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L60)

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

• `get` **getContract**(): [`Nft1155Contract`](Nft1155Contract.md)

Gets the instance of the ERC-1155 NFT Contract where the API is connected

#### Returns

[`Nft1155Contract`](Nft1155Contract.md)

The `Nft1155Contract` instance

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:68](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L68)

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

### balance

▸ **balance**(`did`, `account`): `Promise`<`bigint`\>

Get the NFT balance for a particular did associated to an account/address

#### Parameters

| Name      | Type                                | Description                                    |
| :-------- | :---------------------------------- | :--------------------------------------------- |
| `did`     | `string`                            | The Decentralized Identifier of the NFT asset. |
| `account` | `string` \| [`Account`](Account.md) | The account/address to check the balance of.   |

#### Returns

`Promise`<`bigint`\>

The number of editions of a NFT owned by the account/address.

**`Example`**

```ts
const balance = await nevermined.nfts1155.balance(ddo.id, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:466](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L466)

---

### burn

▸ **burn**(`tokenId`, `nftAmount`, `account`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Burn NFTs associated with an asset.

#### Parameters

| Name        | Type                                            | Description                                    |
| :---------- | :---------------------------------------------- | :--------------------------------------------- |
| `tokenId`   | `string`                                        | The Decentralized Identifier of the NFT asset. |
| `nftAmount` | `bigint`                                        | The amount of NFTs to burn.                    |
| `account`   | [`Account`](Account.md)                         | The account of the publisher of the NFT.       |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters.               |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceipt

**`Remarks`**

The publisher can only burn NFTs that it owns. NFTs that were already transferred cannot be burned by the publisher.

**`Example`**

```ts
await nevermined.nfts1155.burn(did, 2n, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:185](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L185)

---

### burnFromHolder

▸ **burnFromHolder**(`holder`, `tokenId`, `nftAmount`, `account`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Burn NFTs associated with an asset of a specific account.

#### Parameters

| Name        | Type                                            | Description                                     |
| :---------- | :---------------------------------------------- | :---------------------------------------------- |
| `holder`    | `string`                                        | The address of the account that holds the NFTs. |
| `tokenId`   | `string`                                        | The TokenId of the NFT                          |
| `nftAmount` | `bigint`                                        | The amount of NFTs to burn.                     |
| `account`   | `string` \| [`Account`](Account.md)             | The account of the publisher of the NFT.        |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters.                |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceipt

**`Remarks`**

The publisher can only burn NFTs of an account if is an operator. NFTs that were already transferred cannot be burned by the publisher.

**`Example`**

```ts
await nevermined.nfts1155.burnTo(holder, tokenId, 2n, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:213](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L213)

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

▸ **claim**(`agreementId`, `nftHolder`, `nftReceiver`, `numberEditions?`, `did?`, `serviceIndex?`): `Promise`<`boolean`\>

Claims the transfer of a NFT to the Nevermined Node on behalf of the publisher.

#### Parameters

| Name             | Type     | Description                                                                  |
| :--------------- | :------- | :--------------------------------------------------------------------------- |
| `agreementId`    | `string` | The NFT sales agreement id.                                                  |
| `nftHolder`      | `string` | The address of the current owner of the NFT.                                 |
| `nftReceiver`    | `string` | The address where the NFT should be transferred.                             |
| `numberEditions` | `bigint` | The number of NFT editions to transfer. If the NFT is ERC-721 it should be 1 |
| `did?`           | `string` | The Decentralized Identifier of the asset.                                   |
| `serviceIndex?`  | `number` | The index of the service in the DDO that will be claimed                     |

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
const receipt = await nevermined.nfts721.claim(agreementId, editor.getId(), subscriber.getId(), 1n)
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:321](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L321)

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

Creates a new Nevermined asset associated to a NFT (ERC-1155).

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
const assetAttributes = AssetAttributes.getInstance({
  metadata,
  price: assetPrice,
  serviceTypes: ['nft-sales', 'nft-access'],
})
const nftAttributes = NFTAttributes.getNFT1155Instance({
  ...assetAttributes,
  nftContractAddress: nftUpgradeable.address,
  cap: cappedAmount,
  amount: numberNFTs,
  royaltyAttributes,
  preMint,
})
const ddo = await nevermined.nfts1155.create(nftAttributes, publisher)
```

**`See`**

[PublishOnChainOptions](../enums/PublishOnChainOptions.md) and [PublishMetadataOptions](../enums/PublishMetadataOptions.md)

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:103](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L103)

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

[src/nevermined/api/nfts/NFT1155Api.ts:679](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L679)

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

Adds a minter (`minterAddress`) to the NFT Contract.
Granting and revoking minting permissions only can be done by the NFT Contract owner

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
await nevermined.nfts1155.grantOperatorRole(someoneElse, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:625](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L625)

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

**`See`**

[claim](NFT1155Api.md#claim)

**`Example`**

```ts
await nevermined.nfts1155.isApprovedForAll(someoneElse, artist.getId())
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:540](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L540)

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

#### Inherited from

[NFTsBaseApi](NFTsBaseApi.md).[isOperatorOfDID](NFTsBaseApi.md#isoperatorofdid)

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

▸ **mint**(`did`, `nftAmount`, `receiver`, `account`, `data?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Mint NFTs associated with an asset.

#### Parameters

| Name        | Type                                            | Description                                                                                   |
| :---------- | :---------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| `did`       | `string`                                        | The Decentralized Identifier of the NFT asset.                                                |
| `nftAmount` | `bigint`                                        | The amount of NFTs to mint.                                                                   |
| `receiver`  | `string`                                        | Account address of the NFT receiver, if `undefined` the minter account will receive the NFT/s |
| `account`   | [`Account`](Account.md)                         | The account to mint the NFT. \*                                                               |
| `data?`     | `string`                                        | Data                                                                                          |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Optional transaction parameters.                                                              |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceipt

**`Remarks`**

This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.

**`Example`**

```ts
await nevermined.nfts1155.mint(did, 10n, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:145](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L145)

---

### order

▸ **order**(`did`, `numberEditions`, `consumer`, `serviceReference?`, `txParams?`): [`SubscribablePromise`](SubscribablePromise.md)<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

Buy NFTs.

#### Parameters

| Name               | Type                                                          | Default value | Description                                                    |
| :----------------- | :------------------------------------------------------------ | :------------ | :------------------------------------------------------------- |
| `did`              | `string`                                                      | `undefined`   | The Decentralized Identifier of the NFT asset.                 |
| `numberEditions`   | `bigint`                                                      | `undefined`   | The amount of NFTs to buy.                                     |
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
agreementId = await nevermined.nfts1155.order(ddo.id, numberNFTs, collector)
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:252](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L252)

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

### owner

▸ **owner**(): `Promise`<`string`\>

Gets the contract owner

#### Returns

`Promise`<`string`\>

Address of the contract owner

**`Example`**

```ts
const nftContractOwner = new Account(await nevermined.nfts1155.owner())
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:485](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L485)

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

▸ **releaseRewards**(`agreementId`, `did`, `serviceReference?`, `nftAmount`, `publisher`, `txParams?`): `Promise`<`boolean`\>

Release the funds from escrow.

#### Parameters

| Name               | Type                                                          | Default value | Description                                                              |
| :----------------- | :------------------------------------------------------------ | :------------ | :----------------------------------------------------------------------- |
| `agreementId`      | `string`                                                      | `undefined`   | The NFT sales agreement id.                                              |
| `did`              | `string`                                                      | `undefined`   | The Decentralized identifier of the NFT asset.                           |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | `'nft-sales'` | The reference to identify wich service within the DDO to release rewards |
| `nftAmount`        | `bigint`                                                      | `undefined`   | The amount of NFTs to transfer.                                          |
| `publisher`        | [`Account`](Account.md)                                       | `undefined`   | The current owner of the NFTs.                                           |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)               | `undefined`   | Optional transaction parameters.                                         |

#### Returns

`Promise`<`boolean`\>

true if the funds release was successful.

**`Remarks`**

A publisher is able to release the funds put on escrow by the consumer after transferring the NFTs.

**`Example`**

```ts
const receipt = await nevermined.nfts1155.releaseRewards(agreementId, ddo.id, numberNFTs, artist)
```

**`Throws`**

[NFTError](NFTError.md)
Thrown if there is an error releasing the rewards

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:424](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L424)

---

### releaseSecondaryMarketRewards

▸ **releaseSecondaryMarketRewards**(`owner`, `consumer`, `agreementIdSeed`, `serviceReference?`, `txParams?`): `Promise`<`boolean`\>

Used to release the secondary market NFT & the locked rewards.

#### Parameters

| Name               | Type                                                          | Default value | Description                                                              |
| :----------------- | :------------------------------------------------------------ | :------------ | :----------------------------------------------------------------------- |
| `owner`            | [`Account`](Account.md)                                       | `undefined`   | The owner account.                                                       |
| `consumer`         | [`Account`](Account.md)                                       | `undefined`   | The consumer account.                                                    |
| `agreementIdSeed`  | `string`                                                      | `undefined`   | the Id of the underlying service agreement seed.                         |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | `'nft-sales'` | The reference to identify wich service within the DDO to release rewards |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)               | `undefined`   | Optional transaction parameters.                                         |

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

[src/nevermined/api/nfts/NFT1155Api.ts:562](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L562)

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

Revokes an address (`operatorAddress`) of the NFT Contract as operator.
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
await nevermined.nfts1155.revokeOperatorRole(someoneElse, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:651](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L651)

---

### setApprovalForAll

▸ **setApprovalForAll**(`operatorAddress`, `approved`, `from`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

Enable or disable NFT permissions for an operator.

#### Parameters

| Name              | Type                                            | Description                                                          |
| :---------------- | :---------------------------------------------- | :------------------------------------------------------------------- |
| `operatorAddress` | `string`                                        | The address that of the operator we want to give transfer rights to. |
| `approved`        | `boolean`                                       | Give or remove transfer rights from the operator.                    |
| `from`            | [`Account`](Account.md)                         | The account that wants to give transfer rights to the operator.      |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | Transaction additional parameters                                    |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

The ethers.ContractTransactionReceiptnReceiptnReceipt

**`See`**

[claim](NFT1155Api.md#claim)

**`Example`**

```ts
await nevermined.nfts1155.setApprovalForAll(someoneElse, true, artist)
```

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:510](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L510)

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

▸ **transfer**(`agreementId`, `did`, `nftAmount`, `publisher`, `serviceReference?`, `txParams?`): `Promise`<`boolean`\>

Transfer NFTs to the consumer.

#### Parameters

| Name               | Type                                                          | Default value | Description                                                       |
| :----------------- | :------------------------------------------------------------ | :------------ | :---------------------------------------------------------------- |
| `agreementId`      | `string`                                                      | `undefined`   | The NFT sales agreement id.                                       |
| `did`              | `string`                                                      | `undefined`   | The Decentralized identifier of the NFT asset.                    |
| `nftAmount`        | `bigint`                                                      | `undefined`   | The number of NFTs to transfer.                                   |
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
const receipt = await nevermined.nfts1155.transfer(agreementId, ddo.id, numberNFTs, artist)
```

**`Throws`**

[NFTError](NFTError.md)
Thrown if there is an error transferring the NFT

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:368](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L368)

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

▸ `Static` **getInstance**(`config`, `nftContractInstance?`, `nftContractAddress?`): `Promise`<[`NFT1155Api`](NFT1155Api.md)\>

Create a new Nevermined NFTs (ERC-1155) instance allowing to interact with that kind of NFTs.

#### Parameters

| Name                   | Type                                                        | Description                                                                         |
| :--------------------- | :---------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `config`               | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | -                                                                                   |
| `nftContractInstance?` | [`Nft1155Contract`](Nft1155Contract.md)                     | If there is already deployed an instance of `Nft1155Contract`                       |
| `nftContractAddress?`  | `string`                                                    | If the `Nft1155Contract` is deployed in an address it will connect to that contract |

#### Returns

`Promise`<[`NFT1155Api`](NFT1155Api.md)\>

The NFTs 1155 API instance [NFT1155Api](NFT1155Api.md).

**`Example`**

```ts
nfts1155 = await Nft1155Api.getInstance(instanceConfig, nft1155Contract)
```

#### Overrides

[NFTsBaseApi](NFTsBaseApi.md).[getInstance](NFTsBaseApi.md#getinstance)

#### Defined in

[src/nevermined/api/nfts/NFT1155Api.ts:40](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/nfts/NFT1155Api.ts#L40)

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
