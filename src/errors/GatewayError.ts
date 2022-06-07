export class GatewayError extends Error {
    constructor(message: string) {
        super(`Gateway error: ${message}`)
    }
}
