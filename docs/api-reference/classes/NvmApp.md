[@nevermined-io/sdk - v3.1.2](../code-reference.md) / NvmApp

# Class: NvmApp

Represents the NvmApp class which is the main entry point for interacting with the Nevermined SDK.

## Table of contents

### Constructors

- [constructor](NvmApp.md#constructor)

### Properties

- [assetProviders](NvmApp.md#assetproviders)
- [configNVM](NvmApp.md#confignvm)
- [fullSDK](NvmApp.md#fullsdk)
- [loginCredentials](NvmApp.md#logincredentials)
- [networkFee](NvmApp.md#networkfee)
- [networkFeeReceiver](NvmApp.md#networkfeereceiver)
- [searchSDK](NvmApp.md#searchsdk)
- [userAccount](NvmApp.md#useraccount)
- [zeroDevSignerAccount](NvmApp.md#zerodevsigneraccount)
- [defaultAppInitializationOptions](NvmApp.md#defaultappinitializationoptions)

### Accessors

- [config](NvmApp.md#config)
- [networkFees](NvmApp.md#networkfees)
- [sdk](NvmApp.md#sdk)
- [search](NvmApp.md#search)
- [services](NvmApp.md#services)

### Methods

- [addNetworkFee](NvmApp.md#addnetworkfee)
- [claimSubscription](NvmApp.md#claimsubscription)
- [connect](NvmApp.md#connect)
- [createCreditsSubscription](NvmApp.md#createcreditssubscription)
- [createCreditsSubscriptionAsync](NvmApp.md#createcreditssubscriptionasync)
- [createTimeSubscription](NvmApp.md#createtimesubscription)
- [createTimeSubscriptionAsync](NvmApp.md#createtimesubscriptionasync)
- [disconnect](NvmApp.md#disconnect)
- [downloadFiles](NvmApp.md#downloadfiles)
- [getBalance](NvmApp.md#getbalance)
- [getEncryptedAPIKey](NvmApp.md#getencryptedapikey)
- [getLoginCredentials](NvmApp.md#getlogincredentials)
- [getProviderAddresses](NvmApp.md#getprovideraddresses)
- [getServiceAccessToken](NvmApp.md#getserviceaccesstoken)
- [initializeSearch](NvmApp.md#initializesearch)
- [isNetworkFeeIncluded](NvmApp.md#isnetworkfeeincluded)
- [isWeb3Connected](NvmApp.md#isweb3connected)
- [orderSubscription](NvmApp.md#ordersubscription)
- [orderSubscriptionAsync](NvmApp.md#ordersubscriptionasync)
- [registerFileAsset](NvmApp.md#registerfileasset)
- [registerFileAssetAsync](NvmApp.md#registerfileassetasync)
- [registerServiceAsset](NvmApp.md#registerserviceasset)
- [registerServiceAssetAsync](NvmApp.md#registerserviceassetasync)
- [updateAsset](NvmApp.md#updateasset)
- [updateAssetAsync](NvmApp.md#updateassetasync)
- [validateFileAssetMetadata](NvmApp.md#validatefileassetmetadata)
- [validateServiceAssetMetadata](NvmApp.md#validateserviceassetmetadata)
- [validateSubscription](NvmApp.md#validatesubscription)
- [getConfigFromTagName](NvmApp.md#getconfigfromtagname)
- [getInstance](NvmApp.md#getinstance)
- [switchConfigBetweenEnvs](NvmApp.md#switchconfigbetweenenvs)

## Constructors

### constructor

• **new NvmApp**(`config`): [`NvmApp`](NvmApp.md)

Represents the NvmApp class.

#### Parameters

| Name     | Type                                              | Description                                       |
| :------- | :------------------------------------------------ | :------------------------------------------------ |
| `config` | [`NeverminedAppOptions`](NeverminedAppOptions.md) | The configuration options for the Nevermined App. |

#### Returns

[`NvmApp`](NvmApp.md)

#### Defined in

[src/nevermined/NvmApp.ts:131](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L131)

## Properties

### assetProviders

• **assetProviders**: `NeverminedNodeInfo`[] = `[]`

#### Defined in

[src/nevermined/NvmApp.ts:81](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L81)

---

### configNVM

• `Private` **configNVM**: [`NeverminedAppOptions`](NeverminedAppOptions.md)

#### Defined in

[src/nevermined/NvmApp.ts:76](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L76)

---

### fullSDK

• `Private` **fullSDK**: `undefined` \| [`Nevermined`](Nevermined.md)

#### Defined in

[src/nevermined/NvmApp.ts:79](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L79)

---

### loginCredentials

• `Private` **loginCredentials**: `undefined` \| `string`

#### Defined in

[src/nevermined/NvmApp.ts:82](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L82)

---

### networkFee

• `Private` **networkFee**: `undefined` \| `bigint`

#### Defined in

[src/nevermined/NvmApp.ts:84](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L84)

---

### networkFeeReceiver

• `Private` **networkFeeReceiver**: `undefined` \| `string`

#### Defined in

[src/nevermined/NvmApp.ts:83](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L83)

---

### searchSDK

• `Private` **searchSDK**: [`Nevermined`](Nevermined.md)

#### Defined in

[src/nevermined/NvmApp.ts:78](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L78)

---

### userAccount

• `Private` **userAccount**: `undefined` \| [`NvmAccount`](NvmAccount.md)

#### Defined in

[src/nevermined/NvmApp.ts:77](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L77)

---

### zeroDevSignerAccount

• `Private` **zeroDevSignerAccount**: `undefined` \| `SmartAccount`\<`any`\>

#### Defined in

[src/nevermined/NvmApp.ts:80](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L80)

---

### defaultAppInitializationOptions

▪ `Static` `Readonly` **defaultAppInitializationOptions**: [`NeverminedInitializationOptions`](../interfaces/NeverminedInitializationOptions.md)

Default initialization options for the Nevermined application.

#### Defined in

[src/nevermined/NvmApp.ts:89](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L89)

## Accessors

### config

• `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

Gets the configuration options for the Nevermined application.

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

The configuration options for the Nevermined application.

#### Defined in

[src/nevermined/NvmApp.ts:243](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L243)

---

### networkFees

• `get` **networkFees**(): `Object`

Gets the network fees.

#### Returns

`Object`

An object containing the receiver and fee.

| Name       | Type     |
| :--------- | :------- |
| `fee`      | `bigint` |
| `receiver` | `string` |

#### Defined in

[src/nevermined/NvmApp.ts:278](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L278)

---

### sdk

• `get` **sdk**(): [`Nevermined`](Nevermined.md)

Gets the Nevermined SDK instance.

#### Returns

[`Nevermined`](Nevermined.md)

The Nevermined SDK instance.

**`Throws`**

If Web3 is not connected, try calling the connect method first.

#### Defined in

[src/nevermined/NvmApp.ts:268](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L268)

---

### search

• `get` **search**(): [`SearchApi`](SearchApi.md)

Gets the SearchApi instance.

#### Returns

[`SearchApi`](SearchApi.md)

The SearchApi instance.

#### Defined in

[src/nevermined/NvmApp.ts:251](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L251)

---

### services

• `get` **services**(): [`ServicesApi`](ServicesApi.md)

Gets the Services API instance.

#### Returns

[`ServicesApi`](ServicesApi.md)

The Services API instance.

#### Defined in

[src/nevermined/NvmApp.ts:259](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L259)

## Methods

### addNetworkFee

▸ **addNetworkFee**(`price`): [`AssetPrice`](AssetPrice.md)

Adds the network fee to the given asset price.
If the network fee is not already included in the price, it adjusts the price to include the network fees.

#### Parameters

| Name    | Type                          | Description                                             |
| :------ | :---------------------------- | :------------------------------------------------------ |
| `price` | [`AssetPrice`](AssetPrice.md) | The asset price to which the network fee will be added. |

#### Returns

[`AssetPrice`](AssetPrice.md)

The updated asset price with the network fee included, or the original price if the network fee is already included.

#### Defined in

[src/nevermined/NvmApp.ts:878](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L878)

---

### claimSubscription

▸ **claimSubscription**(`agreementId`, `subscriptionDid`, `numberCredits`, `serviceIndex?`): `Promise`\<`boolean`\>

Claims a subscription by transferring the specified number of credits from the subscription owner to the user's account.

#### Parameters

| Name              | Type     | Description                                                  |
| :---------------- | :------- | :----------------------------------------------------------- |
| `agreementId`     | `string` | The ID of the agreement associated with the subscription.    |
| `subscriptionDid` | `string` | The DID (Decentralized Identifier) of the subscription.      |
| `numberCredits`   | `bigint` | The number of credits to be claimed.                         |
| `serviceIndex?`   | `number` | (Optional) The index of the service within the subscription. |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to a boolean indicating whether the claim was successful.

**`Throws`**

If Web3 is not connected or if there is an error claiming the NFT of the subscription.

#### Defined in

[src/nevermined/NvmApp.ts:617](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L617)

---

### connect

▸ **connect**(`account`, `message?`, `config?`, `initOptions?`): `Promise`\<\{ `marketplaceAuthToken`: `string` ; `userAccount`: [`NvmAccount`](NvmAccount.md) ; `zeroDevSignerAccount`: `undefined` \| `SmartAccount`\<`any`\> }\>

Connects to the Nevermined network and initializes the NvmApp instance.

#### Parameters

| Name           | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Description                                                                                                                  |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `account`      | `string` \| [`NvmAccount`](NvmAccount.md) \| `object` & `Assign_`\<`SmartAccountImplementation`\<`Abi`, `EntryPointVersion`, `object`\>, \{ `address`: \`0x$\{string}\` ; `getNonce`: (`parameters?`: \{ `key?`: `bigint`  }) => `Promise`\<`bigint`\> ; `isDeployed`: () => `Promise`\<`boolean`\> ; `type`: ``"smart"``  }\> & \{ `address`: \`0x$\{string}\` ; `getNonce`: (`parameters?`: \{ `key?`: `bigint` }) => `Promise`\<`bigint`\> ; `isDeployed`: () => `Promise`\<`boolean`\> ; `type`: `"smart"` } | The account to connect with. It can be either a string representing the account address or an instance of the Account class. |
| `message?`     | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | An optional message to include in the client assertion for authentication.                                                   |
| `config?`      | [`NeverminedOptions`](NeverminedOptions.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Optional configuration options for the Nevermined instance.                                                                  |
| `initOptions?` | [`NeverminedInitializationOptions`](../interfaces/NeverminedInitializationOptions.md)                                                                                                                                                                                                                                                                                                                                                                                                                            | Optional initialization options for the Nevermined instance.                                                                 |

#### Returns

`Promise`\<\{ `marketplaceAuthToken`: `string` ; `userAccount`: [`NvmAccount`](NvmAccount.md) ; `zeroDevSignerAccount`: `undefined` \| `SmartAccount`\<`any`\> }\>

An object containing the marketplace authentication token, user account, and zeroDev signer account (if applicable).

#### Defined in

[src/nevermined/NvmApp.ts:153](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L153)

---

### createCreditsSubscription

▸ **createCreditsSubscription**(`susbcriptionMetadata`, `subscriptionPrice`, `numberCredits`, `subscriptionNFTContractCreditsAddress?`): [`SubscribablePromise`](SubscribablePromise.md)\<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

Creates a credits subscription.

#### Parameters

| Name                                     | Type                                    | Description                                 |
| :--------------------------------------- | :-------------------------------------- | :------------------------------------------ |
| `susbcriptionMetadata`                   | [`MetaData`](../interfaces/MetaData.md) | The metadata for the subscription.          |
| `subscriptionPrice`                      | [`AssetPrice`](AssetPrice.md)           | The price of the subscription.              |
| `numberCredits`                          | `bigint`                                | The number of credits for the subscription. |
| `subscriptionNFTContractCreditsAddress?` | `string`                                | -                                           |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)\<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

A `SubscribablePromise` that resolves to a `DDO` object representing the created subscription.

**`Throws`**

If Web3 is not connected.

**`Throws`**

If the validation of the subscription fails.

#### Defined in

[src/nevermined/NvmApp.ts:407](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L407)

---

### createCreditsSubscriptionAsync

▸ **createCreditsSubscriptionAsync**(`susbcriptionMetadata`, `subscriptionPrice`, `numberCredits`): `Promise`\<[`DDO`](DDO.md)\>

Creates a credits subscription asynchronously.

#### Parameters

| Name                   | Type                                    | Description                                 |
| :--------------------- | :-------------------------------------- | :------------------------------------------ |
| `susbcriptionMetadata` | [`MetaData`](../interfaces/MetaData.md) | The metadata for the subscription.          |
| `subscriptionPrice`    | [`AssetPrice`](AssetPrice.md)           | The price of the subscription.              |
| `numberCredits`        | `bigint`                                | The number of credits for the subscription. |

#### Returns

`Promise`\<[`DDO`](DDO.md)\>

A Promise that resolves to a DDO (Decentralized Data Object).

#### Defined in

[src/nevermined/NvmApp.ts:473](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L473)

---

### createTimeSubscription

▸ **createTimeSubscription**(`susbcriptionMetadata`, `subscriptionPrice`, `duration`, `subscriptionNFTContractTimeAddress?`): [`SubscribablePromise`](SubscribablePromise.md)\<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

Creates a time-based subscription for a given asset.

#### Parameters

| Name                                  | Type                                    | Description                                  |
| :------------------------------------ | :-------------------------------------- | :------------------------------------------- |
| `susbcriptionMetadata`                | [`MetaData`](../interfaces/MetaData.md) | The metadata of the subscription.            |
| `subscriptionPrice`                   | [`AssetPrice`](AssetPrice.md)           | The price of the subscription.               |
| `duration`                            | `number`                                | The duration of the subscription in seconds. |
| `subscriptionNFTContractTimeAddress?` | `string`                                | -                                            |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)\<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

A promise that resolves to the progress steps and the resulting DDO (Decentralized Data Object).

**`Throws`**

If Web3 is not connected.

**`Throws`**

If the validation of the subscription fails.

#### Defined in

[src/nevermined/NvmApp.ts:326](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L326)

---

### createTimeSubscriptionAsync

▸ **createTimeSubscriptionAsync**(`susbcriptionMetadata`, `subscriptionPrice`, `duration`): `Promise`\<[`DDO`](DDO.md)\>

Creates a time-based subscription asynchronously.

#### Parameters

| Name                   | Type                                    | Description                                  |
| :--------------------- | :-------------------------------------- | :------------------------------------------- |
| `susbcriptionMetadata` | [`MetaData`](../interfaces/MetaData.md) | The metadata for the subscription.           |
| `subscriptionPrice`    | [`AssetPrice`](AssetPrice.md)           | The price of the subscription.               |
| `duration`             | `number`                                | The duration of the subscription in seconds. |

#### Returns

`Promise`\<[`DDO`](DDO.md)\>

A Promise that resolves to the [DDO](DDO.md) (Decentralized Data Object) of the created subscription.

#### Defined in

[src/nevermined/NvmApp.ts:389](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L389)

---

### disconnect

▸ **disconnect**(): `Promise`\<`void`\>

Disconnects the NvmApp from the current web3 provider.
Clears the fullSDK instance and resets the user account, zeroDevSigner settings, and login credentials.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/nevermined/NvmApp.ts:213](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L213)

---

### downloadFiles

▸ **downloadFiles**(`fileAssetDid`, `fileIndex?`, `destinationPath?`, `agreementId?`): `Promise`\<[`OperationResult`](../interfaces/OperationResult.md)\>

Downloads files associated with a given file asset DID.

#### Parameters

| Name               | Type     | Description                                                                             |
| :----------------- | :------- | :-------------------------------------------------------------------------------------- |
| `fileAssetDid`     | `string` | The DID of the file asset.                                                              |
| `fileIndex?`       | `number` | (Optional) The index of the file to download if the file asset contains multiple files. |
| `destinationPath?` | `string` | (Optional) The path where the downloaded files will be saved.                           |
| `agreementId?`     | `string` | (Optional) The ID of the agreement associated with the file asset.                      |

#### Returns

`Promise`\<[`OperationResult`](../interfaces/OperationResult.md)\>

A Promise that resolves to an OperationResult object containing the agreement ID and the success status of the download operation.

**`Throws`**

If there is an error downloading the files.

#### Defined in

[src/nevermined/NvmApp.ts:705](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L705)

---

### getBalance

▸ **getBalance**(`subscriptionDid`, `accountAddress?`): `Promise`\<[`SubscriptionBalance`](../interfaces/SubscriptionBalance.md)\>

Retrieves the balance and subscription information for a given subscription DID and account address.
If no account address is provided, the user's account ID will be used.

#### Parameters

| Name              | Type     | Description                                                                                          |
| :---------------- | :------- | :--------------------------------------------------------------------------------------------------- |
| `subscriptionDid` | `string` | The DID (Decentralized Identifier) of the subscription.                                              |
| `accountAddress?` | `string` | (Optional) The Ethereum address of the account. If not provided, the user's account ID will be used. |

#### Returns

`Promise`\<[`SubscriptionBalance`](../interfaces/SubscriptionBalance.md)\>

A Promise that resolves to a SubscriptionBalance object containing the subscription type, balance, and access information.

**`Throws`**

If the Web3 provider is not connected.

**`Throws`**

If there is an error retrieving the subscription information.

#### Defined in

[src/nevermined/NvmApp.ts:652](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L652)

---

### getEncryptedAPIKey

▸ **getEncryptedAPIKey**(`sessionKey`): `Promise`\<`string`\>

It gets an encrypted Nevermined API Key that can be used to interact with the Nevermined.
The generation of the API Key requires to have a ZeroDev Session Key that is given as parameter to this method.

#### Parameters

| Name         | Type     | Description               |
| :----------- | :------- | :------------------------ |
| `sessionKey` | `string` | The Zero Dev Session Key. |

#### Returns

`Promise`\<`string`\>

A encrypted Nevermined API Key.

**`Throws`**

If Web3 is not connected. Call the connect method first.

#### Defined in

[src/nevermined/NvmApp.ts:291](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L291)

---

### getLoginCredentials

▸ **getLoginCredentials**(): `undefined` \| `string`

Retrieves the login credentials.

#### Returns

`undefined` \| `string`

The login credentials as a string, or undefined if not set.

#### Defined in

[src/nevermined/NvmApp.ts:235](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L235)

---

### getProviderAddresses

▸ **getProviderAddresses**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/nevermined/NvmApp.ts:310](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L310)

---

### getServiceAccessToken

▸ **getServiceAccessToken**(`serviceDid`): `Promise`\<[`SubscriptionToken`](../interfaces/SubscriptionToken.md)\>

Retrieves the service access token for a given service DID.

#### Parameters

| Name         | Type     | Description                                             |
| :----------- | :------- | :------------------------------------------------------ |
| `serviceDid` | `string` | The service DID for which to retrieve the access token. |

#### Returns

`Promise`\<[`SubscriptionToken`](../interfaces/SubscriptionToken.md)\>

A promise that resolves to the subscription token.

**`Throws`**

If Web3 is not connected. Call the connect method first.

#### Defined in

[src/nevermined/NvmApp.ts:688](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L688)

---

### initializeSearch

▸ **initializeSearch**(`config?`): `Promise`\<`void`\>

Initializes the search functionality of the Nevermined App.

#### Parameters

| Name      | Type                                              | Description                                            |
| :-------- | :------------------------------------------------ | :----------------------------------------------------- |
| `config?` | [`NeverminedAppOptions`](NeverminedAppOptions.md) | Optional configuration options for the Nevermined App. |

#### Returns

`Promise`\<`void`\>

A Promise that resolves to void.

#### Defined in

[src/nevermined/NvmApp.ts:140](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L140)

---

### isNetworkFeeIncluded

▸ **isNetworkFeeIncluded**(`price`): `boolean`

Checks if the network fee is included in the given asset price.

#### Parameters

| Name    | Type                          | Description               |
| :------ | :---------------------------- | :------------------------ |
| `price` | [`AssetPrice`](AssetPrice.md) | The asset price to check. |

#### Returns

`boolean`

A boolean indicating whether the network fee is included.

#### Defined in

[src/nevermined/NvmApp.ts:893](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L893)

---

### isWeb3Connected

▸ **isWeb3Connected**(): `boolean`

Checks if the web3 provider is connected.

#### Returns

`boolean`

True if the web3 provider is connected, false otherwise.

#### Defined in

[src/nevermined/NvmApp.ts:227](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L227)

---

### orderSubscription

▸ **orderSubscription**(`subscriptionDid`, `numberCredits`, `serviceIndex?`): [`SubscribablePromise`](SubscribablePromise.md)\<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

Orders a subscription for a given NFT.

#### Parameters

| Name              | Type     | Description                                                          |
| :---------------- | :------- | :------------------------------------------------------------------- |
| `subscriptionDid` | `string` | The DID of the subscription NFT.                                     |
| `numberCredits`   | `bigint` | The number of credits to be used for the subscription.               |
| `serviceIndex?`   | `number` | (Optional) The index of the service to be used for the subscription. |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)\<[`OrderProgressStep`](../enums/OrderProgressStep.md), `string`\>

A `SubscribablePromise` that resolves to the progress of the order or rejects with an error message.

**`Throws`**

If Web3 is not connected.

**`Throws`**

If there is an error ordering the subscription.

#### Defined in

[src/nevermined/NvmApp.ts:587](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L587)

---

### orderSubscriptionAsync

▸ **orderSubscriptionAsync**(`subscriptionDid`, `agreementId?`): `Promise`\<[`OperationResult`](../interfaces/OperationResult.md)\>

Orders a subscription and claim asynchronously.

#### Parameters

| Name              | Type     | Description                         |
| :---------------- | :------- | :---------------------------------- |
| `subscriptionDid` | `string` | The DID of the subscription.        |
| `agreementId?`    | `string` | The ID of the agreement (optional). |

#### Returns

`Promise`\<[`OperationResult`](../interfaces/OperationResult.md)\>

A Promise that resolves to an OperationResult object.

**`Throws`**

If Web3 is not connected.

**`Throws`**

If there is an error ordering the subscription.

#### Defined in

[src/nevermined/NvmApp.ts:528](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L528)

---

### registerFileAsset

▸ **registerFileAsset**(`metadata`, `subscriptionDid`, `costInCredits?`, `nftContractAddress`): [`SubscribablePromise`](SubscribablePromise.md)\<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

Registers a file asset by creating a new DDO (Decentralized Data Object) on the network.

#### Parameters

| Name                 | Type                                    | Description                                                                     |
| :------------------- | :-------------------------------------- | :------------------------------------------------------------------------------ |
| `metadata`           | [`MetaData`](../interfaces/MetaData.md) | The metadata of the file asset.                                                 |
| `subscriptionDid`    | `string`                                | The subscription DID (Decentralized Identifier) associated with the file asset. |
| `costInCredits`      | `bigint`                                | The cost of the file asset in credits (default is 1).                           |
| `nftContractAddress` | `string`                                | The address of the NFT contract associated with the file asset.                 |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)\<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

A `SubscribablePromise` that resolves to a `DDO` (Decentralized Data Object) representing the registered file asset.

**`Throws`**

If the Web3 connection is not established.

**`Throws`**

If the file asset metadata is not valid.

#### Defined in

[src/nevermined/NvmApp.ts:812](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L812)

---

### registerFileAssetAsync

▸ **registerFileAssetAsync**(`metadata`, `subscriptionDid`, `costInCredits?`, `nftContractAddress`): `Promise`\<[`DDO`](DDO.md)\>

Registers a file asset asynchronously.

#### Parameters

| Name                 | Type                                    | Description                        |
| :------------------- | :-------------------------------------- | :--------------------------------- |
| `metadata`           | [`MetaData`](../interfaces/MetaData.md) | The metadata of the file asset.    |
| `subscriptionDid`    | `string`                                | The subscription DID.              |
| `costInCredits`      | `bigint`                                | The cost in credits (default: 1n). |
| `nftContractAddress` | `string`                                | -                                  |

#### Returns

`Promise`\<[`DDO`](DDO.md)\>

A Promise that resolves to the registered DDO (Decentralized Data Object).

#### Defined in

[src/nevermined/NvmApp.ts:857](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L857)

---

### registerServiceAsset

▸ **registerServiceAsset**(`metadata`, `subscriptionDid`, `costInCredits?`, `minCreditsToCharge?`, `maxCreditsToCharge?`, `nftContractAddress`): [`SubscribablePromise`](SubscribablePromise.md)\<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

Registers a service asset.

#### Parameters

| Name                 | Type                                    | Description                                                     |
| :------------------- | :-------------------------------------- | :-------------------------------------------------------------- |
| `metadata`           | [`MetaData`](../interfaces/MetaData.md) | The metadata of the asset.                                      |
| `subscriptionDid`    | `string`                                | The subscription DID.                                           |
| `costInCredits`      | `bigint`                                | The cost in credits (default: 1).                               |
| `minCreditsToCharge` | `bigint`                                | The minimum credits required to charge (default: 1).            |
| `maxCreditsToCharge` | `bigint`                                | The maximum credits to charge (default: 1).                     |
| `nftContractAddress` | `string`                                | The address of the NFT contract associated with the file asset. |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)\<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

A promise that resolves to the progress steps and the registered DDO.

**`Throws`**

If Web3 is not connected.

**`Throws`**

If the metadata validation fails.

#### Defined in

[src/nevermined/NvmApp.ts:741](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L741)

---

### registerServiceAssetAsync

▸ **registerServiceAssetAsync**(`metadata`, `subscriptionDid`, `costInCredits?`, `minCreditsToCharge?`, `maxCreditsToCharge?`, `nftContractAddress`): `Promise`\<[`DDO`](DDO.md)\>

#### Parameters

| Name                 | Type                                    |
| :------------------- | :-------------------------------------- |
| `metadata`           | [`MetaData`](../interfaces/MetaData.md) |
| `subscriptionDid`    | `string`                                |
| `costInCredits`      | `bigint`                                |
| `minCreditsToCharge` | `bigint`                                |
| `maxCreditsToCharge` | `bigint`                                |
| `nftContractAddress` | `string`                                |

#### Returns

`Promise`\<[`DDO`](DDO.md)\>

#### Defined in

[src/nevermined/NvmApp.ts:783](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L783)

---

### updateAsset

▸ **updateAsset**(`did`, `metadata`): [`SubscribablePromise`](SubscribablePromise.md)\<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

Updates the metadata of an asset.

#### Parameters

| Name       | Type                                    | Description                                      |
| :--------- | :-------------------------------------- | :----------------------------------------------- |
| `did`      | `string`                                | The decentralized identifier (DID) of the asset. |
| `metadata` | [`MetaData`](../interfaces/MetaData.md) | The updated metadata for the asset.              |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)\<[`UpdateProgressStep`](../enums/UpdateProgressStep.md), [`DDO`](DDO.md)\>

A `SubscribablePromise` that resolves to the updated `DDO` (Decentralized Data Object).

**`Throws`**

If Web3 is not connected. Call the `connect` method first.

#### Defined in

[src/nevermined/NvmApp.ts:493](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L493)

---

### updateAssetAsync

▸ **updateAssetAsync**(`did`, `metadata`): `Promise`\<[`DDO`](DDO.md)\>

Updates the asset with the specified DID using the provided metadata.

#### Parameters

| Name       | Type                                    | Description                                                |
| :--------- | :-------------------------------------- | :--------------------------------------------------------- |
| `did`      | `string`                                | The DID (Decentralized Identifier) of the asset to update. |
| `metadata` | [`MetaData`](../interfaces/MetaData.md) | The updated metadata for the asset.                        |

#### Returns

`Promise`\<[`DDO`](DDO.md)\>

A Promise that resolves to the updated DDO (Decentralized Data Object) of the asset.

#### Defined in

[src/nevermined/NvmApp.ts:515](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L515)

---

### validateFileAssetMetadata

▸ **validateFileAssetMetadata**(`_susbcriptionMetadata`): [`MetadataValidationResults`](../interfaces/MetadataValidationResults.md)

#### Parameters

| Name                    | Type                                    |
| :---------------------- | :-------------------------------------- |
| `_susbcriptionMetadata` | [`MetaData`](../interfaces/MetaData.md) |

#### Returns

[`MetadataValidationResults`](../interfaces/MetadataValidationResults.md)

#### Defined in

[src/nevermined/NvmApp.ts:941](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L941)

---

### validateServiceAssetMetadata

▸ **validateServiceAssetMetadata**(`_susbcriptionMetadata`): [`MetadataValidationResults`](../interfaces/MetadataValidationResults.md)

#### Parameters

| Name                    | Type                                    |
| :---------------------- | :-------------------------------------- |
| `_susbcriptionMetadata` | [`MetaData`](../interfaces/MetaData.md) |

#### Returns

[`MetadataValidationResults`](../interfaces/MetadataValidationResults.md)

#### Defined in

[src/nevermined/NvmApp.ts:934](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L934)

---

### validateSubscription

▸ **validateSubscription**(`metadata`, `price`, `subscriptionType`): [`MetadataValidationResults`](../interfaces/MetadataValidationResults.md)

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `metadata`         | [`MetaData`](../interfaces/MetaData.md)            |
| `price`            | [`AssetPrice`](AssetPrice.md)                      |
| `subscriptionType` | [`SubscriptionType`](../enums/SubscriptionType.md) |

#### Returns

[`MetadataValidationResults`](../interfaces/MetadataValidationResults.md)

#### Defined in

[src/nevermined/NvmApp.ts:908](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L908)

---

### getConfigFromTagName

▸ **getConfigFromTagName**(`appEnv`): [`NeverminedOptions`](NeverminedOptions.md)

#### Parameters

| Name     | Type                                                   |
| :------- | :----------------------------------------------------- |
| `appEnv` | [`NVMAppEnvironments`](../enums/NVMAppEnvironments.md) |

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Defined in

[src/nevermined/NvmApp.ts:945](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L945)

---

### getInstance

▸ **getInstance**(`appEnv`, `config?`): `Promise`\<[`NvmApp`](NvmApp.md)\>

Returns an instance of the NvmApp class.

#### Parameters

| Name      | Type                                                                                                          | Description                                             |
| :-------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------ |
| `appEnv`  | [`NVMAppEnvironments`](../enums/NVMAppEnvironments.md)                                                        | The environment for the NvmApp instance.                |
| `config?` | `Partial`\<[`NeverminedOptions`](NeverminedOptions.md) \| [`NeverminedAppOptions`](NeverminedAppOptions.md)\> | Optional configuration options for the NvmApp instance. |

#### Returns

`Promise`\<[`NvmApp`](NvmApp.md)\>

A Promise that resolves to an instance of the NvmApp class.

#### Defined in

[src/nevermined/NvmApp.ts:114](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L114)

---

### switchConfigBetweenEnvs

▸ **switchConfigBetweenEnvs**(`appEnv`): [`NeverminedOptions`](NeverminedOptions.md)

#### Parameters

| Name     | Type                                                   |
| :------- | :----------------------------------------------------- |
| `appEnv` | [`NVMAppEnvironments`](../enums/NVMAppEnvironments.md) |

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Defined in

[src/nevermined/NvmApp.ts:950](https://github.com/nevermined-io/sdk-js/blob/13ea3fecbb7390165ec2f4641a0fe92a7537a21d/src/nevermined/NvmApp.ts#L950)
