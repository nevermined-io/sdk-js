[@nevermined-io/sdk](../code-reference.md) / AaveCredit

# Class: AaveCredit

AaveCredit allows taking loans from Aave protocol using NFT tokens as collateral

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`AaveCredit`**

## Table of contents

### Constructors

- [constructor](AaveCredit.md#constructor)

### Properties

- [aaveConfig](AaveCredit.md#aaveconfig)
- [serviceType](AaveCredit.md#servicetype)
- [template](AaveCredit.md#template)

### Accessors

- [artifactsFolder](AaveCredit.md#artifactsfolder)
- [circuitsFolder](AaveCredit.md#circuitsfolder)
- [config](AaveCredit.md#config)
- [instanceConfig](AaveCredit.md#instanceconfig)
- [instantiableConfig](AaveCredit.md#instantiableconfig)
- [logger](AaveCredit.md#logger)
- [nevermined](AaveCredit.md#nevermined)
- [web3](AaveCredit.md#web3)

### Methods

- [borrow](AaveCredit.md#borrow)
- [create](AaveCredit.md#create)
- [delegatedAmount](AaveCredit.md#delegatedamount)
- [depositCollateral](AaveCredit.md#depositcollateral)
- [getActualCreditDebt](AaveCredit.md#getactualcreditdebt)
- [getAssetPrice](AaveCredit.md#getassetprice)
- [getBorrowedAmount](AaveCredit.md#getborrowedamount)
- [getCreditAssetDebt](AaveCredit.md#getcreditassetdebt)
- [getTotalActualDebt](AaveCredit.md#gettotalactualdebt)
- [getVaultContract](AaveCredit.md#getvaultcontract)
- [lockNft](AaveCredit.md#locknft)
- [repayDebt](AaveCredit.md#repaydebt)
- [setInstanceConfig](AaveCredit.md#setinstanceconfig)
- [unlockNft](AaveCredit.md#unlocknft)
- [withdrawCollateral](AaveCredit.md#withdrawcollateral)
- [getInstance](AaveCredit.md#getinstance)
- [setInstanceConfig](AaveCredit.md#setinstanceconfig-1)

## Constructors

### constructor

• **new AaveCredit**()

#### Inherited from

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

## Properties

### aaveConfig

• **aaveConfig**: [`AaveConfig`](../interfaces/AaveConfig.md)

#### Defined in

[src/services/aave/AaveCredit.ts:22](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L22)

---

### serviceType

• **serviceType**: `"aave-credit"`

#### Defined in

[src/services/aave/AaveCredit.ts:23](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L23)

---

### template

• **template**: [`AaveCreditTemplate`](AaveCreditTemplate.md)

#### Defined in

[src/services/aave/AaveCredit.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L21)

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

### borrow

▸ **borrow**(`agreementId`, `delegatedAsset`, `delegatedAmount`, `interestRateMode`, `from`, `did?`, `vaultAddress?`): `Promise`<`boolean`\>

#### Parameters

| Name               | Type                    |
| :----------------- | :---------------------- |
| `agreementId`      | `string`                |
| `delegatedAsset`   | `string`                |
| `delegatedAmount`  | `number`                |
| `interestRateMode` | `number`                |
| `from`             | [`Account`](Account.md) |
| `did?`             | `string`                |
| `vaultAddress?`    | `string`                |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/services/aave/AaveCredit.ts:219](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L219)

---

### create

▸ **create**(`did`, `nftTokenContract`, `nftAmount`, `collateralToken`, `collateralAmount`, `delegatedToken`, `delegatedAmount`, `interestRateMode`, `borrower`, `lender`, `from`, `timeLocks?`, `timeOuts?`, `txParams?`): `Promise`<{ `agreementId`: `string` ; `data`: [`AgreementInstance`](../interfaces/AgreementInstance.md)<[`AaveCreditTemplateParams`](../interfaces/AaveCreditTemplateParams.md)\> }\>

Create new Aave agreement where a borrower puts an NFT asset as collateral
and the lender uses their own Token as collateral to allow the borrower to
use Aave protocol to borrow some other token (the `delegatedToken`). All of
this is facilitated via the credit vault contract and the agreement conditions.
All interactions with the Aave protocol have to go through the credit vault.

#### Parameters

| Name               | Type                                            | Description                                                                                     |
| :----------------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| `did`              | `string`                                        | id of DDO/asset that represent the `nftToken`. This is the NFT token id                         |
| `nftTokenContract` | `string`                                        | nft (ERC721) contract address of token to use as collateral by the borrower                     |
| `nftAmount`        | `number`                                        | the number of nft tokens                                                                        |
| `collateralToken`  | `string`                                        | erc20 token address to use as loan-collateral by the lender to enable the borrower to take loan |
| `collateralAmount` | `number`                                        | amount of `collateralToken` to lock in the vault                                                |
| `delegatedToken`   | `string`                                        | address of erc20 token to be borrowed under this agreement                                      |
| `delegatedAmount`  | `number`                                        | amount of `delegatedToken` that well be borrowed                                                |
| `interestRateMode` | `number`                                        | the type of interest rate to use when borrowing from Aave                                       |
| `borrower`         | `string`                                        | wallet address of borrower                                                                      |
| `lender`           | `string`                                        | wallet address of lender                                                                        |
| `from`             | [`Account`](Account.md)                         | account/wallet of borrower or lender creating this agreement                                    |
| `timeLocks?`       | `number`[]                                      | list of time lock values for each agreement condition                                           |
| `timeOuts?`        | `number`[]                                      | list of time out values for each agreement condition                                            |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md) | extra transaction parameters can be included here                                               |

#### Returns

`Promise`<{ `agreementId`: `string` ; `data`: [`AgreementInstance`](../interfaces/AgreementInstance.md)<[`AaveCreditTemplateParams`](../interfaces/AaveCreditTemplateParams.md)\> }\>

#### Defined in

[src/services/aave/AaveCredit.ts:59](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L59)

---

### delegatedAmount

▸ **delegatedAmount**(`agreementId`, `borrower`, `delegatedToken`, `interestRateMode`, `from`, `vaultAddress?`): `Promise`<`number`\>

Returned value is already converted from Wei

#### Parameters

| Name               | Type                    |
| :----------------- | :---------------------- |
| `agreementId`      | `string`                |
| `borrower`         | `string`                |
| `delegatedToken`   | `string`                |
| `interestRateMode` | `number`                |
| `from`             | [`Account`](Account.md) |
| `vaultAddress?`    | `string`                |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/services/aave/AaveCredit.ts:498](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L498)

---

### depositCollateral

▸ **depositCollateral**(`agreementId`, `collateralAsset`, `collateralAmount`, `delegatedAsset`, `delegatedAmount`, `interestRateMode`, `from`, `useWethGateway?`, `did?`, `vaultAddress?`): `Promise`<`boolean`\>

#### Parameters

| Name               | Type                    | Default value |
| :----------------- | :---------------------- | :------------ |
| `agreementId`      | `string`                | `undefined`   |
| `collateralAsset`  | `string`                | `undefined`   |
| `collateralAmount` | `number`                | `undefined`   |
| `delegatedAsset`   | `string`                | `undefined`   |
| `delegatedAmount`  | `number`                | `undefined`   |
| `interestRateMode` | `number`                | `undefined`   |
| `from`             | [`Account`](Account.md) | `undefined`   |
| `useWethGateway`   | `boolean`               | `false`       |
| `did?`             | `string`                | `undefined`   |
| `vaultAddress?`    | `string`                | `undefined`   |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/services/aave/AaveCredit.ts:157](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L157)

---

### getActualCreditDebt

▸ **getActualCreditDebt**(`agreementId`, `from`, `vaultAddress?`): `Promise`<`number`\>

Returned value is already converted from Wei

#### Parameters

| Name            | Type                    |
| :-------------- | :---------------------- |
| `agreementId`   | `string`                |
| `from`          | [`Account`](Account.md) |
| `vaultAddress?` | `string`                |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/services/aave/AaveCredit.ts:427](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L427)

---

### getAssetPrice

▸ **getAssetPrice**(`agreementId`, `tokenAddress`, `from`, `vaultAddress?`): `Promise`<`number`\>

#### Parameters

| Name            | Type                    |
| :-------------- | :---------------------- |
| `agreementId`   | `string`                |
| `tokenAddress`  | `string`                |
| `from`          | [`Account`](Account.md) |
| `vaultAddress?` | `string`                |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/services/aave/AaveCredit.ts:459](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L459)

---

### getBorrowedAmount

▸ **getBorrowedAmount**(`agreementId`, `from`, `vaultAddress?`): `Promise`<`number`\>

Returned value is already converted from Wei

#### Parameters

| Name            | Type                    |
| :-------------- | :---------------------- |
| `agreementId`   | `string`                |
| `from`          | [`Account`](Account.md) |
| `vaultAddress?` | `string`                |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/services/aave/AaveCredit.ts:479](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L479)

---

### getCreditAssetDebt

▸ **getCreditAssetDebt**(`agreementId`, `from`, `vaultAddress?`): `Promise`<`number`\>

Returned value is already converted from Wei

#### Parameters

| Name            | Type                    |
| :-------------- | :---------------------- |
| `agreementId`   | `string`                |
| `from`          | [`Account`](Account.md) |
| `vaultAddress?` | `string`                |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/services/aave/AaveCredit.ts:446](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L446)

---

### getTotalActualDebt

▸ **getTotalActualDebt**(`agreementId`, `from`, `vaultAddress?`): `Promise`<`number`\>

Returned value is already converted from Wei

#### Parameters

| Name            | Type                    |
| :-------------- | :---------------------- |
| `agreementId`   | `string`                |
| `from`          | [`Account`](Account.md) |
| `vaultAddress?` | `string`                |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/services/aave/AaveCredit.ts:407](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L407)

---

### getVaultContract

▸ **getVaultContract**(`agreementId`, `from`, `vaultAddress?`): `Promise`<[`GenericContract`](GenericContract.md)\>

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `agreementId`   | `string` |
| `from`          | `string` |
| `vaultAddress?` | `string` |

#### Returns

`Promise`<[`GenericContract`](GenericContract.md)\>

#### Defined in

[src/services/aave/AaveCredit.ts:390](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L390)

---

### lockNft

▸ **lockNft**(`agreementId`, `nftContractAddress`, `nftAmount`, `from?`, `did?`, `vaultAddress?`): `Promise`<`boolean`\>

#### Parameters

| Name                 | Type                    |
| :------------------- | :---------------------- |
| `agreementId`        | `string`                |
| `nftContractAddress` | `string`                |
| `nftAmount`          | `number`                |
| `from?`              | [`Account`](Account.md) |
| `did?`               | `string`                |
| `vaultAddress?`      | `string`                |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/services/aave/AaveCredit.ts:115](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L115)

---

### repayDebt

▸ **repayDebt**(`agreementId`, `delegatedAsset`, `delegatedAmount`, `interestRateMode`, `from?`, `did?`, `vaultAddress?`): `Promise`<`boolean`\>

#### Parameters

| Name               | Type                    |
| :----------------- | :---------------------- |
| `agreementId`      | `string`                |
| `delegatedAsset`   | `string`                |
| `delegatedAmount`  | `number`                |
| `interestRateMode` | `number`                |
| `from?`            | [`Account`](Account.md) |
| `did?`             | `string`                |
| `vaultAddress?`    | `string`                |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/services/aave/AaveCredit.ts:257](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L257)

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

### unlockNft

▸ **unlockNft**(`agreementId`, `nftContractAddress`, `from?`, `did?`, `vaultAddress?`): `Promise`<`boolean`\>

#### Parameters

| Name                 | Type                    |
| :------------------- | :---------------------- |
| `agreementId`        | `string`                |
| `nftContractAddress` | `string`                |
| `from?`              | [`Account`](Account.md) |
| `did?`               | `string`                |
| `vaultAddress?`      | `string`                |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/services/aave/AaveCredit.ts:354](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L354)

---

### withdrawCollateral

▸ **withdrawCollateral**(`agreementId`, `collateralAsset`, `collateralAmount`, `delegatedAsset`, `delegatedAmount`, `interestRateMode`, `from?`, `did?`, `vaultAddress?`): `Promise`<`boolean`\>

#### Parameters

| Name               | Type                    |
| :----------------- | :---------------------- |
| `agreementId`      | `string`                |
| `collateralAsset`  | `string`                |
| `collateralAmount` | `number`                |
| `delegatedAsset`   | `string`                |
| `delegatedAmount`  | `number`                |
| `interestRateMode` | `number`                |
| `from?`            | [`Account`](Account.md) |
| `did?`             | `string`                |
| `vaultAddress?`    | `string`                |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/services/aave/AaveCredit.ts:319](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L319)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`AaveCredit`](AaveCredit.md)\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`AaveCredit`](AaveCredit.md)\>

#### Overrides

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

#### Defined in

[src/services/aave/AaveCredit.ts:25](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/aave/AaveCredit.ts#L25)

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
