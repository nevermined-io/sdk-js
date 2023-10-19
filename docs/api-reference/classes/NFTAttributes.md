[@nevermined-io/sdk](../code-reference.md) / NFTAttributes

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
- [nftContractAddress](NFTAttributes.md#nftcontractaddress)
- [nftMetadataUrl](NFTAttributes.md#nftmetadataurl)
- [nftType](NFTAttributes.md#nfttype)
- [preMint](NFTAttributes.md#premint)
- [predefinedAssetServices](NFTAttributes.md#predefinedassetservices)
- [providers](NFTAttributes.md#providers)
- [royaltyAttributes](NFTAttributes.md#royaltyattributes)
- [services](NFTAttributes.md#services)
- [DEFAULT_ENCRYPTION_METHOD](NFTAttributes.md#default_encryption_method)
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

• **new NFTAttributes**()

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

[src/models/AssetAttributes.ts:47](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetAttributes.ts#L47)

---

### cap

• `Optional` **cap**: `bigint`

Max number of nfts that can be minted, 0 means uncapped

#### Defined in

[src/models/NFTAttributes.ts:87](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L87)

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

[src/models/AssetAttributes.ts:20](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetAttributes.ts#L20)

---

### ercType

• **ercType**: [`ERCType`](../enums/ERCType.md)

The type of ERC used (721 or 1155)

**`See`**

- [https://ethereum.org/en/developers/docs/standards/tokens/erc-721/](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
- [https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)

#### Defined in

[src/models/NFTAttributes.ts:55](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L55)

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

[src/models/AssetAttributes.ts:67](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetAttributes.ts#L67)

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

[src/models/AssetAttributes.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetAttributes.ts#L57)

---

### metadata

• **metadata**: [`MetaData`](../interfaces/MetaData.md)

Metadata describing the asset

**`See`**

[MetaData](../interfaces/MetaData.md)

#### Inherited from

[AssetAttributes](AssetAttributes.md).[metadata](AssetAttributes.md#metadata)

#### Defined in

[src/models/AssetAttributes.ts:13](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetAttributes.ts#L13)

---

### nftContractAddress

• **nftContractAddress**: `string`

The address of the deployed NFT Contract

#### Defined in

[src/models/NFTAttributes.ts:67](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L67)

---

### nftMetadataUrl

• `Optional` **nftMetadataUrl**: `string`

URL to the metadata definition of the NFT contract

#### Defined in

[src/models/NFTAttributes.ts:82](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L82)

---

### nftType

• **nftType**: [`NeverminedNFTType`](../code-reference.md#neverminednfttype)

The Nevermined implementation of the NFT used.
A part of what type of ERC is based, Nevermined provides different NFT implementations to fit in different scenarios.
This attribute allow to specify between the different Nevermined NFT types

#### Defined in

[src/models/NFTAttributes.ts:62](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L62)

---

### preMint

• `Optional` **preMint**: `boolean`

If the asset is pre-minted

#### Defined in

[src/models/NFTAttributes.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L77)

---

### predefinedAssetServices

• `Optional` **predefinedAssetServices**: [`ServiceCommon`](../interfaces/ServiceCommon.md)[]

List of additional asset services to be included as part of an asset

**`See`**

[Service](../code-reference.md#service)

#### Inherited from

[AssetAttributes](AssetAttributes.md).[predefinedAssetServices](AssetAttributes.md#predefinedassetservices)

#### Defined in

[src/models/AssetAttributes.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetAttributes.ts#L32)

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

[src/models/AssetAttributes.ts:41](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetAttributes.ts#L41)

---

### royaltyAttributes

• `Optional` **royaltyAttributes**: [`RoyaltyAttributes`](../interfaces/RoyaltyAttributes.md)

Attributes describing the royalties attached to the NFT in the secondary market

#### Defined in

[src/models/NFTAttributes.ts:72](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L72)

---

### services

• `Optional` **services**: [`ServiceAttributes`](../interfaces/ServiceAttributes.md)[]

List of services and their attributes offered by an asset.

**`See`**

[ServiceAttributes](../interfaces/ServiceAttributes.md)

#### Inherited from

[AssetAttributes](AssetAttributes.md).[services](AssetAttributes.md#services)

#### Defined in

[src/models/AssetAttributes.ts:26](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetAttributes.ts#L26)

---

### DEFAULT_ENCRYPTION_METHOD

▪ `Static` **DEFAULT_ENCRYPTION_METHOD**: [`EncryptionMethod`](../code-reference.md#encryptionmethod)

#### Inherited from

[AssetAttributes](AssetAttributes.md).[DEFAULT_ENCRYPTION_METHOD](AssetAttributes.md#default_encryption_method)

#### Defined in

[src/models/AssetAttributes.ts:7](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetAttributes.ts#L7)

---

### defaultValues

▪ `Static` **defaultValues**: `Object`

#### Type declaration

| Name                      | Type                                                                                                                                                                                                                 |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appId`                   | `string`                                                                                                                                                                                                             |
| `cap`                     | `bigint`                                                                                                                                                                                                             |
| `encryptionMethod`        | [`EncryptionMethod`](../code-reference.md#encryptionmethod)                                                                                                                                                          |
| `fulfillAccessTimelock`   | `number`                                                                                                                                                                                                             |
| `fulfillAccessTimeout`    | `number`                                                                                                                                                                                                             |
| `nft`                     | { `amount`: `bigint` ; `duration`: `number` = 0; `isSubscription`: `boolean` = false; `nftTransfer`: `boolean` = true; `serviceType`: [`ServiceType`](../code-reference.md#servicetype) ; `tokenId`: `string` = '' } |
| `nft.amount`              | `bigint`                                                                                                                                                                                                             |
| `nft.duration`            | `number`                                                                                                                                                                                                             |
| `nft.isSubscription`      | `boolean`                                                                                                                                                                                                            |
| `nft.nftTransfer`         | `boolean`                                                                                                                                                                                                            |
| `nft.serviceType`         | [`ServiceType`](../code-reference.md#servicetype)                                                                                                                                                                    |
| `nft.tokenId`             | `string`                                                                                                                                                                                                             |
| `nftMetadataUrl`          | `string`                                                                                                                                                                                                             |
| `preMint`                 | `boolean`                                                                                                                                                                                                            |
| `predefinedAssetServices` | [`ServiceCommon`](../interfaces/ServiceCommon.md)[]                                                                                                                                                                  |
| `providers`               | `any`[]                                                                                                                                                                                                              |
| `royaltyAttributes`       | `any`                                                                                                                                                                                                                |
| `services`                | { `price`: [`AssetPrice`](AssetPrice.md) ; `serviceType`: [`ServiceType`](../code-reference.md#servicetype) }[]                                                                                                      |

#### Overrides

[AssetAttributes](AssetAttributes.md).[defaultValues](AssetAttributes.md#defaultvalues)

#### Defined in

[src/models/NFTAttributes.ts:89](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L89)

## Methods

### getCreditsSubscriptionInstance

▸ `Static` **getCreditsSubscriptionInstance**(`nftAttributes`): `Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `nftAttributes` | `Partial`<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:116](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L116)

---

### getInstance

▸ `Static` **getInstance**(`nftAttributes`): `Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                |
| :-------------- | :---------------------------------- |
| `nftAttributes` | [`NFTAttributes`](NFTAttributes.md) |

#### Returns

`Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Overrides

[AssetAttributes](AssetAttributes.md).[getInstance](AssetAttributes.md#getinstance)

#### Defined in

[src/models/NFTAttributes.ts:98](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L98)

---

### getNFT1155Instance

▸ `Static` **getNFT1155Instance**(`nftAttributes`): `Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `nftAttributes` | `Partial`<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:105](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L105)

---

### getNFT721Instance

▸ `Static` **getNFT721Instance**(`nftAttributes`): `Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `nftAttributes` | `Partial`<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:134](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L134)

---

### getPOAPInstance

▸ `Static` **getPOAPInstance**(`nftAttributes`): `Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `nftAttributes` | `Partial`<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:161](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L161)

---

### getSoulBoundInstance

▸ `Static` **getSoulBoundInstance**(`nftAttributes`): `Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `nftAttributes` | `Partial`<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:173](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L173)

---

### getSubscriptionInstance

▸ `Static` **getSubscriptionInstance**(`nftAttributes`): `Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Parameters

| Name            | Type                                            |
| :-------------- | :---------------------------------------------- |
| `nftAttributes` | `Partial`<[`NFTAttributes`](NFTAttributes.md)\> |

#### Returns

`Required`<[`NFTAttributes`](NFTAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:145](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L145)
