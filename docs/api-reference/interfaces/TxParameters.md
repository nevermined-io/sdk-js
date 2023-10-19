[@nevermined-io/sdk](../code-reference.md) / TxParameters

# Interface: TxParameters

## Table of contents

### Properties

- [gasLimit](TxParameters.md#gaslimit)
- [gasMultiplier](TxParameters.md#gasmultiplier)
- [gasPrice](TxParameters.md#gasprice)
- [maxFeePerGas](TxParameters.md#maxfeepergas)
- [maxPriorityFeePerGas](TxParameters.md#maxpriorityfeepergas)
- [nonce](TxParameters.md#nonce)
- [progress](TxParameters.md#progress)
- [signer](TxParameters.md#signer)
- [value](TxParameters.md#value)
- [zeroDevSigner](TxParameters.md#zerodevsigner)

## Properties

### gasLimit

• `Optional` **gasLimit**: `bigint`

#### Defined in

[src/keeper/contracts/ContractBase.ts:16](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L16)

---

### gasMultiplier

• `Optional` **gasMultiplier**: `number`

#### Defined in

[src/keeper/contracts/ContractBase.ts:17](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L17)

---

### gasPrice

• `Optional` **gasPrice**: `string`

#### Defined in

[src/keeper/contracts/ContractBase.ts:18](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L18)

---

### maxFeePerGas

• `Optional` **maxFeePerGas**: `string`

#### Defined in

[src/keeper/contracts/ContractBase.ts:20](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L20)

---

### maxPriorityFeePerGas

• `Optional` **maxPriorityFeePerGas**: `string`

#### Defined in

[src/keeper/contracts/ContractBase.ts:19](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L19)

---

### nonce

• `Optional` **nonce**: `number`

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L23)

---

### progress

• `Optional` **progress**: (`data`: `any`) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name   | Type  |
| :----- | :---- |
| `data` | `any` |

##### Returns

`void`

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L24)

---

### signer

• `Optional` **signer**: `Signer`

#### Defined in

[src/keeper/contracts/ContractBase.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L21)

---

### value

• `Optional` **value**: `string`

#### Defined in

[src/keeper/contracts/ContractBase.ts:15](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L15)

---

### zeroDevSigner

• `Optional` **zeroDevSigner**: `ZeroDevAccountSigner`<`"ECDSA"`\>

#### Defined in

[src/keeper/contracts/ContractBase.ts:22](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L22)
