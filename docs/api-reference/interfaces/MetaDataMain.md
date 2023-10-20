[@nevermined-io/sdk](../code-reference.md) / MetaDataMain

# Interface: MetaDataMain

Main attributes of assets metadata.

**`See`**

https://github.com/nevermined-io/docs/blob/master/docs/architecture/specs/metadata/README.md

## Table of contents

### Properties

- [algorithm](MetaDataMain.md#algorithm)
- [author](MetaDataMain.md#author)
- [dateCreated](MetaDataMain.md#datecreated)
- [datePublished](MetaDataMain.md#datepublished)
- [encryptedService](MetaDataMain.md#encryptedservice)
- [ercType](MetaDataMain.md#erctype)
- [files](MetaDataMain.md#files)
- [isDTP](MetaDataMain.md#isdtp)
- [license](MetaDataMain.md#license)
- [name](MetaDataMain.md#name)
- [nftType](MetaDataMain.md#nfttype)
- [service](MetaDataMain.md#service)
- [type](MetaDataMain.md#type)
- [webService](MetaDataMain.md#webservice)
- [workflow](MetaDataMain.md#workflow)

## Properties

### algorithm

• `Optional` **algorithm**: [`Algorithm`](Algorithm.md)

#### Defined in

[src/ddo/types.ts:277](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L277)

---

### author

• **author**: `string`

Name of the entity generating this data (e.g. Tfl, Disney Corp, etc.).

**`Example`**

```ts
'Met Office'
```

#### Defined in

[src/ddo/types.ts:257](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L257)

---

### dateCreated

• **dateCreated**: `string`

The date on which the asset was created by the originator in
ISO 8601 format, Coordinated Universal Time.

**`Example`**

```ts
'2019-01-31T08:38:32Z'
```

#### Defined in

[src/ddo/types.ts:243](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L243)

---

### datePublished

• `Optional` **datePublished**: `string`

The date on which the asset DDO was registered into the metadata store.
This value is created automatically by Metadata upon registering,
so this value can't be set.

**`Example`**

```ts
'2019-01-31T08:38:32Z'
```

#### Defined in

[src/ddo/types.ts:251](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L251)

---

### encryptedService

• `Optional` **encryptedService**: `any`

#### Defined in

[src/ddo/types.ts:273](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L273)

---

### ercType

• `Optional` **ercType**: [`ERCType`](../enums/ERCType.md)

#### Defined in

[src/ddo/types.ts:281](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L281)

---

### files

• `Optional` **files**: [`MetaDataExternalResource`](MetaDataExternalResource.md)[]

Array of File objects including the encrypted file urls and some additional information.

#### Defined in

[src/ddo/types.ts:269](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L269)

---

### isDTP

• `Optional` **isDTP**: `boolean`

#### Defined in

[src/ddo/types.ts:285](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L285)

---

### license

• **license**: `string`

Short name referencing the license of the asset (e.g. Public Domain, CC-0, CC-BY, No License Specified, etc. ).
If it's not specified, the following value will be added: "No License Specified".

**`Example`**

```ts
'CC-BY'
```

#### Defined in

[src/ddo/types.ts:264](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L264)

---

### name

• **name**: `string`

Descriptive name of the Asset.

**`Example`**

```ts
'UK Weather information 2011'
```

#### Defined in

[src/ddo/types.ts:221](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L221)

---

### nftType

• `Optional` **nftType**: [`NeverminedNFTType`](../code-reference.md#neverminednfttype)

#### Defined in

[src/ddo/types.ts:283](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L283)

---

### service

• `Optional` **service**: [`ServiceCommon`](ServiceCommon.md)

#### Defined in

[src/ddo/types.ts:279](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L279)

---

### type

• **type**: `"compute"` \| `"workflow"` \| `"service"` \| `"dataset"` \| `"algorithm"` \| `"subscription"` \| `"other"`

Type of the Asset. Helps to filter by the type of asset,
initially ("dataset", "algorithm", "compute", "workflow", "compute", "subscription", "other").

**`Example`**

```ts
'dataset'
```

#### Defined in

[src/ddo/types.ts:228](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L228)

---

### webService

• `Optional` **webService**: [`WebService`](WebService.md)

#### Defined in

[src/ddo/types.ts:271](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L271)

---

### workflow

• `Optional` **workflow**: [`Workflow`](Workflow.md)

#### Defined in

[src/ddo/types.ts:275](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L275)
