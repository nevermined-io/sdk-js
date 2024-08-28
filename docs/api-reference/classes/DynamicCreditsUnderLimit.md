[@nevermined-io/sdk - v3.0.28](../code-reference.md) / DynamicCreditsUnderLimit

# Class: DynamicCreditsUnderLimit

## Hierarchy

- [`NFTError`](NFTError.md)

  ↳ **`DynamicCreditsUnderLimit`**

## Table of contents

### Constructors

- [constructor](DynamicCreditsUnderLimit.md#constructor)

### Properties

- [cause](DynamicCreditsUnderLimit.md#cause)
- [message](DynamicCreditsUnderLimit.md#message)
- [name](DynamicCreditsUnderLimit.md#name)
- [stack](DynamicCreditsUnderLimit.md#stack)
- [prepareStackTrace](DynamicCreditsUnderLimit.md#preparestacktrace)
- [stackTraceLimit](DynamicCreditsUnderLimit.md#stacktracelimit)

### Methods

- [captureStackTrace](DynamicCreditsUnderLimit.md#capturestacktrace)

## Constructors

### constructor

• **new DynamicCreditsUnderLimit**(`message`): [`DynamicCreditsUnderLimit`](DynamicCreditsUnderLimit.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`DynamicCreditsUnderLimit`](DynamicCreditsUnderLimit.md)

#### Overrides

[NFTError](NFTError.md).[constructor](NFTError.md#constructor)

#### Defined in

[src/errors/NeverminedErrors.ts:50](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/errors/NeverminedErrors.ts#L50)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

[NFTError](NFTError.md).[cause](NFTError.md#cause)

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

---

### message

• **message**: `string`

#### Inherited from

[NFTError](NFTError.md).[message](NFTError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

---

### name

• **name**: `string`

#### Inherited from

[NFTError](NFTError.md).[name](NFTError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

[NFTError](NFTError.md).[stack](NFTError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1078

---

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

[NFTError](NFTError.md).[prepareStackTrace](NFTError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:28

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[NFTError](NFTError.md).[stackTraceLimit](NFTError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[NFTError](NFTError.md).[captureStackTrace](NFTError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:21
