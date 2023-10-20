[@nevermined-io/sdk](../code-reference.md) / DDO

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
- [updated](DDO.md#updated)

### Methods

- [addDefaultMetadataService](DDO.md#adddefaultmetadataservice)
- [addProof](DDO.md#addproof)
- [addService](DDO.md#addservice)
- [addSignature](DDO.md#addsignature)
- [assignDid](DDO.md#assigndid)
- [checksum](DDO.md#checksum)
- [findServiceByIndex](DDO.md#findservicebyindex)
- [findServiceByReference](DDO.md#findservicebyreference)
- [findServiceByType](DDO.md#findservicebytype)
- [generateDidSeed](DDO.md#generatedidseed)
- [generateProof](DDO.md#generateproof)
- [getAssetPriceFromDDOByServiceType](DDO.md#getassetpricefromddobyservicetype)
- [getPriceByService](DDO.md#getpricebyservice)
- [getProofChecksum](DDO.md#getproofchecksum)
- [getServicesByType](DDO.md#getservicesbytype)
- [reorderServices](DDO.md#reorderservices)
- [replaceService](DDO.md#replaceservice)
- [serviceExists](DDO.md#serviceexists)
- [serviceIndexExists](DDO.md#serviceindexexists)
- [setAssetPriceFromDDOByService](DDO.md#setassetpricefromddobyservice)
- [setNFTRewardsFromService](DDO.md#setnftrewardsfromservice)
- [shortId](DDO.md#shortid)
- [updateMetadataService](DDO.md#updatemetadataservice)
- [updateService](DDO.md#updateservice)
- [createAuthorizationService](DDO.md#createauthorizationservice)
- [deserialize](DDO.md#deserialize)
- [findAndReplaceDDOAttribute](DDO.md#findandreplaceddoattribute)
- [findServiceConditionByName](DDO.md#findserviceconditionbyname)
- [getAssetPriceFromService](DDO.md#getassetpricefromservice)
- [getDIDFromService](DDO.md#getdidfromservice)
- [getDurationFromService](DDO.md#getdurationfromservice)
- [getInstance](DDO.md#getinstance)
- [getNFTTransferFromService](DDO.md#getnfttransferfromservice)
- [getNftAmountFromService](DDO.md#getnftamountfromservice)
- [getNftContractAddressFromService](DDO.md#getnftcontractaddressfromservice)
- [getNftHolderFromService](DDO.md#getnftholderfromservice)
- [getParameterFromCondition](DDO.md#getparameterfromcondition)
- [getTokenIdFromService](DDO.md#gettokenidfromservice)
- [serialize](DDO.md#serialize)

## Constructors

### constructor

• **new DDO**(`ddo?`)

#### Parameters

| Name  | Type                        |
| :---- | :-------------------------- |
| `ddo` | `Partial`<[`DDO`](DDO.md)\> |

#### Defined in

[src/ddo/DDO.ts:100](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L100)

## Properties

### @context

• **@context**: `string` = `'https://w3id.org/did/v1'`

#### Defined in

[src/ddo/DDO.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L77)

---

### \_nvm

• **\_nvm**: [`NvmConfig`](../interfaces/NvmConfig.md)

#### Defined in

[src/ddo/DDO.ts:86](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L86)

---

### authentication

• **authentication**: [`Authentication`](../interfaces/Authentication.md)[] = `[]`

#### Defined in

[src/ddo/DDO.ts:94](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L94)

---

### created

• **created**: `string`

#### Defined in

[src/ddo/DDO.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L88)

---

### didSeed

• **didSeed**: `string` = `null`

#### Defined in

[src/ddo/DDO.ts:84](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L84)

---

### id

• **id**: `string` = `null`

DID, decentralizes ID.

#### Defined in

[src/ddo/DDO.ts:82](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L82)

---

### proof

• **proof**: [`Proof`](../interfaces/Proof.md)

#### Defined in

[src/ddo/DDO.ts:98](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L98)

---

### publicKey

• **publicKey**: [`PublicKey`](../interfaces/PublicKey.md)[] = `[]`

#### Defined in

[src/ddo/DDO.ts:92](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L92)

---

### service

• **service**: [`ServiceCommon`](../interfaces/ServiceCommon.md)[] = `[]`

#### Defined in

[src/ddo/DDO.ts:96](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L96)

---

### updated

• `Optional` **updated**: `string`

#### Defined in

[src/ddo/DDO.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L90)

## Methods

### addDefaultMetadataService

▸ **addDefaultMetadataService**(`metadata`, `nftAttributes?`): [`MetaDataMain`](../interfaces/MetaDataMain.md)

Adds a default metadata service to the DDO.

#### Parameters

| Name             | Type                                    | Description    |
| :--------------- | :-------------------------------------- | :------------- |
| `metadata`       | [`MetaData`](../interfaces/MetaData.md) | metadata       |
| `nftAttributes?` | [`NFTAttributes`](NFTAttributes.md)     | nft attributes |

#### Returns

[`MetaDataMain`](../interfaces/MetaDataMain.md)

main metadata attributes

#### Defined in

[src/ddo/DDO.ts:322](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L322)

---

### addProof

▸ **addProof**(`publicKey`): `Promise`<`void`\>

Generates and adds a proof using personal sign on the DDO.

#### Parameters

| Name        | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `publicKey` | `string` | Public key to be used on personal sign. |

#### Returns

`Promise`<`void`\>

void.

#### Defined in

[src/ddo/DDO.ts:272](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L272)

---

### addService

▸ **addService**(`service`): `void`

Adds a service to the DDO.

#### Parameters

| Name      | Type                                              |
| :-------- | :------------------------------------------------ |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) |

#### Returns

`void`

#### Defined in

[src/ddo/DDO.ts:294](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L294)

---

### addSignature

▸ **addSignature**(`nevermined`, `publicKey`): `Promise`<`void`\>

It adds a signature to the the proof object of the DDO

#### Parameters

| Name         | Type                          | Description                |
| :----------- | :---------------------------- | :------------------------- |
| `nevermined` | [`Nevermined`](Nevermined.md) | nevermined object          |
| `publicKey`  | `string`                      | public key to sign the DDO |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/DDO.ts:404](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L404)

---

### assignDid

▸ **assignDid**(`didSeed`, `didRegistry`, `publisher`): `Promise`<`void`\>

Assign a DID to the DDO

#### Parameters

| Name          | Type                            | Description                 |
| :------------ | :------------------------------ | :-------------------------- |
| `didSeed`     | `string`                        | DID seed                    |
| `didRegistry` | [`DIDRegistry`](DIDRegistry.md) | DIDRegistry contract        |
| `publisher`   | [`Account`](Account.md)         | account registering the DID |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/DDO.ts:382](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L382)

---

### checksum

▸ **checksum**(`seed`): `string`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `seed` | `string` |

#### Returns

`string`

#### Defined in

[src/ddo/DDO.ts:234](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L234)

---

### findServiceByIndex

▸ **findServiceByIndex**<`T`\>(`index`): [`Service`](../code-reference.md#service)<`T`\>

Finds a service of a DDO by index.

#### Type parameters

| Name | Type                                                      |
| :--- | :-------------------------------------------------------- |
| `T`  | extends [`ServiceType`](../code-reference.md#servicetype) |

#### Parameters

| Name    | Type     | Description                      |
| :------ | :------- | :------------------------------- |
| `index` | `number` | index of the service in the DDO. |

#### Returns

[`Service`](../code-reference.md#service)<`T`\>

Service.

#### Defined in

[src/ddo/DDO.ts:139](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L139)

---

### findServiceByReference

▸ **findServiceByReference**<`T`\>(`serviceReference`): [`Service`](../code-reference.md#service)<`T`\>

Finds a service of a DDO by index.

#### Type parameters

| Name | Type                                                      |
| :--- | :-------------------------------------------------------- |
| `T`  | extends [`ServiceType`](../code-reference.md#servicetype) |

#### Parameters

| Name               | Type                                                          | Description                               |
| :----------------- | :------------------------------------------------------------ | :---------------------------------------- |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype) | reference to the service (index or type). |

#### Returns

[`Service`](../code-reference.md#service)<`T`\>

Service.

#### Defined in

[src/ddo/DDO.ts:173](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L173)

---

### findServiceByType

▸ **findServiceByType**<`T`\>(`serviceType`): [`Service`](../code-reference.md#service)<`T`\>

Finds the first service of a DDO by type.

#### Type parameters

| Name | Type                                                      |
| :--- | :-------------------------------------------------------- |
| `T`  | extends [`ServiceType`](../code-reference.md#servicetype) |

#### Parameters

| Name          | Type | Description                           |
| :------------ | :--- | :------------------------------------ |
| `serviceType` | `T`  | Service type used by find the service |

#### Returns

[`Service`](../code-reference.md#service)<`T`\>

[Service](../code-reference.md#service).

**`Throws`**

[DDOServiceNotFoundError](DDOServiceNotFoundError.md) If the service is not in the DDO.

#### Defined in

[src/ddo/DDO.ts:159](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L159)

---

### generateDidSeed

▸ **generateDidSeed**(`seed`): `Promise`<`string`\>

It generates a DID seed from a seed

#### Parameters

| Name   | Type  | Description |
| :----- | :---- | :---------- |
| `seed` | `any` | the seed    |

#### Returns

`Promise`<`string`\>

the string represeing the DID seed

#### Defined in

[src/ddo/DDO.ts:395](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L395)

---

### generateProof

▸ **generateProof**(`publicKey`): `Promise`<[`Proof`](../interfaces/Proof.md)\>

Generates proof using personal sign.

#### Parameters

| Name        | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `publicKey` | `string` | Public key to be used on personal sign. |

#### Returns

`Promise`<[`Proof`](../interfaces/Proof.md)\>

Proof object.

#### Defined in

[src/ddo/DDO.ts:243](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L243)

---

### getAssetPriceFromDDOByServiceType

▸ **getAssetPriceFromDDOByServiceType**(`service`): [`AssetPrice`](AssetPrice.md)

It gets the AssetPrice from a service given the serviceType

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceType`](../code-reference.md#servicetype) | the service to search in |

#### Returns

[`AssetPrice`](AssetPrice.md)

the AssetPrice object

#### Defined in

[src/ddo/DDO.ts:552](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L552)

---

### getPriceByService

▸ **getPriceByService**(`serviceType?`): `bigint`

Get the total price of a service.

#### Parameters

| Name          | Type                                              | Default value | Description  |
| :------------ | :------------------------------------------------ | :------------ | :----------- |
| `serviceType` | [`ServiceType`](../code-reference.md#servicetype) | `'access'`    | Service type |

#### Returns

`bigint`

bigint

**`Example`**

```ts
const price = ddo.getPriceByService('nft-access')
```

**`Throws`**

[DDOPriceNotFoundError](DDOPriceNotFoundError.md)

#### Defined in

[src/ddo/DDO.ts:224](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L224)

---

### getProofChecksum

▸ **getProofChecksum**(): `string`

Get the checksum of the proof.

#### Returns

`string`

string containing the checksum of the proof.

#### Defined in

[src/ddo/DDO.ts:263](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L263)

---

### getServicesByType

▸ **getServicesByType**<`T`\>(`serviceType`): [`Service`](../code-reference.md#service)<`T`\>[]

Gets all the services of a DDO with a specific type.

#### Type parameters

| Name | Type                                                      |
| :--- | :-------------------------------------------------------- |
| `T`  | extends [`ServiceType`](../code-reference.md#servicetype) |

#### Parameters

| Name          | Type | Description   |
| :------------ | :--- | :------------ |
| `serviceType` | `T`  | Service type. |

#### Returns

[`Service`](../code-reference.md#service)<`T`\>[]

[Service](../code-reference.md#service).

#### Defined in

[src/ddo/DDO.ts:189](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L189)

---

### reorderServices

▸ **reorderServices**(): `void`

It reorders the services of the DDO using the service index

#### Returns

`void`

#### Defined in

[src/ddo/DDO.ts:282](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L282)

---

### replaceService

▸ **replaceService**(`index`, `service`): `void`

Replaces a service in the DDO.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `index`   | `number` |
| `service` | `any`    |

#### Returns

`void`

#### Defined in

[src/ddo/DDO.ts:310](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L310)

---

### serviceExists

▸ **serviceExists**<`T`\>(`serviceType`): `boolean`

Checks if a service exists in the DDO.

#### Type parameters

| Name | Type                                                      |
| :--- | :-------------------------------------------------------- |
| `T`  | extends [`ServiceType`](../code-reference.md#servicetype) |

#### Parameters

| Name          | Type | Description   |
| :------------ | :--- | :------------ |
| `serviceType` | `T`  | Service type. |

#### Returns

`boolean`

true if service exists.

#### Defined in

[src/ddo/DDO.ts:199](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L199)

---

### serviceIndexExists

▸ **serviceIndexExists**(`serviceIndex`): `boolean`

Checks if a service index in the DDO.

#### Parameters

| Name           | Type     | Description    |
| :------------- | :------- | :------------- |
| `serviceIndex` | `number` | Service index. |

#### Returns

`boolean`

true if service exists.

#### Defined in

[src/ddo/DDO.ts:209](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L209)

---

### setAssetPriceFromDDOByService

▸ **setAssetPriceFromDDOByService**(`serviceType`, `rewards`): `void`

Given a service type, it sets the AssetPrice in the escrowPayment condition

#### Parameters

| Name          | Type                                              | Description                  |
| :------------ | :------------------------------------------------ | :--------------------------- |
| `serviceType` | [`ServiceType`](../code-reference.md#servicetype) | the service to search in     |
| `rewards`     | [`AssetPrice`](AssetPrice.md)                     | the AssetPrice object to set |

#### Returns

`void`

#### Defined in

[src/ddo/DDO.ts:562](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L562)

---

### setNFTRewardsFromService

▸ **setNFTRewardsFromService**(`serviceType`, `rewards`, `holderAddress`): `DDOConditionNotFoundError`

Given the service type it sets the AssetPrice and NFT holder

#### Parameters

| Name            | Type                                              | Description                   |
| :-------------- | :------------------------------------------------ | :---------------------------- |
| `serviceType`   | [`ServiceType`](../code-reference.md#servicetype) | the service type to search in |
| `rewards`       | [`AssetPrice`](AssetPrice.md)                     | the AssetPrice object to set  |
| `holderAddress` | `string`                                          | the NFT Holder address to set |

#### Returns

`DDOConditionNotFoundError`

#### Defined in

[src/ddo/DDO.ts:585](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L585)

---

### shortId

▸ **shortId**(): `string`

#### Returns

`string`

#### Defined in

[src/ddo/DDO.ts:130](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L130)

---

### updateMetadataService

▸ **updateMetadataService**(`service`): `void`

Updates a service in the DDO

#### Parameters

| Name      | Type  | Description               |
| :-------- | :---- | :------------------------ |
| `service` | `any` | the service to be updated |

#### Returns

`void`

#### Defined in

[src/ddo/DDO.ts:368](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L368)

---

### updateService

▸ **updateService**(`service`, `serviceIndex?`): `void`

#### Parameters

| Name           | Type     | Default value | Description                                           |
| :------------- | :------- | :------------ | :---------------------------------------------------- |
| `service`      | `any`    | `undefined`   | the service to be updated                             |
| `serviceIndex` | `number` | `0`           | the position of the service in the DDO.services array |

#### Returns

`void`

**`Deprecated`**

use the `updateMetadataService` or `replaceService` methods instead
Updates a service in the DDO

#### Defined in

[src/ddo/DDO.ts:359](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L359)

---

### createAuthorizationService

▸ `Static` **createAuthorizationService**(`neverminedNodeUri`, `publicKey`, `method`): [`ServiceCommon`](../interfaces/ServiceCommon.md)

#### Parameters

| Name                | Type     |
| :------------------ | :------- |
| `neverminedNodeUri` | `string` |
| `publicKey`         | `string` |
| `method`            | `string` |

#### Returns

[`ServiceCommon`](../interfaces/ServiceCommon.md)

#### Defined in

[src/ddo/DDO.ts:58](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L58)

---

### deserialize

▸ `Static` **deserialize**(`ddoString`): [`DDO`](DDO.md)

Deserializes the DDO object.

#### Parameters

| Name        | Type     | Description                                      |
| :---------- | :------- | :----------------------------------------------- |
| `ddoString` | `string` | The serialized [DDO](DDO.md) to be deserialized. |

#### Returns

[`DDO`](DDO.md)

The deserialized [DDO](DDO.md).

#### Defined in

[src/ddo/DDO.ts:52](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L52)

---

### findAndReplaceDDOAttribute

▸ `Static` **findAndReplaceDDOAttribute**(`ddo`, `paramName`, `value`): [`DDO`](DDO.md)

Finds an attribute in the DDO and replace it with the given value

#### Parameters

| Name        | Type            | Description               |
| :---------- | :-------------- | :------------------------ |
| `ddo`       | [`DDO`](DDO.md) | the originial DDO         |
| `paramName` | `string`        | the param name to replace |
| `value`     | `string`        | the new value             |

#### Returns

[`DDO`](DDO.md)

the DDO with the replaced attribute

#### Defined in

[src/ddo/DDO.ts:606](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L606)

---

### findServiceConditionByName

▸ `Static` **findServiceConditionByName**(`service`, `name`): [`ServiceAgreementTemplateCondition`](../interfaces/ServiceAgreementTemplateCondition.md)

If fins a service condition by name

#### Parameters

| Name      | Type                                                  | Description               |
| :-------- | :---------------------------------------------------- | :------------------------ |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md)     | the service to search in  |
| `name`    | [`ConditionType`](../code-reference.md#conditiontype) | the name of the condition |

#### Returns

[`ServiceAgreementTemplateCondition`](../interfaces/ServiceAgreementTemplateCondition.md)

ServiceAgreementTemplateCondition the condition

#### Defined in

[src/ddo/DDO.ts:416](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L416)

---

### getAssetPriceFromService

▸ `Static` **getAssetPriceFromService**(`service`): [`AssetPrice`](AssetPrice.md)

It gets the AssetPrice from a service with escrowPayment condition

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

[`AssetPrice`](AssetPrice.md)

the AssetPrice object

#### Defined in

[src/ddo/DDO.ts:529](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L529)

---

### getDIDFromService

▸ `Static` **getDIDFromService**(`service`): `string`

Gets the DID in the escrowPayment condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`string`

the DID

#### Defined in

[src/ddo/DDO.ts:432](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L432)

---

### getDurationFromService

▸ `Static` **getDurationFromService**(`service`): `number`

Gets the duration parameter in the transferNFT condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`number`

the duration of the subscription

#### Defined in

[src/ddo/DDO.ts:486](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L486)

---

### getInstance

▸ `Static` **getInstance**(`userId`, `publisherAddress`, `appId?`): [`DDO`](DDO.md)

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `userId`           | `string` |
| `publisherAddress` | `string` |
| `appId?`           | `string` |

#### Returns

[`DDO`](DDO.md)

#### Defined in

[src/ddo/DDO.ts:106](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L106)

---

### getNFTTransferFromService

▸ `Static` **getNFTTransferFromService**(`service`): `boolean`

Gets the nftTransfer parameter in the transferNFT condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`boolean`

if condition will do a nft transfer or a mint

#### Defined in

[src/ddo/DDO.ts:475](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L475)

---

### getNftAmountFromService

▸ `Static` **getNftAmountFromService**(`service`): `bigint`

Gets the number of NFTs in the transferNFT condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`bigint`

the number of NFTs

#### Defined in

[src/ddo/DDO.ts:463](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L463)

---

### getNftContractAddressFromService

▸ `Static` **getNftContractAddressFromService**(`service`): `string`

Gets the NFT Contract address used in the NFT Access or NFT Sales service

#### Parameters

| Name      | Type                                                                                                             | Description              |
| :-------- | :--------------------------------------------------------------------------------------------------------------- | :----------------------- |
| `service` | [`ServiceNFTAccess`](../interfaces/ServiceNFTAccess.md) \| [`ServiceNFTSales`](../interfaces/ServiceNFTSales.md) | the service to search in |

#### Returns

`string`

the NFT contract address

#### Defined in

[src/ddo/DDO.ts:515](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L515)

---

### getNftHolderFromService

▸ `Static` **getNftHolderFromService**(`service`): `string`

Gets the NFT Holder in the transferNFT condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`string`

the NFT Holder address

#### Defined in

[src/ddo/DDO.ts:442](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L442)

---

### getParameterFromCondition

▸ `Static` **getParameterFromCondition**(`service`, `conditionType`, `paramName`): `string` \| `number` \| `string`[]

Given a service, condition and param name it returns the value

#### Parameters

| Name            | Type                                                  | Description                        |
| :-------------- | :---------------------------------------------------- | :--------------------------------- |
| `service`       | [`ServiceCommon`](../interfaces/ServiceCommon.md)     | The service where the condition is |
| `conditionType` | [`ConditionType`](../code-reference.md#conditiontype) | the condition type                 |
| `paramName`     | `string`                                              | the param name                     |

#### Returns

`string` \| `number` \| `string`[]

the value

#### Defined in

[src/ddo/DDO.ts:497](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L497)

---

### getTokenIdFromService

▸ `Static` **getTokenIdFromService**(`service`): `string`

Gets the NFT TokenId in the nftHolder condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`string`

the NFT Token Id

#### Defined in

[src/ddo/DDO.ts:451](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L451)

---

### serialize

▸ `Static` **serialize**(`ddo`): `string`

Serializes the DDO object.

#### Parameters

| Name  | Type            | Description                         |
| :---- | :-------------- | :---------------------------------- |
| `ddo` | [`DDO`](DDO.md) | The [DDO](DDO.md) to be serialized. |

#### Returns

`string`

DDO serialized.

#### Defined in

[src/ddo/DDO.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/DDO.ts#L43)
