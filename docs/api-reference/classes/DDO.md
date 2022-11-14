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
- [getPriceByService](DDO.md#getpricebyservice)
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

[src/ddo/DDO.ts:62](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L62)

## Properties

### @context

• **@context**: `string` = `'https://w3id.org/did/v1'`

#### Defined in

[src/ddo/DDO.ts:41](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L41)

___

### \_nvm

• **\_nvm**: `NvmConfig`

#### Defined in

[src/ddo/DDO.ts:50](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L50)

___

### authentication

• **authentication**: `Authentication`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:56](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L56)

___

### created

• **created**: `string`

#### Defined in

[src/ddo/DDO.ts:52](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L52)

___

### didSeed

• **didSeed**: `string` = `null`

#### Defined in

[src/ddo/DDO.ts:48](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L48)

___

### id

• **id**: `string` = `null`

DID, decentralizes ID.

#### Defined in

[src/ddo/DDO.ts:46](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L46)

___

### proof

• **proof**: `Proof`

#### Defined in

[src/ddo/DDO.ts:60](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L60)

___

### publicKey

• **publicKey**: `PublicKey`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:54](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L54)

___

### service

• **service**: `ServiceCommon`[] = `[]`

#### Defined in

[src/ddo/DDO.ts:58](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L58)

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

[src/ddo/DDO.ts:199](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L199)

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

[src/ddo/DDO.ts:188](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L188)

___

### addService

▸ **addService**(`service`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/DDO.ts:195](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L195)

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

[src/ddo/DDO.ts:250](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L250)

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

[src/ddo/DDO.ts:234](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L234)

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

[src/ddo/DDO.ts:156](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L156)

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

[src/ddo/DDO.ts:106](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L106)

___

### findServiceByType

▸ **findServiceByType**<`T`\>(`serviceType`): `Service`<`T`\>

Finds a service of a DDO by type.

**`Throws`**

DDOServiceNotFoundError If the service is not in the DDO.

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

[Service](../interfaces/Service.md).

#### Defined in

[src/ddo/DDO.ts:126](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L126)

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

[src/ddo/DDO.ts:246](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L246)

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

[src/ddo/DDO.ts:167](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L167)

___

### getPriceByService

▸ **getPriceByService**(`serviceType?`): `default`

Get the total price of a service.

**`Example`**

```ts
const price = ddo.getPriceByService('nft-access')
```

**`Throws`**

DDOPriceNotFoundError

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `serviceType` | `ServiceType` | `'access'` | Service type |

#### Returns

`default`

BigNumber

#### Defined in

[src/ddo/DDO.ts:146](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L146)

___

### shortId

▸ **shortId**(): `string`

#### Returns

`string`

#### Defined in

[src/ddo/DDO.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L97)

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

[src/ddo/DDO.ts:230](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L230)

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

[src/ddo/DDO.ts:35](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L35)

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

[src/ddo/DDO.ts:69](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L69)

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

[src/ddo/DDO.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/DDO.ts#L26)
