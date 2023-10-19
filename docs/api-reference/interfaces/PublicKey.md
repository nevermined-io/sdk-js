[@nevermined-io/sdk](../code-reference.md) / PublicKey

# Interface: PublicKey

Public key data.

## Table of contents

### Properties

- [id](PublicKey.md#id)
- [owner](PublicKey.md#owner)
- [publicKeyBase58](PublicKey.md#publickeybase58)
- [publicKeyHex](PublicKey.md#publickeyhex)
- [publicKeyPem](PublicKey.md#publickeypem)
- [type](PublicKey.md#type)

## Properties

### id

• **id**: `string`

ID of the key.

**`Example`**

```ts
'did:nv:123456789abcdefghi#keys-1'
```

#### Defined in

[src/ddo/types.ts:447](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L447)

---

### owner

• **owner**: `string`

Key owner.

**`Example`**

```ts
'did:nv:123456789abcdefghi'
```

#### Defined in

[src/ddo/types.ts:462](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L462)

---

### publicKeyBase58

• `Optional` **publicKeyBase58**: `string`

#### Defined in

[src/ddo/types.ts:465](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L465)

---

### publicKeyHex

• `Optional` **publicKeyHex**: `string`

#### Defined in

[src/ddo/types.ts:466](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L466)

---

### publicKeyPem

• `Optional` **publicKeyPem**: `string`

#### Defined in

[src/ddo/types.ts:464](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L464)

---

### type

• **type**: `"Ed25519VerificationKey2018"` \| `"RsaVerificationKey2018"` \| `"EdDsaSAPublicKeySecp256k1"` \| `"EthereumECDSAKey"`

Type of key.

#### Defined in

[src/ddo/types.ts:452](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L452)
