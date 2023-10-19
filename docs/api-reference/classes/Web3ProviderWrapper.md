[@nevermined-io/sdk](../code-reference.md) / Web3ProviderWrapper

# Class: Web3ProviderWrapper

## Table of contents

### Constructors

- [constructor](Web3ProviderWrapper.md#constructor)

### Properties

- [provider](Web3ProviderWrapper.md#provider)

### Methods

- [send](Web3ProviderWrapper.md#send)

## Constructors

### constructor

• **new Web3ProviderWrapper**(`provider`)

#### Parameters

| Name       | Type                                   |
| :--------- | :------------------------------------- |
| `provider` | `JsonRpcProvider` \| `BrowserProvider` |

#### Defined in

[src/keeper/utils.ts:82](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/utils.ts#L82)

## Properties

### provider

• **provider**: `JsonRpcProvider` \| `BrowserProvider`

#### Defined in

[src/keeper/utils.ts:80](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/utils.ts#L80)

## Methods

### send

▸ **send**(`payload`, `callback`): `void`

#### Parameters

| Name       | Type                                                                                           |
| :--------- | :--------------------------------------------------------------------------------------------- |
| `payload`  | [`JsonRpcPayload`](../interfaces/JsonRpcPayload.md)                                            |
| `callback` | (`error`: `Error`, `result?`: [`JsonRpcResponse`](../interfaces/JsonRpcResponse.md)) => `void` |

#### Returns

`void`

#### Defined in

[src/keeper/utils.ts:85](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/utils.ts#L85)
