import { ReadStream } from 'fs'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

export class Files extends Instantiable {
    /**
     * Returns the instance of Files
     * @returns {@link Files}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Files> {
        const instance = new Files()
        instance.setInstanceConfig(config)

        return instance
    }

    public async uploadFilecoin(stream: ReadStream, encrypt?: boolean): Promise<any> {
        const response = await this.nevermined.gateway.uploadFilecoin(stream, encrypt)
        return response
    }
}
