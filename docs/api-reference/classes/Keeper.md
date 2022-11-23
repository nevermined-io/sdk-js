[@nevermined-io/nevermined-sdk-js](../code-reference.md) / Keeper

# Class: Keeper

Interface with Nevermined contracts.
Nevermined Keeper implementation where we put the following modules together:
- TCRs: users create challenges and resolve them through voting to maintain registries.
- Nevermined Tokens: the intrinsic tokens circulated inside Nevermined network, which is used in the voting of TCRs.
- Marketplace: the core marketplace where people can transact with each other with Nevermined tokens.

## Hierarchy

- `Instantiable`

  ↳ **`Keeper`**

## Table of contents

### Constructors

- [constructor](Keeper.md#constructor)

### Properties

- [agreementStoreManager](Keeper.md#agreementstoremanager)
- [conditionStoreManager](Keeper.md#conditionstoremanager)
- [conditions](Keeper.md#conditions)
- [conditionsList](Keeper.md#conditionslist)
- [connected](Keeper.md#connected)
- [didRegistry](Keeper.md#didregistry)
- [dispenser](Keeper.md#dispenser)
- [instances](Keeper.md#instances)
- [network](Keeper.md#network)
- [nftUpgradeable](Keeper.md#nftupgradeable)
- [nvmConfig](Keeper.md#nvmconfig)
- [rewardsDistributor](Keeper.md#rewardsdistributor)
- [royalties](Keeper.md#royalties)
- [templateList](Keeper.md#templatelist)
- [templateStoreManager](Keeper.md#templatestoremanager)
- [templates](Keeper.md#templates)
- [token](Keeper.md#token)
- [utils](Keeper.md#utils)
- [version](Keeper.md#version)

### Accessors

- [artifactsFolder](Keeper.md#artifactsfolder)
- [config](Keeper.md#config)
- [instanceConfig](Keeper.md#instanceconfig)
- [instantiableConfig](Keeper.md#instantiableconfig)
- [logger](Keeper.md#logger)
- [nevermined](Keeper.md#nevermined)
- [web3](Keeper.md#web3)

### Methods

- [addresses](Keeper.md#addresses)
- [checkExists](Keeper.md#checkexists)
- [findSigner](Keeper.md#findsigner)
- [getAccessTemplateByName](Keeper.md#getaccesstemplatebyname)
- [getAllInstances](Keeper.md#getallinstances)
- [getConditionByAddress](Keeper.md#getconditionbyaddress)
- [getNetworkId](Keeper.md#getnetworkid)
- [getNetworkName](Keeper.md#getnetworkname)
- [getTemplateByAddress](Keeper.md#gettemplatebyaddress)
- [getTemplateByName](Keeper.md#gettemplatebyname)
- [init](Keeper.md#init)
- [setInstanceConfig](Keeper.md#setinstanceconfig)
- [addressesStatic](Keeper.md#addressesstatic)
- [findSignerStatic](Keeper.md#findsignerstatic)
- [getInstance](Keeper.md#getinstance)
- [setInstanceConfig](Keeper.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Keeper**()

#### Inherited from

Instantiable.constructor

## Properties

### agreementStoreManager

• **agreementStoreManager**: `AgreementStoreManager`

Template store manager smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:316](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L316)

___

### conditionStoreManager

• **conditionStoreManager**: `ConditionStoreManager`

Template store manager smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:321](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L321)

___

### conditions

• **conditions**: `Object`

Conditions instances.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `aaveBorrowCondition` | [`AaveBorrowCondition`](conditions.AaveBorrowCondition.md) |
| `aaveCollateralDepositCondition` | [`AaveCollateralDepositCondition`](conditions.AaveCollateralDepositCondition.md) |
| `aaveCollateralWithdrawCondition` | [`AaveCollateralWithdrawCondition`](conditions.AaveCollateralWithdrawCondition.md) |
| `aaveRepayCondition` | [`AaveRepayCondition`](conditions.AaveRepayCondition.md) |
| `accessCondition` | [`AccessCondition`](conditions.AccessCondition.md) |
| `computeExecutionCondition` | [`ComputeExecutionCondition`](conditions.ComputeExecutionCondition.md) |
| `distributeNftCollateralCondition` | [`DistributeNFTCollateralCondition`](conditions.DistributeNFTCollateralCondition.md) |
| `escrowPaymentCondition` | [`EscrowPaymentCondition`](conditions.EscrowPaymentCondition.md) |
| `lockPaymentCondition` | [`LockPaymentCondition`](conditions.LockPaymentCondition.md) |
| `nft721HolderCondition` | [`NFT721HolderCondition`](conditions.NFT721HolderCondition.md) |
| `nft721LockCondition` | [`NFT721LockCondition`](conditions.NFT721LockCondition.md) |
| `nftAccessCondition` | [`NFTAccessCondition`](conditions.NFTAccessCondition.md) |
| `nftHolderCondition` | [`NFTHolderCondition`](conditions.NFTHolderCondition.md) |
| `nftLockCondition` | [`NFTLockCondition`](conditions.NFTLockCondition.md) |
| `transferDidOwnershipCondition` | [`TransferDIDOwnershipCondition`](conditions.TransferDIDOwnershipCondition.md) |
| `transferNft721Condition` | [`TransferNFT721Condition`](conditions.TransferNFT721Condition.md) |
| `transferNftCondition` | [`TransferNFTCondition`](conditions.TransferNFTCondition.md) |

#### Defined in

[src/keeper/Keeper.ts:326](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L326)

___

### conditionsList

• **conditionsList**: [`ConditionSmall`](conditions.ConditionSmall.md)[]

#### Defined in

[src/keeper/Keeper.ts:346](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L346)

___

### connected

• **connected**: `boolean` = `false`

Is connected to the correct network or not.

#### Defined in

[src/keeper/Keeper.ts:281](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L281)

___

### didRegistry

• **didRegistry**: `default`

DID registry smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:301](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L301)

___

### dispenser

• **dispenser**: `default`

Market smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:291](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L291)

___

### instances

• `Private` **instances**: `Object`

#### Index signature

▪ [contractRef: `string`]: `ContractBase` & `any`

#### Defined in

[src/keeper/Keeper.ts:392](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L392)

___

### network

• `Protected` **network**: `Object`

Network id loaded from web3

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `number` |
| `loading` | `boolean` |

#### Defined in

[src/keeper/Keeper.ts:385](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L385)

___

### nftUpgradeable

• **nftUpgradeable**: `NFTUpgradeable`

NFT upgradeable smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:306](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L306)

___

### nvmConfig

• **nvmConfig**: `default`

Nevermined Config smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:296](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L296)

___

### rewardsDistributor

• **rewardsDistributor**: `RewardsDistributor`

#### Defined in

[src/keeper/Keeper.ts:368](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L368)

___

### royalties

• **royalties**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `curve` | `CurveRoyalties` |
| `standard` | `StandardRoyalties` |

#### Defined in

[src/keeper/Keeper.ts:363](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L363)

___

### templateList

• **templateList**: `GenericAccess`[]

#### Defined in

[src/keeper/Keeper.ts:347](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L347)

___

### templateStoreManager

• **templateStoreManager**: `TemplateStoreManager`

Template store manager smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:311](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L311)

___

### templates

• **templates**: `Object`

Templates instances.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `aaveCreditTemplate` | [`AaveCreditTemplate`](templates.AaveCreditTemplate.md) |
| `accessTemplate` | [`AccessTemplate`](templates.AccessTemplate.md) |
| `didSalesTemplate` | [`DIDSalesTemplate`](templates.DIDSalesTemplate.md) |
| `escrowComputeExecutionTemplate` | [`EscrowComputeExecutionTemplate`](templates.EscrowComputeExecutionTemplate.md) |
| `nft721AccessTemplate` | [`NFT721AccessTemplate`](templates.NFT721AccessTemplate.md) |
| `nft721SalesTemplate` | [`NFT721SalesTemplate`](templates.NFT721SalesTemplate.md) |
| `nftAccessTemplate` | [`NFTAccessTemplate`](templates.NFTAccessTemplate.md) |
| `nftSalesTemplate` | [`NFTSalesTemplate`](templates.NFTSalesTemplate.md) |

#### Defined in

[src/keeper/Keeper.ts:352](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L352)

___

### token

• **token**: `default`

Nevermined Token smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:286](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L286)

___

### utils

• **utils**: `Object`

Helpers for contracts.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `eventHandler` | [`EventHandler`](events.EventHandler.md) |

#### Defined in

[src/keeper/Keeper.ts:373](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L373)

___

### version

• **version**: `string`

Version of the artifacts in use

#### Defined in

[src/keeper/Keeper.ts:380](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L380)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L63)

## Methods

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Instantiable.addresses

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L129)

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

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

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

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

___

### getAccessTemplateByName

▸ **getAccessTemplateByName**(`name`): `GenericAccess`

Returns a Access template by name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Template name. |

#### Returns

`GenericAccess`

Agreement template instance.

#### Defined in

[src/keeper/Keeper.ts:419](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L419)

___

### getAllInstances

▸ **getAllInstances**(): `Object`

#### Returns

`Object`

#### Defined in

[src/keeper/Keeper.ts:459](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L459)

___

### getConditionByAddress

▸ **getConditionByAddress**(`address`): [`ConditionSmall`](conditions.ConditionSmall.md)

Returns a condition by address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of deployed condition. |

#### Returns

[`ConditionSmall`](conditions.ConditionSmall.md)

Condition instance.

#### Defined in

[src/keeper/Keeper.ts:399](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L399)

___

### getNetworkId

▸ **getNetworkId**(): `Promise`<`number`\>

Returns the id of the network.

#### Returns

`Promise`<`number`\>

Network ID.

#### Defined in

[src/keeper/Keeper.ts:446](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L446)

___

### getNetworkName

▸ **getNetworkName**(): `Promise`<`string`\>

Returns the network by name.

#### Returns

`Promise`<`string`\>

Network name.

#### Defined in

[src/keeper/Keeper.ts:438](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L438)

___

### getTemplateByAddress

▸ **getTemplateByAddress**(`address`): [`AccessTemplate`](templates.AccessTemplate.md) \| [`EscrowComputeExecutionTemplate`](templates.EscrowComputeExecutionTemplate.md) \| [`DIDSalesTemplate`](templates.DIDSalesTemplate.md) \| [`NFTAccessTemplate`](templates.NFTAccessTemplate.md) \| [`NFT721AccessTemplate`](templates.NFT721AccessTemplate.md) \| [`NFTSalesTemplate`](templates.NFTSalesTemplate.md) \| [`NFT721SalesTemplate`](templates.NFT721SalesTemplate.md) \| [`AaveCreditTemplate`](templates.AaveCreditTemplate.md)

Returns a template by address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Template address. |

#### Returns

[`AccessTemplate`](templates.AccessTemplate.md) \| [`EscrowComputeExecutionTemplate`](templates.EscrowComputeExecutionTemplate.md) \| [`DIDSalesTemplate`](templates.DIDSalesTemplate.md) \| [`NFTAccessTemplate`](templates.NFTAccessTemplate.md) \| [`NFT721AccessTemplate`](templates.NFT721AccessTemplate.md) \| [`NFTSalesTemplate`](templates.NFTSalesTemplate.md) \| [`NFT721SalesTemplate`](templates.NFT721SalesTemplate.md) \| [`AaveCreditTemplate`](templates.AaveCreditTemplate.md)

Agreement template instance.

#### Defined in

[src/keeper/Keeper.ts:428](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L428)

___

### getTemplateByName

▸ **getTemplateByName**(`name`): [`AccessTemplate`](templates.AccessTemplate.md) \| [`EscrowComputeExecutionTemplate`](templates.EscrowComputeExecutionTemplate.md) \| [`DIDSalesTemplate`](templates.DIDSalesTemplate.md) \| [`NFTAccessTemplate`](templates.NFTAccessTemplate.md) \| [`NFT721AccessTemplate`](templates.NFT721AccessTemplate.md) \| [`NFTSalesTemplate`](templates.NFTSalesTemplate.md) \| [`NFT721SalesTemplate`](templates.NFT721SalesTemplate.md) \| [`AaveCreditTemplate`](templates.AaveCreditTemplate.md)

Returns a template by name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Template name. |

#### Returns

[`AccessTemplate`](templates.AccessTemplate.md) \| [`EscrowComputeExecutionTemplate`](templates.EscrowComputeExecutionTemplate.md) \| [`DIDSalesTemplate`](templates.DIDSalesTemplate.md) \| [`NFTAccessTemplate`](templates.NFTAccessTemplate.md) \| [`NFT721AccessTemplate`](templates.NFT721AccessTemplate.md) \| [`NFTSalesTemplate`](templates.NFTSalesTemplate.md) \| [`NFT721SalesTemplate`](templates.NFT721SalesTemplate.md) \| [`AaveCreditTemplate`](templates.AaveCreditTemplate.md)

Agreement template instance.

#### Defined in

[src/keeper/Keeper.ts:408](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L408)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/keeper/Keeper.ts:74](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L74)

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

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L171)

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

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L142)

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

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`Keeper`](Keeper.md)\>

Returns Keeper instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`Keeper`](Keeper.md)\>

[Keeper](Keeper.md)

#### Overrides

Instantiable.getInstance

#### Defined in

[src/keeper/Keeper.ts:68](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/Keeper.ts#L68)

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

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
