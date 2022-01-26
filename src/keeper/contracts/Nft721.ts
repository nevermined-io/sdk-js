import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { didZeroX } from '../../utils'
import { abi } from './../../artifacts/ERC721.json'
import { Account } from '../..'

export default class Nft721 extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig,
        address: string
    ): Promise<Nft721> {
        const nft: Nft721 = new Nft721('NFT721')

        nft.setInstanceConfig(config)

        const code = await nft.web3.eth.getCode(address)
        if (code === '0x0') {
            // no code in the blockchain dude
            throw new Error(`No code deployed at address ${address}, sorry.`)
        }

        // @ts-ignore
        nft.contract = new nft.web3.eth.Contract(abi, address)

        return nft
    }

    public async mint(did: string, from: string, params?: TxParameters) {
        return this.send('mint', from, [didZeroX(did)], params)
    }

    public async mintWithURL(
        to: string,
        did: string,
        url: string,
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom('mint', [to, didZeroX(did), url], from, params)
    }

    public async setApprovalForAll(
        target: string,
        state: boolean,
        from: string,
        params?: TxParameters
    ) {
        return this.send('setApprovalForAll', from, [target, state], params)
    }

    public async balanceOf(owner: string) {
        return this.call('balanceOf', [owner])
    }

    public async ownerOf(did: string): Promise<string> {
        return this.call('ownerOf', [didZeroX(did)])
    }

    public async tokenURI(did: string): Promise<string> {
        return this.call('tokenURI', [didZeroX(did)])
    }
}
