[@nevermined-io/nevermined-sdk-js](../code-reference.md) / AdditionalInformation

# Interface: AdditionalInformation

Additional Information of Assets Metadata.

**`See`**

https://github.com/nevermined-io/docs/blob/master/docs/architecture/specs/metadata/README.md#additional-attributes

## Table of contents

### Properties

- [categories](AdditionalInformation.md#categories)
- [copyrightHolder](AdditionalInformation.md#copyrightholder)
- [customData](AdditionalInformation.md#customdata)
- [description](AdditionalInformation.md#description)
- [inLanguage](AdditionalInformation.md#inlanguage)
- [links](AdditionalInformation.md#links)
- [poseidonHash](AdditionalInformation.md#poseidonhash)
- [priceHighestDenomination](AdditionalInformation.md#pricehighestdenomination)
- [providerKey](AdditionalInformation.md#providerkey)
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
["Economy", "Data Science"]
```

#### Defined in

[src/ddo/MetaData.ts:285](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L285)

___

### copyrightHolder

• `Optional` **copyrightHolder**: `string`

The party holding the legal copyright. Empty by default.

**`Example`**

```ts
"Met Office"
```

#### Defined in

[src/ddo/MetaData.ts:245](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L245)

___

### customData

• `Optional` **customData**: `Object`

A dynamic field containing marketplace specific data.
Can be used to store any non-default data, needs to be checked

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[src/ddo/MetaData.ts:314](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L314)

___

### description

• `Optional` **description**: `string`

Details of what the resource is. For a dataset, this attribute
explains what the data represents and what it can be used for.

**`Example`**

```ts
"Weather information of UK including temperature and humidity"
```

#### Defined in

[src/ddo/MetaData.ts:239](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L239)

___

### inLanguage

• `Optional` **inLanguage**: `string`

The language of the content. Please use one of the language
codes from the [IETF BCP 47 standard](https://tools.ietf.org/html/bcp47).

**`Example`**

```ts
"en"
```

#### Defined in

[src/ddo/MetaData.ts:279](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L279)

___

### links

• `Optional` **links**: { `[name: string]`: `string`;  }[]

Mapping of links for data samples, or links to find out more information.
Links may be to either a URL or another Asset. We expect marketplaces to
converge on agreements of typical formats for linked data: Nevermined
itself does not mandate any specific formats as these requirements are likely
to be domain-specific.

**`Example`**

```ts
[
   {
     anotherSample: "http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-daily/",
   },
   {
     fieldsDescription: "http://data.ceda.ac.uk/badc/ukcp09/",
   },
 ]
```

#### Defined in

[src/ddo/MetaData.ts:272](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L272)

___

### poseidonHash

• `Optional` **poseidonHash**: `string`

#### Defined in

[src/ddo/MetaData.ts:318](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L318)

___

### priceHighestDenomination

• `Optional` **priceHighestDenomination**: `number`

Price store in the highest denomination and stored as a
number on elastic search

**`Remarks`**

We currently do this because elasticsearch does not support
BigNumbers

#### Defined in

[src/ddo/MetaData.ts:333](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L333)

___

### providerKey

• `Optional` **providerKey**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `string` |
| `y` | `string` |

#### Defined in

[src/ddo/MetaData.ts:320](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L320)

___

### structuredMarkup

• `Optional` **structuredMarkup**: { `mediaType`: `string` ; `uri`: `string`  }[]

A link to machine-readable structured markup (such as ttl/json-ld/rdf)
describing the dataset.

#### Defined in

[src/ddo/MetaData.ts:305](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L305)

___

### tags

• `Optional` **tags**: `string`[]

Keywords or tags used to describe this content. Empty by default.

**`Example`**

```ts
["weather", "uk", "2011", "temperature", "humidity"]
```

#### Defined in

[src/ddo/MetaData.ts:291](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L291)

___

### updateFrequency

• `Optional` **updateFrequency**: `string`

An indication of update latency - i.e. How often are updates expected (seldom,
annually, quarterly, etc.), or is the resource static that is never expected
to get updated.

**`Example`**

```ts
"yearly"
```

#### Defined in

[src/ddo/MetaData.ts:299](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L299)

___

### workExample

• `Optional` **workExample**: `string`

Example of the concept of this asset. This example is part
of the metadata, not an external link.

**`Example`**

```ts
"423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68"
```

#### Defined in

[src/ddo/MetaData.ts:252](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/ddo/MetaData.ts#L252)
