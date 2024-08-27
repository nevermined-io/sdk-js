[@nevermined-io/sdk - v3.0.28](../code-reference.md) / PublicKey

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

[src/types/DDOTypes.ts:499](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L499)

---

### owner

• **owner**: `string`

Key owner.

**`Example`**

```ts
'did:nv:123456789abcdefghi'
```

#### Defined in

[src/types/DDOTypes.ts:514](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L514)

---

### publicKeyBase58

• `Optional` **publicKeyBase58**: `string`

#### Defined in

[src/types/DDOTypes.ts:517](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L517)

---

### publicKeyHex

• `Optional` **publicKeyHex**: `string`

#### Defined in

[src/types/DDOTypes.ts:518](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L518)

---

### publicKeyPem

• `Optional` **publicKeyPem**: `string`

#### Defined in

[src/types/DDOTypes.ts:516](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L516)

---

### type

• **type**: `"EthereumECDSAKey"` \| `"Ed25519VerificationKey2018"` \| `"RsaVerificationKey2018"` \| `"EdDsaSAPublicKeySecp256k1"`

Type of key.

#### Defined in

[src/types/DDOTypes.ts:504](https://github.com/nevermined-io/sdk-js/blob/2c5b70a398b96158415b2a3c97669bf5963dd8f3/src/types/DDOTypes.ts#L504)
