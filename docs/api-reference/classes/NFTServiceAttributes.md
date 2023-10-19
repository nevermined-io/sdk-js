[@nevermined-io/sdk](../code-reference.md) / NFTServiceAttributes

# Class: NFTServiceAttributes

## Table of contents

### Constructors

- [constructor](NFTServiceAttributes.md#constructor)

### Properties

- [amount](NFTServiceAttributes.md#amount)
- [duration](NFTServiceAttributes.md#duration)
- [isSubscription](NFTServiceAttributes.md#issubscription)
- [nftTransfer](NFTServiceAttributes.md#nfttransfer)
- [tokenId](NFTServiceAttributes.md#tokenid)
- [defaultValues](NFTServiceAttributes.md#defaultvalues)

### Methods

- [getDefaultNFTServiceAttributes](NFTServiceAttributes.md#getdefaultnftserviceattributes)

## Constructors

### constructor

• **new NFTServiceAttributes**()

## Properties

### amount

• `Optional` **amount**: `bigint`

Number of editions

#### Defined in

[src/models/NFTAttributes.ts:25](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L25)

---

### duration

• `Optional` **duration**: `number`

If is a subscription this means the number of blocks the subscription last. If 0 means unlimited

#### Defined in

[src/models/NFTAttributes.ts:20](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L20)

---

### isSubscription

• `Optional` **isSubscription**: `boolean`

If true means the NFT works as a subscription

#### Defined in

[src/models/NFTAttributes.ts:15](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L15)

---

### nftTransfer

• `Optional` **nftTransfer**: `boolean`

The asset is transferred (true) or minted (false) with Nevermined contracts

#### Defined in

[src/models/NFTAttributes.ts:10](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L10)

---

### tokenId

• `Optional` **tokenId**: `string`

The tokenId of the NFT related with the Service.
For example if is a NFT Access service requiring holding a NFT, this is the tokenId of the NFT

#### Defined in

[src/models/NFTAttributes.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L31)

---

### defaultValues

▪ `Static` **defaultValues**: `Object`

#### Type declaration

| Name             | Type                                              |
| :--------------- | :------------------------------------------------ |
| `amount`         | `bigint`                                          |
| `duration`       | `number`                                          |
| `isSubscription` | `boolean`                                         |
| `nftTransfer`    | `boolean`                                         |
| `serviceType`    | [`ServiceType`](../code-reference.md#servicetype) |
| `tokenId`        | `string`                                          |

#### Defined in

[src/models/NFTAttributes.ts:33](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L33)

## Methods

### getDefaultNFTServiceAttributes

▸ `Static` **getDefaultNFTServiceAttributes**(): `Required`<[`NFTServiceAttributes`](NFTServiceAttributes.md)\>

#### Returns

`Required`<[`NFTServiceAttributes`](NFTServiceAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NFTAttributes.ts#L42)
