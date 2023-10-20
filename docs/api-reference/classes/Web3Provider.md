[@nevermined-io/sdk](../code-reference.md) / Web3Provider

# Class: Web3Provider

## Table of contents

### Constructors

- [constructor](Web3Provider.md#constructor)

### Methods

- [getWeb3](Web3Provider.md#getweb3)

## Constructors

### constructor

• **new Web3Provider**()

## Methods

### getWeb3

▸ `Static` **getWeb3**(`config?`): `Promise`<`JsonRpcProvider` \| `BrowserProvider`\>

Returns ethers.Provider instance.

#### Parameters

| Name     | Type                                                    |
| :------- | :------------------------------------------------------ |
| `config` | `Partial`<[`NeverminedOptions`](NeverminedOptions.md)\> |

#### Returns

`Promise`<`JsonRpcProvider` \| `BrowserProvider`\>

web3 instance

#### Defined in

[src/keeper/Web3Provider.ts:10](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/Web3Provider.ts#L10)
