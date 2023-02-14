export class NeverminedNodeError extends Error {
  constructor(message: string) {
    super(`Nevermined Node error: ${message}`)
  }
}
