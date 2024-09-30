[@nevermined-io/sdk - v3.0.35](../code-reference.md) / DDO

# Class: DDO

DID Descriptor Object (DDO).
Contains all the metadata related to an asset, including the description and the services available.

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
- [getNewDateFormatted](DDO.md#getnewdateformatted)
- [getNftAmountFromService](DDO.md#getnftamountfromservice)
- [getNftContractAddressFromService](DDO.md#getnftcontractaddressfromservice)
- [getNftHolderFromService](DDO.md#getnftholderfromservice)
- [getParameterFromCondition](DDO.md#getparameterfromcondition)
- [getTokenIdFromService](DDO.md#gettokenidfromservice)
- [serialize](DDO.md#serialize)

## Constructors

### constructor

• **new DDO**(`ddo?`): [`DDO`](DDO.md)

#### Parameters

| Name  | Type                         |
| :---- | :--------------------------- |
| `ddo` | `Partial`\<[`DDO`](DDO.md)\> |

#### Returns

[`DDO`](DDO.md)

#### Defined in

[src/ddo/DDO.ts:232](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L232)

## Properties

### @context

• **@context**: `string` = `'https://w3id.org/did/v1'`

#### Defined in

[src/ddo/DDO.ts:209](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L209)

---

### \_nvm

• **\_nvm**: [`NvmConfig`](../interfaces/NvmConfig.md)

#### Defined in

[src/ddo/DDO.ts:218](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L218)

---

### authentication

• **authentication**: [`Authentication`](../interfaces/Authentication.md)[] = `[]`

#### Defined in

[src/ddo/DDO.ts:226](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L226)

---

### created

• **created**: `string`

#### Defined in

[src/ddo/DDO.ts:220](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L220)

---

### didSeed

• **didSeed**: `string` = `''`

#### Defined in

[src/ddo/DDO.ts:216](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L216)

---

### id

• **id**: `string` = `''`

DID, decentralizes ID.

#### Defined in

[src/ddo/DDO.ts:214](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L214)

---

### proof

• **proof**: [`Proof`](../interfaces/Proof.md)

#### Defined in

[src/ddo/DDO.ts:230](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L230)

---

### publicKey

• **publicKey**: [`PublicKey`](../interfaces/PublicKey.md)[] = `[]`

#### Defined in

[src/ddo/DDO.ts:224](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L224)

---

### service

• **service**: [`ServiceCommon`](../interfaces/ServiceCommon.md)[] = `[]`

#### Defined in

[src/ddo/DDO.ts:228](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L228)

---

### updated

• `Optional` **updated**: `string`

#### Defined in

[src/ddo/DDO.ts:222](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L222)

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

[src/ddo/DDO.ts:474](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L474)

---

### addProof

▸ **addProof**(`publicKey`): `Promise`\<`void`\>

Generates and adds a proof using personal sign on the DDO.

#### Parameters

| Name        | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `publicKey` | `string` | Public key to be used on personal sign. |

#### Returns

`Promise`\<`void`\>

void.

#### Defined in

[src/ddo/DDO.ts:424](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L424)

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

[src/ddo/DDO.ts:446](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L446)

---

### addSignature

▸ **addSignature**(`nevermined`, `publicKey`): `Promise`\<`void`\>

It adds a signature to the the proof object of the DDO

#### Parameters

| Name         | Type                          | Description                |
| :----------- | :---------------------------- | :------------------------- |
| `nevermined` | [`Nevermined`](Nevermined.md) | nevermined object          |
| `publicKey`  | `string`                      | public key to sign the DDO |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/ddo/DDO.ts:556](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L556)

---

### assignDid

▸ **assignDid**(`didSeed`, `didRegistry`, `publisher`): `Promise`\<`void`\>

Assign a DID to the DDO

#### Parameters

| Name          | Type                            | Description                 |
| :------------ | :------------------------------ | :-------------------------- |
| `didSeed`     | `string`                        | DID seed                    |
| `didRegistry` | [`DIDRegistry`](DIDRegistry.md) | DIDRegistry contract        |
| `publisher`   | [`NvmAccount`](NvmAccount.md)   | account registering the DID |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/ddo/DDO.ts:534](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L534)

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

[src/ddo/DDO.ts:386](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L386)

---

### findServiceByIndex

▸ **findServiceByIndex**\<`T`\>(`index`): [`Service`](../code-reference.md#service)\<`T`\>

Finds a service of a DDO by index number.

#### Type parameters

| Name | Type                                                      |
| :--- | :-------------------------------------------------------- |
| `T`  | extends [`ServiceType`](../code-reference.md#servicetype) |

#### Parameters

| Name    | Type     | Description                      |
| :------ | :------- | :------------------------------- |
| `index` | `number` | index of the service in the DDO. |

#### Returns

[`Service`](../code-reference.md#service)\<`T`\>

[Service](../code-reference.md#service).

#### Defined in

[src/ddo/DDO.ts:291](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L291)

---

### findServiceByReference

▸ **findServiceByReference**\<`T`\>(`serviceReference`): [`Service`](../code-reference.md#service)\<`T`\>

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

[`Service`](../code-reference.md#service)\<`T`\>

Service.

#### Defined in

[src/ddo/DDO.ts:325](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L325)

---

### findServiceByType

▸ **findServiceByType**\<`T`\>(`serviceType`): [`Service`](../code-reference.md#service)\<`T`\>

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

[`Service`](../code-reference.md#service)\<`T`\>

[Service](../code-reference.md#service).

**`Throws`**

[DDOServiceNotFoundError](DDOServiceNotFoundError.md) If the service is not in the DDO.

#### Defined in

[src/ddo/DDO.ts:311](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L311)

---

### generateDidSeed

▸ **generateDidSeed**(`seed`): `Promise`\<\`0x$\{string}\`\>

It generates a DID seed from a seed

#### Parameters

| Name   | Type  | Description |
| :----- | :---- | :---------- |
| `seed` | `any` | the seed    |

#### Returns

`Promise`\<\`0x$\{string}\`\>

the string represeing the DID seed

#### Defined in

[src/ddo/DDO.ts:547](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L547)

---

### generateProof

▸ **generateProof**(`publicKey`): `Promise`\<[`Proof`](../interfaces/Proof.md)\>

Generates proof using personal sign.

#### Parameters

| Name        | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `publicKey` | `string` | Public key to be used on personal sign. |

#### Returns

`Promise`\<[`Proof`](../interfaces/Proof.md)\>

Proof object.

#### Defined in

[src/ddo/DDO.ts:395](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L395)

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

[src/ddo/DDO.ts:711](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L711)

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

[src/ddo/DDO.ts:376](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L376)

---

### getProofChecksum

▸ **getProofChecksum**(): `string`

Get the checksum of the proof.

#### Returns

`string`

string containing the checksum of the proof.

#### Defined in

[src/ddo/DDO.ts:415](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L415)

---

### getServicesByType

▸ **getServicesByType**\<`T`\>(`serviceType`): [`Service`](../code-reference.md#service)\<`T`\>[]

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

[`Service`](../code-reference.md#service)\<`T`\>[]

[Service](../code-reference.md#service).

#### Defined in

[src/ddo/DDO.ts:341](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L341)

---

### reorderServices

▸ **reorderServices**(): `void`

It reorders the services of the DDO using the service index

#### Returns

`void`

#### Defined in

[src/ddo/DDO.ts:434](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L434)

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

[src/ddo/DDO.ts:462](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L462)

---

### serviceExists

▸ **serviceExists**\<`T`\>(`serviceType`): `boolean`

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

[src/ddo/DDO.ts:351](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L351)

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

[src/ddo/DDO.ts:361](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L361)

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

[src/ddo/DDO.ts:721](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L721)

---

### setNFTRewardsFromService

▸ **setNFTRewardsFromService**(`serviceType`, `rewards`, `holderAddress`): `undefined` \| [`DDOConditionNotFoundError`](DDOConditionNotFoundError.md)

Given the service type it sets the AssetPrice and NFT holder

#### Parameters

| Name            | Type                                              | Description                   |
| :-------------- | :------------------------------------------------ | :---------------------------- |
| `serviceType`   | [`ServiceType`](../code-reference.md#servicetype) | the service type to search in |
| `rewards`       | [`AssetPrice`](AssetPrice.md)                     | the AssetPrice object to set  |
| `holderAddress` | `string`                                          | the NFT Holder address to set |

#### Returns

`undefined` \| [`DDOConditionNotFoundError`](DDOConditionNotFoundError.md)

#### Defined in

[src/ddo/DDO.ts:748](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L748)

---

### shortId

▸ **shortId**(): `string`

It returns the DDO id without the prefix

#### Returns

`string`

the DID without the prefix

#### Defined in

[src/ddo/DDO.ts:282](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L282)

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

[src/ddo/DDO.ts:520](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L520)

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

[src/ddo/DDO.ts:511](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L511)

---

### createAuthorizationService

▸ **createAuthorizationService**(`neverminedNodeUri`, `publicKey`, `method`): [`ServiceCommon`](../interfaces/ServiceCommon.md)

It creates an authorization service that can be included later as part of a DDO

#### Parameters

| Name                | Type     | Description                                    |
| :------------------ | :------- | :--------------------------------------------- |
| `neverminedNodeUri` | `string` | URL of the Nevermined Node managing this asset |
| `publicKey`         | `string` | Public key of the user                         |
| `method`            | `string` | Encryption method                              |

#### Returns

[`ServiceCommon`](../interfaces/ServiceCommon.md)

The authorization service

#### Defined in

[src/ddo/DDO.ts:190](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L190)

---

### deserialize

▸ **deserialize**(`ddoString`): [`DDO`](DDO.md)

Deserializes the DDO object.

#### Parameters

| Name        | Type     | Description                                      |
| :---------- | :------- | :----------------------------------------------- |
| `ddoString` | `string` | The serialized [DDO](DDO.md) to be deserialized. |

#### Returns

[`DDO`](DDO.md)

The deserialized [DDO](DDO.md).

#### Defined in

[src/ddo/DDO.ts:177](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L177)

---

### findAndReplaceDDOAttribute

▸ **findAndReplaceDDOAttribute**(`ddo`, `paramName`, `value`): [`DDO`](DDO.md)

Finds an attribute in the DDO and replace it with the given value

#### Parameters

| Name        | Type                 | Description               |
| :---------- | :------------------- | :------------------------ |
| `ddo`       | [`DDO`](DDO.md)      | the originial DDO         |
| `paramName` | `string` \| `RegExp` | the param name to replace |
| `value`     | `string`             | the new value             |

#### Returns

[`DDO`](DDO.md)

the DDO with the replaced attribute

#### Defined in

[src/ddo/DDO.ts:771](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L771)

---

### findServiceConditionByName

▸ **findServiceConditionByName**(`service`, `name`): [`ServiceAgreementTemplateCondition`](../interfaces/ServiceAgreementTemplateCondition.md)

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

[src/ddo/DDO.ts:568](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L568)

---

### getAssetPriceFromService

▸ **getAssetPriceFromService**(`service`): [`AssetPrice`](AssetPrice.md)

It gets the AssetPrice from a service with escrowPayment condition

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

[`AssetPrice`](AssetPrice.md)

the AssetPrice object

#### Defined in

[src/ddo/DDO.ts:686](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L686)

---

### getDIDFromService

▸ **getDIDFromService**(`service`): `string`

Gets the DID in the escrowPayment condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`string`

the DID

#### Defined in

[src/ddo/DDO.ts:584](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L584)

---

### getDurationFromService

▸ **getDurationFromService**(`service`): `number`

Gets the duration parameter in the transferNFT condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`number`

the duration of the subscription

#### Defined in

[src/ddo/DDO.ts:641](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L641)

---

### getInstance

▸ **getInstance**(`userId`, `publisherAddress`, `appId?`): [`DDO`](DDO.md)

It gets an instance of a DDO with the basic structure

#### Parameters

| Name               | Type     | Description                       |
| :----------------- | :------- | :-------------------------------- |
| `userId`           | `string` | The unique identifier of the user |
| `publisherAddress` | `string` | The address of the publisher      |
| `appId?`           | `string` | The application id                |

#### Returns

[`DDO`](DDO.md)

a [DDO](DDO.md) instance

#### Defined in

[src/ddo/DDO.ts:245](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L245)

---

### getNFTTransferFromService

▸ **getNFTTransferFromService**(`service`): `boolean`

Gets the nftTransfer parameter in the transferNFT condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`boolean`

if condition will do a nft transfer or a mint

#### Defined in

[src/ddo/DDO.ts:630](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L630)

---

### getNewDateFormatted

▸ **getNewDateFormatted**(`date?`): `string`

It gets a new date formatted

#### Parameters

| Name   | Type   | Description        |
| :----- | :----- | :----------------- |
| `date` | `Date` | the date to format |

#### Returns

`string`

the date string formatted

#### Defined in

[src/ddo/DDO.ts:274](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L274)

---

### getNftAmountFromService

▸ **getNftAmountFromService**(`service`): `bigint`

Gets the number of NFTs in the transferNFT condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`bigint`

the number of NFTs

#### Defined in

[src/ddo/DDO.ts:616](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L616)

---

### getNftContractAddressFromService

▸ **getNftContractAddressFromService**(`service`): `string`

Gets the NFT Contract address used in the NFT Access or NFT Sales service

#### Parameters

| Name      | Type                                                                                                             | Description              |
| :-------- | :--------------------------------------------------------------------------------------------------------------- | :----------------------- |
| `service` | [`ServiceNFTAccess`](../interfaces/ServiceNFTAccess.md) \| [`ServiceNFTSales`](../interfaces/ServiceNFTSales.md) | the service to search in |

#### Returns

`string`

the NFT contract address

#### Defined in

[src/ddo/DDO.ts:670](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L670)

---

### getNftHolderFromService

▸ **getNftHolderFromService**(`service`): `string`

Gets the NFT Holder in the transferNFT condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`string`

the NFT Holder address

#### Defined in

[src/ddo/DDO.ts:594](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L594)

---

### getParameterFromCondition

▸ **getParameterFromCondition**(`service`, `conditionType`, `paramName`): `string` \| `number` \| `string`[]

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

[src/ddo/DDO.ts:652](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L652)

---

### getTokenIdFromService

▸ **getTokenIdFromService**(`service`): `string`

Gets the NFT TokenId in the nftHolder condition of the service

#### Parameters

| Name      | Type                                              | Description              |
| :-------- | :------------------------------------------------ | :----------------------- |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) | the service to search in |

#### Returns

`string`

the NFT Token Id

#### Defined in

[src/ddo/DDO.ts:603](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L603)

---

### serialize

▸ **serialize**(`ddo`): `string`

Serializes the DDO object.

#### Parameters

| Name  | Type            | Description                         |
| :---- | :-------------- | :---------------------------------- |
| `ddo` | [`DDO`](DDO.md) | The [DDO](DDO.md) to be serialized. |

#### Returns

`string`

DDO serialized.

#### Defined in

[src/ddo/DDO.ts:168](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/ddo/DDO.ts#L168)
