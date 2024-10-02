[@nevermined-io/sdk - v3.0.37](../code-reference.md) / AdditionalInformation

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

[src/types/DDOTypes.ts:476](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L476)

---

### cipher

• `Optional` **cipher**: `string`

#### Defined in

[src/types/DDOTypes.ts:510](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L510)

---

### copyrightHolder

• `Optional` **copyrightHolder**: `string`

The party holding the legal copyright. Empty by default.

**`Example`**

```ts
'Met Office'
```

#### Defined in

[src/types/DDOTypes.ts:436](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L436)

---

### customData

• `Optional` **customData**: `Object`

A dynamic field containing marketplace specific data.
Can be used to store any non-default data, needs to be checked

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[src/types/DDOTypes.ts:505](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L505)

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

[src/types/DDOTypes.ts:430](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L430)

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

[src/types/DDOTypes.ts:470](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L470)

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

[src/types/DDOTypes.ts:463](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L463)

---

### poseidonHash

• `Optional` **poseidonHash**: `string`

#### Defined in

[src/types/DDOTypes.ts:509](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L509)

---

### priceHighestDenomination

• `Optional` **priceHighestDenomination**: `number`

Price store in the highest denomination and stored as a
number on elastic search

**`Remarks`**

We currently do this because elasticsearch does not support
BigNumbers

#### Defined in

[src/types/DDOTypes.ts:530](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L530)

---

### providerKey

• `Optional` **providerKey**: `Object`

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x`  | `string` |
| `y`  | `string` |

#### Defined in

[src/types/DDOTypes.ts:512](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L512)

---

### secretId

• `Optional` **secretId**: `Object`

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x`  | `string` |
| `y`  | `string` |

#### Defined in

[src/types/DDOTypes.ts:517](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L517)

---

### structuredMarkup

• `Optional` **structuredMarkup**: \{ `mediaType`: `string` ; `uri`: `string` }[]

A link to machine-readable structured markup (such as ttl/json-ld/rdf)
describing the dataset.

#### Defined in

[src/types/DDOTypes.ts:496](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L496)

---

### tags

• `Optional` **tags**: `string`[]

Keywords or tags used to describe this content. Empty by default.

**`Example`**

```ts
;['weather', 'uk', '2011', 'temperature', 'humidity']
```

#### Defined in

[src/types/DDOTypes.ts:482](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L482)

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

[src/types/DDOTypes.ts:490](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L490)

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

[src/types/DDOTypes.ts:443](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L443)
