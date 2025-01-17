[@nevermined-io/sdk - v3.0.47](../code-reference.md) / Curation

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

[src/types/DDOTypes.ts:412](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/types/DDOTypes.ts#L412)

---

### numVotes

• **numVotes**: `number`

Number of votes. 0 is the default value.

**`Example`**

```ts
123
```

#### Defined in

[src/types/DDOTypes.ts:400](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/types/DDOTypes.ts#L400)

---

### rating

• **rating**: `number`

Decimal value between 0 and 1. 0 is the default value.

**`Example`**

```ts
0.93
```

#### Defined in

[src/types/DDOTypes.ts:394](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/types/DDOTypes.ts#L394)

---

### schema

• `Optional` **schema**: `string`

Schema applied to calculate the rating.

**`Example`**

```ts
'Binary Voting'
```

#### Defined in

[src/types/DDOTypes.ts:406](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/types/DDOTypes.ts#L406)
