[@nevermined-io/sdk](../code-reference.md) / Keeper

# Class: Keeper

Interface with Nevermined contracts.
Nevermined Keeper implementation where we put the following modules together:

- TCRs: users create challenges and resolve them through voting to maintain registries.
- Nevermined Tokens: the intrinsic tokens circulated inside Nevermined network, which is used in the voting of TCRs.
- Marketplace: the core marketplace where people can transact with each other with Nevermined tokens.

## Hierarchy

- [`Instantiable`](Instantiable.md)

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

### Accessors

- [artifactsFolder](Keeper.md#artifactsfolder)
- [circuitsFolder](Keeper.md#circuitsfolder)
- [config](Keeper.md#config)
- [instanceConfig](Keeper.md#instanceconfig)
- [instantiableConfig](Keeper.md#instantiableconfig)
- [logger](Keeper.md#logger)
- [nevermined](Keeper.md#nevermined)
- [web3](Keeper.md#web3)

### Methods

- [getAccessTemplateByName](Keeper.md#getaccesstemplatebyname)
- [getAllInstances](Keeper.md#getallinstances)
- [getConditionByAddress](Keeper.md#getconditionbyaddress)
- [getNetworkId](Keeper.md#getnetworkid)
- [getNetworkName](Keeper.md#getnetworkname)
- [getNetworkVersion](Keeper.md#getnetworkversion)
- [getTemplateByAddress](Keeper.md#gettemplatebyaddress)
- [getTemplateByName](Keeper.md#gettemplatebyname)
- [init](Keeper.md#init)
- [loadAaveInstances](Keeper.md#loadaaveinstances)
- [loadCurveRoyaltiesInstance](Keeper.md#loadcurveroyaltiesinstance)
- [setInstanceConfig](Keeper.md#setinstanceconfig)
- [getInstance](Keeper.md#getinstance)
- [setInstanceConfig](Keeper.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Keeper**()

#### Inherited from

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

## Properties

### agreementStoreManager

• **agreementStoreManager**: [`AgreementStoreManager`](AgreementStoreManager.md)

Template store manager smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:268](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L268)

---

### conditionStoreManager

• **conditionStoreManager**: [`ConditionStoreManager`](ConditionStoreManager.md)

Template store manager smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:273](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L273)

---

### conditions

• **conditions**: `Object`

Conditions instances.

#### Type declaration

| Name                               | Type                                                                      |
| :--------------------------------- | :------------------------------------------------------------------------ |
| `aaveBorrowCondition`              | [`AaveBorrowCondition`](AaveBorrowCondition.md)                           |
| `aaveCollateralDepositCondition`   | [`AaveCollateralDepositCondition`](AaveCollateralDepositCondition.md)     |
| `aaveCollateralWithdrawCondition`  | [`AaveCollateralWithdrawCondition`](AaveCollateralWithdrawCondition.md)   |
| `aaveRepayCondition`               | [`AaveRepayCondition`](AaveRepayCondition.md)                             |
| `accessCondition`                  | [`AccessCondition`](AccessCondition.md)                                   |
| `computeExecutionCondition`        | [`ComputeExecutionCondition`](ComputeExecutionCondition.md)               |
| `distributeNftCollateralCondition` | [`DistributeNFTCollateralCondition`](DistributeNFTCollateralCondition.md) |
| `escrowPaymentCondition`           | [`EscrowPaymentCondition`](EscrowPaymentCondition.md)                     |
| `lockPaymentCondition`             | [`LockPaymentCondition`](LockPaymentCondition.md)                         |
| `nft721HolderCondition`            | [`NFT721HolderCondition`](NFT721HolderCondition.md)                       |
| `nft721LockCondition`              | [`NFT721LockCondition`](NFT721LockCondition.md)                           |
| `nftAccessCondition`               | [`NFTAccessCondition`](NFTAccessCondition.md)                             |
| `nftHolderCondition`               | [`NFTHolderCondition`](NFTHolderCondition.md)                             |
| `nftLockCondition`                 | [`NFTLockCondition`](NFTLockCondition.md)                                 |
| `transferDidOwnershipCondition`    | [`TransferDIDOwnershipCondition`](TransferDIDOwnershipCondition.md)       |
| `transferNft721Condition`          | [`TransferNFT721Condition`](TransferNFT721Condition.md)                   |
| `transferNftCondition`             | [`TransferNFTCondition`](TransferNFTCondition.md)                         |

#### Defined in

[src/keeper/Keeper.ts:278](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L278)

---

### conditionsList

• **conditionsList**: [`ConditionSmall`](ConditionSmall.md)[]

#### Defined in

[src/keeper/Keeper.ts:298](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L298)

---

### connected

• **connected**: `boolean` = `false`

Is connected to the correct network or not.

#### Defined in

[src/keeper/Keeper.ts:233](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L233)

---

### didRegistry

• **didRegistry**: [`DIDRegistry`](DIDRegistry.md)

DID registry smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:253](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L253)

---

### dispenser

• **dispenser**: [`Dispenser`](Dispenser.md)

Market smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:243](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L243)

---

### instances

• `Private` **instances**: `Object`

#### Index signature

▪ [contractRef: `string`]: [`ContractBase`](ContractBase.md) & `any`

#### Defined in

[src/keeper/Keeper.ts:353](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L353)

---

### network

• `Protected` **network**: `Object`

Network id loaded from web3

#### Type declaration

| Name       | Type      | Description                        |
| :--------- | :-------- | :--------------------------------- |
| `chainId?` | `number`  | chainId of the network             |
| `loading`  | `boolean` | True if keeper is still connecting |
| `name?`    | `string`  | Name of the network                |
| `version?` | `string`  | Version of the artifacts in use    |

#### Defined in

[src/keeper/Keeper.ts:332](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L332)

---

### nftUpgradeable

• **nftUpgradeable**: [`Nft1155Contract`](Nft1155Contract.md)

NFT upgradeable smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:258](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L258)

---

### nvmConfig

• **nvmConfig**: `default`

Nevermined Config smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:248](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L248)

---

### rewardsDistributor

• **rewardsDistributor**: [`RewardsDistributor`](RewardsDistributor.md)

#### Defined in

[src/keeper/Keeper.ts:320](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L320)

---

### royalties

• **royalties**: `Object`

#### Type declaration

| Name       | Type                                        |
| :--------- | :------------------------------------------ |
| `curve`    | [`CurveRoyalties`](CurveRoyalties.md)       |
| `standard` | [`StandardRoyalties`](StandardRoyalties.md) |

#### Defined in

[src/keeper/Keeper.ts:315](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L315)

---

### templateList

• **templateList**: [`GenericAccess`](../interfaces/GenericAccess.md)[]

#### Defined in

[src/keeper/Keeper.ts:299](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L299)

---

### templateStoreManager

• **templateStoreManager**: [`TemplateStoreManager`](TemplateStoreManager.md)

Template store manager smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:263](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L263)

---

### templates

• **templates**: `Object`

Templates instances.

#### Type declaration

| Name                             | Type                                                                  |
| :------------------------------- | :-------------------------------------------------------------------- |
| `aaveCreditTemplate`             | [`AaveCreditTemplate`](AaveCreditTemplate.md)                         |
| `accessTemplate`                 | [`AccessTemplate`](AccessTemplate.md)                                 |
| `didSalesTemplate`               | [`DIDSalesTemplate`](DIDSalesTemplate.md)                             |
| `escrowComputeExecutionTemplate` | [`EscrowComputeExecutionTemplate`](EscrowComputeExecutionTemplate.md) |
| `nft721AccessTemplate`           | [`NFT721AccessTemplate`](NFT721AccessTemplate.md)                     |
| `nft721SalesTemplate`            | [`NFT721SalesTemplate`](NFT721SalesTemplate.md)                       |
| `nftAccessTemplate`              | [`NFTAccessTemplate`](NFTAccessTemplate.md)                           |
| `nftSalesTemplate`               | [`NFTSalesTemplate`](NFTSalesTemplate.md)                             |

#### Defined in

[src/keeper/Keeper.ts:304](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L304)

---

### token

• **token**: [`Token`](Token.md)

Nevermined Token smart contract instance.

#### Defined in

[src/keeper/Keeper.ts:238](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L238)

---

### utils

• **utils**: `Object`

Helpers for contracts.

#### Type declaration

| Name           | Type                              |
| :------------- | :-------------------------------- |
| `eventHandler` | [`EventHandler`](EventHandler.md) |

#### Defined in

[src/keeper/Keeper.ts:325](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L325)

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

### getAccessTemplateByName

▸ **getAccessTemplateByName**(`name`): [`GenericAccess`](../interfaces/GenericAccess.md)

Returns a Access template by name.

#### Parameters

| Name   | Type     | Description    |
| :----- | :------- | :------------- |
| `name` | `string` | Template name. |

#### Returns

[`GenericAccess`](../interfaces/GenericAccess.md)

Agreement template instance.

#### Defined in

[src/keeper/Keeper.ts:417](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L417)

---

### getAllInstances

▸ **getAllInstances**(): `Object`

#### Returns

`Object`

#### Defined in

[src/keeper/Keeper.ts:430](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L430)

---

### getConditionByAddress

▸ **getConditionByAddress**(`address`): [`ConditionSmall`](ConditionSmall.md)

Returns a condition by address.

#### Parameters

| Name      | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `address` | `string` | Address of deployed condition. |

#### Returns

[`ConditionSmall`](ConditionSmall.md)

Condition instance.

#### Defined in

[src/keeper/Keeper.ts:360](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L360)

---

### getNetworkId

▸ **getNetworkId**(): `Promise`<`number`\>

Returns the id of the network.

#### Returns

`Promise`<`number`\>

Network ID.

#### Defined in

[src/keeper/Keeper.ts:388](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L388)

---

### getNetworkName

▸ **getNetworkName**(): `Promise`<`string`\>

Returns the network by name.

#### Returns

`Promise`<`string`\>

Network name.

#### Defined in

[src/keeper/Keeper.ts:377](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L377)

---

### getNetworkVersion

▸ **getNetworkVersion**(): `string`

Returns the network version.

#### Returns

`string`

Network version.

#### Defined in

[src/keeper/Keeper.ts:405](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L405)

---

### getTemplateByAddress

▸ **getTemplateByAddress**(`address`): [`AccessTemplate`](AccessTemplate.md) \| [`EscrowComputeExecutionTemplate`](EscrowComputeExecutionTemplate.md) \| [`DIDSalesTemplate`](DIDSalesTemplate.md) \| [`NFTAccessTemplate`](NFTAccessTemplate.md) \| [`NFT721AccessTemplate`](NFT721AccessTemplate.md) \| [`NFTSalesTemplate`](NFTSalesTemplate.md) \| [`NFT721SalesTemplate`](NFT721SalesTemplate.md) \| [`AaveCreditTemplate`](AaveCreditTemplate.md)

Returns a template by address.

#### Parameters

| Name      | Type     | Description       |
| :-------- | :------- | :---------------- |
| `address` | `string` | Template address. |

#### Returns

[`AccessTemplate`](AccessTemplate.md) \| [`EscrowComputeExecutionTemplate`](EscrowComputeExecutionTemplate.md) \| [`DIDSalesTemplate`](DIDSalesTemplate.md) \| [`NFTAccessTemplate`](NFTAccessTemplate.md) \| [`NFT721AccessTemplate`](NFT721AccessTemplate.md) \| [`NFTSalesTemplate`](NFTSalesTemplate.md) \| [`NFT721SalesTemplate`](NFT721SalesTemplate.md) \| [`AaveCreditTemplate`](AaveCreditTemplate.md)

Agreement template instance.

#### Defined in

[src/keeper/Keeper.ts:426](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L426)

---

### getTemplateByName

▸ **getTemplateByName**(`name`): [`AccessTemplate`](AccessTemplate.md) \| [`EscrowComputeExecutionTemplate`](EscrowComputeExecutionTemplate.md) \| [`DIDSalesTemplate`](DIDSalesTemplate.md) \| [`NFTAccessTemplate`](NFTAccessTemplate.md) \| [`NFT721AccessTemplate`](NFT721AccessTemplate.md) \| [`NFTSalesTemplate`](NFTSalesTemplate.md) \| [`NFT721SalesTemplate`](NFT721SalesTemplate.md) \| [`AaveCreditTemplate`](AaveCreditTemplate.md)

Returns a template by name.

#### Parameters

| Name   | Type     | Description    |
| :----- | :------- | :------------- |
| `name` | `string` | Template name. |

#### Returns

[`AccessTemplate`](AccessTemplate.md) \| [`EscrowComputeExecutionTemplate`](EscrowComputeExecutionTemplate.md) \| [`DIDSalesTemplate`](DIDSalesTemplate.md) \| [`NFTAccessTemplate`](NFTAccessTemplate.md) \| [`NFT721AccessTemplate`](NFT721AccessTemplate.md) \| [`NFTSalesTemplate`](NFTSalesTemplate.md) \| [`NFT721SalesTemplate`](NFT721SalesTemplate.md) \| [`AaveCreditTemplate`](AaveCreditTemplate.md)

Agreement template instance.

#### Defined in

[src/keeper/Keeper.ts:369](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L369)

---

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/keeper/Keeper.ts:68](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L68)

---

### loadAaveInstances

▸ **loadAaveInstances**(): `Promise`<[`Keeper`](Keeper.md)\>

#### Returns

`Promise`<[`Keeper`](Keeper.md)\>

#### Defined in

[src/keeper/Keeper.ts:434](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L434)

---

### loadCurveRoyaltiesInstance

▸ **loadCurveRoyaltiesInstance**(): `Promise`<[`CurveRoyalties`](CurveRoyalties.md)\>

#### Returns

`Promise`<[`CurveRoyalties`](CurveRoyalties.md)\>

#### Defined in

[src/keeper/Keeper.ts:457](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L457)

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

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`Keeper`](Keeper.md)\>

Returns Keeper instance.

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`Keeper`](Keeper.md)\>

[Keeper](Keeper.md)

#### Overrides

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

#### Defined in

[src/keeper/Keeper.ts:62](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Keeper.ts#L62)

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
