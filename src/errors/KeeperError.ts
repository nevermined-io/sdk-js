export class KeeperError extends Error {
  constructor(message: string) {
    super(`Keeper error: ${message}`)
  }
}
