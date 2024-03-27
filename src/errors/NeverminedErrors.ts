export class NeverminedNodeError extends Error {
  constructor(message: string) {
    super(`Nevermined Node error: ${message}`)
  }
}

export class GraphError extends Error {
  constructor(message: string) {
    super(`Graph error: ${message}`)
  }
}

export class HttpError extends Error {
  constructor(message: string, code: number) {
    super(`Http error with code ${code}: ${message}`)
  }
}

export class KeeperError extends Error {
  constructor(message: string) {
    super(`Keeper error: ${message}`)
  }
}

export class Web3Error extends Error {
  constructor(message: string) {
    super(`Web3 error: ${message}`)
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(`Api error: ${message}`)
  }
}

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

export class AssetError extends Error {
  constructor(message: string) {
    super(`Asset error: ${message}`)
  }
}

export class DDOError extends Error {
  constructor(message: string, did?: string) {
    if (did) {
      super(`DDO(${did}) error: ${message}`)
    } else {
      super(`DDO error: ${message}`)
    }

    // from https://bobbyhadz.com/blog/typescript-extend-error-class
    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, DDOError.prototype)
  }
}

export class DDOServiceNotFoundError extends DDOError {
  constructor(serviceType: string, did?: string) {
    super(`Service with type "${serviceType}" not found`, did)
  }
}

export class DDOServiceAlreadyExists extends DDOError {
  constructor(serviceType: string, index: number) {
    super(`Service with type "${serviceType}" and index ${index} already exists`)
  }
}

export class DDOConditionNotFoundError extends DDOError {
  constructor(conditionName: string) {
    super(`Condition with name "${conditionName}" not found`)
  }
}

export class DDOParamNotFoundError extends DDOError {
  constructor(conditionName: string, paramName?: string) {
    super(`Parameter "${paramName}" not found on Condition with type "${conditionName}"`)
  }
}

export class DDOPriceNotFoundError extends DDOError {
  constructor(serviceType: string, did?: string) {
    super(`Service with type "${serviceType}" is not priced.`, did)
  }
}

export class NvmAccountError extends Error {
  constructor(message: string) {
    super(`NVM Account error: ${message}`)
  }
}