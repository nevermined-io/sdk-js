export class ApiError extends Error {
  constructor(message: string) {
    super(`Api error: ${message}`)
  }
}
