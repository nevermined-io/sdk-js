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

[src/ddo/MetaData.ts:98](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L98)

___

### checksumType

• `Optional` **checksumType**: `string`

Checksum hash algorithm.

#### Defined in

[src/ddo/MetaData.ts:103](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L103)

___

### compression

• `Optional` **compression**: `string`

File compression (e.g. no, gzip, bzip2, etc).

**`Example`**

```ts
"zip"
```

#### Defined in

[src/ddo/MetaData.ts:125](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L125)

___

### contentLength

• `Optional` **contentLength**: `string`

File content length.

#### Defined in

[src/ddo/MetaData.ts:108](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L108)

___

### contentType

• **contentType**: `string`

File format, if applicable.

**`Example`**

```ts
"text/csv"
```

#### Defined in

[src/ddo/MetaData.ts:93](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L93)

___

### encoding

• `Optional` **encoding**: `string`

File encoding.

**`Example`**

```ts
"UTF-8"
```

#### Defined in

[src/ddo/MetaData.ts:119](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L119)

___

### index

• `Optional` **index**: `number`

File index.

#### Defined in

[src/ddo/MetaData.ts:87](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L87)

___

### name

• `Optional` **name**: `string`

File name.

#### Defined in

[src/ddo/MetaData.ts:77](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L77)

___

### resourceId

• `Optional` **resourceId**: `string`

Resource ID (depending on the source).

#### Defined in

[src/ddo/MetaData.ts:113](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L113)

___

### url

• **url**: `string`

File URL.

#### Defined in

[src/ddo/MetaData.ts:82](https://github.com/nevermined-io/sdk-js/blob/3db3d52/src/ddo/MetaData.ts#L82)
