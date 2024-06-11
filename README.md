[![banner](https://raw.githubusercontent.com/nevermined-io/assets/main/images/logo/banner_logo.png)](https://nevermined.io)

# Javascript/Typescript API for Nevermined platform

> Javascript SDK for connecting with Nevermined Data Platform
> [nevermined.io](https://nevermined.io)

[![Testing](https://github.com/nevermined-io/sdk-js/actions/workflows/testing.yml/badge.svg?branch=main)](https://github.com/nevermined-io/sdk-js/actions/workflows/testing.yml)

---

## Table of Contents

- [Javascript/Typescript API for Nevermined platform](#javascripttypescript-api-for-nevermined-platform)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Examples](#examples)
  - [Documentation](#documentation)
  - [License](#license)

---

The Nevermined SDK is the official JavaScript library for interacting with the Nevermined network. It provides a convenient way to interact with the Nevermined protocol from a JavaScript/TypeScript application.

## Getting Started

Start by adding the package to your dependencies:

```bash
npm i @nevermined-io/sdk

# or

yarn add @nevermined-io/sdk
```

The package exposes `Nevermined` and `Logger` which you can import in your code like this:

```js
// ES6
import { Nevermined, Logger } from '@nevermined-io/sdk'

// ES2015
const { Nevermined, Logger } = require('@nevermined-io/sdk')
```

You can then connect to the [Smart Contracts](https://github.com/nevermined-io/contracts), [Marketplace API](https://github.com/nevermined-io/metadata), [Nevermined Node](https://github.com/nevermined-io/node) instances, e.g.:

```js
const nevermined: Nevermined = await Nevermined.getInstance({
  // The node of the blockchain to connect to, could also be infura
  web3ProviderUri: 'https://sepolia-rollup.arbitrum.io/rpc',
  // The chain id of the blockchain network
  chainId: 421614,
  // The uri of the Nevermined Marketplace API
  marketplaceUri: 'https://marketplace-api.testing.nevermined.app',
  // The public address of the Nevermined Node where the SDK will be connected
  neverminedNodeUri: 'https://node.testing.nevermined.app',
  // The public address of the Nevermined Node where the SDK will be connected
  neverminedNodeAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
})
```

### Examples

You can see how `sdk-js` is used on:

- [Integration test](/integration/nevermined/)

## Documentation

You can find the full documentation for the SDK in the [Nevermined documentation](https://docs.nevermined.io/docs/nevermined-sdk/intro).

## License

```
Copyright 2024 Nevermined AG
This product includes software developed at
BigchainDB GmbH and Ocean Protocol (https://www.oceanprotocol.com/)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
