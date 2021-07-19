[![banner](https://raw.githubusercontent.com/nevermined-io/assets/main/images/logo/banner_logo.png)](https://nevermined.io)

# Javascript/Typescript API for Nevermined Data platform

> Javascript SDK for connecting with Nevermined Data Platform
> [nevermined.io](https://nevermined.io)

![CI Build](https://github.com/nevermined-io/sdk-js/workflows/Build/badge.svg)

---

## Table of Contents

* [Javascript/Typescript API for Nevermined Data platform](#javascripttypescript-api-for-nevermined-data-platform)
  * [Table of Contents](#table-of-contents)
  * [Get started](#get-started)
    * [Examples](#examples)
  * [Documentation](#documentation)
    * [Migration Guide](#migration-guide)
  * [Development](#development)
  * [Testing](#testing)
    * [Unit Tests](#unit-tests)
    * [Integration Tests](#integration-tests)
  * [Code Style](#code-style)
  * [Production build](#production-build)
  * [Releases](#releases)
  * [Attribution](#attribution)
  * [License](#license)

---

## Get started

Start by adding the package to your dependencies:

```bash
npm i @nevermined-io/nevermined-sdk-js
```

The package exposes `Nevermined` and `Logger` which you can import in your code like this:

```js
// ES6
import { Nevermined, Logger } from '@nevermined-io/nevermined-sdk-js'

// ES2015
const { Nevermined, Logger } = require('@nevermined-io/nevermined-sdk-js')
```

You can then connect to the [Smart Contracts](https://github.com/nevermined-io/contracts), [Metadata API](https://github.com/nevermined-io/metadata), [Gateway](https://github.com/nevermined-io/gateway) instances, e.g.:

```js
const nevermined: Nevermined = await Nevermined.getInstance({
    // the node of the blockchain to connect to, could also be infura
    nodeUri: 'http://localhost:8545',
    // the uri of metadata
    metadataUri: 'http://localhost:5000',
    // the uri of gateway
    gatewayUri: 'http://localhost:8030',
    // the uri of faucet
    faucetUri: 'http://localhost:3001',
    // address that gateway uses
    gatewayAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e'
    // the uri to the parity node you want to use for encryption and decryption
    parityUri: 'http://localhost:9545',
    // the uri of the secret store that holds the keys
    secretStoreUri: 'http://localhost:12001'
})
```

### Examples

You can see how `nevermined-sdk-js` is used on:

* [Integration test](/src/integration/nevermined/)

## Documentation

You can generate the raw TypeDoc documentation locally by running:

```bash
# will output to ./doc folder
npm run doc
```

### Migration Guide

Instructions on how to migrate between breaking versions:

* [Migration Guide](MIGRATION.md)

## Development

To start development you need to:

```bash
npm i
npm start
```

## Testing

### Unit Tests

For unit tests, running [`ganache-cli`](https://github.com/trufflesuite/ganache-cli) is required before starting the tests. It's best to start it on a different port so it doesn't clash with anything running in [Nevermined Tools](https://github.com/nevermined-io/tools):

```bash
npm i -g ganache-cli
ganache-cli --port 18545
export ETH_PORT=18545
```

To start unit tests, run:

```bash
npm test
```

or to watch for changes:

```bash
npm run test:watch
```

to create code coverage information:

```bash
npm run test:cover
```

### Integration Tests

Besides a running `ganache-cli` instance, a locally running Nevermined network is required.
To do so before running the tests, use [Nevermined Tools](https://github.com/nevermined-io/tools):

```bash
git clone https://github.com/nevermined-io/tools
cd tools

./start_nevermined.sh --no-marketplace
```

In another terminal window, run this script and export the seed phrase:

```bash
# copies the contract artifacts once the local Nevermined network is up and running
./scripts/wait-nevermined.sh

# export Spree accounts seed phrase
export SEED_WORDS="taxi music thumb unique chat sand crew more leg another off lamp"
```

Once everything is up, run the integration tests:

```bash
npm run integration
```

to generate code coverage information during test, run:

```bash
npm run integration:cover
```

## Code Style

For linting and auto-formatting you can use:

```bash
# lint all ts with eslint
npm run lint

# auto format all ts with prettier, taking all configs into account
npm run format
```

## Production build

To create a production build:

```bash
npm run build
```

## Releases

From a clean `master` branch you can run any release task doing the following:

* bumps the project version in `package.json`, `package-lock.json`
* auto-generates and updates the CHANGELOG.md file from commit messages
* creates a Git tag
* commits and pushes everything
* creates a GitHub release with commit messages as description
* Git tag push will trigger Travis to do a npm release

You can execute the script using arguments to bump the version accordingly:

* To bump a patch version: `npm run release`
* To bump a minor version: `npm run release minor`
* To bump a major version: `npm run release major`

For the GitHub releases steps a GitHub personal access token, exported as `GITHUB_TOKEN` is required. [Setup](https://github.com/release-it/release-it#github-releases)

## Attribution

This library is based in the [Ocean Protocol](https://oceanprotocol.com) [Squid JS](https://github.com/oceanprotocol/squid-js) library.
It keeps the same Apache v2 License and adds some improvements. See [NOTICE file](NOTICE).

## License

```
Copyright 2020 Keyko GmbH
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
