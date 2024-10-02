[@nevermined-io/sdk - v3.0.37](../code-reference.md) / NvmAppMetadata

# Class: NvmAppMetadata

## Table of contents

### Constructors

- [constructor](NvmAppMetadata.md#constructor)

### Methods

- [getCreditsSubscriptionMetadataTemplate](NvmAppMetadata.md#getcreditssubscriptionmetadatatemplate)
- [getFileMetadataTemplate](NvmAppMetadata.md#getfilemetadatatemplate)
- [getServiceMetadataTemplate](NvmAppMetadata.md#getservicemetadatatemplate)
- [getSubscriptionMetadataTemplate](NvmAppMetadata.md#getsubscriptionmetadatatemplate)
- [getTimeSubscriptionMetadataTemplate](NvmAppMetadata.md#gettimesubscriptionmetadatatemplate)
- [validateSubscription](NvmAppMetadata.md#validatesubscription)

## Constructors

### constructor

• **new NvmAppMetadata**(): [`NvmAppMetadata`](NvmAppMetadata.md)

#### Returns

[`NvmAppMetadata`](NvmAppMetadata.md)

## Methods

### getCreditsSubscriptionMetadataTemplate

▸ **getCreditsSubscriptionMetadataTemplate**(`name`, `author`, `customData?`): [`MetaData`](../interfaces/MetaData.md)

It returns a metadata template for a credits limitted subscription

#### Parameters

| Name         | Type     | Description                                       |
| :----------- | :------- | :------------------------------------------------ |
| `name`       | `string` | the name of the subscription                      |
| `author`     | `string` | the author of the subscrpiton                     |
| `customData` | `Object` | any key-value pair to be included in the metadata |

#### Returns

[`MetaData`](../interfaces/MetaData.md)

Metadata

#### Defined in

[src/ddo/NvmAppMetadata.ts:46](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/ddo/NvmAppMetadata.ts#L46)

---

### getFileMetadataTemplate

▸ **getFileMetadataTemplate**(`name`, `author`, `customData?`): [`MetaData`](../interfaces/MetaData.md)

It gets a metadata template for a file type of asset (datasets, moldels, algorithms, etc.)

#### Parameters

| Name         | Type     | Description                                    |
| :----------- | :------- | :--------------------------------------------- |
| `name`       | `string` | the name of the asset                          |
| `author`     | `string` | the autor of the asset                         |
| `customData` | `Object` | key-value pairs to be included in the metadata |

#### Returns

[`MetaData`](../interfaces/MetaData.md)

Metadata

#### Defined in

[src/ddo/NvmAppMetadata.ts:199](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/ddo/NvmAppMetadata.ts#L199)

---

### getServiceMetadataTemplate

▸ **getServiceMetadataTemplate**(`name`, `author`, `endpoints`, `openEndpoints`, `openApiEndpoint`, `serviceType?`, `authType`, `authToken?`, `authUser?`, `authPassword?`, `isPriceDynamic?`, `isNeverminedHosted?`, `queryProtocol?`, `serviceHost?`, `customData?`, `nonce?`): [`MetaData`](../interfaces/MetaData.md)

It returns a metadata template for Web Service

#### Parameters

| Name                 | Type                                             | Default value | Description                                                              |
| :------------------- | :----------------------------------------------- | :------------ | :----------------------------------------------------------------------- |
| `name`               | `string`                                         | `undefined`   | the name of the subscription                                             |
| `author`             | `string`                                         | `undefined`   | the author of the subscrpiton                                            |
| `endpoints`          | \{ `[verb: string]`: `string`; }[]               | `undefined`   | the list of endpoints                                                    |
| `openEndpoints`      | `string`[]                                       | `undefined`   | the list of open endpoints (not protected)                               |
| `openApiEndpoint`    | `undefined` \| `string`                          | `undefined`   | the openApi endpoint endpoint if any                                     |
| `serviceType`        | `string`                                         | `'RESTful'`   | the type of the service                                                  |
| `authType`           | `"none"` \| `"basic"` \| `"bearer"` \| `"oauth"` | `undefined`   | the type of authentication required by the service                       |
| `authToken?`         | `string`                                         | `undefined`   | the token to be used for authentication (if authType is oauth or bearer) |
| `authUser?`          | `string`                                         | `undefined`   | the username to be used for authentication (if authType is basic)        |
| `authPassword?`      | `string`                                         | `undefined`   | the password to be used for authentication (if authType is basic)        |
| `isPriceDynamic`     | `boolean`                                        | `false`       | if the price is dynamic                                                  |
| `isNeverminedHosted` | `boolean`                                        | `false`       | -                                                                        |
| `queryProtocol`      | `undefined` \| `string`                          | `undefined`   | -                                                                        |
| `serviceHost`        | `undefined` \| `string`                          | `undefined`   | -                                                                        |
| `customData`         | `Object`                                         | `{}`          | any key-value pair to be included in the metadata                        |
| `nonce`              | `string` \| `number`                             | `undefined`   | the nonce to be included in the metadata                                 |

#### Returns

[`MetaData`](../interfaces/MetaData.md)

Metadata

#### Defined in

[src/ddo/NvmAppMetadata.ts:115](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/ddo/NvmAppMetadata.ts#L115)

---

### getSubscriptionMetadataTemplate

▸ **getSubscriptionMetadataTemplate**(`name`, `author`, `customData?`): [`MetaData`](../interfaces/MetaData.md)

It returns a metadata template for subscription

#### Parameters

| Name         | Type     | Description                                       |
| :----------- | :------- | :------------------------------------------------ |
| `name`       | `string` | the name of the subscription                      |
| `author`     | `string` | the author of the subscrpiton                     |
| `customData` | `Object` | any key-value pair to be included in the metadata |

#### Returns

[`MetaData`](../interfaces/MetaData.md)

Metadata

#### Defined in

[src/ddo/NvmAppMetadata.ts:71](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/ddo/NvmAppMetadata.ts#L71)

---

### getTimeSubscriptionMetadataTemplate

▸ **getTimeSubscriptionMetadataTemplate**(`name`, `author`, `timeMeasure`, `customData?`): [`MetaData`](../interfaces/MetaData.md)

It returns a metadata template for a subscription with time limit

#### Parameters

| Name          | Type     | Description                                       |
| :------------ | :------- | :------------------------------------------------ |
| `name`        | `string` | the name of the subscription                      |
| `author`      | `string` | the author of the subscrpiton                     |
| `timeMeasure` | `string` | the string defining the time measure              |
| `customData`  | `Object` | any key-value pair to be included in the metadata |

#### Returns

[`MetaData`](../interfaces/MetaData.md)

Metadata

#### Defined in

[src/ddo/NvmAppMetadata.ts:19](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/ddo/NvmAppMetadata.ts#L19)

---

### validateSubscription

▸ **validateSubscription**(`metadata`, `subscriptionType`): [`MetadataValidationResults`](../interfaces/MetadataValidationResults.md)

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `metadata`         | [`MetaData`](../interfaces/MetaData.md)            |
| `subscriptionType` | [`SubscriptionType`](../enums/SubscriptionType.md) |

#### Returns

[`MetadataValidationResults`](../interfaces/MetadataValidationResults.md)

#### Defined in

[src/ddo/NvmAppMetadata.ts:223](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/ddo/NvmAppMetadata.ts#L223)
