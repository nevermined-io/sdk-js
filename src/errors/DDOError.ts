import { ServiceType } from '../ddo/Service'

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

export class DDOPriceNotFoundError extends DDOError {
    constructor(serviceType: ServiceType, did?: string) {
        super(`Service with type "${serviceType}" is not priced.`, did)
    }
}
