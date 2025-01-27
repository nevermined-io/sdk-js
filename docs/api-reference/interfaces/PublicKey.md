[@nevermined-io/sdk - v3.0.49](../code-reference.md) / PublicKey

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

[src/types/DDOTypes.ts:544](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/types/DDOTypes.ts#L544)

---

### owner

• **owner**: `string`

Key owner.

**`Example`**

```ts
'did:nv:123456789abcdefghi'
```

#### Defined in

[src/types/DDOTypes.ts:559](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/types/DDOTypes.ts#L559)

---

### publicKeyBase58

• `Optional` **publicKeyBase58**: `string`

#### Defined in

[src/types/DDOTypes.ts:562](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/types/DDOTypes.ts#L562)

---

### publicKeyHex

• `Optional` **publicKeyHex**: `string`

#### Defined in

[src/types/DDOTypes.ts:563](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/types/DDOTypes.ts#L563)

---

### publicKeyPem

• `Optional` **publicKeyPem**: `string`

#### Defined in

[src/types/DDOTypes.ts:561](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/types/DDOTypes.ts#L561)

---

### type

• **type**: `"EthereumECDSAKey"` \| `"Ed25519VerificationKey2018"` \| `"RsaVerificationKey2018"` \| `"EdDsaSAPublicKeySecp256k1"`

Type of key.

#### Defined in

[src/types/DDOTypes.ts:549](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/types/DDOTypes.ts#L549)
