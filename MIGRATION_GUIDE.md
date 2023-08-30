# Migration guide to v2

## Breaking changes

### Defining the asset registration options

The `assets.create` function now receives an `AssetPublicationOptions` object instead of a `PublishMetadataOptions` parameter. This object allows to define the asset off-chain and on-chain registration options:

```typescript
await nevermined.assets.create(assetAttributes, publisher, {
  metadata: PublishMetadataOptions.OnlyMetadataAPI,
  did: PublishOnChainOptions.OnlyOffchain,
})
```

### Defining Asset Price

The assetPrice is not part of AssetAttributes anymore and is part of each individual service added to the DDO when registering a service. So for services having a price, this must be added as part of the services array of the AssetAttributes.

Example:

```typescript
const nftAttributes = NFTAttributes.getNFT721Instance({
  metadata,
  services: [
    {
      serviceType: 'nft-sales',
      price: assetPrice,
    },
    {
      serviceType: 'nft-access',
    },
  ],
  nftContractAddress: nftContract.address,
})
```

You will find multiple examples of this in the integration tests.

### Big Numbers

To handle big numbers v2 uses the ES2020 built-in `BigInt` values ([see the BigInt documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)):

- The `BigNumber` class was removed
- The unit conversion helper functions `parseEther`, `parseUnits`, `formatEther`, `formatUnits` are now part of the sdk utils

```ts
import { parseEther, parseUnits, formatEther, formatUnits } from '@nevermined-io/sdk'

// Using BigNumber in v1
value = BigNumber.from('1000')

// Using BigInt in v2 (using literal notation).
// Notice the suffix n
value = 1000n

// Using the BigInt function for strings
value = BigInt('1000')

// Adding two values in v1
sum = value1.add(value2)

// Using BigInt in v2; keep in mind, both values
// must be a BigInt
sum = value1 + value2

// Checking equality in v1
isEqual = value1.eq(value2)

// Using BigInt in v2
isEqual = value1 == value2
```

### DDO Helper functions

Most of them were migrated to the `DDO` class:

- `findServiceConditionByName` -> `DDO.findServiceConditionByName`
- `getAssetPriceFromDDOByService` -> `DDO.getAssetPriceFromDDOByServiceType`
- `setNFTRewardsFromDDOByService` -> `DDO.setNFTRewardsFromDDOByService`
- `setAssetPriceFromDDOByService` -> `DDO.setAssetPriceFromDDOByService`
- `getAssetPriceFromService` -> `DDO.getAssetPriceFromService`
- `getDIDFromService` -> `DDO.getDIDFromService`
- `getNftHolderFromService` -> `DDO.getNftHolderFromService`
- `getNftAmountFromService` -> `DDO.getNftAmountFromService`
- `getNftContractAddressFromService` -> `DDO.getNftContractAddressFromService`

## Not breaking changes

### Assets resolution will be off-chain by default

The `assets.resolve` function will now resolve the asset off-chain by default. This means that the DDO will be fetched from the metadata api and not retrieve the metadata url from the on-chain DIDRegistry. This behavior can be modified passing different `DIDResolvePolicy` options.

### Assets can be registered only off-chain

For assets not requiring the be registered on-chain, the `assets.create` function will now only register the asset off-chain. This behavior can be modified passing different `AssetPublicationOptions` options.
