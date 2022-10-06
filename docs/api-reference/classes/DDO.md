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

[src/ddo/DDO.ts:60](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L60)

## Properties

### @context

• **@context**: `string` = `'https://w3id.org/did/v1'`

#### Defined in

[src/ddo/DDO.ts:39](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L39)

___

### \_nvm

• **\_nvm**: `NvmConfig`

#### Defined in

[src/ddo/DDO.ts:48](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L48)

___

### authentication

• **authentication**: `Authentication`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:54](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L54)

___

### created

• **created**: `string`

#### Defined in

[src/ddo/DDO.ts:50](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L50)

___

### didSeed

• **didSeed**: `string` = `null`

#### Defined in

[src/ddo/DDO.ts:46](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L46)

___

### id

• **id**: `string` = `null`

DID, decentralizes ID.

#### Defined in

[src/ddo/DDO.ts:44](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L44)

___

### proof

• **proof**: `Proof`

#### Defined in

[src/ddo/DDO.ts:58](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L58)

___

### publicKey

• **publicKey**: `PublicKey`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:52](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L52)

___

### service

• **service**: `ServiceCommon`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:56](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L56)

## Methods

### addDefaultMetadataService

▸ **addDefaultMetadataService**(`metadata`, `nftAttributes?`): `Promise`<[`MetaDataMain`](../interfaces/MetaDataMain.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | [`MetaData`](../interfaces/MetaData.md) |
| `nftAttributes?` | `NFTAttributes` |

#### Returns

`Promise`<[`MetaDataMain`](../interfaces/MetaDataMain.md)\>

#### Defined in

[src/ddo/DDO.ts:173](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L173)

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

[src/ddo/DDO.ts:162](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L162)

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

[src/ddo/DDO.ts:169](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L169)

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

[src/ddo/DDO.ts:224](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L224)

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

[src/ddo/DDO.ts:208](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L208)

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

[src/ddo/DDO.ts:130](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L130)

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

[src/ddo/DDO.ts:104](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L104)

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

[src/ddo/DDO.ts:122](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L122)

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

[src/ddo/DDO.ts:220](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L220)

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

[src/ddo/DDO.ts:141](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L141)

___

### shortId

▸ **shortId**(): `string`

#### Returns

`string`

#### Defined in

[src/ddo/DDO.ts:95](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L95)

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

[src/ddo/DDO.ts:204](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L204)

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

[src/ddo/DDO.ts:33](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L33)

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

[src/ddo/DDO.ts:67](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L67)

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

[src/ddo/DDO.ts:24](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/ddo/DDO.ts#L24)
