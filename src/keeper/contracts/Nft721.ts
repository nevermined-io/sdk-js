import ContractBase from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { didZeroX } from '../../utils'

export default class Nft721 extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig,
        address: string
    ): Promise<Nft721> {
        const nft: Nft721 = new Nft721('NFT721')

        nft.setInstanceConfig(config)

        const artifact = require(`./../../artifacts/NFT721.json`)

        const code = await nft.web3.eth.getCode(address)
        if (code === '0x0') {
            // no code in the blockchain dude
            throw new Error(`No code deployed at address ${address}, sorry.`)
        }
        nft.contract = new nft.web3.eth.Contract(artifact.abi, address)

        return nft
    }

    public async mint(did: string, from: string) {
        return this.send('mint', from, [didZeroX(did)])
    }

    public async setApprovalForAll(target: string, state: boolean, from: string) {
        return this.send('setApprovalForAll', from, [target, state])
    }

    public async balanceOf(owner: string) {
        return this.call('balanceOf', [owner])
    }

    public async ownerOf(did: string) {
        return this.call('ownerOf', [didZeroX(did)])
    }
}
