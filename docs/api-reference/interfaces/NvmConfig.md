[@nevermined-io/sdk - v3.0.41](../code-reference.md) / NvmConfig

# Interface: NvmConfig

Nevermined Config DDO section

**`Example`**

```ts
"_nvm": {
   "userId": "dff40170-37fc-11ed-be5b-9984d9f9ec35",
   "appId": "acde070d-8c4c-4f0d-9d8a-162843c10333",
   "versions": [
     {
       "id": 1,
       "updated": "2020-01-01T19:13:24Z",
       "checksum": "89328493849328493284932"
     },
     {
       "id": 2,
       "updated": "2021-02-21T20:13:24Z",
       "checksum": "045328094852309483203443"
     }
   ]
 }
```

## Table of contents

### Properties

- [appId](NvmConfig.md#appid)
- [networks](NvmConfig.md#networks)
- [userId](NvmConfig.md#userid)
- [versions](NvmConfig.md#versions)

## Properties

### appId

• **appId**: `string`

The `appId` will be a `string` storing an identifier in `UUID` format.

**`Remarks`**

Used to identity the application responsible for the DDO in the marketplace-api.
Useful for querying assets belonging to a particular app, allowing us to have multiple
apps using the same marketplace api

#### Defined in

[src/types/DDOTypes.ts:604](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L604)

---

### networks

• `Optional` **networks**: `Object`

Block networks where the asset is available. It is represented as a map of network Id and a boolean value.

#### Index signature

▪ [key: `string`]: `boolean`

#### Defined in

[src/types/DDOTypes.ts:613](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L613)

---

### userId

• **userId**: `string`

The `userId` will be a `string` storing an identifier in `UUID` format.

**`Remarks`**

Used to identify a user in the marketplace api

#### Defined in

[src/types/DDOTypes.ts:595](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L595)

---

### versions

• **versions**: [`NvmConfigVersions`](NvmConfigVersions.md)[]

The `versions` list stores the reference to all the changes done to the Metadata document.

#### Defined in

[src/types/DDOTypes.ts:608](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L608)
