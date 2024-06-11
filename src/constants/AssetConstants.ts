export const NETWORK_FEE_DENOMINATOR = 10000n

// The type of the encryption methods supported for the private data included in the metadata
export type EncryptionMethod = 'PSK-RSA' | 'PSK-ECDSA'

// The default encryption method
export const DEFAULT_ENCRYPTION_METHOD = 'PSK-RSA' as EncryptionMethod

// The Ethereum zero address
export const ZeroAddress = '0x0000000000000000000000000000000000000000'

// The address to indicate that a payment is done in the native token of the network and not a ERC20 token
export const NativeTokenAddress = '0x0000000000000000000000000000000000000000'
