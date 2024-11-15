[@nevermined-io/sdk - v3.0.42](../code-reference.md) / PublicKey

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

[src/types/DDOTypes.ts:543](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/types/DDOTypes.ts#L543)

---

### owner

• **owner**: `string`

Key owner.

**`Example`**

```ts
'did:nv:123456789abcdefghi'
```

#### Defined in

[src/types/DDOTypes.ts:558](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/types/DDOTypes.ts#L558)

---

### publicKeyBase58

• `Optional` **publicKeyBase58**: `string`

#### Defined in

[src/types/DDOTypes.ts:561](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/types/DDOTypes.ts#L561)

---

### publicKeyHex

• `Optional` **publicKeyHex**: `string`

#### Defined in

[src/types/DDOTypes.ts:562](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/types/DDOTypes.ts#L562)

---

### publicKeyPem

• `Optional` **publicKeyPem**: `string`

#### Defined in

[src/types/DDOTypes.ts:560](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/types/DDOTypes.ts#L560)

---

### type

• **type**: `"EthereumECDSAKey"` \| `"Ed25519VerificationKey2018"` \| `"RsaVerificationKey2018"` \| `"EdDsaSAPublicKeySecp256k1"`

Type of key.

#### Defined in

[src/types/DDOTypes.ts:548](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/types/DDOTypes.ts#L548)
