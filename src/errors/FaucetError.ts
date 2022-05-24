export class FaucetError extends Error {
    constructor(message: string) {
        super(`Faucet error: ${message}`)
    }
}
