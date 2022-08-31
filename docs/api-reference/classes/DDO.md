[@nevermined-io/nevermined-sdk-js](../code-reference.md) / DDO

# Class: DDO

DID Descriptor Object.
Contains all the data related to an asset.

## Table of contents

### Constructors

- [constructor](DDO.md#constructor)

### Properties

- [@context](DDO.md#@context)
- [authentication](DDO.md#authentication)
- [created](DDO.md#created)
- [id](DDO.md#id)
- [proof](DDO.md#proof)
- [publicKey](DDO.md#publickey)
- [service](DDO.md#service)
- [userId](DDO.md#userid)

### Methods

- [addProof](DDO.md#addproof)
- [addService](DDO.md#addservice)
- [addSignature](DDO.md#addsignature)
- [assignDid](DDO.md#assigndid)
- [checksum](DDO.md#checksum)
- [findServiceById](DDO.md#findservicebyid)
- [findServiceByType](DDO.md#findservicebytype)
- [generateDidSeed](DDO.md#generatedidseed)
- [generateProof](DDO.md#generateproof)
- [shortId](DDO.md#shortid)
- [updateService](DDO.md#updateservice)
- [deserialize](DDO.md#deserialize)
- [serialize](DDO.md#serialize)

## Constructors

### constructor

• **new DDO**(`ddo?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ddo` | `Partial`<[`DDO`](DDO.md)\> |

#### Defined in

[src/ddo/DDO.ts:56](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L56)

## Properties

### @context

• **@context**: `string` = `'https://w3id.org/did/v1'`

#### Defined in

[src/ddo/DDO.ts:36](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L36)

___

### authentication

• **authentication**: `Authentication`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:50](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L50)

___

### created

• **created**: `string`

#### Defined in

[src/ddo/DDO.ts:46](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L46)

___

### id

• **id**: `string` = `null`

DID, descentralized ID.

#### Defined in

[src/ddo/DDO.ts:42](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L42)

___

### proof

• **proof**: `Proof`

#### Defined in

[src/ddo/DDO.ts:54](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L54)

___

### publicKey

• **publicKey**: `PublicKey`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:48](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L48)

___

### service

• **service**: `ServiceCommon`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:52](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L52)

___

### userId

• **userId**: `string`

#### Defined in

[src/ddo/DDO.ts:44](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L44)

## Methods

### addProof

▸ **addProof**(`publicKey`): `Promise`<`void`\>

Generates and adds a proof using personal sign on the DDO.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `string` | Public key to be used on personal sign. |

#### Returns

`Promise`<`void`\>

Proof object.

#### Defined in

[src/ddo/DDO.ts:130](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L130)

___

### addService

▸ **addService**(`nevermined`, `service`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nevermined` | [`Nevermined`](Nevermined.md) |
| `service` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/DDO.ts:137](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L137)

___

### addSignature

▸ **addSignature**(`nevermined`, `publicKey`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nevermined` | [`Nevermined`](Nevermined.md) |
| `publicKey` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/DDO.ts:156](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L156)

___

### assignDid

▸ **assignDid**(`didSeed`, `didRegistry`, `publisher`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `didSeed` | `any` |
| `didRegistry` | `default` |
| `publisher` | [`Account`](Account.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/DDO.ts:145](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L145)

___

### checksum

▸ **checksum**(`seed`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `string` |

#### Returns

`string`

#### Defined in

[src/ddo/DDO.ts:98](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L98)

___

### findServiceById

▸ **findServiceById**<`T`\>(`index`): `Service`<`T`\>

Finds a service of a DDO by index.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ServiceType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | index. |

#### Returns

`Service`<`T`\>

Service.

#### Defined in

[src/ddo/DDO.ts:72](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L72)

___

### findServiceByType

▸ **findServiceByType**<`T`\>(`serviceType`): `Service`<`T`\>

Finds a service of a DDO by type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ServiceType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serviceType` | `T` | Service type. |

#### Returns

`Service`<`T`\>

Service.

#### Defined in

[src/ddo/DDO.ts:90](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L90)

___

### generateDidSeed

▸ **generateDidSeed**(`seed`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `any` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/ddo/DDO.ts:152](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L152)

___

### generateProof

▸ **generateProof**(`publicKey`): `Promise`<`Proof`\>

Generates proof using personal sign.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `string` | Public key to be used on personal sign. |

#### Returns

`Promise`<`Proof`\>

Proof object.

#### Defined in

[src/ddo/DDO.ts:109](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L109)

___

### shortId

▸ **shortId**(): `string`

#### Returns

`string`

#### Defined in

[src/ddo/DDO.ts:63](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L63)

___

### updateService

▸ **updateService**(`nevermined`, `service`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nevermined` | [`Nevermined`](Nevermined.md) |
| `service` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/DDO.ts:141](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L141)

___

### deserialize

▸ `Static` **deserialize**(`ddoString`): [`DDO`](DDO.md)

Deserializes the DDO object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ddoString` | `string` |

#### Returns

[`DDO`](DDO.md)

DDO deserialized.

#### Defined in

[src/ddo/DDO.ts:30](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L30)

___

### serialize

▸ `Static` **serialize**(`ddo`): `string`

Serializes the DDO object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ddo` | [`DDO`](DDO.md) |

#### Returns

`string`

DDO serialized.

#### Defined in

[src/ddo/DDO.ts:21](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/DDO.ts#L21)
