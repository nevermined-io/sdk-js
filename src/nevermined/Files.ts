import { ReadStream } from 'fs'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

export class Files extends Instantiable {
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  public async uploadFilecoin(data: ReadStream | string, encrypt?: boolean): Promise<any> {
    const response = await this.nevermined.services.node.uploadContent(data, encrypt)
    return response
  }
}
