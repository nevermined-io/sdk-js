import { assert } from 'chai'
import { Config, Nevermined } from "../../src"
import { LogLevel } from "../../src/utils"

describe('Rinkeby', () => {
    it('should instanciate on Rinkeby', async () => {
        const nvm = await Nevermined.getInstance({
            nodeUri: "https://rinkeby.infura.io/v3/5b322298e356423ea24362fc80fabd16",
            verbose: LogLevel.Verbose
        } as Config)
        assert.exists(nvm)
    })
})
