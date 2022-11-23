[@nevermined-io/nevermined-sdk-js](../code-reference.md) / File

# Interface: File

## Table of contents

### Properties

- [checksum](File.md#checksum)
- [checksumType](File.md#checksumtype)
- [compression](File.md#compression)
- [contentLength](File.md#contentlength)
- [contentType](File.md#contenttype)
- [encoding](File.md#encoding)
- [encryption](File.md#encryption)
- [index](File.md#index)
- [name](File.md#name)
- [resourceId](File.md#resourceid)
- [url](File.md#url)

## Properties

### checksum

• `Optional` **checksum**: `string`

File checksum.

#### Defined in

[src/ddo/MetaData.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L97)

___

### checksumType

• `Optional` **checksumType**: `string`

Checksum hash algorithm.

#### Defined in

[src/ddo/MetaData.ts:102](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L102)

___

### compression

• `Optional` **compression**: `string`

File compression (e.g. no, gzip, bzip2, etc).

**`Example`**

```ts
"zip"
```

#### Defined in

[src/ddo/MetaData.ts:124](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L124)

___

### contentLength

• `Optional` **contentLength**: `string`

File content length.

#### Defined in

[src/ddo/MetaData.ts:107](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L107)

___

### contentType

• **contentType**: `string`

File format, if applicable.

**`Example`**

```ts
"text/csv"
```

#### Defined in

[src/ddo/MetaData.ts:92](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L92)

___

### encoding

• `Optional` **encoding**: `string`

File encoding.

**`Example`**

```ts
"UTF-8"
```

#### Defined in

[src/ddo/MetaData.ts:118](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L118)

___

### encryption

• `Optional` **encryption**: ``"dtp"``

Encryption mode used.

**`Remarks`**

If not provided is assumed the files are not encrypted. Currently only `dtp` is implemented.

#### Defined in

[src/ddo/MetaData.ts:132](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L132)

___

### index

• `Optional` **index**: `number`

File index.

#### Defined in

[src/ddo/MetaData.ts:86](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L86)

___

### name

• `Optional` **name**: `string`

File name.

#### Defined in

[src/ddo/MetaData.ts:76](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L76)

___

### resourceId

• `Optional` **resourceId**: `string`

Resource ID (depending on the source).

#### Defined in

[src/ddo/MetaData.ts:112](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L112)

___

### url

• **url**: `string`

File URL.

#### Defined in

[src/ddo/MetaData.ts:81](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L81)
