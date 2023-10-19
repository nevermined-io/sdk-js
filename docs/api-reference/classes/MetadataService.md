[@nevermined-io/sdk](../code-reference.md) / MetadataService

# Class: MetadataService

Provides a interface with Metadata.
Metadata provides an off-chain database store for metadata about data assets.

## Hierarchy

- [`MarketplaceApi`](MarketplaceApi.md)

  ↳ **`MetadataService`**

## Table of contents

### Constructors

- [constructor](MetadataService.md#constructor)

### Accessors

- [artifactsFolder](MetadataService.md#artifactsfolder)
- [circuitsFolder](MetadataService.md#circuitsfolder)
- [config](MetadataService.md#config)
- [instanceConfig](MetadataService.md#instanceconfig)
- [instantiableConfig](MetadataService.md#instantiableconfig)
- [logger](MetadataService.md#logger)
- [nevermined](MetadataService.md#nevermined)
- [url](MetadataService.md#url)
- [web3](MetadataService.md#web3)

### Methods

- [addNewAddress](MetadataService.md#addnewaddress)
- [delete](MetadataService.md#delete)
- [getAccessUrl](MetadataService.md#getaccessurl)
- [getServiceEndpoint](MetadataService.md#getserviceendpoint)
- [getVersionInfo](MetadataService.md#getversioninfo)
- [login](MetadataService.md#login)
- [queryMetadata](MetadataService.md#querymetadata)
- [queryServiceMetadata](MetadataService.md#queryservicemetadata)
- [retrieveDDO](MetadataService.md#retrieveddo)
- [retrieveDDOByUrl](MetadataService.md#retrieveddobyurl)
- [retrieveDDOFromImmutableBackend](MetadataService.md#retrieveddofromimmutablebackend)
- [retrieveService](MetadataService.md#retrieveservice)
- [setInstanceConfig](MetadataService.md#setinstanceconfig)
- [status](MetadataService.md#status)
- [storeDDO](MetadataService.md#storeddo)
- [storeService](MetadataService.md#storeservice)
- [updateDDO](MetadataService.md#updateddo)
- [getInstance](MetadataService.md#getinstance)
- [setInstanceConfig](MetadataService.md#setinstanceconfig-1)

## Constructors

### constructor

• **new MetadataService**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Inherited from

[MarketplaceApi](MarketplaceApi.md).[constructor](MarketplaceApi.md#constructor)

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:7](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L7)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

MarketplaceApi.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

MarketplaceApi.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

MarketplaceApi.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

MarketplaceApi.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

MarketplaceApi.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

MarketplaceApi.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

MarketplaceApi.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### url

• `Protected` `get` **url**(): `string`

#### Returns

`string`

#### Inherited from

MarketplaceApi.url

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:12](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L12)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

MarketplaceApi.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### addNewAddress

▸ **addNewAddress**(`clientAssertion`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `clientAssertion` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[MarketplaceApi](MarketplaceApi.md).[addNewAddress](MarketplaceApi.md#addnewaddress)

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:36](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L36)

---

### delete

▸ **delete**(`did`): `Promise`<`Response`\>

#### Parameters

| Name  | Type                        |
| :---- | :-------------------------- |
| `did` | `string` \| [`DID`](DID.md) |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/services/metadata/MetadataService.ts:240](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L240)

---

### getAccessUrl

▸ **getAccessUrl**(`accessToken`, `payload`): `Promise`<`string`\>

#### Parameters

| Name          | Type  |
| :------------ | :---- |
| `accessToken` | `any` |
| `payload`     | `any` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/services/metadata/MetadataService.ts:46](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L46)

---

### getServiceEndpoint

▸ **getServiceEndpoint**(`did`): `string`

#### Parameters

| Name  | Type            |
| :---- | :-------------- |
| `did` | [`DID`](DID.md) |

#### Returns

`string`

#### Defined in

[src/services/metadata/MetadataService.ts:356](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L356)

---

### getVersionInfo

▸ **getVersionInfo**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/metadata/MetadataService.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L42)

---

### login

▸ **login**(`clientAssertion`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `clientAssertion` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[MarketplaceApi](MarketplaceApi.md).[login](MarketplaceApi.md#login)

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:16](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L16)

---

### queryMetadata

▸ **queryMetadata**(`query`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search over the DDOs using a query.

#### Parameters

| Name    | Type                                          | Description               |
| :------ | :-------------------------------------------- | :------------------------ |
| `query` | [`SearchQuery`](../interfaces/SearchQuery.md) | Query to filter the DDOs. |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

A list of [QueryResult](../interfaces/QueryResult.md)s.

#### Defined in

[src/services/metadata/MetadataService.ts:74](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L74)

---

### queryServiceMetadata

▸ **queryServiceMetadata**(`query`): `Promise`<[`ServiceSecondary`](../interfaces/ServiceSecondary.md)[]\>

Search over the Services using a query.

#### Parameters

| Name    | Type     | Description                   |
| :------ | :------- | :---------------------------- |
| `query` | `Object` | Query to filter the Services. |

#### Returns

`Promise`<[`ServiceSecondary`](../interfaces/ServiceSecondary.md)[]\>

A list of [ServiceSecondary](../interfaces/ServiceSecondary.md).

#### Defined in

[src/services/metadata/MetadataService.ts:106](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L106)

---

### retrieveDDO

▸ **retrieveDDO**(`did?`, `metadataServiceEndpoint?`): `Promise`<[`DDO`](DDO.md)\>

Retrieves a DDO by DID.

#### Parameters

| Name                       | Type                        | Description                |
| :------------------------- | :-------------------------- | :------------------------- |
| `did?`                     | `string` \| [`DID`](DID.md) | DID of the asset.          |
| `metadataServiceEndpoint?` | `string`                    | Metadata service endpoint. |

#### Returns

`Promise`<[`DDO`](DDO.md)\>

DDO of the asset.

#### Defined in

[src/services/metadata/MetadataService.ts:196](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L196)

---

### retrieveDDOByUrl

▸ **retrieveDDOByUrl**(`metadataServiceEndpoint?`): `Promise`<[`DDO`](DDO.md)\>

#### Parameters

| Name                       | Type     |
| :------------------------- | :------- |
| `metadataServiceEndpoint?` | `string` |

#### Returns

`Promise`<[`DDO`](DDO.md)\>

#### Defined in

[src/services/metadata/MetadataService.ts:252](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L252)

---

### retrieveDDOFromImmutableBackend

▸ **retrieveDDOFromImmutableBackend**(`immutableUrl`): `Promise`<[`DDO`](DDO.md)\>

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `immutableUrl` | `string` |

#### Returns

`Promise`<[`DDO`](DDO.md)\>

#### Defined in

[src/services/metadata/MetadataService.ts:229](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L229)

---

### retrieveService

▸ **retrieveService**(`agreementId`, `metadataServiceEndpoint?`): `Promise`<[`ServiceSecondary`](../interfaces/ServiceSecondary.md)\>

Retrieves a service by its agreementId.

#### Parameters

| Name                       | Type     | Description                 |
| :------------------------- | :------- | :-------------------------- |
| `agreementId`              | `string` | agreementId of the service. |
| `metadataServiceEndpoint?` | `string` | -                           |

#### Returns

`Promise`<[`ServiceSecondary`](../interfaces/ServiceSecondary.md)\>

Service object.

#### Defined in

[src/services/metadata/MetadataService.ts:291](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L291)

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

[MarketplaceApi](MarketplaceApi.md).[setInstanceConfig](MarketplaceApi.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### status

▸ **status**(`did`, `metadataServiceEndpoint?`): `Promise`<[`DDOStatus`](../interfaces/DDOStatus.md)\>

Retrieves a DDO by DID.

#### Parameters

| Name                       | Type                        | Description       |
| :------------------------- | :-------------------------- | :---------------- |
| `did`                      | `string` \| [`DID`](DID.md) | DID of the asset. |
| `metadataServiceEndpoint?` | `string`                    | -                 |

#### Returns

`Promise`<[`DDOStatus`](../interfaces/DDOStatus.md)\>

DDO of the asset.

#### Defined in

[src/services/metadata/MetadataService.ts:261](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L261)

---

### storeDDO

▸ **storeDDO**(`ddo`): `Promise`<[`DDO`](DDO.md)\>

Stores a DDO in Metadata.

#### Parameters

| Name  | Type            | Description       |
| :---- | :-------------- | :---------------- |
| `ddo` | [`DDO`](DDO.md) | DDO to be stored. |

#### Returns

`Promise`<[`DDO`](DDO.md)\>

Final DDO.

#### Defined in

[src/services/metadata/MetadataService.ts:164](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L164)

---

### storeService

▸ **storeService**(`agreementId`, `agreement`): `Promise`<[`ServiceSecondary`](../interfaces/ServiceSecondary.md)\>

#### Parameters

| Name          | Type                                                    | Description                                    |
| :------------ | :------------------------------------------------------ | :--------------------------------------------- |
| `agreementId` | `string`                                                | The agreement ID of the service.               |
| `agreement`   | [`ServiceSecondary`](../interfaces/ServiceSecondary.md) | Stores the Service object with its agreementId |

#### Returns

`Promise`<[`ServiceSecondary`](../interfaces/ServiceSecondary.md)\>

the newly stored service object

#### Defined in

[src/services/metadata/MetadataService.ts:324](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L324)

---

### updateDDO

▸ **updateDDO**(`did`, `ddo`): `Promise`<[`DDO`](DDO.md)\>

Update a DDO in Metadata.

#### Parameters

| Name  | Type                        | Description       |
| :---- | :-------------------------- | :---------------- |
| `did` | `string` \| [`DID`](DID.md) | -                 |
| `ddo` | [`DDO`](DDO.md)             | DDO to be stored. |

#### Returns

`Promise`<[`DDO`](DDO.md)\>

Final DDO.

#### Defined in

[src/services/metadata/MetadataService.ts:132](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MetadataService.ts#L132)

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

[MarketplaceApi](MarketplaceApi.md).[getInstance](MarketplaceApi.md#getinstance)

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

[MarketplaceApi](MarketplaceApi.md).[setInstanceConfig](MarketplaceApi.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
