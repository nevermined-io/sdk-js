[@nevermined-io/sdk - v3.1.2](../code-reference.md) / WebServiceConnector

# Class: WebServiceConnector

Provides a common interface to web services.

## Table of contents

### Constructors

- [constructor](WebServiceConnector.md#constructor)

### Properties

- [config](WebServiceConnector.md#config)

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
- [uploadFile](WebServiceConnector.md#uploadfile)
- [uploadMessage](WebServiceConnector.md#uploadmessage)
- [getIPFSAuthToken](WebServiceConnector.md#getipfsauthtoken)

## Constructors

### constructor

• **new WebServiceConnector**(`config`): [`WebServiceConnector`](WebServiceConnector.md)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

[`WebServiceConnector`](WebServiceConnector.md)

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:26](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L26)

## Properties

### config

• **config**: [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:24](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L24)

## Methods

### \_sleep

▸ **\_sleep**(`ms`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `ms` | `number` |

#### Returns

`Promise`\<`unknown`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:238](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L238)

---

### delete

▸ **delete**(`url`, `payload?`, `headers?`): `Promise`\<`Response`\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `url`      | `string`   |
| `payload?` | `BodyInit` |
| `headers`  | `Object`   |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:71](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L71)

---

### downloadFile

▸ **downloadFile**(`url`, `destination?`, `index?`, `headers?`): `Promise`\<`string`\>

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `url`          | `string` |
| `destination?` | `string` |
| `index?`       | `number` |
| `headers?`     | `Object` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:86](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L86)

---

### downloadUrl

▸ **downloadUrl**(`url`, `headers?`): `Promise`\<`string`\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `url`      | `string` |
| `headers?` | `any`    |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:139](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L139)

---

### fetch

▸ **fetch**(`url`, `opts`, `numberTries?`): `Promise`\<`Response`\>

#### Parameters

| Name          | Type          | Default value |
| :------------ | :------------ | :------------ |
| `url`         | `any`         | `undefined`   |
| `opts`        | `RequestInit` | `undefined`   |
| `numberTries` | `number`      | `1`           |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:221](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L221)

---

### fetchCID

▸ **fetchCID**(`cid`): `Promise`\<`string`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `cid` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:193](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L193)

---

### fetchToken

▸ **fetchToken**(`url`, `grantToken`, `numberTries?`, `apiKeyHash?`): `Promise`\<`Response`\>

#### Parameters

| Name          | Type     | Default value |
| :------------ | :------- | :------------ |
| `url`         | `string` | `undefined`   |
| `grantToken`  | `string` | `undefined`   |
| `numberTries` | `number` | `1`           |
| `apiKeyHash?` | `string` | `undefined`   |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:165](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L165)

---

### get

▸ **get**(`url`, `headers?`): `Promise`\<`Response`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `url`     | `any`    |
| `headers` | `Object` |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:47](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L47)

---

### getFileResponse

▸ **getFileResponse**(`url`, `index?`, `headers?`): `Promise`\<\{ `name`: `string` ; `response`: `Response` }\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `url`      | `string` |
| `index?`   | `number` |
| `headers?` | `Object` |

#### Returns

`Promise`\<\{ `name`: `string` ; `response`: `Response` }\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:113](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L113)

---

### post

▸ **post**(`url`, `payload`, `headers?`): `Promise`\<`Response`\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `url`     | `string`   |
| `payload` | `BodyInit` |
| `headers` | `Object`   |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:32](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L32)

---

### put

▸ **put**(`url`, `payload`, `headers?`): `Promise`\<`Response`\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `url`     | `string`   |
| `payload` | `BodyInit` |
| `headers` | `Object`   |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:56](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L56)

---

### uploadFile

▸ **uploadFile**(`url`, `data`, `encrypt?`): `Promise`\<`any`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `url`      | `string`     |
| `data`     | `ReadStream` |
| `encrypt?` | `boolean`    |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:156](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L156)

---

### uploadMessage

▸ **uploadMessage**(`url`, `data`, `encrypt?`): `Promise`\<`any`\>

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `url`      | `string`  |
| `data`     | `string`  |
| `encrypt?` | `boolean` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:147](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L147)

---

### getIPFSAuthToken

▸ **getIPFSAuthToken**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/nevermined/utils/WebServiceConnector.ts:211](https://github.com/nevermined-io/sdk-js/blob/67dcc4309b61571f3cee221ec474b9c29e860b77/src/nevermined/utils/WebServiceConnector.ts#L211)
