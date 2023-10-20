[@nevermined-io/sdk](../code-reference.md) / NeverminedNode

# Class: NeverminedNode

Provides a interface with Nevermined Node.
The Nevermined Node is the technical component executed by the Publishers allowing to them to provide extended data services.

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`NeverminedNode`**

## Table of contents

### Constructors

- [constructor](NeverminedNode.md#constructor)

### Accessors

- [artifactsFolder](NeverminedNode.md#artifactsfolder)
- [circuitsFolder](NeverminedNode.md#circuitsfolder)
- [config](NeverminedNode.md#config)
- [instanceConfig](NeverminedNode.md#instanceconfig)
- [instantiableConfig](NeverminedNode.md#instantiableconfig)
- [logger](NeverminedNode.md#logger)
- [nevermined](NeverminedNode.md#nevermined)
- [url](NeverminedNode.md#url)
- [web3](NeverminedNode.md#web3)

### Methods

- [claimNFT](NeverminedNode.md#claimnft)
- [computeLogs](NeverminedNode.md#computelogs)
- [computeStatus](NeverminedNode.md#computestatus)
- [consumeService](NeverminedNode.md#consumeservice)
- [downloadService](NeverminedNode.md#downloadservice)
- [encrypt](NeverminedNode.md#encrypt)
- [execute](NeverminedNode.md#execute)
- [fetchToken](NeverminedNode.md#fetchtoken)
- [getAccessEndpoint](NeverminedNode.md#getaccessendpoint)
- [getAccessProofEndpoint](NeverminedNode.md#getaccessproofendpoint)
- [getBabyjubPublicKey](NeverminedNode.md#getbabyjubpublickey)
- [getClaimNftEndpoint](NeverminedNode.md#getclaimnftendpoint)
- [getComputeLogsEndpoint](NeverminedNode.md#getcomputelogsendpoint)
- [getComputeStatusEndpoint](NeverminedNode.md#getcomputestatusendpoint)
- [getConsumeEndpoint](NeverminedNode.md#getconsumeendpoint)
- [getDownloadEndpoint](NeverminedNode.md#getdownloadendpoint)
- [getEcdsaPublicKey](NeverminedNode.md#getecdsapublickey)
- [getEncryptEndpoint](NeverminedNode.md#getencryptendpoint)
- [getExecuteEndpoint](NeverminedNode.md#getexecuteendpoint)
- [getFetchTokenEndpoint](NeverminedNode.md#getfetchtokenendpoint)
- [getNeverminedNodeInfo](NeverminedNode.md#getneverminednodeinfo)
- [getNft721Endpoint](NeverminedNode.md#getnft721endpoint)
- [getNftAccessEndpoint](NeverminedNode.md#getnftaccessendpoint)
- [getNftEndpoint](NeverminedNode.md#getnftendpoint)
- [getProviderAddress](NeverminedNode.md#getprovideraddress)
- [getPurchaseEndpoint](NeverminedNode.md#getpurchaseendpoint)
- [getRsaPublicKey](NeverminedNode.md#getrsapublickey)
- [getServiceEndpoint](NeverminedNode.md#getserviceendpoint)
- [getSubscriptionToken](NeverminedNode.md#getsubscriptiontoken)
- [getSubscriptionsEndpoint](NeverminedNode.md#getsubscriptionsendpoint)
- [getUploadFilecoinEndpoint](NeverminedNode.md#getuploadfilecoinendpoint)
- [getUploadIPFSEndpoint](NeverminedNode.md#getuploadipfsendpoint)
- [getUploadS3Endpoint](NeverminedNode.md#getuploads3endpoint)
- [getVersionInfo](NeverminedNode.md#getversioninfo)
- [initializeServiceAgreement](NeverminedNode.md#initializeserviceagreement)
- [publishImmutableContent](NeverminedNode.md#publishimmutablecontent)
- [setInstanceConfig](NeverminedNode.md#setinstanceconfig)
- [uploadContent](NeverminedNode.md#uploadcontent)
- [getInstance](NeverminedNode.md#getinstance)
- [setInstanceConfig](NeverminedNode.md#setinstanceconfig-1)

## Constructors

### constructor

• **new NeverminedNode**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/services/node/NeverminedNode.ts:38](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L38)

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

### url

• `Private` `get` **url**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L34)

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

### claimNFT

▸ **claimNFT**(`agreementId`, `nftHolder`, `nftReceiver`, `nftAmount`, `ercType?`, `did?`, `serviceIndex?`): `Promise`<`boolean`\>

#### Parameters

| Name            | Type                             | Default value |
| :-------------- | :------------------------------- | :------------ |
| `agreementId`   | `string`                         | `undefined`   |
| `nftHolder`     | `string`                         | `undefined`   |
| `nftReceiver`   | `string`                         | `undefined`   |
| `nftAmount`     | `bigint`                         | `undefined`   |
| `ercType`       | [`ERCType`](../enums/ERCType.md) | `1155`        |
| `did?`          | `string`                         | `undefined`   |
| `serviceIndex?` | `number`                         | `undefined`   |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/services/node/NeverminedNode.ts:374](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L374)

---

### computeLogs

▸ **computeLogs**(`agreementId`, `executionId`, `account`): `Promise`<`any`\>

#### Parameters

| Name          | Type                    |
| :------------ | :---------------------- |
| `agreementId` | `string`                |
| `executionId` | `string`                |
| `account`     | [`Account`](Account.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:304](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L304)

---

### computeStatus

▸ **computeStatus**(`agreementId`, `executionId`, `account`): `Promise`<`any`\>

#### Parameters

| Name          | Type                    |
| :------------ | :---------------------- |
| `agreementId` | `string`                |
| `executionId` | `string`                |
| `account`     | [`Account`](Account.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:339](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L339)

---

### consumeService

▸ **consumeService**(`did`, `agreementId`, `serviceEndpoint`, `account`, `files`, `destination`, `index?`, `result?`, `buyer?`, `babysig?`): `Promise`<`string`\>

#### Parameters

| Name              | Type                                                                      | Default value      |
| :---------------- | :------------------------------------------------------------------------ | :----------------- |
| `did`             | `string`                                                                  | `undefined`        |
| `agreementId`     | `string`                                                                  | `undefined`        |
| `serviceEndpoint` | `string`                                                                  | `undefined`        |
| `account`         | [`Account`](Account.md)                                                   | `undefined`        |
| `files`           | [`MetaDataExternalResource`](../interfaces/MetaDataExternalResource.md)[] | `undefined`        |
| `destination`     | `string`                                                                  | `undefined`        |
| `index`           | `number`                                                                  | `-1`               |
| `result`          | [`AssetResult`](../enums/AssetResult.md)                                  | `AssetResult.DATA` |
| `buyer?`          | `string`                                                                  | `undefined`        |
| `babysig?`        | [`Babysig`](../interfaces/Babysig.md)                                     | `undefined`        |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/services/node/NeverminedNode.ts:172](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L172)

---

### downloadService

▸ **downloadService**(`files`, `destination`, `index?`, `headers?`, `result?`): `Promise`<`string`\>

#### Parameters

| Name          | Type                                                                      | Default value      |
| :------------ | :------------------------------------------------------------------------ | :----------------- |
| `files`       | [`MetaDataExternalResource`](../interfaces/MetaDataExternalResource.md)[] | `undefined`        |
| `destination` | `string`                                                                  | `undefined`        |
| `index`       | `number`                                                                  | `-1`               |
| `headers?`    | `Object`                                                                  | `undefined`        |
| `result`      | [`AssetResult`](../enums/AssetResult.md)                                  | `AssetResult.DATA` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/services/node/NeverminedNode.ts:239](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L239)

---

### encrypt

▸ **encrypt**(`did`, `document`, `method`): `Promise`<`any`\>

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `did`      | `any` |
| `document` | `any` |
| `method`   | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:219](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L219)

---

### execute

▸ **execute**(`agreementId`, `workflowDid`, `account`): `Promise`<`any`\>

#### Parameters

| Name          | Type                    |
| :------------ | :---------------------- |
| `agreementId` | `string`                |
| `workflowDid` | `string`                |
| `account`     | [`Account`](Account.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:268](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L268)

---

### fetchToken

▸ **fetchToken**(`grantToken`, `numberTries?`): `Promise`<`string`\>

#### Parameters

| Name          | Type     | Default value |
| :------------ | :------- | :------------ |
| `grantToken`  | `string` | `undefined`   |
| `numberTries` | `number` | `3`           |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/services/node/NeverminedNode.ts:419](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L419)

---

### getAccessEndpoint

▸ **getAccessEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:55](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L55)

---

### getAccessProofEndpoint

▸ **getAccessProofEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:59](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L59)

---

### getBabyjubPublicKey

▸ **getBabyjubPublicKey**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:138](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L138)

---

### getClaimNftEndpoint

▸ **getClaimNftEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:111](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L111)

---

### getComputeLogsEndpoint

▸ **getComputeLogsEndpoint**(`executionId`): `string`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `executionId` | `string` |

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:67](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L67)

---

### getComputeStatusEndpoint

▸ **getComputeStatusEndpoint**(`executionId`): `string`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `executionId` | `string` |

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:71](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L71)

---

### getConsumeEndpoint

▸ **getConsumeEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:51](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L51)

---

### getDownloadEndpoint

▸ **getDownloadEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:143](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L143)

---

### getEcdsaPublicKey

▸ **getEcdsaPublicKey**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:133](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L133)

---

### getEncryptEndpoint

▸ **getEncryptEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:79](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L79)

---

### getExecuteEndpoint

▸ **getExecuteEndpoint**(`serviceAgreementId`): `string`

#### Parameters

| Name                 | Type     |
| :------------------- | :------- |
| `serviceAgreementId` | `string` |

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:75](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L75)

---

### getFetchTokenEndpoint

▸ **getFetchTokenEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:83](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L83)

---

### getNeverminedNodeInfo

▸ **getNeverminedNodeInfo**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:119](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L119)

---

### getNft721Endpoint

▸ **getNft721Endpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:103](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L103)

---

### getNftAccessEndpoint

▸ **getNftAccessEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:107](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L107)

---

### getNftEndpoint

▸ **getNftEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L99)

---

### getProviderAddress

▸ **getProviderAddress**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:123](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L123)

---

### getPurchaseEndpoint

▸ **getPurchaseEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:47](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L47)

---

### getRsaPublicKey

▸ **getRsaPublicKey**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:128](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L128)

---

### getServiceEndpoint

▸ **getServiceEndpoint**(`service`): `string`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `service` | `string` |

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:63](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L63)

---

### getSubscriptionToken

▸ **getSubscriptionToken**(`did`, `account`): `Promise`<[`SubscriptionToken`](../interfaces/SubscriptionToken.md)\>

#### Parameters

| Name      | Type                    |
| :-------- | :---------------------- |
| `did`     | `string`                |
| `account` | [`Account`](Account.md) |

#### Returns

`Promise`<[`SubscriptionToken`](../interfaces/SubscriptionToken.md)\>

#### Defined in

[src/services/node/NeverminedNode.ts:489](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L489)

---

### getSubscriptionsEndpoint

▸ **getSubscriptionsEndpoint**(`did`): `string`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:115](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L115)

---

### getUploadFilecoinEndpoint

▸ **getUploadFilecoinEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:87](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L87)

---

### getUploadIPFSEndpoint

▸ **getUploadIPFSEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:91](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L91)

---

### getUploadS3Endpoint

▸ **getUploadS3Endpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/services/node/NeverminedNode.ts:95](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L95)

---

### getVersionInfo

▸ **getVersionInfo**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L43)

---

### initializeServiceAgreement

▸ **initializeServiceAgreement**(`did`, `serviceAgreementId`, `serviceIndex`, `signature`, `consumerAddress`): `Promise`<`any`\>

#### Parameters

| Name                 | Type     |
| :------------------- | :------- |
| `did`                | `string` |
| `serviceAgreementId` | `string` |
| `serviceIndex`       | `number` |
| `signature`          | `string` |
| `consumerAddress`    | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:147](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L147)

---

### publishImmutableContent

▸ **publishImmutableContent**(`ddo`, `publishMetadata?`): `Promise`<{ `backend`: [`ImmutableBackends`](../enums/ImmutableBackends.md) ; `url`: `string` }\>

#### Parameters

| Name              | Type                                                           | Default value                 |
| :---------------- | :------------------------------------------------------------- | :---------------------------- |
| `ddo`             | [`DDO`](DDO.md)                                                | `undefined`                   |
| `publishMetadata` | [`PublishMetadataOptions`](../enums/PublishMetadataOptions.md) | `PublishMetadataOptions.IPFS` |

#### Returns

`Promise`<{ `backend`: [`ImmutableBackends`](../enums/ImmutableBackends.md) ; `url`: `string` }\>

#### Defined in

[src/services/node/NeverminedNode.ts:434](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L434)

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

### uploadContent

▸ **uploadContent**(`data`, `encrypt?`, `backend?`): `Promise`<`any`\>

#### Parameters

| Name       | Type                                                   | Default value                 |
| :--------- | :----------------------------------------------------- | :---------------------------- |
| `data`     | `string` \| `ReadStream`                               | `undefined`                   |
| `encrypt?` | `boolean`                                              | `undefined`                   |
| `backend`  | [`NodeUploadBackends`](../enums/NodeUploadBackends.md) | `NodeUploadBackends.Filecoin` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/services/node/NeverminedNode.ts:461](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/node/NeverminedNode.ts#L461)

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
