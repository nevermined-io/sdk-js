import { BabyjubPublicKey, MimcCipher } from '../models/KeyTransfer'
import fs from 'fs';

const { poseidon } = require('circomlib')
const { babyJub } = require('circomlib')
const mimcjs = require('circomlib').mimcsponge
const { ZqField } = require('ffjavascript')
const { Scalar } = require('ffjavascript')
const F = new ZqField(
    Scalar.fromString(
        '21888242871839275222246405745257275088548364400416034343698204186575808495617'
    )
)
const snarkjs = require('snarkjs')
const { unstringifyBigInts } = require('ffjavascript').utils

const Web3Utils = require('web3-utils')

const SEED = 'mimcsponge'
const NROUNDS = 220

function getConstants(seed, nRounds) {
    if (typeof seed === 'undefined') seed = SEED
    if (typeof nRounds === 'undefined') nRounds = NROUNDS
    const cts = new Array(nRounds)
    let c = Web3Utils.keccak256(SEED)
    for (let i = 1; i < nRounds; i++) {
        c = Web3Utils.keccak256(c)

        const n1 = Web3Utils.toBN(c).mod(Web3Utils.toBN(F.p.toString()))
        const c2 = Web3Utils.padLeft(Web3Utils.toHex(n1), 64)
        cts[i] = F.e(Web3Utils.toBN(c2).toString())
    }
    cts[0] = F.e(0)
    cts[cts.length - 1] = F.e(0)
    return cts
}

const cts = getConstants(SEED, NROUNDS)

function decrypt(xLin, xRin, kin) {
    let xL = F.e(xLin)
    let xR = F.e(xRin)
    const k = F.e(kin)
    for (let i = 0; i < NROUNDS; i++) {
        const c = cts[NROUNDS - 1 - i]
        const t = i === 0 ? F.add(xL, k) : F.add(F.add(xL, k), c)
        const xRtmp = F.e(xR)
        if (i < NROUNDS - 1) {
            xR = xL
            xL = F.sub(xRtmp, F.pow(t, 5))
        } else {
            xR = F.sub(xRtmp, F.pow(t, 5))
        }
    }
    return {
        xL: F.normalize(xL),
        xR: F.normalize(xR)
    }
}

// mnemonic to secret key

export function makeKey(str: string) {
    const c = Web3Utils.keccak256(str)
    return c.substr(0, 60)
}

export function makePublic(x: string, y: string) {
    return new BabyjubPublicKey(x, y)
} 

function toHex(a) {
    let str = a.toString(16)
    while (str.length < 64) {
        str = '0' + str
    }
    return '0x' + str
}

export function secretToPublic(secret: string): BabyjubPublicKey {
    const [x, y] = babyJub.mulPointEscalar(babyJub.Base8, F.e(secret))
    return new BabyjubPublicKey(toHex(x), toHex(y))
}

function split(a: Buffer) {
    const str = a.toString('hex')
    const left = BigInt('0x' + str.substr(0, 32))
    const right = BigInt('0x' + str.substr(32, 64))
    return [left, right]
}

// generate hash from plain text key
// Buffer should have 32 elems
export function hashKey(a: Buffer) {
    const hash = poseidon(split(a))
    return toHex(hash)
}

export function ecdh(secret: string, pub: BabyjubPublicKey): string {
    const [x, _y] = babyJub.mulPointEscalar([BigInt(pub.x), BigInt(pub.y)], F.e(secret))
    return toHex(x)
}

export function encryptKey(a: Buffer, secret: string): MimcCipher {
    const [left, right] = split(a)
    const { xL, xR } = mimcjs.hash(left, right, BigInt(secret))
    return new MimcCipher(toHex(xL), toHex(xR))
}

export function decryptKey(a: MimcCipher, secret: string): Buffer {
    const { xL, xR } = decrypt(BigInt(a.x), BigInt(a.y), BigInt(secret))
    return Buffer.from(toHex(xL).substr(34) + toHex(xR).substr(34), 'hex')
}

export async function verify(
    buyerPub: BabyjubPublicKey,
    providerPub: BabyjubPublicKey,
    providerK: string,
    data: Buffer,
    proof: any
): Promise<string> {
    const [orig1, orig2] = split(data)
    const k = ecdh(providerK, buyerPub)
    const cipher = mimcjs.hash(orig1, orig2, k)
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

    const vKey = JSON.parse(fs.readFileSync("verification_key.json").toString());

    console.log(vKey, signals, proof)

    const res = await snarkjs.plonk.verify(vKey, signals, proof);
    console.log(res)
    const proofSolidity = await snarkjs.plonk.exportSolidityCallData(
        unstringifyBigInts(proof),
        signals
    )

    const proofData = proofSolidity.split(',')[0]
    console.log('proof', proofData)
    return "a"

}

export async function prove(
        buyerPub: BabyjubPublicKey,
        providerPub: BabyjubPublicKey,
        providerK: string,
        data: Buffer
    ): Promise<string> {
    const [orig1, orig2] = split(data)

    const k = ecdh(providerK, buyerPub)
    const cipher = mimcjs.hash(orig1, orig2, k)
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

    const { proof } = await snarkjs.plonk.fullProve(
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

    const vKey = JSON.parse(fs.readFileSync("verification_key.json").toString());

    const res = await snarkjs.plonk.verify(vKey, signals, proof);
    console.error(res)
    console.error(proof)

    const proofSolidity = await snarkjs.plonk.exportSolidityCallData(
        unstringifyBigInts(proof),
        signals
    )

    const proofData = proofSolidity.split(',')[0]
    return proofData
}
