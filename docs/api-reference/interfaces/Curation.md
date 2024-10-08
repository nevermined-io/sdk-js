[@nevermined-io/sdk - v3.0.39](../code-reference.md) / Curation

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

[src/types/DDOTypes.ts:411](https://github.com/nevermined-io/sdk-js/blob/25427eb0c0f0254c08ad8193d966cb0284e2bd07/src/types/DDOTypes.ts#L411)

---

### numVotes

• **numVotes**: `number`

Number of votes. 0 is the default value.

**`Example`**

```ts
123
```

#### Defined in

[src/types/DDOTypes.ts:399](https://github.com/nevermined-io/sdk-js/blob/25427eb0c0f0254c08ad8193d966cb0284e2bd07/src/types/DDOTypes.ts#L399)

---

### rating

• **rating**: `number`

Decimal value between 0 and 1. 0 is the default value.

**`Example`**

```ts
0.93
```

#### Defined in

[src/types/DDOTypes.ts:393](https://github.com/nevermined-io/sdk-js/blob/25427eb0c0f0254c08ad8193d966cb0284e2bd07/src/types/DDOTypes.ts#L393)

---

### schema

• `Optional` **schema**: `string`

Schema applied to calculate the rating.

**`Example`**

```ts
'Binary Voting'
```

#### Defined in

[src/types/DDOTypes.ts:405](https://github.com/nevermined-io/sdk-js/blob/25427eb0c0f0254c08ad8193d966cb0284e2bd07/src/types/DDOTypes.ts#L405)
