import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition } from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import ContractBase, { TxParameters } from '../../ContractBase'
import BigNumber from '../../../../utils/BigNumber'

/**
 * Condition allowing to transfer an NFT between the original owner and a receiver
 */
export class NFTUpgradeable extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<NFTUpgradeable> {
        return Condition.getInstance(config, 'NFTUpgradeable', NFTUpgradeable)
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
     * Configure proxy approval for a specific operator address
     *
     * @param operatorAddress - Operator address
     * @param approved - Is approved
     * @param from - Sender account
     * @returns Boolean
     */
    public setProxyApproval(
        operatorAddress: string,
        approved: boolean,
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom(
            'setProxyApproval',
            [zeroX(operatorAddress), approved],
            from,
            params
        )
    }

    /**
     * Configure proxy approval for a specific account and operator address
     *
     * @param accountAddress - Account address
     * @param operatorAddress - Operator address
     * @param approved - Is approved
     * @param from - Sender account
     * @returns Boolean
     */
    public proxySetApprovalForAll(
        accountAddress: string,
        operatorAddress: string,
        approved: boolean,
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom(
            'proxySetApprovalForAll',
            [zeroX(accountAddress), zeroX(operatorAddress), approved],
            from,
            params
        )
    }

    /**
     * Configure approval for a specific operator address
     *
     * @param operatorAddress - Operator address
     * @param approved - Is approved
     * @param from - Sender account
     * @returns Boolean
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
        return BigNumber.from(await this.call('balanceOf', [zeroX(address), didZeroX(did)]))
    }

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

    public async uri(did: string): Promise<string> {
        return this.call('uri', [didZeroX(did)])
    }
}
