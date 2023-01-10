import { InstantiableConfig } from '../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../utils'
import { Account } from '../../nevermined'
import { TxParameters } from './ContractBase'
import { BigNumber } from '../../utils'
import { ethers } from 'ethers'
import { NFTContractsBase } from './NFTContractsBase'
import { ContractHandler } from '../ContractHandler'

/**
 * NFTs contracts DTO allowing to manage Nevermined ERC-1155 NFTs
 */
export class Nft1155Contract extends NFTContractsBase {
    public static async getInstance(
        config: InstantiableConfig,
        address?: string
    ): Promise<Nft1155Contract> {
        const nft: Nft1155Contract = new Nft1155Contract('NFT1155Upgradeable')
        await nft.init(config)

        if (address) {
            const solidityABI = await ContractHandler.getABI(
                'NFT1155Upgradeable',
                config.artifactsFolder
            )
            nft.contract = new ethers.Contract(address, solidityABI.abi, nft.web3)
        }

        return nft
    }

    /**
     * Creates a contract clone of an existing contract instance
     *
     * @param name - NFT Contract name
     * @param symbol - NFT Contract symbol
     * @param uri - NFT Contract metadata uri
     * @param from - Sender account
     * @returns Contract Receipt
     */
    public createClone(
        name: string,
        symbol: string,
        uri: string,
        from?: Account,
        params?: TxParameters
    ) {
        return this._createClone(name, symbol, uri, undefined, from, params)
    }

    /**
     * Checks if the operator is approved for an account address
     *
     * @param accountAddress - Account address
     * @param operatorAddress - Operator address
     * @returns Boolean
     */
    public isApprovedForAll(accountAddress: string, operatorAddress: string) {
        return this.call('isApprovedForAll', [
            zeroX(accountAddress),
            zeroX(operatorAddress)
        ])
    }

    /**
     * Configure approval for a specific operator address
     *
     * @param operatorAddress - Operator address
     * @param approved - Is approved
     * @param from - Sender account
     * @param params - Transaction additional parameters
     * @returns Contract Receipt
     */
    public setApprovalForAll(
        operatorAddress: string,
        approved: boolean,
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom(
            'setApprovalForAll',
            [zeroX(operatorAddress), approved],
            from,
            params
        )
    }

    /**
     * Get an address balance for a specific NFT with id `did`
     *
     * @param address - Account address to check the balance
     * @param did - The NFT id
     * @returns
     */
    public async balance(address: string, did: string): Promise<BigNumber> {
        return this.call('balanceOf', [zeroX(address), didZeroX(did)])
    }

    /**
     * It transfers a NFT
     *
     * @param did - The NFT id
     * @param to - Account address of the NFT receiver
     * @param amount - Number of editions to transfer. Typically just 1
     * @param from - Account address transferring the NFT
     * @param params - Transaction additional parameters
     * @returns Contract Receipt
     */
    public async transferNft(
        did: string,
        to: string,
        amount: BigNumber,
        from: string,
        params?: TxParameters
    ) {
        return this.send(
            'safeTransferFrom',
            from,
            [from, to, didZeroX(did), amount, []],
            params
        )
    }

    /**
     * It mints some editions of a NFT (ERC-1155)
     *
     * @param to - Account address of the NFT receiver
     * @param did - The NFT id to mint
     * @param amount - Number of editions to mint
     * @param from - Account address minting the NFT
     * @param params - Transaction additional parameters
     * @returns Contract Receipt
     */
    public async mint(
        to: string,
        did: string,
        amount: BigNumber,
        from: string,
        data?: string,
        params?: TxParameters
    ) {
        return this.send('mint', from, [to, didZeroX(did), amount, data || '0x'], params)
    }

    /**
     * It burns some editions of a NFT (ERC-1155)
     *
     * @param from - Account address burning the NFT editions
     * @param did - The NFT id to burn
     * @param amount - Number of editions to burn
     * @param params - Transaction additional parameters
     * @returns Contract Receipt
     */
    public async burn(
        from: string,
        did: string,
        amount: BigNumber,
        params?: TxParameters
    ) {
        return this.send('burn', from, [from, didZeroX(did), amount], params)
    }

    /**
     * It returns the NFT metadata uri
     *
     * @param did - The NFT id
     * @returns The NFT metadata url
     */
    public async uri(did: string): Promise<string> {
        return this.call('uri', [didZeroX(did)])
    }
}
