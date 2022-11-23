[@nevermined-io/nevermined-sdk-js](../code-reference.md) / Curation

# Interface: Curation

Curation attributes of Assets Metadata.

**`See`**

https://github.com/nevermined-io/docs/blob/master/docs/architecture/specs/metadata/README.md#curation-attributes

## Table of contents

### Properties

- [isListed](Curation.md#islisted)
- [numVotes](Curation.md#numvotes)
- [rating](Curation.md#rating)
- [schema](Curation.md#schema)

## Properties

### isListed

• `Optional` **isListed**: `boolean`

Flag unsuitable content.

**`Example`**

```ts
true
```

#### Defined in

[src/ddo/MetaData.ts:226](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L226)

___

### numVotes

• **numVotes**: `number`

Number of votes. 0 is the default value.

**`Example`**

```ts
123
```

#### Defined in

[src/ddo/MetaData.ts:214](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L214)

___

### rating

• **rating**: `number`

Decimal value between 0 and 1. 0 is the default value.

**`Example`**

```ts
0.93
```

#### Defined in

[src/ddo/MetaData.ts:208](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L208)

___

### schema

• `Optional` **schema**: `string`

Schema applied to calculate the rating.

**`Example`**

```ts
"Binary Voting"
```

#### Defined in

[src/ddo/MetaData.ts:220](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L220)
