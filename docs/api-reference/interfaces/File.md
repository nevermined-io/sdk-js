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
- [index](File.md#index)
- [name](File.md#name)
- [resourceId](File.md#resourceid)
- [url](File.md#url)

## Properties

### checksum

• `Optional` **checksum**: `string`

File checksum.

#### Defined in

[src/ddo/MetaData.ts:101](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L101)

___

### checksumType

• `Optional` **checksumType**: `string`

Checksum hash algorithm.

#### Defined in

[src/ddo/MetaData.ts:107](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L107)

___

### compression

• `Optional` **compression**: `string`

File compression (e.g. no, gzip, bzip2, etc).

**`Example`**

```ts
"zip"
```

#### Defined in

[src/ddo/MetaData.ts:133](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L133)

___

### contentLength

• `Optional` **contentLength**: `string`

File content length.

#### Defined in

[src/ddo/MetaData.ts:113](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L113)

___

### contentType

• **contentType**: `string`

File format, if applicable.

**`Example`**

```ts
"text/csv"
```

#### Defined in

[src/ddo/MetaData.ts:95](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L95)

___

### encoding

• `Optional` **encoding**: `string`

File encoding.

**`Example`**

```ts
"UTF-8"
```

#### Defined in

[src/ddo/MetaData.ts:126](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L126)

___

### index

• `Optional` **index**: `number`

File index.

#### Defined in

[src/ddo/MetaData.ts:88](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L88)

___

### name

• `Optional` **name**: `string`

File name.

#### Defined in

[src/ddo/MetaData.ts:76](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L76)

___

### resourceId

• `Optional` **resourceId**: `string`

Resource ID (depending on the source).

#### Defined in

[src/ddo/MetaData.ts:119](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L119)

___

### url

• **url**: `string`

File URL.

#### Defined in

[src/ddo/MetaData.ts:82](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/ddo/MetaData.ts#L82)
