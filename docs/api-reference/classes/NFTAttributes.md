[@nevermined-io/sdk - v3.0.42](../code-reference.md) / NFTAttributes

# Class: NFTAttributes

## Hierarchy

- [`AssetAttributes`](AssetAttributes.md)

  ↳ **`NFTAttributes`**

## Table of contents

### Constructors

- [constructor](NFTAttributes.md#constructor)

### Properties

- [appId](NFTAttributes.md#appid)
- [cap](NFTAttributes.md#cap)
- [encryptionMethod](NFTAttributes.md#encryptionmethod)
- [ercType](NFTAttributes.md#erctype)
- [fulfillAccessTimelock](NFTAttributes.md#fulfillaccesstimelock)
- [fulfillAccessTimeout](NFTAttributes.md#fulfillaccesstimeout)
- [metadata](NFTAttributes.md#metadata)
- [nft](NFTAttributes.md#nft)
- [nftContractAddress](NFTAttributes.md#nftcontractaddress)
- [nftMetadataUrl](NFTAttributes.md#nftmetadataurl)
- [nftType](NFTAttributes.md#nfttype)
- [preMint](NFTAttributes.md#premint)
- [predefinedAssetServices](NFTAttributes.md#predefinedassetservices)
- [providers](NFTAttributes.md#providers)
- [royaltyAttributes](NFTAttributes.md#royaltyattributes)
- [services](NFTAttributes.md#services)
- [defaultValues](NFTAttributes.md#defaultvalues)

### Methods

- [getCreditsSubscriptionInstance](NFTAttributes.md#getcreditssubscriptioninstance)
- [getInstance](NFTAttributes.md#getinstance)
- [getNFT1155Instance](NFTAttributes.md#getnft1155instance)
- [getNFT721Instance](NFTAttributes.md#getnft721instance)
- [getPOAPInstance](NFTAttributes.md#getpoapinstance)
- [getSoulBoundInstance](NFTAttributes.md#getsoulboundinstance)
- [getSubscriptionInstance](NFTAttributes.md#getsubscriptioninstance)

## Constructors

### constructor

• **new NFTAttributes**(): [`NFTAttributes`](NFTAttributes.md)

#### Returns

[`NFTAttributes`](NFTAttributes.md)

#### Inherited from

[AssetAttributes](AssetAttributes.md).[constructor](AssetAttributes.md#constructor)

## Properties

### appId

• `Optional` **appId**: `string`

Unique identifier of the application/domain/vertical where the asset belong to.
That asset association typically helps to search and filter between assets part of a domain via Marketplace API

#### Inherited from

[AssetAttributes](AssetAttributes.md).[appId](AssetAttributes.md#appid)

#### Defined in

[src/models/AssetAttributes.ts:48](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/AssetAttributes.ts#L48)

---

### cap

• `Optional` **cap**: `bigint`

Max number of nfts that can be minted, 0 means uncapped

#### Defined in

[src/models/NFTAttributes.ts:213](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L213)

---

### encryptionMethod

• `Optional` **encryptionMethod**: [`EncryptionMethod`](../code-reference.md#encryptionmethod)

When an asset is published in a Nevermined network, some internal Metadata attributes are encrypted so they can't be accessed.
This method allows to specify the encryption method to be used.

**`See`**

[EncryptionMethod](../code-reference.md#encryptionmethod)

#### Inherited from

[AssetAttributes](AssetAttributes.md).[encryptionMethod](AssetAttributes.md#encryptionmethod)

#### Defined in

[src/models/AssetAttributes.ts:21](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/AssetAttributes.ts#L21)

---

### ercType

• **ercType**: [`ERCType`](../enums/ERCType.md)

The type of ERC used (721 or 1155)

**`See`**

- [https://ethereum.org/en/developers/docs/standards/tokens/erc-721/](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
- [https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)

#### Defined in

[src/models/NFTAttributes.ts:176](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L176)

---

### fulfillAccessTimelock

• `Optional` **fulfillAccessTimelock**: `number`

An asset can offer different services. Each service can have different conditions that need to be fulfilled
to provide that service. These conditions can expire if they are not fulfilled in a certain period of time.
This attribute allows to specify a period of time the condition can not be fullfilled
Setting up a timelock of 0 means that the condition can be fulfilled at any time.
Setting a timelock greater than 0 means that the condition can not be fulfilled until that number of blocks after the agreement is created are mined.
This would allow to create an agreement that can not fulfilled until certain period of time.

#### Inherited from

[AssetAttributes](AssetAttributes.md).[fulfillAccessTimelock](AssetAttributes.md#fulfillaccesstimelock)

#### Defined in

[src/models/AssetAttributes.ts:68](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/AssetAttributes.ts#L68)

---

### fulfillAccessTimeout

• `Optional` **fulfillAccessTimeout**: `number`

An asset can offer different services. Each service can have different conditions that need to be fulfilled
to provide that service. These conditions can expire if they are not fulfilled in a certain period of time.
This attribute allows to specify the timeouts for the access condition associated to the service.
Setting up a timeout of 0 means that the condition will never expire.
Setting a timeout greater than 0 means that the condition will expire after that number of blocks after the agreement is created.
This would allow to create an agreement that is not fulfilled after a certain period of time, the user can claim back funds locked if the condition is any.

#### Inherited from

[AssetAttributes](AssetAttributes.md).[fulfillAccessTimeout](AssetAttributes.md#fulfillaccesstimeout)

#### Defined in

[src/models/AssetAttributes.ts:58](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/AssetAttributes.ts#L58)

---

### metadata

• **metadata**: [`MetaData`](../interfaces/MetaData.md)

Metadata describing the asset

**`See`**

[MetaData](../interfaces/MetaData.md)

#### Inherited from

[AssetAttributes](AssetAttributes.md).[metadata](AssetAttributes.md#metadata)

#### Defined in

[src/models/AssetAttributes.ts:14](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/AssetAttributes.ts#L14)

---

### nft

• `Optional` **nft**: [`NFTServiceAttributes`](NFTServiceAttributes.md)

Attributes related with the NFT service (access or sales)

#### Defined in

[src/models/NFTAttributes.ts:193](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L193)

---

### nftContractAddress

• **nftContractAddress**: `string`

The address of the deployed NFT Contract

#### Defined in

[src/models/NFTAttributes.ts:188](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L188)

---

### nftMetadataUrl

• `Optional` **nftMetadataUrl**: `string`

URL to the metadata definition of the NFT contract

#### Defined in

[src/models/NFTAttributes.ts:208](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L208)

---

### nftType

• **nftType**: [`NeverminedNFTType`](../code-reference.md#neverminednfttype)

The Nevermined implementation of the NFT used.
A part of what type of ERC is based, Nevermined provides different NFT implementations to fit in different scenarios.
This attribute allow to specify between the different Nevermined NFT types

#### Defined in

[src/models/NFTAttributes.ts:183](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L183)

---

### preMint

• `Optional` **preMint**: `boolean`

If the asset is pre-minted

#### Defined in

[src/models/NFTAttributes.ts:203](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L203)

---

### predefinedAssetServices

• `Optional` **predefinedAssetServices**: [`ServiceCommon`](../interfaces/ServiceCommon.md)[]

List of additional asset services to be included as part of an asset

**`See`**

[Service](../code-reference.md#service)

#### Inherited from

[AssetAttributes](AssetAttributes.md).[predefinedAssetServices](AssetAttributes.md#predefinedassetservices)

#### Defined in

[src/models/AssetAttributes.ts:33](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/AssetAttributes.ts#L33)

---

### providers

• `Optional` **providers**: `string`[]

A provider of an asset identify the public address of an account with some privileges over that asset.
Typically these permissions are granted to Nevermined Nodes to allow them to give access to some services without
the direct interaction of the final user.
Here a user publishing an asset can define a list of all the addresses with these permissions.
Typically just the address of one Nevermined Node trusted by the user.

#### Inherited from

[AssetAttributes](AssetAttributes.md).[providers](AssetAttributes.md#providers)

#### Defined in

[src/models/AssetAttributes.ts:42](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/AssetAttributes.ts#L42)

---

### royaltyAttributes

• `Optional` **royaltyAttributes**: [`RoyaltyAttributes`](../interfaces/RoyaltyAttributes.md)

Attributes describing the royalties attached to the NFT in the secondary market

#### Defined in

[src/models/NFTAttributes.ts:198](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L198)

---

### services

• `Optional` **services**: [`ServiceAttributes`](../interfaces/ServiceAttributes.md)[]

List of services and their attributes offered by an asset.

**`See`**

[ServiceAttributes](../interfaces/ServiceAttributes.md)

#### Inherited from

[AssetAttributes](AssetAttributes.md).[services](AssetAttributes.md#services)

#### Defined in

[src/models/AssetAttributes.ts:27](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/AssetAttributes.ts#L27)

---

### defaultValues

▪ `Static` **defaultValues**: `Object`

#### Type declaration

| Name                      | Type                                                                                                                                                                                                                                                                                                                     |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appId`                   | `string`                                                                                                                                                                                                                                                                                                                 |
| `cap`                     | `bigint`                                                                                                                                                                                                                                                                                                                 |
| `encryptionMethod`        | [`EncryptionMethod`](../code-reference.md#encryptionmethod)                                                                                                                                                                                                                                                              |
| `fulfillAccessTimelock`   | `number`                                                                                                                                                                                                                                                                                                                 |
| `fulfillAccessTimeout`    | `number`                                                                                                                                                                                                                                                                                                                 |
| `nft`                     | \{ `amount`: `bigint` ; `duration`: `number` = 0; `isSubscription`: `boolean` = false; `maxCreditsToCharge`: `bigint` ; `minCreditsRequired`: `bigint` ; `minCreditsToCharge`: `bigint` ; `nftTransfer`: `boolean` = true; `serviceType`: [`ServiceType`](../code-reference.md#servicetype) ; `tokenId`: `string` = '' } |
| `nft.amount`              | `bigint`                                                                                                                                                                                                                                                                                                                 |
| `nft.duration`            | `number`                                                                                                                                                                                                                                                                                                                 |
| `nft.isSubscription`      | `boolean`                                                                                                                                                                                                                                                                                                                |
| `nft.maxCreditsToCharge`  | `bigint`                                                                                                                                                                                                                                                                                                                 |
| `nft.minCreditsRequired`  | `bigint`                                                                                                                                                                                                                                                                                                                 |
| `nft.minCreditsToCharge`  | `bigint`                                                                                                                                                                                                                                                                                                                 |
| `nft.nftTransfer`         | `boolean`                                                                                                                                                                                                                                                                                                                |
| `nft.serviceType`         | [`ServiceType`](../code-reference.md#servicetype)                                                                                                                                                                                                                                                                        |
| `nft.tokenId`             | `string`                                                                                                                                                                                                                                                                                                                 |
| `nftMetadataUrl`          | `string`                                                                                                                                                                                                                                                                                                                 |
| `preMint`                 | `boolean`                                                                                                                                                                                                                                                                                                                |
| `predefinedAssetServices` | [`ServiceCommon`](../interfaces/ServiceCommon.md)[]                                                                                                                                                                                                                                                                      |
| `providers`               | `never`[]                                                                                                                                                                                                                                                                                                                |
| `royaltyAttributes`       | `undefined`                                                                                                                                                                                                                                                                                                              |
| `services`                | \{ `price`: [`AssetPrice`](AssetPrice.md) ; `serviceType`: [`ServiceType`](../code-reference.md#servicetype) }[]                                                                                                                                                                                                         |

#### Overrides

[AssetAttributes](AssetAttributes.md).[defaultValues](AssetAttributes.md#defaultvalues)

#### Defined in

[src/models/NFTAttributes.ts:215](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L215)

## Methods

### getCreditsSubscriptionInstance

▸ **getCreditsSubscriptionInstance**(`nftAttributes`): `Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                             |
| :-------------- | :----------------------------------------------- |
| `nftAttributes` | `Partial`\<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:246](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L246)

---

### getInstance

▸ **getInstance**(`nftAttributes`): `Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                             |
| :-------------- | :----------------------------------------------- |
| `nftAttributes` | `Partial`\<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Overrides

[AssetAttributes](AssetAttributes.md).[getInstance](AssetAttributes.md#getinstance)

#### Defined in

[src/models/NFTAttributes.ts:224](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L224)

---

### getNFT1155Instance

▸ **getNFT1155Instance**(`nftAttributes`): `Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                             |
| :-------------- | :----------------------------------------------- |
| `nftAttributes` | `Partial`\<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:235](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L235)

---

### getNFT721Instance

▸ **getNFT721Instance**(`nftAttributes`): `Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                             |
| :-------------- | :----------------------------------------------- |
| `nftAttributes` | `Partial`\<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:263](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L263)

---

### getPOAPInstance

▸ **getPOAPInstance**(`nftAttributes`): `Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                             |
| :-------------- | :----------------------------------------------- |
| `nftAttributes` | `Partial`\<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:289](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L289)

---

### getSoulBoundInstance

▸ **getSoulBoundInstance**(`nftAttributes`): `Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                             |
| :-------------- | :----------------------------------------------- |
| `nftAttributes` | `Partial`\<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:301](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L301)

---

### getSubscriptionInstance

▸ **getSubscriptionInstance**(`nftAttributes`): `Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                             |
| :-------------- | :----------------------------------------------- |
| `nftAttributes` | `Partial`\<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`\<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:274](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/models/NFTAttributes.ts#L274)
