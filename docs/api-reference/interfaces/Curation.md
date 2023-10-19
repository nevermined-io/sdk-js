[@nevermined-io/sdk](../code-reference.md) / Curation

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

[src/ddo/types.ts:315](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L315)

---

### numVotes

• **numVotes**: `number`

Number of votes. 0 is the default value.

**`Example`**

```ts
123
```

#### Defined in

[src/ddo/types.ts:303](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L303)

---

### rating

• **rating**: `number`

Decimal value between 0 and 1. 0 is the default value.

**`Example`**

```ts
0.93
```

#### Defined in

[src/ddo/types.ts:297](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L297)

---

### schema

• `Optional` **schema**: `string`

Schema applied to calculate the rating.

**`Example`**

```ts
'Binary Voting'
```

#### Defined in

[src/ddo/types.ts:309](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L309)
