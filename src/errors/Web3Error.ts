export class Web3Error extends Error {
    constructor(message: string) {
        super(`Web3 error: ${message}`)
    }
}
