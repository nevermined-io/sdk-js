[@nevermined-io/nevermined-sdk-js](../code-reference.md) / MetaDataMain

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
- [files](MetaDataMain.md#files)
- [license](MetaDataMain.md#license)
- [name](MetaDataMain.md#name)
- [price](MetaDataMain.md#price)
- [service](MetaDataMain.md#service)
- [type](MetaDataMain.md#type)
- [workflow](MetaDataMain.md#workflow)

## Properties

### algorithm

• `Optional` **algorithm**: [`Algorithm`](Algorithm.md)

#### Defined in

[src/ddo/MetaData.ts:205](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L205)

___

### author

• **author**: `string`

Name of the entity generating this data (e.g. Tfl, Disney Corp, etc.).

**`Example`**

```ts
"Met Office"
```

#### Defined in

[src/ddo/MetaData.ts:178](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L178)

___

### dateCreated

• **dateCreated**: `string`

The date on which the asset was created by the originator in
ISO 8601 format, Coordinated Universal Time.

**`Example`**

```ts
"2019-01-31T08:38:32Z"
```

#### Defined in

[src/ddo/MetaData.ts:162](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L162)

___

### datePublished

• `Optional` **datePublished**: `string`

The date on which the asset DDO was registered into the metadata store.
This value is created automatically by Metadata upon registering,
so this value can't be set.

**`Example`**

```ts
"2019-01-31T08:38:32Z"
```

#### Defined in

[src/ddo/MetaData.ts:171](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L171)

___

### encryptedService

• `Optional` **encryptedService**: `any`

#### Defined in

[src/ddo/MetaData.ts:201](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L201)

___

### files

• `Optional` **files**: [`File`](File.md)[]

Array of File objects including the encrypted file urls and some additional information.

#### Defined in

[src/ddo/MetaData.ts:199](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L199)

___

### license

• **license**: `string`

Short name referencing the license of the asset (e.g. Public Domain, CC-0, CC-BY, No License Specified, etc. ).
If it's not specified, the following value will be added: "No License Specified".

**`Example`**

```ts
"CC-BY"
```

#### Defined in

[src/ddo/MetaData.ts:186](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L186)

___

### name

• **name**: `string`

Descriptive name of the Asset.

**`Example`**

```ts
"UK Weather information 2011"
```

#### Defined in

[src/ddo/MetaData.ts:146](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L146)

___

### price

• **price**: `string`

Price of the asset.

**`Example`**

```ts
"1000000000000000000"
```

#### Defined in

[src/ddo/MetaData.ts:193](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L193)

___

### service

• `Optional` **service**: [`Service`](Service.md)

#### Defined in

[src/ddo/MetaData.ts:207](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L207)

___

### type

• **type**: ``"dataset"`` \| ``"algorithm"`` \| ``"compute"`` \| ``"workflow"``

Type of the Asset. Helps to filter by the type of asset,
initially ("dataset", "algorithm", "compute", "workflow", "compute", "other").

**`Example`**

```ts
"dataset"
```

#### Defined in

[src/ddo/MetaData.ts:154](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L154)

___

### workflow

• `Optional` **workflow**: [`Workflow`](Workflow.md)

#### Defined in

[src/ddo/MetaData.ts:203](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L203)
