[@nevermined-io/sdk - v3.0.19](../code-reference.md) / Curation

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

[src/types/DDOTypes.ts:366](https://github.com/nevermined-io/sdk-js/blob/065f3decbaad4f3943ea9ea3e7eade094f617f96/src/types/DDOTypes.ts#L366)

---

### numVotes

• **numVotes**: `number`

Number of votes. 0 is the default value.

**`Example`**

```ts
123
```

#### Defined in

[src/types/DDOTypes.ts:354](https://github.com/nevermined-io/sdk-js/blob/065f3decbaad4f3943ea9ea3e7eade094f617f96/src/types/DDOTypes.ts#L354)

---

### rating

• **rating**: `number`

Decimal value between 0 and 1. 0 is the default value.

**`Example`**

```ts
0.93
```

#### Defined in

[src/types/DDOTypes.ts:348](https://github.com/nevermined-io/sdk-js/blob/065f3decbaad4f3943ea9ea3e7eade094f617f96/src/types/DDOTypes.ts#L348)

---

### schema

• `Optional` **schema**: `string`

Schema applied to calculate the rating.

**`Example`**

```ts
'Binary Voting'
```

#### Defined in

[src/types/DDOTypes.ts:360](https://github.com/nevermined-io/sdk-js/blob/065f3decbaad4f3943ea9ea3e7eade094f617f96/src/types/DDOTypes.ts#L360)
