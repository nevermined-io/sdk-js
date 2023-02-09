export class HttpError extends Error {
  constructor(message: string, code: number) {
    super(`Http error with code ${code}: ${message}`)
  }
}
