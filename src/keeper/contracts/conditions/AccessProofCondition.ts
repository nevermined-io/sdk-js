import { Condition } from './Condition.abstract'
import { zeroX, didZeroX, makeKeyTransfer } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { BabyjubPublicKey, MimcCipher } from '../../../models/KeyTransfer'
import { TxParameters } from '../ContractBase'
import { DDO } from '../../../ddo/DDO'
import { Service } from '../../../ddo/Service'
import AssetRewards from '../../../models/AssetRewards'

export class AccessProofCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AccessProofCondition> {
        return Condition.getInstance(
            config,
            'AccessProofCondition',
            AccessProofCondition,
            true
        )
    }

    public async paramsFromDDO(ddo: DDO, service: Service, _rewards: AssetRewards, consumer: Account) {
        const keytransfer = await makeKeyTransfer()
        const { _hash, _providerPub } = service.attributes.main
        const buyerPub: BabyjubPublicKey = keytransfer.makePublic(
            consumer.babyX,
            consumer.babyY
        )
        const providerPub: BabyjubPublicKey = keytransfer.makePublic(
            _providerPub[0],
            _providerPub[1]
        )
        return {
            list: [zeroX(_hash), buyerPub.param(), providerPub.param()],
            params: async (data: Buffer, providerK: string) => {
                const cipher = await keytransfer.encryptKey(
                    data,
                    await keytransfer.ecdh(providerK, buyerPub)
                )
                const proof = await keytransfer.prove(buyerPub, providerPub, providerK, data)
                const hash = await keytransfer.hashKey(data)
                return [
                    zeroX(_hash),
                    buyerPub.param(),
                    providerPub.param(),
                    cipher,
                    proof,
                    hash
                ]
            }
        }
    }

    public hashValues(
        hash: string,
        grantee: BabyjubPublicKey,
        provider: BabyjubPublicKey
    ) {
        return super.hashValues(zeroX(hash), grantee.param(), provider.param())
    }

    public fulfill(
        agreementId: string,
        origHash: string,
        grantee: BabyjubPublicKey,
        provider: BabyjubPublicKey,
        cipher: MimcCipher,
        proof: string,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [
                zeroX(origHash),
                grantee.param(),
                provider.param(),
                cipher.param(),
                zeroX(proof)
            ],
            from,
            params
        )
    }
}
