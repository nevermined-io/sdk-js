[@nevermined-io/sdk - v3.0.15](../code-reference.md) / AdditionalInformation

# Interface: AdditionalInformation

Additional Information of Assets Metadata.

**`See`**

https://github.com/nevermined-io/docs/blob/master/docs/architecture/specs/metadata/README.md#additional-attributes

## Table of contents

### Properties

- [categories](AdditionalInformation.md#categories)
- [cipher](AdditionalInformation.md#cipher)
- [copyrightHolder](AdditionalInformation.md#copyrightholder)
- [customData](AdditionalInformation.md#customdata)
- [description](AdditionalInformation.md#description)
- [inLanguage](AdditionalInformation.md#inlanguage)
- [links](AdditionalInformation.md#links)
- [poseidonHash](AdditionalInformation.md#poseidonhash)
- [priceHighestDenomination](AdditionalInformation.md#pricehighestdenomination)
- [providerKey](AdditionalInformation.md#providerkey)
- [secretId](AdditionalInformation.md#secretid)
- [structuredMarkup](AdditionalInformation.md#structuredmarkup)
- [tags](AdditionalInformation.md#tags)
- [updateFrequency](AdditionalInformation.md#updatefrequency)
- [workExample](AdditionalInformation.md#workexample)

## Properties

### categories

• `Optional` **categories**: `string`[]

Categories used to describe this content. Empty by default.

**`Example`**

```ts
;['Economy', 'Data Science']
```

#### Defined in

[src/types/DDOTypes.ts:425](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L425)

---

### cipher

• `Optional` **cipher**: `string`

#### Defined in

[src/types/DDOTypes.ts:459](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L459)

---

### copyrightHolder

• `Optional` **copyrightHolder**: `string`

The party holding the legal copyright. Empty by default.

**`Example`**

```ts
'Met Office'
```

#### Defined in

[src/types/DDOTypes.ts:385](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L385)

---

### customData

• `Optional` **customData**: `Object`

A dynamic field containing marketplace specific data.
Can be used to store any non-default data, needs to be checked

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[src/types/DDOTypes.ts:454](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L454)

---

### description

• `Optional` **description**: `string`

Details of what the resource is. For a dataset, this attribute
explains what the data represents and what it can be used for.

**`Example`**

```ts
'Weather information of UK including temperature and humidity'
```

#### Defined in

[src/types/DDOTypes.ts:379](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L379)

---

### inLanguage

• `Optional` **inLanguage**: `string`

The language of the content. Please use one of the language
codes from the [IETF BCP 47 standard](https://tools.ietf.org/html/bcp47).

**`Example`**

```ts
'en'
```

#### Defined in

[src/types/DDOTypes.ts:419](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L419)

---

### links

• `Optional` **links**: \{ `[name: string]`: `string`; }[]

Mapping of links for data samples, or links to find out more information.
Links may be to either a URL or another Asset. We expect marketplaces to
converge on agreements of typical formats for linked data: Nevermined
itself does not mandate any specific formats as these requirements are likely
to be domain-specific.

**`Example`**

```ts
;[
  {
    anotherSample:
      'http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-daily/',
  },
  {
    fieldsDescription: 'http://data.ceda.ac.uk/badc/ukcp09/',
  },
]
```

#### Defined in

[src/types/DDOTypes.ts:412](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L412)

---

### poseidonHash

• `Optional` **poseidonHash**: `string`

#### Defined in

[src/types/DDOTypes.ts:458](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L458)

---

### priceHighestDenomination

• `Optional` **priceHighestDenomination**: `number`

Price store in the highest denomination and stored as a
number on elastic search

**`Remarks`**

We currently do this because elasticsearch does not support
BigNumbers

#### Defined in

[src/types/DDOTypes.ts:479](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L479)

---

### providerKey

• `Optional` **providerKey**: `Object`

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x`  | `string` |
| `y`  | `string` |

#### Defined in

[src/types/DDOTypes.ts:461](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L461)

---

### secretId

• `Optional` **secretId**: `Object`

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x`  | `string` |
| `y`  | `string` |

#### Defined in

[src/types/DDOTypes.ts:466](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L466)

---

### structuredMarkup

• `Optional` **structuredMarkup**: \{ `mediaType`: `string` ; `uri`: `string` }[]

A link to machine-readable structured markup (such as ttl/json-ld/rdf)
describing the dataset.

#### Defined in

[src/types/DDOTypes.ts:445](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L445)

---

### tags

• `Optional` **tags**: `string`[]

Keywords or tags used to describe this content. Empty by default.

**`Example`**

```ts
;['weather', 'uk', '2011', 'temperature', 'humidity']
```

#### Defined in

[src/types/DDOTypes.ts:431](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L431)

---

### updateFrequency

• `Optional` **updateFrequency**: `string`

An indication of update latency - i.e. How often are updates expected (seldom,
annually, quarterly, etc.), or is the resource static that is never expected
to get updated.

**`Example`**

```ts
'yearly'
```

#### Defined in

[src/types/DDOTypes.ts:439](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L439)

---

### workExample

• `Optional` **workExample**: `string`

Example of the concept of this asset. This example is part
of the metadata, not an external link.

**`Example`**

```ts
'423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68'
```

#### Defined in

[src/types/DDOTypes.ts:392](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L392)
