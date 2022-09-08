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

[src/ddo/DDO.ts:59](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L59)

## Properties

### @context

• **@context**: `string` = `'https://w3id.org/did/v1'`

#### Defined in

[src/ddo/DDO.ts:37](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L37)

___

### authentication

• **authentication**: `Authentication`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:53](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L53)

___

### created

• **created**: `string`

#### Defined in

[src/ddo/DDO.ts:49](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L49)

___

### didSeed

• **didSeed**: `string` = `null`

#### Defined in

[src/ddo/DDO.ts:45](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L45)

___

### id

• **id**: `string` = `null`

DID, descentralized ID.

#### Defined in

[src/ddo/DDO.ts:43](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L43)

___

### proof

• **proof**: `Proof`

#### Defined in

[src/ddo/DDO.ts:57](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L57)

___

### publicKey

• **publicKey**: `PublicKey`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:51](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L51)

___

### service

• **service**: `ServiceCommon`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:55](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L55)

___

### userId

• **userId**: `string`

#### Defined in

[src/ddo/DDO.ts:47](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L47)

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

[src/ddo/DDO.ts:164](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L164)

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

[src/ddo/DDO.ts:153](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L153)

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

[src/ddo/DDO.ts:160](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L160)

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

[src/ddo/DDO.ts:205](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L205)

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

[src/ddo/DDO.ts:189](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L189)

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

[src/ddo/DDO.ts:121](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L121)

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

[src/ddo/DDO.ts:95](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L95)

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

[src/ddo/DDO.ts:113](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L113)

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

[src/ddo/DDO.ts:201](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L201)

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

[src/ddo/DDO.ts:132](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L132)

___

### shortId

▸ **shortId**(): `string`

#### Returns

`string`

#### Defined in

[src/ddo/DDO.ts:86](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L86)

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

[src/ddo/DDO.ts:185](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L185)

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

[src/ddo/DDO.ts:31](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L31)

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

[src/ddo/DDO.ts:66](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L66)

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

[src/ddo/DDO.ts:22](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/ddo/DDO.ts#L22)
