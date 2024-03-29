import { ServiceType } from '../ddo'

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
  constructor(serviceType: ServiceType, did?: string) {
    super(`Service with type "${serviceType}" not found`, did)
  }
}

export class DDOServiceAlreadyExists extends DDOError {
  constructor(serviceType: ServiceType, index: number) {
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
  constructor(serviceType: ServiceType, did?: string) {
    super(`Service with type "${serviceType}" is not priced.`, did)
  }
}
