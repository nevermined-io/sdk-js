export class NFTError extends Error {
    constructor(message: string) {
        super(`NFT error: ${message}`)
    }
}
