[@nevermined-io/sdk - v3.0.35](../code-reference.md) / MetaDataMain

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
- [nonce](MetaDataMain.md#nonce)
- [paymentAttributes](MetaDataMain.md#paymentattributes)
- [service](MetaDataMain.md#service)
- [subType](MetaDataMain.md#subtype)
- [subscription](MetaDataMain.md#subscription)
- [type](MetaDataMain.md#type)
- [updatedAt](MetaDataMain.md#updatedat)
- [webService](MetaDataMain.md#webservice)
- [workflow](MetaDataMain.md#workflow)

## Properties

### algorithm

• `Optional` **algorithm**: [`Algorithm`](Algorithm.md)

#### Defined in

[src/types/DDOTypes.ts:358](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L358)

---

### author

• **author**: `string`

Name of the entity generating this data (e.g. Tfl, Disney Corp, etc.).

**`Example`**

```ts
'Met Office'
```

#### Defined in

[src/types/DDOTypes.ts:336](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L336)

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

[src/types/DDOTypes.ts:312](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L312)

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

[src/types/DDOTypes.ts:320](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L320)

---

### encryptedService

• `Optional` **encryptedService**: `any`

#### Defined in

[src/types/DDOTypes.ts:354](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L354)

---

### ercType

• `Optional` **ercType**: [`ERCType`](../enums/ERCType.md)

#### Defined in

[src/types/DDOTypes.ts:362](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L362)

---

### files

• `Optional` **files**: [`MetaDataExternalResource`](MetaDataExternalResource.md)[]

Array of File objects including the encrypted file urls and some additional information.

#### Defined in

[src/types/DDOTypes.ts:348](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L348)

---

### isDTP

• `Optional` **isDTP**: `boolean`

#### Defined in

[src/types/DDOTypes.ts:366](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L366)

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

[src/types/DDOTypes.ts:343](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L343)

---

### name

• **name**: `string`

Descriptive name of the Asset.

**`Example`**

```ts
'UK Weather information 2011'
```

#### Defined in

[src/types/DDOTypes.ts:280](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L280)

---

### nftType

• `Optional` **nftType**: [`NeverminedNFTType`](../code-reference.md#neverminednfttype)

#### Defined in

[src/types/DDOTypes.ts:364](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L364)

---

### nonce

• `Optional` **nonce**: `number`

#### Defined in

[src/types/DDOTypes.ts:330](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L330)

---

### paymentAttributes

• `Optional` **paymentAttributes**: [`PaymentAttributes`](PaymentAttributes.md)[]

#### Defined in

[src/types/DDOTypes.ts:368](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L368)

---

### service

• `Optional` **service**: [`ServiceCommon`](ServiceCommon.md)

#### Defined in

[src/types/DDOTypes.ts:360](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L360)

---

### subType

• `Optional` **subType**: `string`

Sub type asssociated to the main type of the asset. This subtype is open so final users are not restricted to use anything they need.
Helps to filter by the sub type of asset, for example if type is a service, the subtype could ai-agent, web-service, web-socket-service, etc
Another example, if the type is 'dataset' the subtype could be 'tabular', 'parquet', 'csv', etc

#### Defined in

[src/types/DDOTypes.ts:305](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L305)

---

### subscription

• `Optional` **subscription**: [`SubscriptionMetadata`](SubscriptionMetadata.md)

#### Defined in

[src/types/DDOTypes.ts:350](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L350)

---

### type

• **type**: `"compute"` \| `"workflow"` \| `"service"` \| `"dataset"` \| `"algorithm"` \| `"subscription"` \| `"model"` \| `"file"` \| `"other"` \| `"assistant"` \| `"agent"`

Type of the Asset. Helps to filter by the type of asset,
initially ("dataset", "algorithm", "compute", "workflow", "model", "file", "subscription", "other", "agent").

**`Example`**

```ts
'dataset'
```

#### Defined in

[src/types/DDOTypes.ts:287](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L287)

---

### updatedAt

• `Optional` **updatedAt**: `string`

The date on which the asset DDO was updated into the metadata store.
This value is created automatically by Metadata upon update,
so this value can't be set.

**`Example`**

```ts
'2019-01-31T08:38:32Z'
```

#### Defined in

[src/types/DDOTypes.ts:328](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L328)

---

### webService

• `Optional` **webService**: [`WebService`](WebService.md)

#### Defined in

[src/types/DDOTypes.ts:352](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L352)

---

### workflow

• `Optional` **workflow**: [`Workflow`](Workflow.md)

#### Defined in

[src/types/DDOTypes.ts:356](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L356)
