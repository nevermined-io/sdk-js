[@nevermined-io/sdk](../code-reference.md) / AssetPrice

# Class: AssetPrice

## Table of contents

### Constructors

- [constructor](AssetPrice.md#constructor)

### Properties

- [rewards](AssetPrice.md#rewards)
- [tokenAddress](AssetPrice.md#tokenaddress)
- [totalPrice](AssetPrice.md#totalprice)
- [NETWORK_FEE_DENOMINATOR](AssetPrice.md#network_fee_denominator)

### Methods

- [addNetworkFees](AssetPrice.md#addnetworkfees)
- [adjustToIncludeNetworkFees](AssetPrice.md#adjusttoincludenetworkfees)
- [getAmounts](AssetPrice.md#getamounts)
- [getAmountsString](AssetPrice.md#getamountsstring)
- [getReceivers](AssetPrice.md#getreceivers)
- [getReceiversString](AssetPrice.md#getreceiversstring)
- [getRewards](AssetPrice.md#getrewards)
- [getTokenAddress](AssetPrice.md#gettokenaddress)
- [getTotalPrice](AssetPrice.md#gettotalprice)
- [setReceiver](AssetPrice.md#setreceiver)
- [setTokenAddress](AssetPrice.md#settokenaddress)
- [toString](AssetPrice.md#tostring)
- [sumAmounts](AssetPrice.md#sumamounts)

## Constructors

### constructor

• **new AssetPrice**()

#### Defined in

[src/models/AssetPrice.ts:10](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L10)

• **new AssetPrice**(`_rewards`)

#### Parameters

| Name       | Type                       |
| :--------- | :------------------------- |
| `_rewards` | `Map`<`string`, `bigint`\> |

#### Defined in

[src/models/AssetPrice.ts:11](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L11)

• **new AssetPrice**(`address`, `amount`)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |
| `amount`  | `bigint` |

#### Defined in

[src/models/AssetPrice.ts:12](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L12)

• **new AssetPrice**(`address`, `amount`, `tokenAddress`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `address`      | `string` |
| `amount`       | `bigint` |
| `tokenAddress` | `string` |

#### Defined in

[src/models/AssetPrice.ts:13](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L13)

## Properties

### rewards

• `Private` **rewards**: `Map`<`string`, `bigint`\>

#### Defined in

[src/models/AssetPrice.ts:6](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L6)

---

### tokenAddress

• `Private` `Optional` **tokenAddress**: `string`

#### Defined in

[src/models/AssetPrice.ts:8](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L8)

---

### totalPrice

• `Private` **totalPrice**: `bigint`

#### Defined in

[src/models/AssetPrice.ts:4](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L4)

---

### NETWORK_FEE_DENOMINATOR

▪ `Static` `Readonly` **NETWORK_FEE_DENOMINATOR**: `10000n`

#### Defined in

[src/models/AssetPrice.ts:2](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L2)

## Methods

### addNetworkFees

▸ **addNetworkFees**(`feeReceiver`, `networkFeePercent`): [`AssetPrice`](AssetPrice.md)

It adds network fees on top of the already configured asset rewards

#### Parameters

| Name                | Type     | Description                                                      |
| :------------------ | :------- | :--------------------------------------------------------------- |
| `feeReceiver`       | `string` | the address receiving the fees                                   |
| `networkFeePercent` | `bigint` | the percent of fees to receive, it uses the contract denominator |

#### Returns

[`AssetPrice`](AssetPrice.md)

the asset rewards object

**`See`**

AssetPrice.NETWORK_FEE_DENOMINATOR

#### Defined in

[src/models/AssetPrice.ts:75](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L75)

---

### adjustToIncludeNetworkFees

▸ **adjustToIncludeNetworkFees**(`feeReceiver`, `networkFeePercent`): [`AssetPrice`](AssetPrice.md)

It includes network fees on the existing asset rewards subtracting the proportion taking into account the receivers percent

#### Parameters

| Name                | Type     | Description                                                      |
| :------------------ | :------- | :--------------------------------------------------------------- |
| `feeReceiver`       | `string` | the address receiving the fees                                   |
| `networkFeePercent` | `bigint` | the percent of fees to receive, it uses the contract denominator |

#### Returns

[`AssetPrice`](AssetPrice.md)

the asset rewards object

**`See`**

AssetPrice.NETWORK_FEE_DENOMINATOR

#### Defined in

[src/models/AssetPrice.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L88)

---

### getAmounts

▸ **getAmounts**(): `bigint`[]

#### Returns

`bigint`[]

#### Defined in

[src/models/AssetPrice.ts:46](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L46)

---

### getAmountsString

▸ **getAmountsString**(): `string`

#### Returns

`string`

#### Defined in

[src/models/AssetPrice.ts:103](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L103)

---

### getReceivers

▸ **getReceivers**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/models/AssetPrice.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L50)

---

### getReceiversString

▸ **getReceiversString**(): `string`

#### Returns

`string`

#### Defined in

[src/models/AssetPrice.ts:109](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L109)

---

### getRewards

▸ **getRewards**(): `Map`<`string`, `bigint`\>

#### Returns

`Map`<`string`, `bigint`\>

#### Defined in

[src/models/AssetPrice.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L42)

---

### getTokenAddress

▸ **getTokenAddress**(): `string`

#### Returns

`string`

#### Defined in

[src/models/AssetPrice.ts:65](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L65)

---

### getTotalPrice

▸ **getTotalPrice**(): `bigint`

#### Returns

`bigint`

#### Defined in

[src/models/AssetPrice.ts:38](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L38)

---

### setReceiver

▸ **setReceiver**(`receiver`, `amount`): [`AssetPrice`](AssetPrice.md)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `receiver` | `string` |
| `amount`   | `bigint` |

#### Returns

[`AssetPrice`](AssetPrice.md)

#### Defined in

[src/models/AssetPrice.ts:54](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L54)

---

### setTokenAddress

▸ **setTokenAddress**(`address`): [`AssetPrice`](AssetPrice.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

[`AssetPrice`](AssetPrice.md)

#### Defined in

[src/models/AssetPrice.ts:60](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L60)

---

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/models/AssetPrice.ts:114](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L114)

---

### sumAmounts

▸ `Static` **sumAmounts**(`amounts`): `bigint`

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `amounts` | `bigint`[] |

#### Returns

`bigint`

#### Defined in

[src/models/AssetPrice.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/AssetPrice.ts#L34)
