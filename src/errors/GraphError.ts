export class GraphError extends Error {
  constructor(message: string) {
    super(`Graph error: ${message}`)
  }
}
