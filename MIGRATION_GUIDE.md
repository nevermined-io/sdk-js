# Migration guide to v2

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
