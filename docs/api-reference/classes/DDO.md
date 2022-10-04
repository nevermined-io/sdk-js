[@nevermined-io/nevermined-sdk-js](../code-reference.md) / DDO

# Class: DDO

DID Descriptor Object.
Contains all the data related to an asset.

## Table of contents

### Constructors

- [constructor](DDO.md#constructor)

### Properties

- [@context](DDO.md#@context)
- [\_nvm](DDO.md#_nvm)
- [authentication](DDO.md#authentication)
- [created](DDO.md#created)
- [didSeed](DDO.md#didseed)
- [id](DDO.md#id)
- [proof](DDO.md#proof)
- [publicKey](DDO.md#publickey)
- [service](DDO.md#service)

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

[src/ddo/DDO.ts:59](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L59)

## Properties

### @context

• **@context**: `string` = `'https://w3id.org/did/v1'`

#### Defined in

[src/ddo/DDO.ts:38](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L38)

___

### \_nvm

• **\_nvm**: `NvmConfig`

#### Defined in

[src/ddo/DDO.ts:47](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L47)

___

### authentication

• **authentication**: `Authentication`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:53](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L53)

___

### created

• **created**: `string`

#### Defined in

[src/ddo/DDO.ts:49](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L49)

___

### didSeed

• **didSeed**: `string` = `null`

#### Defined in

[src/ddo/DDO.ts:45](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L45)

___

### id

• **id**: `string` = `null`

DID, decentralizes ID.

#### Defined in

[src/ddo/DDO.ts:43](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L43)

___

### proof

• **proof**: `Proof`

#### Defined in

[src/ddo/DDO.ts:57](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L57)

___

### publicKey

• **publicKey**: `PublicKey`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:51](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L51)

___

### service

• **service**: `ServiceCommon`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:55](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L55)

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

[src/ddo/DDO.ts:172](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L172)

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

[src/ddo/DDO.ts:161](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L161)

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

[src/ddo/DDO.ts:168](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L168)

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

[src/ddo/DDO.ts:214](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L214)

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

[src/ddo/DDO.ts:198](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L198)

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

[src/ddo/DDO.ts:129](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L129)

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

[src/ddo/DDO.ts:103](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L103)

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

[src/ddo/DDO.ts:121](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L121)

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

[src/ddo/DDO.ts:210](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L210)

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

[src/ddo/DDO.ts:140](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L140)

___

### shortId

▸ **shortId**(): `string`

#### Returns

`string`

#### Defined in

[src/ddo/DDO.ts:94](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L94)

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

[src/ddo/DDO.ts:194](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L194)

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

[src/ddo/DDO.ts:32](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L32)

___

### getInstance

▸ `Static` **getInstance**(`userId`, `publisherAddress`, `appId?`): [`DDO`](DDO.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `publisherAddress` | `string` |
| `appId?` | `string` |

#### Returns

[`DDO`](DDO.md)

#### Defined in

[src/ddo/DDO.ts:66](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L66)

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

[src/ddo/DDO.ts:23](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/ddo/DDO.ts#L23)
