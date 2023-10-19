[@nevermined-io/sdk](../code-reference.md) / WebServiceConnector

# Class: WebServiceConnector

Provides a common interface to web services.

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`WebServiceConnector`**

## Table of contents

### Constructors

- [constructor](WebServiceConnector.md#constructor)

### Accessors

- [artifactsFolder](WebServiceConnector.md#artifactsfolder)
- [circuitsFolder](WebServiceConnector.md#circuitsfolder)
- [config](WebServiceConnector.md#config)
- [instanceConfig](WebServiceConnector.md#instanceconfig)
- [instantiableConfig](WebServiceConnector.md#instantiableconfig)
- [logger](WebServiceConnector.md#logger)
- [nevermined](WebServiceConnector.md#nevermined)
- [web3](WebServiceConnector.md#web3)

### Methods

- [\_sleep](WebServiceConnector.md#_sleep)
- [delete](WebServiceConnector.md#delete)
- [downloadFile](WebServiceConnector.md#downloadfile)
- [downloadUrl](WebServiceConnector.md#downloadurl)
- [fetch](WebServiceConnector.md#fetch)
- [fetchCID](WebServiceConnector.md#fetchcid)
- [fetchToken](WebServiceConnector.md#fetchtoken)
- [get](WebServiceConnector.md#get)
- [getFileResponse](WebServiceConnector.md#getfileresponse)
- [post](WebServiceConnector.md#post)
- [put](WebServiceConnector.md#put)
- [setInstanceConfig](WebServiceConnector.md#setinstanceconfig)
- [uploadFile](WebServiceConnector.md#uploadfile)
- [uploadMessage](WebServiceConnector.md#uploadmessage)
- [getIPFSAuthToken](WebServiceConnector.md#getipfsauthtoken)
- [getInstance](WebServiceConnector.md#getinstance)
- [setInstanceConfig](WebServiceConnector.md#setinstanceconfig-1)

## Constructors

### constructor

• **new WebServiceConnector**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L21)

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

### \_sleep

▸ `Private` **\_sleep**(`ms`): `Promise`<`unknown`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `ms` | `number` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:221](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L221)

---

### delete

▸ **delete**(`url`, `payload?`, `headers?`): `Promise`<`Response`\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `url`      | `string`   |
| `payload?` | `BodyInit` |
| `headers`  | `Object`   |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:65](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L65)

---

### downloadFile

▸ **downloadFile**(`url`, `destination?`, `index?`, `headers?`): `Promise`<`string`\>

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `url`          | `string` |
| `destination?` | `string` |
| `index?`       | `number` |
| `headers?`     | `Object` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:80](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L80)

---

### downloadUrl

▸ **downloadUrl**(`url`, `headers?`): `Promise`<`string`\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `url`      | `string` |
| `headers?` | `any`    |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:132](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L132)

---

### fetch

▸ `Private` **fetch**(`url`, `opts`, `numberTries?`): `Promise`<`Response`\>

#### Parameters

| Name          | Type          | Default value |
| :------------ | :------------ | :------------ |
| `url`         | `any`         | `undefined`   |
| `opts`        | `RequestInit` | `undefined`   |
| `numberTries` | `number`      | `1`           |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:203](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L203)

---

### fetchCID

▸ **fetchCID**(`cid`): `Promise`<`string`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `cid` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:175](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L175)

---

### fetchToken

▸ **fetchToken**(`url`, `grantToken`, `numberTries?`): `Promise`<`Response`\>

#### Parameters

| Name          | Type     | Default value |
| :------------ | :------- | :------------ |
| `url`         | `string` | `undefined`   |
| `grantToken`  | `string` | `undefined`   |
| `numberTries` | `number` | `1`           |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:159](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L159)

---

### get

▸ **get**(`url`, `headers?`): `Promise`<`Response`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `url`     | `any`    |
| `headers` | `Object` |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:41](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L41)

---

### getFileResponse

▸ `Private` **getFileResponse**(`url`, `index?`, `headers?`): `Promise`<{ `name`: `string` ; `response`: `Response` }\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `url`      | `string` |
| `index?`   | `number` |
| `headers?` | `Object` |

#### Returns

`Promise`<{ `name`: `string` ; `response`: `Response` }\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:107](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L107)

---

### post

▸ **post**(`url`, `payload`, `headers?`): `Promise`<`Response`\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `url`     | `string`   |
| `payload` | `BodyInit` |
| `headers` | `Object`   |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:26](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L26)

---

### put

▸ **put**(`url`, `payload`, `headers?`): `Promise`<`Response`\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `url`     | `string`   |
| `payload` | `BodyInit` |
| `headers` | `Object`   |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L50)

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

### uploadFile

▸ **uploadFile**(`url`, `data`, `encrypt?`): `Promise`<`any`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `url`      | `string`     |
| `data`     | `ReadStream` |
| `encrypt?` | `boolean`    |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:149](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L149)

---

### uploadMessage

▸ **uploadMessage**(`url`, `data`, `encrypt?`): `Promise`<`any`\>

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `url`      | `string`  |
| `data`     | `string`  |
| `encrypt?` | `boolean` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:140](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L140)

---

### getIPFSAuthToken

▸ `Static` `Private` **getIPFSAuthToken**(): `string`

#### Returns

`string`

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:193](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/WebServiceConnector.ts#L193)

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
