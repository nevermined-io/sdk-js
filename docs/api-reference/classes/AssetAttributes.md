[@nevermined-io/sdk - v3.0.16](../code-reference.md) / AssetAttributes

# Class: AssetAttributes

## Hierarchy

- **`AssetAttributes`**

  ↳ [`NFTAttributes`](NFTAttributes.md)

## Table of contents

### Constructors

- [constructor](AssetAttributes.md#constructor)

### Properties

- [appId](AssetAttributes.md#appid)
- [encryptionMethod](AssetAttributes.md#encryptionmethod)
- [fulfillAccessTimelock](AssetAttributes.md#fulfillaccesstimelock)
- [fulfillAccessTimeout](AssetAttributes.md#fulfillaccesstimeout)
- [metadata](AssetAttributes.md#metadata)
- [predefinedAssetServices](AssetAttributes.md#predefinedassetservices)
- [providers](AssetAttributes.md#providers)
- [services](AssetAttributes.md#services)
- [defaultValues](AssetAttributes.md#defaultvalues)

### Methods

- [getInstance](AssetAttributes.md#getinstance)

## Constructors

### constructor

• **new AssetAttributes**(): [`AssetAttributes`](AssetAttributes.md)

#### Returns

[`AssetAttributes`](AssetAttributes.md)

## Properties

### appId

• `Optional` **appId**: `string`

Unique identifier of the application/domain/vertical where the asset belong to.
That asset association typically helps to search and filter between assets part of a domain via Marketplace API

#### Defined in

[src/models/AssetAttributes.ts:48](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L48)

---

### encryptionMethod

• `Optional` **encryptionMethod**: [`EncryptionMethod`](../code-reference.md#encryptionmethod)

When an asset is published in a Nevermined network, some internal Metadata attributes are encrypted so they can't be accessed.
This method allows to specify the encryption method to be used.

**`See`**

[EncryptionMethod](../code-reference.md#encryptionmethod)

#### Defined in

[src/models/AssetAttributes.ts:21](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L21)

---

### fulfillAccessTimelock

• `Optional` **fulfillAccessTimelock**: `number`

An asset can offer different services. Each service can have different conditions that need to be fulfilled
to provide that service. These conditions can expire if they are not fulfilled in a certain period of time.
This attribute allows to specify a period of time the condition can not be fullfilled
Setting up a timelock of 0 means that the condition can be fulfilled at any time.
Setting a timelock greater than 0 means that the condition can not be fulfilled until that number of blocks after the agreement is created are mined.
This would allow to create an agreement that can not fulfilled until certain period of time.

#### Defined in

[src/models/AssetAttributes.ts:68](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L68)

---

### fulfillAccessTimeout

• `Optional` **fulfillAccessTimeout**: `number`

An asset can offer different services. Each service can have different conditions that need to be fulfilled
to provide that service. These conditions can expire if they are not fulfilled in a certain period of time.
This attribute allows to specify the timeouts for the access condition associated to the service.
Setting up a timeout of 0 means that the condition will never expire.
Setting a timeout greater than 0 means that the condition will expire after that number of blocks after the agreement is created.
This would allow to create an agreement that is not fulfilled after a certain period of time, the user can claim back funds locked if the condition is any.

#### Defined in

[src/models/AssetAttributes.ts:58](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L58)

---

### metadata

• **metadata**: [`MetaData`](../interfaces/MetaData.md)

Metadata describing the asset

**`See`**

[MetaData](../interfaces/MetaData.md)

#### Defined in

[src/models/AssetAttributes.ts:14](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L14)

---

### predefinedAssetServices

• `Optional` **predefinedAssetServices**: [`ServiceCommon`](../interfaces/ServiceCommon.md)[]

List of additional asset services to be included as part of an asset

**`See`**

[Service](../code-reference.md#service)

#### Defined in

[src/models/AssetAttributes.ts:33](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L33)

---

### providers

• `Optional` **providers**: `string`[]

A provider of an asset identify the public address of an account with some privileges over that asset.
Typically these permissions are granted to Nevermined Nodes to allow them to give access to some services without
the direct interaction of the final user.
Here a user publishing an asset can define a list of all the addresses with these permissions.
Typically just the address of one Nevermined Node trusted by the user.

#### Defined in

[src/models/AssetAttributes.ts:42](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L42)

---

### services

• `Optional` **services**: [`ServiceAttributes`](../interfaces/ServiceAttributes.md)[]

List of services and their attributes offered by an asset.

**`See`**

[ServiceAttributes](../interfaces/ServiceAttributes.md)

#### Defined in

[src/models/AssetAttributes.ts:27](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L27)

---

### defaultValues

▪ `Static` **defaultValues**: `Object`

#### Type declaration

| Name                      | Type                                                                                                             |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------- |
| `appId`                   | `string`                                                                                                         |
| `encryptionMethod`        | [`EncryptionMethod`](../code-reference.md#encryptionmethod)                                                      |
| `fulfillAccessTimelock`   | `number`                                                                                                         |
| `fulfillAccessTimeout`    | `number`                                                                                                         |
| `predefinedAssetServices` | [`ServiceCommon`](../interfaces/ServiceCommon.md)[]                                                              |
| `providers`               | `never`[]                                                                                                        |
| `services`                | \{ `price`: [`AssetPrice`](AssetPrice.md) ; `serviceType`: [`ServiceType`](../code-reference.md#servicetype) }[] |

#### Defined in

[src/models/AssetAttributes.ts:70](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L70)

## Methods

### getInstance

▸ **getInstance**(`assetAttributes`): `Required`\<[`AssetAttributes`](AssetAttributes.md)\>

#### Parameters

| Name              | Type                                    |
| :---------------- | :-------------------------------------- |
| `assetAttributes` | [`AssetAttributes`](AssetAttributes.md) |

#### Returns

`Required`\<[`AssetAttributes`](AssetAttributes.md)\>

#### Defined in

[src/models/AssetAttributes.ts:85](https://github.com/nevermined-io/sdk-js/blob/55c3b4ac21ca5824c7e92f5077fc57cd9e47c00a/src/models/AssetAttributes.ts#L85)
