export class NvmAccountError extends Error {
  constructor(message: string) {
    super(`NvmAccountError error: ${message}`)
  }
}
