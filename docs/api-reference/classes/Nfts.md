[@nevermined-io/nevermined-sdk-js](../code-reference.md) / Nfts

# Class: Nfts

Nevermined Nft module

## Hierarchy

- `Instantiable`

  ↳ **`Nfts`**

## Table of contents

### Constructors

- [constructor](Nfts.md#constructor)

### Accessors

- [artifactsFolder](Nfts.md#artifactsfolder)
- [config](Nfts.md#config)
- [instanceConfig](Nfts.md#instanceconfig)
- [instantiableConfig](Nfts.md#instantiableconfig)
- [logger](Nfts.md#logger)
- [nevermined](Nfts.md#nevermined)
- [web3](Nfts.md#web3)

### Methods

- [access](Nfts.md#access)
- [addresses](Nfts.md#addresses)
- [balance](Nfts.md#balance)
- [burn](Nfts.md#burn)
- [buySecondaryMarketNft](Nfts.md#buysecondarymarketnft)
- [checkExists](Nfts.md#checkexists)
- [create](Nfts.md#create)
- [create721](Nfts.md#create721)
- [createWithRoyalties](Nfts.md#createwithroyalties)
- [details](Nfts.md#details)
- [downloadFiles](Nfts.md#downloadfiles)
- [findSigner](Nfts.md#findsigner)
- [getNftContractAddress](Nfts.md#getnftcontractaddress)
- [listOnSecondaryMarkets](Nfts.md#listonsecondarymarkets)
- [mint](Nfts.md#mint)
- [order](Nfts.md#order)
- [order721](Nfts.md#order721)
- [ownerOf](Nfts.md#ownerof)
- [release721Rewards](Nfts.md#release721rewards)
- [releaseRewards](Nfts.md#releaserewards)
- [releaseSecondaryMarketRewards](Nfts.md#releasesecondarymarketrewards)
- [setApprovalForAll](Nfts.md#setapprovalforall)
- [setInstanceConfig](Nfts.md#setinstanceconfig)
- [transfer](Nfts.md#transfer)
- [transfer721](Nfts.md#transfer721)
- [transferForDelegate](Nfts.md#transferfordelegate)
- [addressesStatic](Nfts.md#addressesstatic)
- [findSignerStatic](Nfts.md#findsignerstatic)
- [getInstance](Nfts.md#getinstance)
- [setInstanceConfig](Nfts.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Nfts**()

#### Inherited from

Instantiable.constructor

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L63)

## Methods

### access

▸ **access**(`did`, `consumer`, `destination?`, `index?`, `agreementId?`): `Promise`<`boolean`\>

Access the files associated with an NFT.

**`Remarks`**

This function will call the gateway that will check if all the access conditions where fulfilled
before providing the files.

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `did` | `string` | `undefined` | The Decentralized Identifier of the NFT asset. |
| `consumer` | [`Account`](Account.md) | `undefined` | The NFT holder account. |
| `destination?` | `string` | `undefined` | The download destination for the files. |
| `index?` | `number` | `undefined` | - |
| `agreementId` | `string` | `'0x'` | - |

#### Returns

`Promise`<`boolean`\>

true if the access was successful.

#### Defined in

[src/nevermined/Nfts.ts:618](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L618)

___

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Instantiable.addresses

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L129)

___

### balance

▸ **balance**(`did`, `account`): `Promise`<`default`\>

Get the NFT balance for a particular did

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The Decentralized Identifier of the NFT asset. |
| `account` | [`Account`](Account.md) | The account to check the balance of. |

#### Returns

`Promise`<`default`\>

The amount of NFTs owned by the account.

#### Defined in

[src/nevermined/Nfts.ts:645](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L645)

___

### burn

▸ **burn**(`did`, `nftAmount`, `publisher`, `params?`): `Promise`<`ContractReceipt`\>

Burn NFTs associated with an asset.

**`Remarks`**

The publisher can only burn NFTs that it owns. NFTs that were already transferred cannot be burned by the publisher.

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The Decentralized Identifier of the NFT asset. |
| `nftAmount` | `default` | The amount of NFTs to burn. |
| `publisher` | [`Account`](Account.md) | The account of the publisher of the NFT. |
| `params?` | `TxParameters` | Optional transaction parameters. |

#### Returns

`Promise`<`ContractReceipt`\>

The ethers.ContractReceipt

#### Defined in

[src/nevermined/Nfts.ts:256](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L256)

___

### buySecondaryMarketNft

▸ **buySecondaryMarketNft**(`consumer`, `nftAmount?`, `agreementIdSeed`, `params?`): `Promise`<`boolean`\>

Buys a number of listed NFTs on secondary markets.

**`Example`**

```ts
// TODO
```

**`Throws`**

NFTError
Thrown if there is an error buying the NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `consumer` | [`Account`](Account.md) | The account of the buyer/consumer. |
| `nftAmount` | `default` | The number of assets to buy. 1 by default. |
| `agreementIdSeed` | `string` | - |
| `params?` | `TxParameters` | - |

#### Returns

`Promise`<`boolean`\>

true if the buy was successful.

#### Defined in

[src/nevermined/Nfts.ts:928](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L928)

___

### checkExists

▸ `Protected` **checkExists**(`address`): `Promise`<`boolean`\>

Returns true of contract exists else it throws.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

true if the contract exists.

#### Inherited from

Instantiable.checkExists

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L44)

___

### create

▸ **create**(`metadata`, `publisher`, `cap`, `royaltyAttributes`, `assetRewards`, `nftAmount?`, `erc20TokenAddress?`, `preMint?`, `nftMetadata?`, `appId?`, `txParams?`): [`SubscribablePromise`](utils.SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

Create a new NFT Nevermined NFT.

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `metadata` | [`MetaData`](../interfaces/MetaData.md) | The metadata associated with the NFT. |
| `publisher` | [`Account`](Account.md) | The account of the creator od the NFT. |
| `cap` | `default` | The max number of nfts. |
| `royaltyAttributes` | `RoyaltyAttributes` | The royalties associated with the NFT. |
| `assetRewards` | `default` | The sales reward distribution. |
| `nftAmount` | `default` | The amount of NFTs that an address needs to hold in order to access the DID's protected assets. Leave it undefined and it will default to 1. |
| `erc20TokenAddress?` | `string` | The ERC-20 Token used to price the NFT. |
| `preMint?` | `boolean` | Set to true to mint _nftAmount_ during creation. |
| `nftMetadata?` | `string` | Url to the NFT metadata. |
| `appId?` | `string` | The id of the application creating the NFT. |
| `txParams?` | `TxParameters` | Optional transaction parameters |

#### Returns

[`SubscribablePromise`](utils.SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

The newly registered [DDO](DDO.md).

#### Defined in

[src/nevermined/Nfts.ts:64](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L64)

___

### create721

▸ **create721**(`metadata`, `publisher`, `assetRewards`, `nftTokenAddress`, `erc20TokenAddress?`, `royaltyAttributes?`, `nftMetadata?`, `nftTransfer?`, `duration?`, `appId?`, `txParams?`): [`SubscribablePromise`](utils.SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

Create a new Nevermined NFT-721.

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `metadata` | [`MetaData`](../interfaces/MetaData.md) | `undefined` | The metadata associated with the NFT. |
| `publisher` | [`Account`](Account.md) | `undefined` | The account of the creator od the NFT. |
| `assetRewards` | `default` | `undefined` | The sales reward distribution. |
| `nftTokenAddress` | `string` | `undefined` | The address of the ERC-721 contract |
| `erc20TokenAddress?` | `string` | `undefined` | The ERC-20 Token used to price the NFT. |
| `royaltyAttributes?` | `RoyaltyAttributes` | `undefined` | The royalties associated with the NFT. |
| `nftMetadata?` | `string` | `undefined` | Url to the NFT metadata. |
| `nftTransfer` | `boolean` | `true` | TODO |
| `duration` | `number` | `0` | TODO |
| `appId?` | `string` | `undefined` | Id of the application creating this NFT. |
| `txParams?` | `TxParameters` | `undefined` | Optional transaction parameters |

#### Returns

[`SubscribablePromise`](utils.SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

The newly registered [DDO](DDO.md).

#### Defined in

[src/nevermined/Nfts.ts:173](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L173)

___

### createWithRoyalties

▸ **createWithRoyalties**(`metadata`, `publisher`, `cap`, `royaltyAttributes`, `assetRewards`, `nftAmount?`, `erc20TokenAddress?`, `preMint?`, `nftMetadata?`, `nftType?`, `appId?`, `txParams?`): [`SubscribablePromise`](utils.SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

Create a new Nevermined NFT with royalties.

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `metadata` | [`MetaData`](../interfaces/MetaData.md) | `undefined` | The metadata associated with the NFT. |
| `publisher` | [`Account`](Account.md) | `undefined` | The account of the creator od the NFT. |
| `cap` | `default` | `undefined` | The max number of nfts. |
| `royaltyAttributes` | `RoyaltyAttributes` | `undefined` | The royalties associated with the NFT. |
| `assetRewards` | `default` | `undefined` | The sales reward distribution. |
| `nftAmount` | `default` | `undefined` | The amount of NFTs that an address needs to hold in order to access the DID's protected assets. Leave it undefined and it will default to 1. |
| `erc20TokenAddress?` | `string` | `undefined` | The ERC-20 Token used to price the NFT. |
| `preMint?` | `boolean` | `undefined` | Set to true to mint _nftAmount_ during creation. |
| `nftMetadata?` | `string` | `undefined` | Url to the NFT metadata. |
| `nftType` | `NeverminedNFTType` | `NeverminedNFT1155Type.nft1155` | - |
| `appId?` | `string` | `undefined` | The id of the application creating the NFT. |
| `txParams?` | `TxParameters` | `undefined` | Optional transaction parameters |

#### Returns

[`SubscribablePromise`](utils.SubscribablePromise.md)<[`CreateProgressStep`](../enums/CreateProgressStep.md), [`DDO`](DDO.md)\>

The newly registered [DDO](DDO.md).

#### Defined in

[src/nevermined/Nfts.ts:119](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L119)

___

### details

▸ **details**(`did`): `Promise`<{ `blockNumberUpdated`: `number` ; `lastChecksum`: `any` ; `lastUpdatedBy`: `any` ; `mintCap`: `number` ; `nftSupply`: `number` ; `owner`: `any` ; `providers`: `any` ; `royalties`: `number` ; `royaltyScheme`: `RoyaltyKind` ; `url`: `any`  }\>

Get the details of an NFT

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The Decentralized Identifier of the NFT asset. |

#### Returns

`Promise`<{ `blockNumberUpdated`: `number` ; `lastChecksum`: `any` ; `lastUpdatedBy`: `any` ; `mintCap`: `number` ; `nftSupply`: `number` ; `owner`: `any` ; `providers`: `any` ; `royalties`: `number` ; `royaltyScheme`: `RoyaltyKind` ; `url`: `any`  }\>

The details of the NFT.

#### Defined in

[src/nevermined/Nfts.ts:693](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L693)

___

### downloadFiles

▸ `Private` **downloadFiles**(`agreementId`, `ddo`, `consumer`, `destination?`, `index?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `consumer` | [`Account`](Account.md) |
| `destination?` | `string` |
| `index?` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/nevermined/Nfts.ts:752](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L752)

___

### findSigner

▸ **findSigner**(`from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

Instantiable.findSigner

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L105)

___

### getNftContractAddress

▸ **getNftContractAddress**(`ddo`): `string` \| `number` \| `string`[]

Get the NFT contract address associated with a Nevermined asset.

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ddo` | [`DDO`](DDO.md) | The DDO of the asset. |

#### Returns

`string` \| `number` \| `string`[]

The NFT contract address.

#### Defined in

[src/nevermined/Nfts.ts:739](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L739)

___

### listOnSecondaryMarkets

▸ **listOnSecondaryMarkets**(`ddo`, `assetRewards`, `nftAmount`, `provider`, `token`, `owner`): `Promise`<`string`\>

After purchase re-list an NFT to enable secondary market sales.

**`Example`**

```ts
// TODO
```

**`Throws`**

NFTError
Thrown if there is an error listing the NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ddo` | [`DDO`](DDO.md) | The DDO of the asset. |
| `assetRewards` | `default` | The current setup of asset rewards. |
| `nftAmount` | `default` | The number of NFTs put up for secondary sale. |
| `provider` | `string` | The address that will be the provider of the secondary sale. |
| `token` | `default` | - |
| `owner` | `string` | The account of the current owner. |

#### Returns

`Promise`<`string`\>

the agreementId of the secondary sale.

#### Defined in

[src/nevermined/Nfts.ts:853](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L853)

___

### mint

▸ **mint**(`did`, `nftAmount`, `publisher`, `params?`): `Promise`<`ContractReceipt`\>

Mint NFTs associated with an asset.

**`Remarks`**

This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The Decentralized Identifier of the NFT asset. |
| `nftAmount` | `default` | The amount of NFTs to mint. |
| `publisher` | [`Account`](Account.md) | The account of the publisher of the NFT. |
| `params?` | `TxParameters` | Optional transaction parameters. |

#### Returns

`Promise`<`ContractReceipt`\>

The ethers.ContractReceipt

#### Defined in

[src/nevermined/Nfts.ts:224](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L224)

___

### order

▸ **order**(`did`, `nftAmount`, `consumer`, `txParams?`): [`SubscribablePromise`](utils.SubscribablePromise.md)<[`OrderProgressStep`](../enums/utils.OrderProgressStep.md), `string`\>

Buy NFTs.

**`Remarks`**

This will lock the funds of the consumer in escrow pending the transfer of the NFTs
from the publisher.

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The Decentralized Identifier of the NFT asset. |
| `nftAmount` | `default` | The amount of NFTs to buy. |
| `consumer` | [`Account`](Account.md) | The account of the NFT buyer. |
| `txParams?` | `TxParameters` | Optional transaction parameters. |

#### Returns

[`SubscribablePromise`](utils.SubscribablePromise.md)<[`OrderProgressStep`](../enums/utils.OrderProgressStep.md), `string`\>

The agreement ID.

#### Defined in

[src/nevermined/Nfts.ts:291](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L291)

___

### order721

▸ **order721**(`did`, `consumer`, `txParams?`): [`SubscribablePromise`](utils.SubscribablePromise.md)<[`OrderProgressStep`](../enums/utils.OrderProgressStep.md), `string`\>

Buy NFT-721.

**`Remarks`**

This will lock the funds of the consumer in escrow pending the transfer of the NFTs
from the publisher.

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The Decentralized Identifier of the NFT asset. |
| `consumer` | [`Account`](Account.md) | The account of the NFT buyer. |
| `txParams?` | `TxParameters` | Optional transaction parameters. |

#### Returns

[`SubscribablePromise`](utils.SubscribablePromise.md)<[`OrderProgressStep`](../enums/utils.OrderProgressStep.md), `string`\>

The agreement ID.

#### Defined in

[src/nevermined/Nfts.ts:340](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L340)

___

### ownerOf

▸ **ownerOf**(`did`, `nftTokenAddress`, `agreementId?`): `Promise`<`string`\>

Get the owner of the NFT

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The Decentralized identifier of the NFT asset. |
| `nftTokenAddress` | `string` | The address of the ERC-721 contract. |
| `agreementId?` | `string` | The NFT sales agreement id. |

#### Returns

`Promise`<`string`\>

The address of the NFT owner.

#### Defined in

[src/nevermined/Nfts.ts:663](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L663)

___

### release721Rewards

▸ **release721Rewards**(`agreementId`, `did`, `publisher`, `txParams?`): `Promise`<`boolean`\>

Release the funds from escrow.

**`Remarks`**

A publisher is able to release the funds put on escrow by the consumer after transferring the NFTs.

**`Example`**

```ts
// TODO
```

**`Throws`**

NFTError
Thrown if there is an error releasing the rewards.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | The NFT sales agreement id. |
| `did` | `string` | The Decentralized identifier of the NFT asset. |
| `publisher` | [`Account`](Account.md) | The current owner of the NFTs. |
| `txParams?` | `TxParameters` | Optional transaction parameters. |

#### Returns

`Promise`<`boolean`\>

true if the funds release was successful.

#### Defined in

[src/nevermined/Nfts.ts:574](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L574)

___

### releaseRewards

▸ **releaseRewards**(`agreementId`, `did`, `nftAmount`, `publisher`, `txParams?`): `Promise`<`boolean`\>

Release the funds from escrow.

**`Remarks`**

A publisher is able to release the funds put on escrow by the consumer after transferring the NFTs.

**`Example`**

```ts
// TODO
```

**`Throws`**

NFTError
Thrown if there is an error releasing the rewards

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | The NFT sales agreement id. |
| `did` | `string` | The Decentralized identifier of the NFT asset. |
| `nftAmount` | `default` | The amount of NFTs to transfer. |
| `publisher` | [`Account`](Account.md) | The current owner of the NFTs. |
| `txParams?` | `TxParameters` | Optional transaction parameters. |

#### Returns

`Promise`<`boolean`\>

true if the funds release was successful.

#### Defined in

[src/nevermined/Nfts.ts:526](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L526)

___

### releaseSecondaryMarketRewards

▸ **releaseSecondaryMarketRewards**(`owner`, `consumer`, `agreementIdSeed`, `params?`): `Promise`<`boolean`\>

Used to release the secondary market NFT & the locked rewards.

**`Example`**

```ts
// TODO
```

**`Throws`**

NFTError
Thrown if there is an error releasing the rewards.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`Account`](Account.md) | The owner account. |
| `consumer` | [`Account`](Account.md) | - |
| `agreementIdSeed` | `string` | - |
| `params?` | `TxParameters` | - |

#### Returns

`Promise`<`boolean`\>

true if the transaction was successful.

#### Defined in

[src/nevermined/Nfts.ts:991](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L991)

___

### setApprovalForAll

▸ **setApprovalForAll**(`operatorAddress`, `approved`, `from`): `Promise`<`ContractReceipt`\>

Enable or disable NFT transfer rights for an operator.

**`See`**

[transferForDelegate](Nfts.md#transferfordelegate)

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operatorAddress` | `string` | The address that of the operator we want to give transfer rights to. |
| `approved` | `boolean` | Give or remove transfer rights from the operator. |
| `from` | [`Account`](Account.md) | The account that wants to give transfer rights to the operator. |

#### Returns

`Promise`<`ContractReceipt`\>

The ethers.ContractReceipt

#### Defined in

[src/nevermined/Nfts.ts:822](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L822)

___

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

Instantiable.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L171)

___

### transfer

▸ **transfer**(`agreementId`, `did`, `nftAmount`, `publisher`, `txParams?`): `Promise`<`boolean`\>

Transfer NFTs to the consumer.

**`Remarks`**

A publisher/provider will check if the consumer put the funds in escrow and
execute the transfer in order to be able to release the rewards.

**`Example`**

```ts
// TODO
```

**`Throws`**

NFTError
Thrown if there is an error transferring the NFT

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | The NFT sales agreement id. |
| `did` | `string` | The Decentralized identifier of the NFT asset. |
| `nftAmount` | `default` | The number of NFTs to transfer. |
| `publisher` | [`Account`](Account.md) | The current owner of the NFTs. |
| `txParams?` | `TxParameters` | Optional transaction parameters. |

#### Returns

`Promise`<`boolean`\>

true if the transfer was successful.

#### Defined in

[src/nevermined/Nfts.ts:394](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L394)

___

### transfer721

▸ **transfer721**(`agreementId`, `did`, `publisher`, `txParams?`): `Promise`<`boolean`\>

Transfer NFT-721 to the consumer.

**`Remarks`**

A publisher/provider will check if the consumer put the funds in escrow and
execute the transfer in order to be able to release the rewards.

**`Example`**

```ts
// TODO
```

**`Throws`**

NFTError
Thrown if there is an error transferring the NFT

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | The NFT sales agreement id. |
| `did` | `string` | The Decentralized identifier of the NFT asset. |
| `publisher` | [`Account`](Account.md) | The current owner of the NFTs. |
| `txParams?` | `TxParameters` | Optional transaction parameters. |

#### Returns

`Promise`<`boolean`\>

true if the transfer was successful.

#### Defined in

[src/nevermined/Nfts.ts:481](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L481)

___

### transferForDelegate

▸ **transferForDelegate**(`agreementId`, `nftHolder`, `nftReceiver`, `nftAmount`, `ercType?`): `Promise`<`boolean`\>

Asks the gateway to transfer the NFT on behalf of the publisher.

**`Remarks`**

This is useful when the consumer does not want to wait for the publisher
to transfer the NFT once the payment is made. Assuming the publisher delegated
transfer permissions to the gateway.

One example would be a marketplace where the user wants to get access to the NFT
as soon as the payment is made

**`Example`**

```ts
// TODO
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `agreementId` | `string` | `undefined` | The NFT sales agreement id. |
| `nftHolder` | `string` | `undefined` | The address of the current owner of the NFT. |
| `nftReceiver` | `string` | `undefined` | The address where the NFT should be transferred. |
| `nftAmount` | `default` | `undefined` | The amount of NFTs to transfer. |
| `ercType` | `ERCType` | `1155` | The Type of the NFT ERC (1155 or 721). |

#### Returns

`Promise`<`boolean`\>

true if the transfer was successful.

#### Defined in

[src/nevermined/Nfts.ts:443](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L443)

___

### addressesStatic

▸ `Static` **addressesStatic**(`config`, `web3`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Instantiable.addressesStatic

#### Defined in

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L142)

___

### findSignerStatic

▸ `Static` **findSignerStatic**(`config`, `web3`, `from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

Instantiable.findSignerStatic

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`Nfts`](Nfts.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`Nfts`](Nfts.md)\>

#### Overrides

Instantiable.getInstance

#### Defined in

[src/nevermined/Nfts.ts:36](https://github.com/nevermined-io/sdk-js/blob/a201882/src/nevermined/Nfts.ts#L36)

___

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Instantiable`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` |
| `instantiableConfig` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

Instantiable.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/a201882/src/Instantiable.abstract.ts#L162)
