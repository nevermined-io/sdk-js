export class AssetError extends Error {
  constructor(message: string) {
    super(`Asset error: ${message}`)
  }
}
