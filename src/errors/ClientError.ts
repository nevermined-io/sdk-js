export class ClientError extends Error {
    constructor(message: string, clientName: string) {
        super(`${clientName} error: ${message}`)
    }
}
