export class NFTError extends Error {
  constructor(message: string) {
    super(`NFT error: ${message}`)
  }
}

export class DynamicCreditsOverLimit extends NFTError {
  constructor(message: string) {
    super(`DynamicCreditsOverLimit error: ${message}`)
  }
}

export class DynamicCreditsUnderLimit extends NFTError {
  constructor(message: string) {
    super(`DynamicCreditsUnderLimit error: ${message}`)
  }
}
