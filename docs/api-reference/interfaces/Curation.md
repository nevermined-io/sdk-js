[@nevermined-io/sdk - v3.0.28](../code-reference.md) / Curation

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

[src/types/DDOTypes.ts:367](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L367)

---

### numVotes

• **numVotes**: `number`

Number of votes. 0 is the default value.

**`Example`**

```ts
123
```

#### Defined in

[src/types/DDOTypes.ts:355](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L355)

---

### rating

• **rating**: `number`

Decimal value between 0 and 1. 0 is the default value.

**`Example`**

```ts
0.93
```

#### Defined in

[src/types/DDOTypes.ts:349](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L349)

---

### schema

• `Optional` **schema**: `string`

Schema applied to calculate the rating.

**`Example`**

```ts
'Binary Voting'
```

#### Defined in

[src/types/DDOTypes.ts:361](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L361)
