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

[src/ddo/MetaData.ts:96](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L96)

___

### checksumType

• `Optional` **checksumType**: `string`

Checksum hash algorithm.

#### Defined in

[src/ddo/MetaData.ts:101](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L101)

___

### compression

• `Optional` **compression**: `string`

File compression (e.g. no, gzip, bzip2, etc).

**`Example`**

```ts
"zip"
```

#### Defined in

[src/ddo/MetaData.ts:123](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L123)

___

### contentLength

• `Optional` **contentLength**: `string`

File content length.

#### Defined in

[src/ddo/MetaData.ts:106](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L106)

___

### contentType

• **contentType**: `string`

File format, if applicable.

**`Example`**

```ts
"text/csv"
```

#### Defined in

[src/ddo/MetaData.ts:91](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L91)

___

### encoding

• `Optional` **encoding**: `string`

File encoding.

**`Example`**

```ts
"UTF-8"
```

#### Defined in

[src/ddo/MetaData.ts:117](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L117)

___

### index

• `Optional` **index**: `number`

File index.

#### Defined in

[src/ddo/MetaData.ts:85](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L85)

___

### name

• `Optional` **name**: `string`

File name.

#### Defined in

[src/ddo/MetaData.ts:75](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L75)

___

### resourceId

• `Optional` **resourceId**: `string`

Resource ID (depending on the source).

#### Defined in

[src/ddo/MetaData.ts:111](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L111)

___

### url

• **url**: `string`

File URL.

#### Defined in

[src/ddo/MetaData.ts:80](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/ddo/MetaData.ts#L80)
