[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Squid-js</h1>

> 🦑 JavaScript client library for Ocean Protocol
> [oceanprotocol.com](https://oceanprotocol.com)

[![npm](https://img.shields.io/npm/v/@oceanprotocol/squid.svg)](https://www.npmjs.com/package/@oceanprotocol/squid)
[![Travis (.com)](https://img.shields.io/travis/com/oceanprotocol/squid-js.svg)](https://travis-ci.com/oceanprotocol/squid-js)
[![GitHub contributors](https://img.shields.io/github/contributors/oceanprotocol/squid-js.svg)](https://github.com/oceanprotocol/squid-js/graphs/contributors)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8508313231b44b0997ec84898cd6f9db)](https://app.codacy.com/app/ocean-protocol/squid-js?utm_source=github.com&utm_medium=referral&utm_content=oceanprotocol/squid-js&utm_campaign=Badge_Grade_Settings)
[![js oceanprotocol](https://img.shields.io/badge/js-oceanprotocol-7b1173.svg)](https://github.com/oceanprotocol/eslint-config-oceanprotocol)
[![Greenkeeper badge](https://badges.greenkeeper.io/oceanprotocol/squid-js.svg)](https://greenkeeper.io/)

---

**🐲🦑 THERE COULD BE DRAGONS AND SQUIDS. If you run into problems, please open up [a new issue](https://github.com/oceanprotocol/squid-js/issues). 🦑🐲**

---

- [Get started](#get-started)
  - [Examples](#examples)
- [Documentation](#documentation)
  - [Migration Guide](#migration-guide)
- [Development](#development)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
- [Code Style](#code-style)
- [Production build](#production-build)
- [Releases](#releases)
- [License](#license)

---

## Get started

Start by adding the package to your dependencies:

```bash
npm i @oceanprotocol/squid
```

The package exposes `Ocean` and `Logger` which you can import in your code like this:

```js
// ES6
import { Ocean, Logger } from '@oceanprotocol/squid'

// ES2015
const { Ocean, Logger } = require('@oceanprotocol/squid')
```

You can then connect to running [Keeper](https://github.com/oceanprotocol/keeper-contracts), [Aquarius](https://github.com/oceanprotocol/aquarius), [Brizo](https://github.com/oceanprotocol/brizo) instances, e.g.:

```js
const ocean: Ocean = await Ocean.getInstance({
    // the node of the blockchain to connect to, could also be infura
    nodeUri: 'http://localhost:8545',
    // the uri of aquarius
    aquariusUri: 'http://localhost:5000',
    // the uri of brizo
    brizoUri: 'http://localhost:8030',
    // address that brizo uses
    brizoAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e'
    // the uri to the parity node you want to use for encryption and decryption
    parityUri: 'http://localhost:9545',
    // the uri of the secret store that holds the keys
    secretStoreUri: 'http://localhost:12001'
})
```

For an overview of endpoint configurations making up various Ocean networks, please refer to [`.env.local.example`](https://github.com/oceanprotocol/commons/blob/master/client/.env.local.example) from commons.

### Examples

You can see how `squid-js` is used on:

- [Docs: React Tutorial](https://docs.oceanprotocol.com/tutorials/react-setup/)
- [Integration test](/src/integration/ocean/)
- [Tuna](https://github.com/oceanprotocol/tuna/tree/develop/node)

## Documentation

**[Docs: squid-js API Reference →](https://docs.oceanprotocol.com/references/squid-js/)**

Alternatively, you can generate the raw TypeDoc documentation locally by running:

```bash
# will output to ./doc folder
npm run doc
```

### Migration Guide

Instructions on how to migrate between breaking versions:

- [Migration Guide](MIGRATION.md)

## Development

To start development you need to:

```bash
npm i
npm start
```

## Testing

### Unit Tests

For unit tests, running [`ganache-cli`](https://github.com/trufflesuite/ganache-cli) is required before starting the tests. It's best to start it on a different port so it doesn't clash with anything running in Barge:

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

Besides a running `ganache-cli` instance, a locally running Ocean network is required. To do so before running the tests, use [Barge](https://github.com/oceanprotocol/barge):

```bash
git clone https://github.com/oceanprotocol/barge
cd barge

./start_ocean.sh --no-commons
```

In another terminal window, run this script and export the seed phrase:

```bash
# copies the contract artifacts once the local Ocean network is up and running
./scripts/keeper.sh

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

Project follows [eslint-config-oceanprotocol](https://github.com/oceanprotocol/eslint-config-oceanprotocol). For linting and auto-formatting you can use:

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

- bumps the project version in `package.json`, `package-lock.json`
- auto-generates and updates the CHANGELOG.md file from commit messages
- creates a Git tag
- commits and pushes everything
- creates a GitHub release with commit messages as description
- Git tag push will trigger Travis to do a npm release

You can execute the script using arguments to bump the version accordingly:

- To bump a patch version: `npm run release`
- To bump a minor version: `npm run release minor`
- To bump a major version: `npm run release major`

For the GitHub releases steps a GitHub personal access token, exported as `GITHUB_TOKEN` is required. [Setup](https://github.com/release-it/release-it#github-releases)

## License

```text
Copyright 2019 Ocean Protocol Foundation Ltd.

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
