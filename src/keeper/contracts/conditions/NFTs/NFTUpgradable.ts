import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition } from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import ContractBase from '../../ContractBase'

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
     * @param {String} accountAddress Account address
     * @param {String} operatorAddress Operator address
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
     * @param {String} operatorAddress Operator address
     * @param {Boolean} approved Is approved
     * @param {Account} from Sender account
     * @returns Boolean
     */
    public setProxyApproval(operatorAddress: string, approved: boolean, from?: Account) {
        return this.sendFrom('setProxyApproval', [zeroX(operatorAddress), approved], from)
    }

    /**
     * Configure proxy approval for a specific account and operator address
     *
     * @param {String} accountAddress Account address
     * @param {String} operatorAddress Operator address
     * @param {String} approved Is approved
     * @param {Account} from Sender account
     * @returns Boolean
     */
    public proxySetApprovalForAll(
        accountAddress: string,
        operatorAddress: string,
        approved: boolean,
        from?: Account
    ) {
        return this.sendFrom(
            'proxySetApprovalForAll',
            [zeroX(accountAddress), zeroX(operatorAddress), approved],
            from
        )
    }

    /**
     * Configure approval for a specific operator address
     *
     * @param {String} operatorAddress Operator address
     * @param {String} approved Is approved
     * @param {Account} from Sender account
     * @returns Boolean
     */
    public setApprovalForAll(operatorAddress: string, approved: boolean, from?: Account) {
        return this.sendFrom(
            'setApprovalForAll',
            [zeroX(operatorAddress), approved],
            from
        )
    }
}
