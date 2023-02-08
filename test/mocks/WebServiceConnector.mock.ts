import { WebServiceConnector } from '../../src/nevermined'
import { InstantiableConfig } from '../../src/Instantiable.abstract'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default class WebServiceConnectorMock extends WebServiceConnector {
  constructor(config: InstantiableConfig, private returnData: any) {
    super(config)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private async fetch(_url, _opts): Promise<any> {
    return new Promise((resolve, _reject) => {
      resolve({
        ok: true,
        json: () => {
          return this.returnData ? this.returnData : {}
        },
        text: () => {
          return this.returnData ? JSON.stringify(this.returnData.toString()) : ''
        },
      })
    })
  }
}
