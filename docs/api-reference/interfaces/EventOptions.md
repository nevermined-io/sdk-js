[@nevermined-io/sdk - v3.0.28](../code-reference.md) / EventOptions

# Interface: EventOptions

## Table of contents

### Properties

- [eventName](EventOptions.md#eventname)
- [filterJsonRpc](EventOptions.md#filterjsonrpc)
- [filterSubgraph](EventOptions.md#filtersubgraph)
- [fromBlock](EventOptions.md#fromblock)
- [result](EventOptions.md#result)
- [toBlock](EventOptions.md#toblock)

## Properties

### eventName

• **eventName**: `string`

#### Defined in

[src/types/EventTypes.ts:8](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/EventTypes.ts#L8)

---

### filterJsonRpc

• `Optional` **filterJsonRpc**: [`FilterContractEvent`](FilterContractEvent.md)

#### Defined in

[src/types/EventTypes.ts:9](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/EventTypes.ts#L9)

---

### filterSubgraph

• `Optional` **filterSubgraph**: `Record`\<`string`, `unknown`\>

#### Defined in

[src/types/EventTypes.ts:10](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/EventTypes.ts#L10)

---

### fromBlock

• `Optional` **fromBlock**: `bigint` \| `BlockTag`

#### Defined in

[src/types/EventTypes.ts:12](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/EventTypes.ts#L12)

---

### result

• `Optional` **result**: `Record`\<`string`, `unknown`\>

#### Defined in

[src/types/EventTypes.ts:11](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/EventTypes.ts#L11)

---

### toBlock

• `Optional` **toBlock**: `bigint` \| `BlockTag`

#### Defined in

[src/types/EventTypes.ts:13](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/EventTypes.ts#L13)
