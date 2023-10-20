[@nevermined-io/sdk](../code-reference.md) / MetaDataExternalResource

# Interface: MetaDataExternalResource

## Table of contents

### Properties

- [checksum](MetaDataExternalResource.md#checksum)
- [checksumType](MetaDataExternalResource.md#checksumtype)
- [compression](MetaDataExternalResource.md#compression)
- [contentLength](MetaDataExternalResource.md#contentlength)
- [contentType](MetaDataExternalResource.md#contenttype)
- [encoding](MetaDataExternalResource.md#encoding)
- [encryption](MetaDataExternalResource.md#encryption)
- [index](MetaDataExternalResource.md#index)
- [name](MetaDataExternalResource.md#name)
- [resourceId](MetaDataExternalResource.md#resourceid)
- [resourceType](MetaDataExternalResource.md#resourcetype)
- [url](MetaDataExternalResource.md#url)

## Properties

### checksum

• `Optional` **checksum**: `string`

File checksum.

#### Defined in

[src/ddo/types.ts:138](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L138)

---

### checksumType

• `Optional` **checksumType**: `string`

Checksum hash algorithm.

#### Defined in

[src/ddo/types.ts:143](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L143)

---

### compression

• `Optional` **compression**: `string`

File compression (e.g. no, gzip, bzip2, etc).

**`Example`**

```ts
'zip'
```

#### Defined in

[src/ddo/types.ts:171](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L171)

---

### contentLength

• `Optional` **contentLength**: `string`

File content length.

#### Defined in

[src/ddo/types.ts:148](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L148)

---

### contentType

• **contentType**: `string`

File format, if applicable.

**`Example`**

```ts
'text/csv'
```

#### Defined in

[src/ddo/types.ts:133](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L133)

---

### encoding

• `Optional` **encoding**: `string`

File encoding.

**`Example`**

```ts
'UTF-8'
```

#### Defined in

[src/ddo/types.ts:165](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L165)

---

### encryption

• `Optional` **encryption**: `"dtp"` \| `"dleq"`

Encryption mode used.

**`Remarks`**

If not provided is assumed the files are not encrypted. Currently only `dtp` is implemented.

#### Defined in

[src/ddo/types.ts:179](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L179)

---

### index

• `Optional` **index**: `number`

File index.

#### Defined in

[src/ddo/types.ts:127](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L127)

---

### name

• `Optional` **name**: `string`

File name.

#### Defined in

[src/ddo/types.ts:117](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L117)

---

### resourceId

• `Optional` **resourceId**: `string`

Resource ID (depending on the source). It is used to reference the id of the file in an external source.
For example the `ugcId`

#### Defined in

[src/ddo/types.ts:159](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L159)

---

### resourceType

• `Optional` **resourceType**: [`ExternalResourceFileType`](../enums/ExternalResourceFileType.md)

The type of the external resource file

#### Defined in

[src/ddo/types.ts:153](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L153)

---

### url

• **url**: `string`

File URL.

#### Defined in

[src/ddo/types.ts:122](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L122)
