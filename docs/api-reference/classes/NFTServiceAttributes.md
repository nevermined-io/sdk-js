[@nevermined-io/sdk - v3.0.22](../code-reference.md) / NFTServiceAttributes

# Class: NFTServiceAttributes

## Table of contents

### Constructors

- [constructor](NFTServiceAttributes.md#constructor)

### Properties

- [amount](NFTServiceAttributes.md#amount)
- [duration](NFTServiceAttributes.md#duration)
- [isSubscription](NFTServiceAttributes.md#issubscription)
- [maxCreditsToCharge](NFTServiceAttributes.md#maxcreditstocharge)
- [minCreditsRequired](NFTServiceAttributes.md#mincreditsrequired)
- [minCreditsToCharge](NFTServiceAttributes.md#mincreditstocharge)
- [nftTransfer](NFTServiceAttributes.md#nfttransfer)
- [tokenId](NFTServiceAttributes.md#tokenid)
- [defaultValues](NFTServiceAttributes.md#defaultvalues)

### Methods

- [configureServicesAttributes](NFTServiceAttributes.md#configureservicesattributes)
- [getCreditsToCharge](NFTServiceAttributes.md#getcreditstocharge)
- [getDefaultNFTServiceAttributes](NFTServiceAttributes.md#getdefaultnftserviceattributes)
- [isCreditsBalanceEnough](NFTServiceAttributes.md#iscreditsbalanceenough)

## Constructors

### constructor

• **new NFTServiceAttributes**(): [`NFTServiceAttributes`](NFTServiceAttributes.md)

#### Returns

[`NFTServiceAttributes`](NFTServiceAttributes.md)

## Properties

### amount

• `Optional` **amount**: `bigint`

Number of editions

#### Defined in

[src/models/NFTAttributes.ts:17](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L17)

---

### duration

• `Optional` **duration**: `number`

If is a subscription this means the number of blocks the subscription last. If 0 means unlimited

#### Defined in

[src/models/NFTAttributes.ts:32](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L32)

---

### isSubscription

• `Optional` **isSubscription**: `boolean`

If true means the NFT works as a subscription

#### Defined in

[src/models/NFTAttributes.ts:27](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L27)

---

### maxCreditsToCharge

• `Optional` **maxCreditsToCharge**: `bigint`

The maximum number of credits that can be charged to the subscriber.
If not specified, the subscription cost is not capped

#### Defined in

[src/models/NFTAttributes.ts:44](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L44)

---

### minCreditsRequired

• `Optional` **minCreditsRequired**: `bigint`

The minimum number of credits that the subscribers needs to hold to access the asset.
If not specified, the amount defined in the service agreement or 1 credit will be required

#### Defined in

[src/models/NFTAttributes.ts:56](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L56)

---

### minCreditsToCharge

• `Optional` **minCreditsToCharge**: `bigint`

The minimum number of credits that will be charged to the subscriber.
If not specified, the amount defined in the service agreement or 1 credit will be charged

#### Defined in

[src/models/NFTAttributes.ts:50](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L50)

---

### nftTransfer

• `Optional` **nftTransfer**: `boolean`

The asset is transferred (true) or minted (false) with Nevermined contracts

#### Defined in

[src/models/NFTAttributes.ts:22](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L22)

---

### tokenId

• `Optional` **tokenId**: `string`

The tokenId of the NFT related with the Service.
For example if is a NFT Access service requiring holding a NFT, this is the tokenId of the NFT

#### Defined in

[src/models/NFTAttributes.ts:38](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L38)

---

### defaultValues

▪ `Static` **defaultValues**: `Object`

#### Type declaration

| Name                 | Type                                              |
| :------------------- | :------------------------------------------------ |
| `amount`             | `bigint`                                          |
| `duration`           | `number`                                          |
| `isSubscription`     | `boolean`                                         |
| `maxCreditsToCharge` | `bigint`                                          |
| `minCreditsRequired` | `bigint`                                          |
| `minCreditsToCharge` | `bigint`                                          |
| `nftTransfer`        | `boolean`                                         |
| `serviceType`        | [`ServiceType`](../code-reference.md#servicetype) |
| `tokenId`            | `string`                                          |

#### Defined in

[src/models/NFTAttributes.ts:58](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L58)

## Methods

### configureServicesAttributes

▸ **configureServicesAttributes**(`nftAttributes`): `Partial`\<[`NFTAttributes`](NFTAttributes.md)\>

Given some partial nft attributes it applies some default validations and pre-configure default values

#### Parameters

| Name            | Type                                             | Description            |
| :-------------- | :----------------------------------------------- | :--------------------- |
| `nftAttributes` | `Partial`\<[`NFTAttributes`](NFTAttributes.md)\> | partial nft attributes |

#### Returns

`Partial`\<[`NFTAttributes`](NFTAttributes.md)\>

nft attributes validated and configured

#### Defined in

[src/models/NFTAttributes.ts:136](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L136)

---

### getCreditsToCharge

▸ **getCreditsToCharge**(`nftAttributes`, `chargeType?`, `dynamicAmount?`): `undefined` \| `bigint`

Taking into account the nft attributes confifured tt returns the number of credits to be consumed

#### Parameters

| Name             | Type                                              | Default value      | Description                                        |
| :--------------- | :------------------------------------------------ | :----------------- | :------------------------------------------------- |
| `nftAttributes`  | [`NFTServiceAttributes`](NFTServiceAttributes.md) | `undefined`        | -                                                  |
| `chargeType`     | [`ChargeType`](../enums/ChargeType.md)            | `ChargeType.Fixed` | -                                                  |
| `dynamicAmount?` | `bigint`                                          | `undefined`        | the dynamic amount of credits asked to be consumed |

#### Returns

`undefined` \| `bigint`

amount to consume

#### Defined in

[src/models/NFTAttributes.ts:81](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L81)

---

### getDefaultNFTServiceAttributes

▸ **getDefaultNFTServiceAttributes**(): `Required`\<[`NFTServiceAttributes`](NFTServiceAttributes.md)\>

#### Returns

`Required`\<[`NFTServiceAttributes`](NFTServiceAttributes.md)\>

#### Defined in

[src/models/NFTAttributes.ts:70](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L70)

---

### isCreditsBalanceEnough

▸ **isCreditsBalanceEnough**(`nftAttributes`, `creditsBalance`, `dynamicAmount?`): `boolean`

Given some credits balance if checks if that's enough to access to a NFT asset

#### Parameters

| Name             | Type                                              | Description                                      |
| :--------------- | :------------------------------------------------ | :----------------------------------------------- |
| `nftAttributes`  | [`NFTServiceAttributes`](NFTServiceAttributes.md) | NFT Attributes metadata                          |
| `creditsBalance` | `bigint`                                          | balance of credits                               |
| `dynamicAmount?` | `bigint`                                          | the dynamic amount of credits asked to be burned |

#### Returns

`boolean`

boolean

#### Defined in

[src/models/NFTAttributes.ts:115](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NFTAttributes.ts#L115)
