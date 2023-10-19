[@nevermined-io/sdk](../code-reference.md) / JwtUtils

# Class: JwtUtils

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`JwtUtils`**

## Table of contents

### Constructors

- [constructor](JwtUtils.md#constructor)

### Properties

- [BASE_AUD](JwtUtils.md#base_aud)
- [CLIENT_ASSERTION_TYPE](JwtUtils.md#client_assertion_type)
- [tokenCache](JwtUtils.md#tokencache)

### Accessors

- [artifactsFolder](JwtUtils.md#artifactsfolder)
- [circuitsFolder](JwtUtils.md#circuitsfolder)
- [config](JwtUtils.md#config)
- [instanceConfig](JwtUtils.md#instanceconfig)
- [instantiableConfig](JwtUtils.md#instantiableconfig)
- [logger](JwtUtils.md#logger)
- [nevermined](JwtUtils.md#nevermined)
- [web3](JwtUtils.md#web3)

### Methods

- [accountToJwk](JwtUtils.md#accounttojwk)
- [generateAccessGrantToken](JwtUtils.md#generateaccessgranttoken)
- [generateCacheKey](JwtUtils.md#generatecachekey)
- [generateClientAssertion](JwtUtils.md#generateclientassertion)
- [generateComputeGrantToken](JwtUtils.md#generatecomputegranttoken)
- [generateDownloadGrantToken](JwtUtils.md#generatedownloadgranttoken)
- [generateExecuteGrantToken](JwtUtils.md#generateexecutegranttoken)
- [generateNftAccessGrantToken](JwtUtils.md#generatenftaccessgranttoken)
- [generateToken](JwtUtils.md#generatetoken)
- [getDownloadGrantToken](JwtUtils.md#getdownloadgranttoken)
- [getNftAccessGrantToken](JwtUtils.md#getnftaccessgranttoken)
- [getSigner](JwtUtils.md#getsigner)
- [setInstanceConfig](JwtUtils.md#setinstanceconfig)
- [getInstance](JwtUtils.md#getinstance)
- [setInstanceConfig](JwtUtils.md#setinstanceconfig-1)

## Constructors

### constructor

• **new JwtUtils**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/utils/JwtUtils.ts:154](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L154)

## Properties

### BASE_AUD

• **BASE_AUD**: `string` = `'/api/v1/node/services'`

#### Defined in

[src/nevermined/utils/JwtUtils.ts:150](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L150)

---

### CLIENT_ASSERTION_TYPE

• **CLIENT_ASSERTION_TYPE**: `string` = `'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'`

#### Defined in

[src/nevermined/utils/JwtUtils.ts:149](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L149)

---

### tokenCache

• **tokenCache**: `Map`<`string`, `string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:152](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L152)

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

### accountToJwk

▸ **accountToJwk**(`account`): `Promise`<`any`\>

#### Parameters

| Name      | Type                    |
| :-------- | :---------------------- |
| `account` | [`Account`](Account.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:171](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L171)

---

### generateAccessGrantToken

▸ **generateAccessGrantToken**(`account`, `serviceAgreementId`, `did`, `buyer?`, `babysig?`): `Promise`<`string`\>

#### Parameters

| Name                 | Type                                  |
| :------------------- | :------------------------------------ |
| `account`            | [`Account`](Account.md)               |
| `serviceAgreementId` | `string`                              |
| `did`                | `string`                              |
| `buyer?`             | `string`                              |
| `babysig?`           | [`Babysig`](../interfaces/Babysig.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:212](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L212)

---

### generateCacheKey

▸ **generateCacheKey**(`...args`): `string`

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `...args` | `string`[] |

#### Returns

`string`

#### Defined in

[src/nevermined/utils/JwtUtils.ts:167](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L167)

---

### generateClientAssertion

▸ **generateClientAssertion**(`account`, `message?`): `Promise`<`string`\>

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `account`  | [`Account`](Account.md) |
| `message?` | `string`                |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:192](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L192)

---

### generateComputeGrantToken

▸ **generateComputeGrantToken**(`account`, `serviceAgreementId`, `executionId`): `Promise`<`string`\>

#### Parameters

| Name                 | Type                    |
| :------------------- | :---------------------- |
| `account`            | [`Account`](Account.md) |
| `serviceAgreementId` | `string`                |
| `executionId`        | `string`                |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:323](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L323)

---

### generateDownloadGrantToken

▸ **generateDownloadGrantToken**(`account`, `did`, `buyer?`, `babysig?`): `Promise`<`string`\>

#### Parameters

| Name       | Type                                  |
| :--------- | :------------------------------------ |
| `account`  | [`Account`](Account.md)               |
| `did`      | `string`                              |
| `buyer?`   | `string`                              |
| `babysig?` | [`Babysig`](../interfaces/Babysig.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:261](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L261)

---

### generateExecuteGrantToken

▸ **generateExecuteGrantToken**(`account`, `serviceAgreementId`, `workflowId`): `Promise`<`string`\>

#### Parameters

| Name                 | Type                    |
| :------------------- | :---------------------- |
| `account`            | [`Account`](Account.md) |
| `serviceAgreementId` | `string`                |
| `workflowId`         | `string`                |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:302](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L302)

---

### generateNftAccessGrantToken

▸ **generateNftAccessGrantToken**(`agreementId`, `did`, `serviceIndex`, `account`, `buyer?`, `babysig?`): `Promise`<`string`\>

#### Parameters

| Name           | Type                                  |
| :------------- | :------------------------------------ |
| `agreementId`  | `string`                              |
| `did`          | `string`                              |
| `serviceIndex` | `number`                              |
| `account`      | [`Account`](Account.md)               |
| `buyer?`       | `string`                              |
| `babysig?`     | [`Babysig`](../interfaces/Babysig.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:344](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L344)

---

### generateToken

▸ **generateToken**(`account`, `serviceAgreementId`, `did`, `aud`, `obj`): `Promise`<`string`\>

#### Parameters

| Name                 | Type                    |
| :------------------- | :---------------------- |
| `account`            | [`Account`](Account.md) |
| `serviceAgreementId` | `string`                |
| `did`                | `string`                |
| `aud`                | `string`                |
| `obj`                | `any`                   |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:237](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L237)

---

### getDownloadGrantToken

▸ **getDownloadGrantToken**(`did`, `account`, `buyer?`, `babysig?`): `Promise`<`string`\>

#### Parameters

| Name       | Type                                  |
| :--------- | :------------------------------------ |
| `did`      | `string`                              |
| `account`  | [`Account`](Account.md)               |
| `buyer?`   | `string`                              |
| `babysig?` | [`Babysig`](../interfaces/Babysig.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:283](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L283)

---

### getNftAccessGrantToken

▸ **getNftAccessGrantToken**(`agreementId`, `did`, `serviceIndex`, `account`, `buyer?`, `babysig?`): `Promise`<`string`\>

#### Parameters

| Name           | Type                                  |
| :------------- | :------------------------------------ |
| `agreementId`  | `string`                              |
| `did`          | `string`                              |
| `serviceIndex` | `number`                              |
| `account`      | [`Account`](Account.md)               |
| `buyer?`       | `string`                              |
| `babysig?`     | [`Babysig`](../interfaces/Babysig.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:372](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L372)

---

### getSigner

▸ **getSigner**(`account`): `Promise`<`Signer` \| `ZeroDevAccountSigner`<`"ECDSA"`\>\>

#### Parameters

| Name      | Type                    |
| :-------- | :---------------------- |
| `account` | [`Account`](Account.md) |

#### Returns

`Promise`<`Signer` \| `ZeroDevAccountSigner`<`"ECDSA"`\>\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:160](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L160)

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
