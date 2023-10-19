[@nevermined-io/sdk](../code-reference.md) / ProvenanceApi

# Class: ProvenanceApi

Nevermined Provenance API. It allows to register and search entries in the Nevermined W3C Provenance registry
You can find more information about Nevermined Provenance here:
[https://docs.nevermined.io/docs/architecture/specs/Spec-PROVENANCE](https://docs.nevermined.io/docs/architecture/specs/Spec-PROVENANCE)

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`ProvenanceApi`**

## Table of contents

### Constructors

- [constructor](ProvenanceApi.md#constructor)

### Accessors

- [artifactsFolder](ProvenanceApi.md#artifactsfolder)
- [circuitsFolder](ProvenanceApi.md#circuitsfolder)
- [config](ProvenanceApi.md#config)
- [instanceConfig](ProvenanceApi.md#instanceconfig)
- [instantiableConfig](ProvenanceApi.md#instantiableconfig)
- [logger](ProvenanceApi.md#logger)
- [nevermined](ProvenanceApi.md#nevermined)
- [web3](ProvenanceApi.md#web3)

### Methods

- [actedOnBehalf](ProvenanceApi.md#actedonbehalf)
- [addDidProvenanceDelegate](ProvenanceApi.md#adddidprovenancedelegate)
- [getDIDProvenanceEvents](ProvenanceApi.md#getdidprovenanceevents)
- [getProvenanceEntry](ProvenanceApi.md#getprovenanceentry)
- [getProvenanceMethodEvents](ProvenanceApi.md#getprovenancemethodevents)
- [getProvenanceOwner](ProvenanceApi.md#getprovenanceowner)
- [isProvenanceDelegate](ProvenanceApi.md#isprovenancedelegate)
- [removeDidProvenanceDelegate](ProvenanceApi.md#removedidprovenancedelegate)
- [setInstanceConfig](ProvenanceApi.md#setinstanceconfig)
- [used](ProvenanceApi.md#used)
- [wasAssociatedWith](ProvenanceApi.md#wasassociatedwith)
- [wasDerivedFrom](ProvenanceApi.md#wasderivedfrom)
- [getInstance](ProvenanceApi.md#getinstance)
- [setInstanceConfig](ProvenanceApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new ProvenanceApi**(`config`)

Creates a new ProvenanceApi

#### Parameters

| Name     | Type                                                        | Description                              |
| :------- | :---------------------------------------------------------- | :--------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | Configuration of the Nevermined instance |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:18](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L18)

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

### actedOnBehalf

▸ **actedOnBehalf**(`provenanceId`, `did`, `delegateAgentId`, `responsibleAgentId`, `activityId`, `signature`, `attributes`, `from`, `txParams?`): `Promise`<`boolean`\>

Implements the W3C PROV Delegation action

#### Parameters

| Name                 | Type                                            | Description                                        |
| :------------------- | :---------------------------------------------- | :------------------------------------------------- |
| `provenanceId`       | `string`                                        | Provenance ID                                      |
| `did`                | `string`                                        | Identifier of the entity created                   |
| `delegateAgentId`    | `string`                                        | Delegate Agent Identifier                          |
| `responsibleAgentId` | `string`                                        | Responsible Agent Identifier                       |
| `activityId`         | `string`                                        | Identifier of the activity creating the new entity |
| `signature`          | `string`                                        | Signature provided by the delegated agent          |
| `attributes`         | `string`                                        | Attributes associated with the action              |
| `from`               | [`Account`](Account.md)                         | Sender account address.                            |
| `txParams?`          | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                             |

#### Returns

`Promise`<`boolean`\>

true if the call succeeded.

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:147](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L147)

---

### addDidProvenanceDelegate

▸ **addDidProvenanceDelegate**(`did`, `delegated`, `from`, `txParams?`): `Promise`<`boolean`\>

Add new DID provenance delegate.

#### Parameters

| Name        | Type                                            | Description                      |
| :---------- | :---------------------------------------------- | :------------------------------- |
| `did`       | `string`                                        | Identifier of the entity created |
| `delegated` | `string`                                        | Delegate Address                 |
| `from`      | [`Account`](Account.md)                         | Sender account address.          |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters           |

#### Returns

`Promise`<`boolean`\>

true if the call succeeded.

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:180](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L180)

---

### getDIDProvenanceEvents

▸ **getDIDProvenanceEvents**(`did`): `Promise`<{ `activityId`: `string` ; `agentId`: `string` ; `agentInvolvedId`: `string` ; `attributes?`: `string` ; `blockNumberUpdated`: `number` ; `did`: `string` ; `id`: `string` ; `method`: `number` ; `provId`: `string` ; `relatedDid`: `string` }[]\>

Search for ProvenanceAttributeRegistered events related with a specific DID

#### Parameters

| Name  | Type     | Description                      |
| :---- | :------- | :------------------------------- |
| `did` | `string` | identifier of the entity created |

#### Returns

`Promise`<{ `activityId`: `string` ; `agentId`: `string` ; `agentInvolvedId`: `string` ; `attributes?`: `string` ; `blockNumberUpdated`: `number` ; `did`: `string` ; `id`: `string` ; `method`: `number` ; `provId`: `string` ; `relatedDid`: `string` }[]\>

A list of provenance events.

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:240](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L240)

---

### getProvenanceEntry

▸ **getProvenanceEntry**(`provenanceId`): `Promise`<[`ProvenanceRegistry`](../interfaces/ProvenanceRegistry.md)\>

Given a provenance id it returns the provenance details

#### Parameters

| Name           | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `provenanceId` | `string` | Unique identifier of a provenance entry |

#### Returns

`Promise`<[`ProvenanceRegistry`](../interfaces/ProvenanceRegistry.md)\>

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L28)

---

### getProvenanceMethodEvents

▸ **getProvenanceMethodEvents**<`T`\>(`method`, `did`): `Promise`<[`ProvenanceEvent`](../code-reference.md#provenanceevent)<`T`\>[]\>

Search for ProvenanceAttributeRegistered events related with a specific DID

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `T`  | extends [`ProvenanceMethod`](../enums/ProvenanceMethod.md) |

#### Parameters

| Name     | Type     | Description                      |
| :------- | :------- | :------------------------------- |
| `method` | `T`      | Method                           |
| `did`    | `string` | Identifier of the entity created |

#### Returns

`Promise`<[`ProvenanceEvent`](../code-reference.md#provenanceevent)<`T`\>[]\>

A list of provenance method events.

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:250](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L250)

---

### getProvenanceOwner

▸ **getProvenanceOwner**(`did`): `Promise`<`unknown`\>

Retrieve the owner of the provenance record.

#### Parameters

| Name  | Type     | Description                      |
| :---- | :------- | :------------------------------- |
| `did` | `string` | Identifier of the entity created |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:231](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L231)

---

### isProvenanceDelegate

▸ **isProvenanceDelegate**(`did`, `delegated`): `Promise`<`unknown`\>

Check whether a given DID delegate exists

#### Parameters

| Name        | Type     | Description                      |
| :---------- | :------- | :------------------------------- |
| `did`       | `string` | Identifier of the entity created |
| `delegated` | `string` | Delegate Address                 |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:223](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L223)

---

### removeDidProvenanceDelegate

▸ **removeDidProvenanceDelegate**(`did`, `delegated`, `from`, `txParams?`): `Promise`<`boolean`\>

Remove an existing DID delegate.

#### Parameters

| Name        | Type                                            | Description                      |
| :---------- | :---------------------------------------------- | :------------------------------- |
| `did`       | `string`                                        | Identifier of the entity created |
| `delegated` | `string`                                        | Delegate Address                 |
| `from`      | [`Account`](Account.md)                         | Sender account address.          |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters           |

#### Returns

`Promise`<`boolean`\>

true if the call succeeded.

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:203](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L203)

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

### used

▸ **used**(`provenanceId`, `did`, `agentId`, `activityId`, `signature`, `attributes`, `from`, `txParams?`): `Promise`<`boolean`\>

Implements the W3C PROV Usage action

#### Parameters

| Name           | Type                                            | Description                                         |
| :------------- | :---------------------------------------------- | :-------------------------------------------------- |
| `provenanceId` | `string`                                        | Provenance ID                                       |
| `did`          | `string`                                        | Identifier of the entity created                    |
| `agentId`      | `string`                                        | Agent Identifier                                    |
| `activityId`   | `string`                                        | Identifier of the activity creating the new entity  |
| `signature`    | `string`                                        | Signature (optional) provided by the agent involved |
| `attributes`   | `string`                                        | Attributes associated with the action               |
| `from`         | [`Account`](Account.md)                         | Sender account address.                             |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                              |

#### Returns

`Promise`<`boolean`\>

true if the call succeeded.

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L44)

---

### wasAssociatedWith

▸ **wasAssociatedWith**(`provenanceId`, `did`, `agentId`, `activityId`, `attributes`, `from`, `txParams?`): `Promise`<`boolean`\>

Implements the W3C PROV Association action

#### Parameters

| Name           | Type                                            | Description                                        |
| :------------- | :---------------------------------------------- | :------------------------------------------------- |
| `provenanceId` | `string`                                        | Provenance ID                                      |
| `did`          | `string`                                        | Identifier of the entity created                   |
| `agentId`      | `string`                                        | Agent Identifier                                   |
| `activityId`   | `string`                                        | Identifier of the activity creating the new entity |
| `attributes`   | `string`                                        | Attributes associated with the action              |
| `from`         | [`Account`](Account.md)                         | Sender account address.                            |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                             |

#### Returns

`Promise`<`boolean`\>

true if the call succeeded.

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:113](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L113)

---

### wasDerivedFrom

▸ **wasDerivedFrom**(`provenanceId`, `newEntityDid`, `usedEntityDid`, `agentId`, `activityId`, `attributes`, `from`, `txParams?`): `Promise`<`boolean`\>

Implements the W3C PROV Derivation action

#### Parameters

| Name            | Type                                            | Description                                            |
| :-------------- | :---------------------------------------------- | :----------------------------------------------------- |
| `provenanceId`  | `string`                                        | Provenance ID                                          |
| `newEntityDid`  | `string`                                        | Identifier of the new entity derived                   |
| `usedEntityDid` | `string`                                        | Identifier of the entity used to derive the new entity |
| `agentId`       | `string`                                        | Agent Identifier                                       |
| `activityId`    | `string`                                        | Identifier of the activity creating the new entity     |
| `attributes`    | `string`                                        | Attributes associated with the action                  |
| `from`          | [`Account`](Account.md)                         | Sender account address.                                |
| `txParams?`     | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                                 |

#### Returns

`Promise`<`boolean`\>

true if the call succeeded.

#### Defined in

[src/nevermined/api/ProvenanceApi.ts:79](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ProvenanceApi.ts#L79)

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
