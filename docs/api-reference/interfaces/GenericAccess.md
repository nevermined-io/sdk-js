[@nevermined-io/sdk](../code-reference.md) / GenericAccess

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

[src/keeper/contracts/templates/GenericAccess.ts:20](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/GenericAccess.ts#L20)

## Methods

### createAgreementWithPaymentFromDDO

▸ **createAgreementWithPaymentFromDDO**(`agreementIdSeed`, `ddo`, `serviceReference`, `parameters`, `consumer`, `from`, `txParams?`, `observer?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                                                                  |
| :----------------- | :------------------------------------------------------------------------------------ |
| `agreementIdSeed`  | `string`                                                                              |
| `ddo`              | [`DDO`](../classes/DDO.md)                                                            |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype)                         |
| `parameters`       | `any`                                                                                 |
| `consumer`         | [`Account`](../classes/Account.md)                                                    |
| `from`             | [`Account`](../classes/Account.md)                                                    |
| `txParams?`        | [`TxParameters`](TxParameters.md)                                                     |
| `observer?`        | (`orderProgressStep`: [`OrderProgressStep`](../enums/OrderProgressStep.md)) => `void` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/templates/GenericAccess.ts:6](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/GenericAccess.ts#L6)

---

### getAgreementData

▸ **getAgreementData**(`agreementId`): `Promise`<{ `accessConsumer`: `string` ; `accessProvider`: `string` }\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |

#### Returns

`Promise`<{ `accessConsumer`: `string` ; `accessProvider`: `string` }\>

#### Defined in

[src/keeper/contracts/templates/GenericAccess.ts:17](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/GenericAccess.ts#L17)

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

[src/keeper/contracts/templates/GenericAccess.ts:19](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/GenericAccess.ts#L19)
