# Migration Guide

Instructions on how to migrate between breaking versions.

## v0.8.3 → v1.0.0

### Ocean Protocol Components Requirements

squid-js v1.0.0 only works against:

- Aquarius v1.0.2+
- Brizo v0.7.0+
- Events Handler v0.3.0+
- Keeper Contracts v0.12.7+

### DDO Structure

The whole structure of the DDO has been changed based on [OEP-12](https://github.com/oceanprotocol/OEPs/tree/master/12) and [OEP-8 v0.4](https://github.com/oceanprotocol/OEPs/tree/master/8/v0.4) to better accomodate the DDOs to hold additional services, like execution of workflows and algorithms.

For migrating, you only have to deal with the `metadata` service holding the asset metadata, which was restructured too:

old:

```json
{
  "service": [
    {
      "serviceDefinitionId": "0",
      "serviceEndpoint": "http://localhost:5000/api/v1/aquarius/assets/ddo/{did}",
      "type": "Metadata",
      "metadata": {
        "base": {
          "name": "Madrid Weather forecast",
          "description": "Wheater forecast of Europe/Madrid in XML format",
          "dateCreated": "2019-05-16T12:36:14.535Z",
          "author": "Norwegian Meteorological Institute",
          "type": "dataset",
          "license": "Public Domain",
          "price": "123000000000000000000",
          "copyrightHolder": "Norwegian Meteorological Institute",
          "files": [
            {
              "index": 0,
              "url": "https://example-url.net/weather/forecast/madrid/350750305731.xml",
              "contentLength": 1000,
              "contentType": "text/xml",
              "compression": "none"
            }
          ],
          "categories": ["Other"],
          "links": [],
          "tags": []
        },
        "additionalInformation": {
          "updateFrequency": null,
          "structuredMarkup": []
        }
      }
    }
  ]
}
```

NEW. Where `main` now holds the non-changable attributes only, everything else has been moved to `additionalInformation`. Likewise, `serviceDefinitionId` is now `index`:

```json
{
  "service": [
    {
      "index": 0,
      "serviceEndpoint": "http://localhost:5000/api/v1/aquarius/assets/ddo/{did}",
      "type": "metadata",
      "attributes": {
        "main": {
          "name": "Madrid Weather forecast",
          "dateCreated": "2019-05-16T12:36:14.535Z",
          "author": "Norwegian Meteorological Institute",
          "type": "dataset",
          "license": "Public Domain",
          "price": "123000000000000000000",
          "files": [
            {
              "index": 0,
              "url": "https://example-url.net/weather/forecast/madrid/350750305731.xml",
              "contentLength": "1000",
              "contentType": "text/xml",
              "compression": "none"
            }
          ]
        },
        "additionalInformation": {
          "description": "Weather forecast of Europe/Madrid in XML format",
          "copyrightHolder": "Norwegian Meteorological Institute",
          "categories": ["Other"],
          "links": [],
          "tags": [],
          "updateFrequency": null,
          "structuredMarkup": []
        }
      }
    }
  ]
}
```

Those changes require updates to your code whenever you fetch or create a new DDO as outlined below.

Likewise, you have to migrate the DDOs of existing registered assets to the new structure. For this you can run our migration script on your respective Aquarius instance.

- [script: CHANGEME](https://github.com/oceanprotocol/CHANGEME)

### Lowercase Service Names

All the service names are now in lowercase:

old:

```js
const service = ddo.findServiceByType('Access')
```

NEW:

```js
const service = ddo.findServiceByType('access')
```

### Accessing New Metadata Structure

Typically you would grab and restructure asset metadata for display. This works the same as before but the key names have changed:

old:

```js
const { metadata } = ddo.findServiceByType('Metadata')
const { base, additionalInformation } = metadata
console.log(base.price)
console.log(base.description)
```

NEW:

```js
const { attributes } = ddo.findServiceByType('metadata')
const { main, additionalInformation } = attributes
console.log(main.price)
console.log(additionalInformation.description)
```

### `service.serviceDefinitionId` → `service.index`

old:

```js
await ocean.assets.order(ddo.id, service.serviceDefinitionId, accounts[0])
```

NEW:

```js
await ocean.assets.order(ddo.id, service.index, accounts[0])
```

The value of of `service.index` is now also a number, and not a string.

### File Attribute Changes

In the file attributes, the `contentLength` is now a string.

old:

```json
"files": [
  {
    "index": 0,
    "url": "https://example-url.net/weather/forecast/madrid/350750305731.xml",
    "contentLength": 1000,
    "contentType": "text/xml"
  }
]
```

NEW:

```json
"files": [
  {
    "index": 0,
    "url": "https://example-url.net/weather/forecast/madrid/350750305731.xml",
    "contentLength": "1000",
    "contentType": "text/xml"
  }
]
```
