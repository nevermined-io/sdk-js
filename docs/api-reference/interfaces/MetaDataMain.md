[@nevermined-io/sdk - v3.0.18](../code-reference.md) / MetaDataMain

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

[src/types/DDOTypes.ts:326](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L326)

---

### author

• **author**: `string`

Name of the entity generating this data (e.g. Tfl, Disney Corp, etc.).

**`Example`**

```ts
'Met Office'
```

#### Defined in

[src/types/DDOTypes.ts:304](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L304)

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

[src/types/DDOTypes.ts:280](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L280)

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

[src/types/DDOTypes.ts:288](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L288)

---

### encryptedService

• `Optional` **encryptedService**: `any`

#### Defined in

[src/types/DDOTypes.ts:322](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L322)

---

### ercType

• `Optional` **ercType**: [`ERCType`](../enums/ERCType.md)

#### Defined in

[src/types/DDOTypes.ts:330](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L330)

---

### files

• `Optional` **files**: [`MetaDataExternalResource`](MetaDataExternalResource.md)[]

Array of File objects including the encrypted file urls and some additional information.

#### Defined in

[src/types/DDOTypes.ts:316](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L316)

---

### isDTP

• `Optional` **isDTP**: `boolean`

#### Defined in

[src/types/DDOTypes.ts:334](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L334)

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

[src/types/DDOTypes.ts:311](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L311)

---

### name

• **name**: `string`

Descriptive name of the Asset.

**`Example`**

```ts
'UK Weather information 2011'
```

#### Defined in

[src/types/DDOTypes.ts:249](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L249)

---

### nftType

• `Optional` **nftType**: [`NeverminedNFTType`](../code-reference.md#neverminednfttype)

#### Defined in

[src/types/DDOTypes.ts:332](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L332)

---

### nonce

• `Optional` **nonce**: `number`

#### Defined in

[src/types/DDOTypes.ts:298](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L298)

---

### paymentAttributes

• `Optional` **paymentAttributes**: [`PaymentAttributes`](PaymentAttributes.md)[]

#### Defined in

[src/types/DDOTypes.ts:336](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L336)

---

### service

• `Optional` **service**: [`ServiceCommon`](ServiceCommon.md)

#### Defined in

[src/types/DDOTypes.ts:328](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L328)

---

### subType

• `Optional` **subType**: `string`

Sub type asssociated to the main type of the asset. This subtype is open so final users are not restricted to use anything they need.
Helps to filter by the sub type of asset, for example if type is a service, the subtype could ai-agent, web-service, web-socket-service, etc
Another example, if the type is 'dataset' the subtype could be 'tabular', 'parquet', 'csv', etc

#### Defined in

[src/types/DDOTypes.ts:273](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L273)

---

### subscription

• `Optional` **subscription**: [`SubscriptionMetadata`](SubscriptionMetadata.md)

#### Defined in

[src/types/DDOTypes.ts:318](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L318)

---

### type

• **type**: `"compute"` \| `"workflow"` \| `"service"` \| `"dataset"` \| `"algorithm"` \| `"subscription"` \| `"model"` \| `"file"` \| `"other"` \| `"assistant"`

Type of the Asset. Helps to filter by the type of asset,
initially ("dataset", "algorithm", "compute", "workflow", "model", "file", "subscription", "other").

**`Example`**

```ts
'dataset'
```

#### Defined in

[src/types/DDOTypes.ts:256](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L256)

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

[src/types/DDOTypes.ts:296](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L296)

---

### webService

• `Optional` **webService**: [`WebService`](WebService.md)

#### Defined in

[src/types/DDOTypes.ts:320](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L320)

---

### workflow

• `Optional` **workflow**: [`Workflow`](Workflow.md)

#### Defined in

[src/types/DDOTypes.ts:324](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/types/DDOTypes.ts#L324)
