(global as any).File = class MockFile {
  name: string
  constructor(parts: (string | Blob | ArrayBuffer | ArrayBufferView)[], filename: string, _properties? : FilePropertyBag) {
    this.name = filename
  }
}