[@nevermined-io/sdk](../code-reference.md) / Account

# Class: Account

Account information.

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`Account`**

## Table of contents

### Constructors

- [constructor](Account.md#constructor)

### Properties

- [babySecret](Account.md#babysecret)
- [babyX](Account.md#babyx)
- [babyY](Account.md#babyy)
- [id](Account.md#id)
- [password](Account.md#password)
- [zeroDevSigner](Account.md#zerodevsigner)

### Accessors

- [artifactsFolder](Account.md#artifactsfolder)
- [circuitsFolder](Account.md#circuitsfolder)
- [config](Account.md#config)
- [instanceConfig](Account.md#instanceconfig)
- [instantiableConfig](Account.md#instantiableconfig)
- [logger](Account.md#logger)
- [nevermined](Account.md#nevermined)
- [web3](Account.md#web3)

### Methods

- [getBalance](Account.md#getbalance)
- [getEtherBalance](Account.md#getetherbalance)
- [getId](Account.md#getid)
- [getNeverminedBalance](Account.md#getneverminedbalance)
- [getPassword](Account.md#getpassword)
- [getPublic](Account.md#getpublic)
- [isZeroDev](Account.md#iszerodev)
- [requestTokens](Account.md#requesttokens)
- [setId](Account.md#setid)
- [setInstanceConfig](Account.md#setinstanceconfig)
- [setPassword](Account.md#setpassword)
- [fromZeroDevSigner](Account.md#fromzerodevsigner)
- [getInstance](Account.md#getinstance)
- [setInstanceConfig](Account.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Account**(`id?`, `config?`)

#### Parameters

| Name      | Type                                                        | Default value |
| :-------- | :---------------------------------------------------------- | :------------ |
| `id`      | `string`                                                    | `'0x0'`       |
| `config?` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | `undefined`   |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/Account.ts:19](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L19)

## Properties

### babySecret

• `Optional` **babySecret**: `string`

#### Defined in

[src/nevermined/Account.ts:16](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L16)

---

### babyX

• `Optional` **babyX**: `string`

#### Defined in

[src/nevermined/Account.ts:14](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L14)

---

### babyY

• `Optional` **babyY**: `string`

#### Defined in

[src/nevermined/Account.ts:15](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L15)

---

### id

• `Private` **id**: `string` = `'0x0'`

#### Defined in

[src/nevermined/Account.ts:19](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L19)

---

### password

• `Private` `Optional` **password**: `string`

#### Defined in

[src/nevermined/Account.ts:13](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L13)

---

### zeroDevSigner

• **zeroDevSigner**: `ZeroDevAccountSigner`<`"ECDSA"`\>

#### Defined in

[src/nevermined/Account.ts:17](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L17)

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

### getBalance

▸ **getBalance**(): `Promise`<[`Balance`](../interfaces/Balance.md)\>

Balances of Ether and Nevermined Token.

#### Returns

`Promise`<[`Balance`](../interfaces/Balance.md)\>

#### Defined in

[src/nevermined/Account.ts:93](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L93)

---

### getEtherBalance

▸ **getEtherBalance**(): `Promise`<`bigint`\>

Balance of Ether.

#### Returns

`Promise`<`bigint`\>

#### Defined in

[src/nevermined/Account.ts:85](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L85)

---

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[src/nevermined/Account.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L43)

---

### getNeverminedBalance

▸ **getNeverminedBalance**(): `Promise`<`bigint`\>

Balance of Nevermined Token.

#### Returns

`Promise`<`bigint`\>

#### Defined in

[src/nevermined/Account.ts:75](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L75)

---

### getPassword

▸ **getPassword**(): `string`

Returns account password.

#### Returns

`string`

The account password.

#### Defined in

[src/nevermined/Account.ts:67](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L67)

---

### getPublic

▸ **getPublic**(): `string`

#### Returns

`string`

#### Defined in

[src/nevermined/Account.ts:51](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L51)

---

### isZeroDev

▸ **isZeroDev**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/nevermined/Account.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L39)

---

### requestTokens

▸ **requestTokens**(`amount`, `txParams?`): `Promise`<`string`\>

Request Nevermined Tokens.

#### Parameters

| Name        | Type                                                | Description             |
| :---------- | :-------------------------------------------------- | :---------------------- |
| `amount`    | [`BigNumberish`](../code-reference.md#bignumberish) | Tokens to be requested. |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md)     | Transaction parameters  |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/Account.ts:106](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L106)

---

### setId

▸ **setId**(`id`): `void`

#### Parameters

| Name | Type  |
| :--- | :---- |
| `id` | `any` |

#### Returns

`void`

#### Defined in

[src/nevermined/Account.ts:47](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L47)

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

### setPassword

▸ **setPassword**(`password`): `void`

Set account password.

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `password` | `string` | Password for account. |

#### Returns

`void`

#### Defined in

[src/nevermined/Account.ts:59](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L59)

---

### fromZeroDevSigner

▸ `Static` **fromZeroDevSigner**(`signer`): `Promise`<[`Account`](Account.md)\>

Returns a nevermined Account from a zerodev signer

#### Parameters

| Name     | Type                               | Description              |
| :------- | :--------------------------------- | :----------------------- |
| `signer` | `ZeroDevAccountSigner`<`"ECDSA"`\> | A zerodev account signer |

#### Returns

`Promise`<[`Account`](Account.md)\>

The nevermined account

#### Defined in

[src/nevermined/Account.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Account.ts#L32)

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
