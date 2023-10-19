[@nevermined-io/sdk](../code-reference.md) / AgreementsApi

# Class: AgreementsApi

Nevermined Agreements API. It allows the integration with Nevermined Service Execution Agreements

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`AgreementsApi`**

## Table of contents

### Constructors

- [constructor](AgreementsApi.md#constructor)

### Properties

- [conditions](AgreementsApi.md#conditions)

### Accessors

- [artifactsFolder](AgreementsApi.md#artifactsfolder)
- [circuitsFolder](AgreementsApi.md#circuitsfolder)
- [config](AgreementsApi.md#config)
- [instanceConfig](AgreementsApi.md#instanceconfig)
- [instantiableConfig](AgreementsApi.md#instantiableconfig)
- [logger](AgreementsApi.md#logger)
- [nevermined](AgreementsApi.md#nevermined)
- [web3](AgreementsApi.md#web3)

### Methods

- [create](AgreementsApi.md#create)
- [getAgreement](AgreementsApi.md#getagreement)
- [getAgreements](AgreementsApi.md#getagreements)
- [isAccessGranted](AgreementsApi.md#isaccessgranted)
- [prepareSignature](AgreementsApi.md#preparesignature)
- [setInstanceConfig](AgreementsApi.md#setinstanceconfig)
- [status](AgreementsApi.md#status)
- [getInstance](AgreementsApi.md#getinstance)
- [setInstanceConfig](AgreementsApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new AgreementsApi**(`config`)

Creates a new AgreementsApi

#### Parameters

| Name     | Type                                                        | Description                              |
| :------- | :---------------------------------------------------------- | :--------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | Configuration of the Nevermined instance |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/api/AgreementsApi.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AgreementsApi.ts#L28)

## Properties

### conditions

• **conditions**: `ConditionsApi`

Agreements Conditions submodule.

#### Defined in

[src/nevermined/api/AgreementsApi.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AgreementsApi.ts#L21)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### create

▸ **create**(`did`, `agreementIdSeed`, `serviceType`, `agreementParams`, `consumer`, `publisher`, `params?`): `Promise`<`string`\>

Create a service agreement on-chain. This should be called by the publisher of the asset.

#### Parameters

| Name              | Type                                              | Description        |
| :---------------- | :------------------------------------------------ | :----------------- |
| `did`             | `string`                                          | Decentralized ID.  |
| `agreementIdSeed` | `string`                                          | -                  |
| `serviceType`     | [`ServiceType`](../code-reference.md#servicetype) | Service.           |
| `agreementParams` | `any`                                             | -                  |
| `consumer`        | [`Account`](Account.md)                           | Consumer account.  |
| `publisher`       | [`Account`](Account.md)                           | Publisher account. |
| `params?`         | [`TxParameters`](../interfaces/TxParameters.md)   | -                  |

#### Returns

`Promise`<`string`\>

The service agreement id

**`Remarks`**

Consumer signature will be verified on-chain, but it is recommended to verify the signature
in this method before submitting on-chain.

#### Defined in

[src/nevermined/api/AgreementsApi.ts:87](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AgreementsApi.ts#L87)

---

### getAgreement

▸ **getAgreement**(`agreementId`): `Promise`<[`AgreementData`](../interfaces/AgreementData.md)\>

It returns the details of one agreement

#### Parameters

| Name          | Type     | Description             |
| :------------ | :------- | :---------------------- |
| `agreementId` | `string` | The unique agreement id |

#### Returns

`Promise`<[`AgreementData`](../interfaces/AgreementData.md)\>

the details of the agreement

#### Defined in

[src/nevermined/api/AgreementsApi.ts:148](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AgreementsApi.ts#L148)

---

### getAgreements

▸ **getAgreements**(`did`): `Promise`<[`AgreementData`](../interfaces/AgreementData.md)[]\>

Gets the list of agreements created about an asset

#### Parameters

| Name  | Type     | Description                        |
| :---- | :------- | :--------------------------------- |
| `did` | `string` | the unique identifier of the asset |

#### Returns

`Promise`<[`AgreementData`](../interfaces/AgreementData.md)[]\>

the list of agreements

#### Defined in

[src/nevermined/api/AgreementsApi.ts:157](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AgreementsApi.ts#L157)

---

### isAccessGranted

▸ **isAccessGranted**(`agreementId`, `did`, `consumerAddress`, `account`): `Promise`<`boolean`\>

Checks if a consumer has permissions for a certain DID and Agreement Id

#### Parameters

| Name              | Type                    | Description                        |
| :---------------- | :---------------------- | :--------------------------------- |
| `agreementId`     | `string`                | the agreement id                   |
| `did`             | `string`                | the unique identifier of the asset |
| `consumerAddress` | `string`                | the address of the consumer        |
| `account`         | [`Account`](Account.md) | the user account                   |

#### Returns

`Promise`<`boolean`\>

true if the user has permissions

#### Defined in

[src/nevermined/api/AgreementsApi.ts:169](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AgreementsApi.ts#L169)

---

### prepareSignature

▸ **prepareSignature**(`did`, `serviceType`, `consumer`): `Promise`<[`AgreementPrepareResult`](../interfaces/AgreementPrepareResult.md)\>

Creates a consumer signature for the specified asset service.

#### Parameters

| Name          | Type                                              | Description       |
| :------------ | :------------------------------------------------ | :---------------- |
| `did`         | `string`                                          | Decentralized ID. |
| `serviceType` | [`ServiceType`](../code-reference.md#servicetype) | Service.          |
| `consumer`    | [`Account`](Account.md)                           | Consumer account. |

#### Returns

`Promise`<[`AgreementPrepareResult`](../interfaces/AgreementPrepareResult.md)\>

The agreement ID and signature.

#### Defined in

[src/nevermined/api/AgreementsApi.ts:45](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AgreementsApi.ts#L45)

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

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### status

▸ **status**(`agreementId`, `extended?`): `Promise`<`any`\>

Get the status of a service agreement.

#### Parameters

| Name          | Type      | Default value | Description                                  |
| :------------ | :-------- | :------------ | :------------------------------------------- |
| `agreementId` | `string`  | `undefined`   | Service agreement ID.                        |
| `extended`    | `boolean` | `false`       | Returns a complete status with dependencies. |

#### Returns

`Promise`<`any`\>

status of the agreement

#### Defined in

[src/nevermined/api/AgreementsApi.ts:122](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AgreementsApi.ts#L122)

---

### getInstance

▸ `Static` **getInstance**(`..._args`): `any`

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `..._args` | `any` |

#### Returns

`any`

#### Inherited from

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

#### Defined in

[src/Instantiable.abstract.ts:86](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L86)

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

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
