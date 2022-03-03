import { BabyjubPublicKey, MimcCipher } from '../models/KeyTransfer'
import Web3Utils from 'web3-utils'
import vKey from './verification_key.json'

const SEED = 'mimcsponge'
const NROUNDS = 220

function toHex(a) {
    let str = a.toString(16)
    while (str.length < 64) {
        str = '0' + str
    }
    return '0x' + str
}

function split(a: Buffer) {
    const str = a.toString('hex')
    const left = BigInt('0x' + str.substr(0, 32))
    const right = BigInt('0x' + str.substr(32, 32))
    return [left, right]
}

export default class KeyTransfer {
    cts
    F

    circomlib
    snarkjs
    ffjavascript

    constructor() {
        this.snarkjs = require('snarkjs')
        this.circomlib = require('circomlib')
        this.ffjavascript = require('ffjavascript')

        this.F = new this.ffjavascript.ZqField(
            this.ffjavascript.Scalar.fromString(
                '21888242871839275222246405745257275088548364400416034343698204186575808495617'
            )
        )

        this.cts = this.getConstants(SEED, NROUNDS)
    }

    private getConstants(seed, nRounds) {
        if (typeof seed === 'undefined') seed = SEED
        if (typeof nRounds === 'undefined') nRounds = NROUNDS
        const cts = new Array(nRounds)
        let c = Web3Utils.keccak256(SEED)
        for (let i = 1; i < nRounds; i++) {
            c = Web3Utils.keccak256(c)

            const n1 = Web3Utils.toBN(c).mod(Web3Utils.toBN(this.F.p.toString()))
            const c2 = Web3Utils.padLeft(Web3Utils.toHex(n1), 64)
            cts[i] = this.F.e(Web3Utils.toBN(c2).toString())
        }
        cts[0] = this.F.e(0)
        cts[cts.length - 1] = this.F.e(0)
        return cts
    }

    private decrypt(xLin, xRin, kin) {
        let xL = this.F.e(xLin)
        let xR = this.F.e(xRin)
        const k = this.F.e(kin)
        for (let i = 0; i < NROUNDS; i++) {
            const c = this.cts[NROUNDS - 1 - i]
            const t = i === 0 ? this.F.add(xL, k) : this.F.add(this.F.add(xL, k), c)
            const xRtmp = this.F.e(xR)
            if (i < NROUNDS - 1) {
                xR = xL
                xL = this.F.sub(xRtmp, this.F.pow(t, 5))
            } else {
                xR = this.F.sub(xRtmp, this.F.pow(t, 5))
            }
        }
        return {
            xL: this.F.normalize(xL),
            xR: this.F.normalize(xR)
        }
    }

    // mnemonic to secret key

    public makeKey(str: string) {
        const c = Web3Utils.keccak256(str)
        return c.substr(0, 60)
    }

    public makePublic(x: string, y: string) {
        return new BabyjubPublicKey(x, y)
    }

    public secretToPublic(secret: string): BabyjubPublicKey {
        const [x, y] = this.circomlib.babyJub.mulPointEscalar(
            this.circomlib.babyJub.Base8,
            this.F.e(secret)
        )
        return new BabyjubPublicKey(toHex(x), toHex(y))
    }

    public signBabyjub(provider_secret, msg) {
        let r = BigInt(this.makeKey(provider_secret + 'a'))
        const { subOrder } = this.circomlib.babyJub
        const base8 = this.circomlib.babyJub.Base8
        const F = this.circomlib.babyJub.p
        r = r % subOrder
        const s = BigInt(this.makeKey(provider_secret))
        const R8 = this.circomlib.babyJub.mulPointEscalar(base8, r)
        const A = this.circomlib.babyJub.mulPointEscalar(base8, s)
        const hm = this.circomlib.poseidon([R8[0], R8[1], A[0], A[1], msg % F])
        const S = (r + hm * s) % subOrder
        return {
            R8: [toHex(R8[0]), toHex(R8[1])],
            S: toHex(S)
        }
    }

    // generate hash from plain text key
    // Buffer should have 32 elems
    public hashKey(a: Buffer) {
        const hash = this.circomlib.poseidon(split(a))
        return toHex(hash)
    }

    public ecdh(secret: string, pub: BabyjubPublicKey): string {
        const [x, _y] = this.circomlib.babyJub.mulPointEscalar(
            [BigInt(pub.x), BigInt(pub.y)],
            this.F.e(secret)
        )
        return toHex(x)
    }

    public encryptKey(a: Buffer, secret: string): MimcCipher {
        const [left, right] = split(a)
        const { xL, xR } = this.circomlib.mimcsponge.hash(left, right, BigInt(secret))
        return new MimcCipher(toHex(xL), toHex(xR))
    }

    public decryptKey(a: MimcCipher, secret: string): Buffer {
        const { xL, xR } = this.decrypt(BigInt(a.x), BigInt(a.y), BigInt(secret))
        return Buffer.from(toHex(xL).substr(34) + toHex(xR).substr(34), 'hex')
    }

    public async prove(
        buyerPub: BabyjubPublicKey,
        providerPub: BabyjubPublicKey,
        providerK: string,
        data: Buffer
    ): Promise<string> {
        const [orig1, orig2] = split(data)

        const k = this.ecdh(providerK, buyerPub)
        const cipher = this.circomlib.mimcsponge.hash(orig1, orig2, k)
        const origHash = this.circomlib.poseidon([orig1, orig2])

        const snarkParams = {
            buyer_x: BigInt(buyerPub.x),
            buyer_y: BigInt(buyerPub.y),
            provider_x: BigInt(providerPub.x),
            provider_y: BigInt(providerPub.y),
            xL_in: orig1,
            xR_in: orig2,
            cipher_xL_in: cipher.xL,
            cipher_xR_in: cipher.xR,
            provider_k: providerK,
            hash_plain: origHash
        }

        const { proof } = await this.snarkjs.plonk.fullProve(
            snarkParams,
            'node_modules/@nevermined-io/contracts/circuits/keytransfer.wasm',
            'node_modules/@nevermined-io/contracts/circuits/keytransfer.zkey'
        )

        const signals = [
            buyerPub.x,
            buyerPub.y,
            providerPub.x,
            providerPub.y,
            cipher.xL,
            cipher.xR,
            origHash
        ]

        const proofSolidity = await this.snarkjs.plonk.exportSolidityCallData(
            this.ffjavascript.utils.unstringifyBigInts(proof),
            signals
        )

        const proofData = proofSolidity.split(',')[0]
        return proofData
    }

    public async verify(
        buyerPub: BabyjubPublicKey,
        providerPub: BabyjubPublicKey,
        providerK: string,
        data: Buffer,
        proof: any
    ): Promise<string> {
        const [orig1, orig2] = split(data)
        const k = this.ecdh(providerK, buyerPub)
        const cipher = this.circomlib.mimcsponge.mimcjs.hash(orig1, orig2, k)
        const origHash = this.circomlib.poseidon([orig1, orig2])
        const signals = [
            buyerPub.x,
            buyerPub.y,
            providerPub.x,
            providerPub.y,
            cipher.xL,
            cipher.xR,
            origHash
        ]

        const res = await this.snarkjs.plonk.verify(vKey, signals, proof)

        return res
    }
}
