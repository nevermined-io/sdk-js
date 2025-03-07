[@nevermined-io/sdk - v3.1.2](../code-reference.md) / GenericAccess

# Interface: GenericAccess

## Table of contents

### Properties

- [contractName](GenericAccess.md#contractname)

### Methods

- [createAgreementWithPaymentFromDDO](GenericAccess.md#createagreementwithpaymentfromddo)
- [getAgreementData](GenericAccess.md#getagreementdata)
- [params](GenericAccess.md#params)

## Properties

### contractName

• **contractName**: `string`

#### Defined in

[src/keeper/contracts/templates/GenericAccess.ts:22](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/keeper/contracts/templates/GenericAccess.ts#L22)

## Methods

### createAgreementWithPaymentFromDDO

▸ **createAgreementWithPaymentFromDDO**(`agreementIdSeed`, `ddo`, `serviceReference`, `parameters`, `consumer`, `from`, `txParams?`, `observer?`): `Promise`\<`string`\>

#### Parameters

| Name               | Type                                                                                  |
| :----------------- | :------------------------------------------------------------------------------------ |
| `agreementIdSeed`  | `string`                                                                              |
| `ddo`              | [`DDO`](../classes/DDO.md)                                                            |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype)                         |
| `parameters`       | `any`                                                                                 |
| `consumer`         | [`NvmAccount`](../classes/NvmAccount.md)                                              |
| `from`             | [`NvmAccount`](../classes/NvmAccount.md)                                              |
| `txParams?`        | [`TxParameters`](TxParameters.md)                                                     |
| `observer?`        | (`orderProgressStep`: [`OrderProgressStep`](../enums/OrderProgressStep.md)) => `void` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/keeper/contracts/templates/GenericAccess.ts:8](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/keeper/contracts/templates/GenericAccess.ts#L8)

---

### getAgreementData

▸ **getAgreementData**(`agreementId`): `Promise`\<\{ `accessConsumer`: `string` ; `accessProvider`: `string` }\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |

#### Returns

`Promise`\<\{ `accessConsumer`: `string` ; `accessProvider`: `string` }\>

#### Defined in

[src/keeper/contracts/templates/GenericAccess.ts:19](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/keeper/contracts/templates/GenericAccess.ts#L19)

---

### params

▸ **params**(`consumer`, `...args`): `any`

#### Parameters

| Name       | Type    |
| :--------- | :------ |
| `consumer` | `any`   |
| `...args`  | `any`[] |

#### Returns

`any`

#### Defined in

[src/keeper/contracts/templates/GenericAccess.ts:21](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/keeper/contracts/templates/GenericAccess.ts#L21)
