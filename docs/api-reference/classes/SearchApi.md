[@nevermined-io/sdk](../code-reference.md) / SearchApi

# Class: SearchApi

Nevermined Search API. It allows the search of assets registered in Nevermined ecosystems.
You can find more information about Nevermined Metadata here:
[https://docs.nevermined.io/docs/architecture/nevermined-data](https://docs.nevermined.io/docs/architecture/nevermined-data)

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`SearchApi`**

## Table of contents

### Constructors

- [constructor](SearchApi.md#constructor)

### Accessors

- [artifactsFolder](SearchApi.md#artifactsfolder)
- [circuitsFolder](SearchApi.md#circuitsfolder)
- [config](SearchApi.md#config)
- [instanceConfig](SearchApi.md#instanceconfig)
- [instantiableConfig](SearchApi.md#instantiableconfig)
- [logger](SearchApi.md#logger)
- [nevermined](SearchApi.md#nevermined)
- [web3](SearchApi.md#web3)

### Methods

- [byDID](SearchApi.md#bydid)
- [byPrice](SearchApi.md#byprice)
- [bySubscriptionContractAddress](SearchApi.md#bysubscriptioncontractaddress)
- [byText](SearchApi.md#bytext)
- [datasetsByNftContract](SearchApi.md#datasetsbynftcontract)
- [datasetsBySubscription](SearchApi.md#datasetsbysubscription)
- [query](SearchApi.md#query)
- [servicesByNftContract](SearchApi.md#servicesbynftcontract)
- [servicesBySubscription](SearchApi.md#servicesbysubscription)
- [setInstanceConfig](SearchApi.md#setinstanceconfig)
- [subscriptionsCreated](SearchApi.md#subscriptionscreated)
- [subscriptionsPurchased](SearchApi.md#subscriptionspurchased)
- [getInstance](SearchApi.md#getinstance)
- [setInstanceConfig](SearchApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new SearchApi**(`config`)

Creates a new SearchApi

#### Parameters

| Name     | Type                                                        | Description                              |
| :------- | :---------------------------------------------------------- | :--------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | Configuration of the Nevermined instance |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/api/SearchApi.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L32)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### byDID

▸ **byDID**(`did?`, `metadataServiceEndpoint?`): `Promise`<[`DDO`](DDO.md)\>

Search over the assets using a keyword.

#### Parameters

| Name                       | Type                        | Description                |
| :------------------------- | :-------------------------- | :------------------------- |
| `did?`                     | `string` \| [`DID`](DID.md) | DID of the asset.          |
| `metadataServiceEndpoint?` | `string`                    | Metadata service endpoint. |

#### Returns

`Promise`<[`DDO`](DDO.md)\>

DDO of the asset.

#### Defined in

[src/nevermined/api/SearchApi.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L43)

---

### byPrice

▸ **byPrice**(`minPrice`, `maxPrice`, `serviceType?`, `offset?`, `page?`, `sort?`, `appId?`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Query for assets by price.

#### Parameters

| Name           | Type                                              | Default value | Description                                        |
| :------------- | :------------------------------------------------ | :------------ | :------------------------------------------------- |
| `minPrice`     | `number`                                          | `undefined`   | The minimum price to search for.                   |
| `maxPrice`     | `number`                                          | `undefined`   | The maximum price to search for.                   |
| `serviceType?` | [`ServiceType`](../code-reference.md#servicetype) | `undefined`   | The name of the service. Defaults to all services. |
| `offset`       | `number`                                          | `100`         |                                                    |
| `page`         | `number`                                          | `1`           |                                                    |
| `sort`         | `string`                                          | `'desc'`      |                                                    |
| `appId?`       | `string`                                          | `undefined`   |                                                    |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

**`Example`**

```ts
const results = await nevermined.search.byPrice(1, 20)
```

#### Defined in

[src/nevermined/api/SearchApi.ts:112](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L112)

---

### bySubscriptionContractAddress

▸ **bySubscriptionContractAddress**(`contractAddress`, `nftType`, `customNestedQueries?`, `offset?`, `page?`, `sort?`, `appId?`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search for all subscription DDOs with `contractAddress`

#### Parameters

| Name                   | Type        | Default value | Description                                |
| :--------------------- | :---------- | :------------ | :----------------------------------------- |
| `contractAddress`      | `string`    | `undefined`   | The address of the subscription contract   |
| `nftType`              | `string`    | `undefined`   | The nftType                                |
| `customNestedQueries?` | `unknown`[] | `undefined`   | Custom nested queries to add to the search |
| `offset`               | `number`    | `100`         | The number of results to return            |
| `page`                 | `number`    | `1`           |                                            |
| `sort`                 | `string`    | `'desc'`      | The sort order                             |
| `appId?`               | `string`    | `undefined`   | The appId used to filter the results       |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Promise<QueryResult>

#### Defined in

[src/nevermined/api/SearchApi.ts:165](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L165)

---

### byText

▸ **byText**(`text`, `offset?`, `page?`, `sort?`, `appId?`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search over the assets using a keyword.

#### Parameters

| Name     | Type     | Default value | Description                |
| :------- | :------- | :------------ | :------------------------- |
| `text`   | `string` | `undefined`   | Text to filter the assets. |
| `offset` | `number` | `100`         | -                          |
| `page`   | `number` | `1`           | -                          |
| `sort`   | `string` | `'desc'`      | -                          |
| `appId?` | `string` | `undefined`   | -                          |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

A list of [DDO](DDO.md)s.

#### Defined in

[src/nevermined/api/SearchApi.ts:80](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L80)

---

### datasetsByNftContract

▸ **datasetsByNftContract**(`nftContractAddress`, `nftType?`, `tokenId?`, `customNestedQueries?`, `offset?`, `page?`, `sort?`, `appId?`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search of all datasets belonging to a subscription NFT contract

#### Parameters

| Name                   | Type                                                                                                                       | Default value | Description                                |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------ | :----------------------------------------- |
| `nftContractAddress`   | `string`                                                                                                                   | `undefined`   | The DID of the subscription.               |
| `nftType?`             | [`NeverminedNFT721Type`](../enums/NeverminedNFT721Type.md) \| [`NeverminedNFT1155Type`](../enums/NeverminedNFT1155Type.md) | `undefined`   | -                                          |
| `tokenId?`             | `string`                                                                                                                   | `undefined`   | -                                          |
| `customNestedQueries?` | `unknown`[]                                                                                                                | `undefined`   | Custom nested queries to add to the search |
| `offset`               | `number`                                                                                                                   | `100`         | The number of results to return            |
| `page`                 | `number`                                                                                                                   | `1`           |                                            |
| `sort`                 | `string`                                                                                                                   | `'desc'`      | The sort order                             |
| `appId?`               | `string`                                                                                                                   | `undefined`   | The appId used to filter the results       |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Promise<QueryResult>

#### Defined in

[src/nevermined/api/SearchApi.ts:634](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L634)

---

### datasetsBySubscription

▸ **datasetsBySubscription**(`subscriptionDid`, `nftType?`, `customNestedQueries?`, `offset?`, `page?`, `sort?`, `appId?`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search of all datasets belonging to a subscription

#### Parameters

| Name                   | Type                                                                                                                       | Default value | Description                                |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------ | :----------------------------------------- |
| `subscriptionDid`      | `string`                                                                                                                   | `undefined`   | The DID of the subscription.               |
| `nftType?`             | [`NeverminedNFT721Type`](../enums/NeverminedNFT721Type.md) \| [`NeverminedNFT1155Type`](../enums/NeverminedNFT1155Type.md) | `undefined`   | -                                          |
| `customNestedQueries?` | `unknown`[]                                                                                                                | `undefined`   | Custom nested queries to add to the search |
| `offset`               | `number`                                                                                                                   | `100`         | The number of results to return            |
| `page`                 | `number`                                                                                                                   | `1`           |                                            |
| `sort`                 | `string`                                                                                                                   | `'desc'`      | The sort order                             |
| `appId?`               | `string`                                                                                                                   | `undefined`   | The appId used to filter the results       |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Promise<QueryResult>

#### Defined in

[src/nevermined/api/SearchApi.ts:744](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L744)

---

### query

▸ **query**(`query`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search over the assets using a query.

#### Parameters

| Name    | Type                                          | Description                 |
| :------ | :-------------------------------------------- | :-------------------------- |
| `query` | [`SearchQuery`](../interfaces/SearchQuery.md) | Query to filter the assets. |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

A list of [DDO](DDO.md)s matching the query

**`Remarks`**

If the `appId` is set in the search query results will be filtered
returning only DDOs for that appId

#### Defined in

[src/nevermined/api/SearchApi.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L57)

---

### servicesByNftContract

▸ **servicesByNftContract**(`nftContractAddress`, `nftType?`, `tokenId?`, `customNestedQueries?`, `offset?`, `page?`, `sort?`, `appId?`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search of all services belonging to a subscription nft contract

#### Parameters

| Name                   | Type                                                                                                                       | Default value | Description                                   |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------ | :-------------------------------------------- |
| `nftContractAddress`   | `string`                                                                                                                   | `undefined`   | The NFT contract address of the subscription. |
| `nftType?`             | [`NeverminedNFT721Type`](../enums/NeverminedNFT721Type.md) \| [`NeverminedNFT1155Type`](../enums/NeverminedNFT1155Type.md) | `undefined`   | -                                             |
| `tokenId?`             | `string`                                                                                                                   | `undefined`   | -                                             |
| `customNestedQueries?` | `unknown`[]                                                                                                                | `undefined`   | Custom nested queries to add to the search    |
| `offset`               | `number`                                                                                                                   | `100`         | The number of results to return               |
| `page`                 | `number`                                                                                                                   | `1`           |                                               |
| `sort`                 | `string`                                                                                                                   | `'desc'`      | The sort order                                |
| `appId?`               | `string`                                                                                                                   | `undefined`   | The appId used to filter the results          |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Promise<QueryResult>

#### Defined in

[src/nevermined/api/SearchApi.ts:474](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L474)

---

### servicesBySubscription

▸ **servicesBySubscription**(`subscriptionDid`, `nftType?`, `customNestedQueries?`, `offset?`, `page?`, `sort?`, `appId?`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search of all services belonging to a subscription

#### Parameters

| Name                   | Type                                                                                                                       | Default value | Description                                |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------ | :----------------------------------------- |
| `subscriptionDid`      | `string`                                                                                                                   | `undefined`   | The DID of the subscription.               |
| `nftType?`             | [`NeverminedNFT721Type`](../enums/NeverminedNFT721Type.md) \| [`NeverminedNFT1155Type`](../enums/NeverminedNFT1155Type.md) | `undefined`   | -                                          |
| `customNestedQueries?` | `unknown`[]                                                                                                                | `undefined`   | Custom nested queries to add to the search |
| `offset`               | `number`                                                                                                                   | `100`         | The number of results to return            |
| `page`                 | `number`                                                                                                                   | `1`           |                                            |
| `sort`                 | `string`                                                                                                                   | `'desc'`      | The sort order                             |
| `appId?`               | `string`                                                                                                                   | `undefined`   | The appId used to filter the results       |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Promise<QueryResult>

#### Defined in

[src/nevermined/api/SearchApi.ts:584](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L584)

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

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### subscriptionsCreated

▸ **subscriptionsCreated**(`account`, `nftType?`, `customNestedQueries?`, `offset?`, `page?`, `sort?`, `appId?`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search of all subscriptions created by `account`

#### Parameters

| Name                   | Type                                                                                                                       | Default value | Description                                 |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------------------ |
| `account`              | [`Account`](Account.md)                                                                                                    | `undefined`   | The account that created the subscriptions. |
| `nftType?`             | [`NeverminedNFT721Type`](../enums/NeverminedNFT721Type.md) \| [`NeverminedNFT1155Type`](../enums/NeverminedNFT1155Type.md) | `undefined`   | The nftType                                 |
| `customNestedQueries?` | `unknown`[]                                                                                                                | `undefined`   | Custom nested queries to add to the search  |
| `offset`               | `number`                                                                                                                   | `100`         | The number of results to return             |
| `page`                 | `number`                                                                                                                   | `1`           |                                             |
| `sort`                 | `string`                                                                                                                   | `'desc'`      | The sort order                              |
| `appId?`               | `string`                                                                                                                   | `undefined`   | The appId used to filter the results        |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Promise<QueryResult>

#### Defined in

[src/nevermined/api/SearchApi.ts:264](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L264)

---

### subscriptionsPurchased

▸ **subscriptionsPurchased**(`account`, `nftType?`, `ercType?`, `customNestedQueries?`, `offset?`, `page?`, `sort?`, `appId?`): `Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Search of all subscriptions purchased by `account`

#### Parameters

| Name                   | Type                                                                                                                       | Default value | Description                                   |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------ | :-------------------------------------------- |
| `account`              | [`Account`](Account.md)                                                                                                    | `undefined`   | The account that purchased the subscriptions. |
| `nftType?`             | [`NeverminedNFT721Type`](../enums/NeverminedNFT721Type.md) \| [`NeverminedNFT1155Type`](../enums/NeverminedNFT1155Type.md) | `undefined`   | The nftType                                   |
| `ercType?`             | `721` \| `1155`                                                                                                            | `undefined`   | -                                             |
| `customNestedQueries?` | `unknown`[]                                                                                                                | `undefined`   | Custom nested queries to add to the search    |
| `offset`               | `number`                                                                                                                   | `100`         | The number of results to return               |
| `page`                 | `number`                                                                                                                   | `1`           |                                               |
| `sort`                 | `string`                                                                                                                   | `'desc'`      | The sort order                                |
| `appId?`               | `string`                                                                                                                   | `undefined`   | The appId used to filter the results          |

#### Returns

`Promise`<[`QueryResult`](../interfaces/QueryResult.md)\>

Promise<QueryResult>

#### Defined in

[src/nevermined/api/SearchApi.ts:356](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/SearchApi.ts#L356)

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

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

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

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
