[@nevermined-io/sdk - v3.0.49](../code-reference.md) / DDO

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
- [parseDDOWebServiceAttributes](DDO.md#parseddowebserviceattributes)
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

[src/ddo/DDO.ts:235](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L235)

## Properties

### @context

• **@context**: `string` = `'https://w3id.org/did/v1'`

#### Defined in

[src/ddo/DDO.ts:212](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L212)

---

### \_nvm

• **\_nvm**: [`NvmConfig`](../interfaces/NvmConfig.md)

#### Defined in

[src/ddo/DDO.ts:221](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L221)

---

### authentication

• **authentication**: [`Authentication`](../interfaces/Authentication.md)[] = `[]`

#### Defined in

[src/ddo/DDO.ts:229](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L229)

---

### created

• **created**: `string`

#### Defined in

[src/ddo/DDO.ts:223](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L223)

---

### didSeed

• **didSeed**: `string` = `''`

#### Defined in

[src/ddo/DDO.ts:219](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L219)

---

### id

• **id**: `string` = `''`

DID, decentralizes ID.

#### Defined in

[src/ddo/DDO.ts:217](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L217)

---

### proof

• **proof**: [`Proof`](../interfaces/Proof.md)

#### Defined in

[src/ddo/DDO.ts:233](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L233)

---

### publicKey

• **publicKey**: [`PublicKey`](../interfaces/PublicKey.md)[] = `[]`

#### Defined in

[src/ddo/DDO.ts:227](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L227)

---

### service

• **service**: [`ServiceCommon`](../interfaces/ServiceCommon.md)[] = `[]`

#### Defined in

[src/ddo/DDO.ts:231](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L231)

---

### updated

• `Optional` **updated**: `string`

#### Defined in

[src/ddo/DDO.ts:225](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L225)

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

[src/ddo/DDO.ts:477](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L477)

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

[src/ddo/DDO.ts:427](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L427)

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

[src/ddo/DDO.ts:449](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L449)

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

[src/ddo/DDO.ts:559](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L559)

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

[src/ddo/DDO.ts:537](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L537)

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

[src/ddo/DDO.ts:389](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L389)

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

[src/ddo/DDO.ts:294](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L294)

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

[src/ddo/DDO.ts:328](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L328)

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

[src/ddo/DDO.ts:314](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L314)

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

[src/ddo/DDO.ts:550](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L550)

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

[src/ddo/DDO.ts:398](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L398)

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

[src/ddo/DDO.ts:714](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L714)

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

[src/ddo/DDO.ts:379](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L379)

---

### getProofChecksum

▸ **getProofChecksum**(): `string`

Get the checksum of the proof.

#### Returns

`string`

string containing the checksum of the proof.

#### Defined in

[src/ddo/DDO.ts:418](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L418)

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

[src/ddo/DDO.ts:344](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L344)

---

### reorderServices

▸ **reorderServices**(): `void`

It reorders the services of the DDO using the service index

#### Returns

`void`

#### Defined in

[src/ddo/DDO.ts:437](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L437)

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

[src/ddo/DDO.ts:465](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L465)

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

[src/ddo/DDO.ts:354](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L354)

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

[src/ddo/DDO.ts:364](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L364)

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

[src/ddo/DDO.ts:724](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L724)

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

[src/ddo/DDO.ts:751](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L751)

---

### shortId

▸ **shortId**(): `string`

It returns the DDO id without the prefix

#### Returns

`string`

the DID without the prefix

#### Defined in

[src/ddo/DDO.ts:285](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L285)

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

[src/ddo/DDO.ts:523](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L523)

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

[src/ddo/DDO.ts:514](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L514)

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

[src/ddo/DDO.ts:193](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L193)

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

[src/ddo/DDO.ts:180](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L180)

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

[src/ddo/DDO.ts:774](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L774)

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

[src/ddo/DDO.ts:571](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L571)

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

[src/ddo/DDO.ts:689](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L689)

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

[src/ddo/DDO.ts:587](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L587)

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

[src/ddo/DDO.ts:644](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L644)

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

[src/ddo/DDO.ts:248](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L248)

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

[src/ddo/DDO.ts:633](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L633)

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

[src/ddo/DDO.ts:277](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L277)

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

[src/ddo/DDO.ts:619](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L619)

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

[src/ddo/DDO.ts:673](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L673)

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

[src/ddo/DDO.ts:597](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L597)

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

[src/ddo/DDO.ts:655](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L655)

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

[src/ddo/DDO.ts:606](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L606)

---

### parseDDOWebServiceAttributes

▸ **parseDDOWebServiceAttributes**(`webService`, `did`): [`WebService`](../interfaces/WebService.md)

#### Parameters

| Name         | Type                                        |
| :----------- | :------------------------------------------ |
| `webService` | [`WebService`](../interfaces/WebService.md) |
| `did`        | `string`                                    |

#### Returns

[`WebService`](../interfaces/WebService.md)

#### Defined in

[src/ddo/DDO.ts:782](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L782)

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

[src/ddo/DDO.ts:171](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/ddo/DDO.ts#L171)
