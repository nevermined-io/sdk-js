import { BabyjubPublicKey, MimcCipher } from '../models/KeyTransfer'
import Web3Utils from 'web3-utils'
import vKey from './verification_key.json'

const SEED = 'mimcsponge'
const NROUNDS = 220

class Circom {
    private babyjub
    private poseidon
    private mimcsponge

    public async init() {
        this.babyjub = await require('circomlibjs').buildBabyjub()
        this.poseidon = await require('circomlibjs').buildPoseidonReference()
        this.mimcsponge = await require('circomlibjs').buildMimcSponge()
    }

    public getBabyjub() {
        return this.babyjub
    }

    public getPoseidon() {
        return this.poseidon
    }

    public getMimcSponge() {
        return this.mimcsponge
    }
}

export class KeyTransfer {
    cts
    F
    snarkjs
    ffjavascript
    circom: Circom

    public async init() {
        this.snarkjs = require('snarkjs')
        this.ffjavascript = require('ffjavascript')
        this.circom = new Circom()
        await this.circom.init()

        this.F = this.circom.getPoseidon().F

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

    public async secretToPublic(secret: string): Promise<BabyjubPublicKey> {
        const babyjub = await this.circom.getBabyjub()

        const [x, y] = babyjub.mulPointEscalar(babyjub.Base8, this.F.e(secret))
        return new BabyjubPublicKey(this.toHex(x), this.toHex(y))
    }

    public async signBabyjub(provider_secret, msg) {
        const babyjub = this.circom.getBabyjub()
        const poseidon = this.circom.getPoseidon()

        let r = BigInt(this.makeKey(provider_secret + 'a'))
        const { subOrder } = babyjub
        const base8 = babyjub.Base8
        const F = babyjub.p
        r = r % subOrder
        const s = BigInt(this.makeKey(provider_secret))
        const R8 = babyjub.mulPointEscalar(base8, r)
        const A = babyjub.mulPointEscalar(base8, s)
        const hm = poseidon([R8[0], R8[1], A[0], A[1], msg % F])
        const S = (r + hm * s) % subOrder
        return {
            R8: [this.toHex(R8[0]), this.toHex(R8[1])],
            S: this.toHex(S)
        }
    }

    // generate hash from plain text key
    // Buffer should have 32 elems
    public async hashKey(a: Buffer) {
        const poseidon = this.circom.getPoseidon()
        const hash = poseidon(this.split(a))
        return this.arrayToHex(hash)
    }

    public async ecdh(secret: string, pub: BabyjubPublicKey): Promise<string> {
        const babyjub = this.circom.getBabyjub()

        const [x, _y] = babyjub.mulPointEscalar(
            [BigInt(pub.x), BigInt(pub.y)],
            this.F.e(secret)
        )
        return this.toHex(x)
    }

    public async encryptKey(a: Buffer, secret: string): Promise<MimcCipher> {
        const mimcsponge = this.circom.getMimcSponge()

        const [left, right] = this.split(a)
        const { xL, xR } = mimcsponge.hash(left, right, BigInt(secret))
        return new MimcCipher(this.toHex(xL), this.toHex(xR))
    }

    public decryptKey(a: MimcCipher, secret: string): Buffer {
        const { xL, xR } = this.decrypt(BigInt(a.x), BigInt(a.y), BigInt(secret))
        return Buffer.from(this.toHex(xL).substr(34) + this.toHex(xR).substr(34), 'hex')
    }

    public async prove(
        buyerPub: BabyjubPublicKey,
        providerPub: BabyjubPublicKey,
        providerK: string,
        data: Buffer
    ): Promise<string> {
        const mimcsponge = this.circom.getMimcSponge()
        const poseidon = this.circom.getPoseidon()
        const [orig1, orig2] = this.split(data)

        const k = this.ecdh(providerK, buyerPub)
        const cipher = mimcsponge.hash(orig1, orig2, k)
        const origHash = poseidon([orig1, orig2])

        /* eslint @typescript-eslint/camelcase: "off" */
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
        const mimcsponge = await this.circom.getMimcSponge()
        const poseidon = await this.circom.getPoseidon()
        const [orig1, orig2] = this.split(data)
        const k = this.ecdh(providerK, buyerPub)
        const cipher = mimcsponge.mimcjs.hash(orig1, orig2, k)
        const origHash = poseidon([orig1, orig2])
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

    private toHex(a) {
        let str = a.toString(16)
        while (str.length < 64) {
            str = '0' + str
        }
        return '0x' + str
    }

    private arrayToHex(a: Uint8Array): string {
        let str = this.F.toObject(a)
        while (str.length < 64) {
            str = '0' + str
        }
        return '0x' + str
    }

    private split(a: Buffer) {
        const str = a.toString('hex')
        const left = BigInt('0x' + str.substr(0, 32))
        const right = BigInt('0x' + str.substr(32, 32))
        return [left, right]
    }
}

export async function makeKeyTransfer() {
    const res = new KeyTransfer()
    await res.init()
    return res
}
