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
- [didSeed](DDO.md#didseed)
- [id](DDO.md#id)
- [proof](DDO.md#proof)
- [publicKey](DDO.md#publickey)
- [service](DDO.md#service)
- [userId](DDO.md#userid)

### Methods

- [addDefaultMetadataService](DDO.md#adddefaultmetadataservice)
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
- [getInstance](DDO.md#getinstance)
- [serialize](DDO.md#serialize)

## Constructors

### constructor

• **new DDO**(`ddo?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ddo` | `Partial`<[`DDO`](DDO.md)\> |

#### Defined in

[src/ddo/DDO.ts:58](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L58)

## Properties

### @context

• **@context**: `string` = `'https://w3id.org/did/v1'`

#### Defined in

[src/ddo/DDO.ts:37](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L37)

___

### authentication

• **authentication**: `Authentication`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:52](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L52)

___

### created

• **created**: `string`

#### Defined in

[src/ddo/DDO.ts:48](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L48)

___

### didSeed

• **didSeed**: `string` = `null`

#### Defined in

[src/ddo/DDO.ts:44](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L44)

___

### id

• **id**: `string` = `null`

DID, decentralizes ID.

#### Defined in

[src/ddo/DDO.ts:42](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L42)

___

### proof

• **proof**: `Proof`

#### Defined in

[src/ddo/DDO.ts:56](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L56)

___

### publicKey

• **publicKey**: `PublicKey`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:50](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L50)

___

### service

• **service**: `ServiceCommon`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:54](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L54)

___

### userId

• **userId**: `string`

#### Defined in

[src/ddo/DDO.ts:46](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L46)

## Methods

### addDefaultMetadataService

▸ **addDefaultMetadataService**(`metadata`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | [`MetaData`](../interfaces/MetaData.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/DDO.ts:163](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L163)

___

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

[src/ddo/DDO.ts:152](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L152)

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

[src/ddo/DDO.ts:159](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L159)

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

[src/ddo/DDO.ts:204](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L204)

___

### assignDid

▸ **assignDid**(`didSeed`, `didRegistry`, `publisher`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `didSeed` | `string` |
| `didRegistry` | `default` |
| `publisher` | [`Account`](Account.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/DDO.ts:188](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L188)

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

[src/ddo/DDO.ts:120](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L120)

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

[src/ddo/DDO.ts:94](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L94)

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

[src/ddo/DDO.ts:112](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L112)

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

[src/ddo/DDO.ts:200](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L200)

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

[src/ddo/DDO.ts:131](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L131)

___

### shortId

▸ **shortId**(): `string`

#### Returns

`string`

#### Defined in

[src/ddo/DDO.ts:85](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L85)

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

[src/ddo/DDO.ts:184](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L184)

___

### deserialize

▸ `Static` **deserialize**(`ddoString`): [`DDO`](DDO.md)

Deserializes the DDO object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ddoString` | `string` | The serialized [DDO](DDO.md) to be deserialized. |

#### Returns

[`DDO`](DDO.md)

The deserialized [DDO](DDO.md).

#### Defined in

[src/ddo/DDO.ts:31](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L31)

___

### getInstance

▸ `Static` **getInstance**(`userId`, `publisherAddress`): [`DDO`](DDO.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `publisherAddress` | `string` |

#### Returns

[`DDO`](DDO.md)

#### Defined in

[src/ddo/DDO.ts:65](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L65)

___

### serialize

▸ `Static` **serialize**(`ddo`): `string`

Serializes the DDO object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ddo` | [`DDO`](DDO.md) | The [DDO](DDO.md) to be serialized. |

#### Returns

`string`

DDO serialized.

#### Defined in

[src/ddo/DDO.ts:22](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/DDO.ts#L22)
