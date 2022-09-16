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

[src/ddo/MetaData.ts:219](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L219)

___

### numVotes

• **numVotes**: `number`

Number of votes. 0 is the default value.

**`Example`**

```ts
123
```

#### Defined in

[src/ddo/MetaData.ts:207](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L207)

___

### rating

• **rating**: `number`

Decimal value between 0 and 1. 0 is the default value.

**`Example`**

```ts
0.93
```

#### Defined in

[src/ddo/MetaData.ts:201](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L201)

___

### schema

• `Optional` **schema**: `string`

Schema applied to calculate the rating.

**`Example`**

```ts
"Binary Voting"
```

#### Defined in

[src/ddo/MetaData.ts:213](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L213)
