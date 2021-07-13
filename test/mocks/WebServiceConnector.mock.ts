import { WebServiceConnector } from '../../src/nevermined/utils/WebServiceConnector'
import { InstantiableConfig } from '../../src/Instantiable.abstract'

// @ts-ignore
export default class WebServiceConnectorMock extends WebServiceConnector {
    constructor(config: InstantiableConfig, private returnData: any) {
        super(config)
    }

    // @ts-ignore
    private async fetch(url, opts): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({
                ok: true,
                json: () => {
                    return this.returnData ? this.returnData : {}
                },
                text: () => {
                    return this.returnData
                        ? JSON.stringify(this.returnData.toString())
                        : ''
                }
            })
        })
    }
}
