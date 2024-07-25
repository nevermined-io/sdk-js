import { URL } from 'whatwg-url'
import { v4 } from 'uuid'
import { SearchQuery } from '../types'
import { encrypt, decrypt } from 'eccrypto'
import { noZeroX } from '../utils/ConversionTypeHelpers'
// import { compress, decompress } from 'lz-string'
// import { JwtUtils } from '../nevermined/utils/JwtUtils'
import { compress, decompress } from 'shrink-string'

export const buildQuery = (url: string, query?: SearchQuery) => {
  const fullUrl = new URL(url)

  if (!query) {
    return fullUrl
  }

  fullUrl.searchParams.append('sort', decodeURIComponent(JSON.stringify(query.sort)))
  fullUrl.searchParams.append('offset', query.offset?.toString() as string)
  fullUrl.searchParams.append('page', query.page?.toString() as string)

  return fullUrl
}

export const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (_key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

export const jsonReplacer = (_key, value) => {
  // Modify the value or return undefined to exclude the property
  return typeof value === 'bigint' ? value.toString() : value
}

export function generateId(length = 64) {
  let id = ''
  while (id.length < length) {
    id += v4().replace(/-/g, '')
  }
  return id.substr(0, length)
}

export function _sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function urlSafeBase64Encode(input: Uint8Array): string {
  let binary = ''
  const len = input.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(input[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function urlSafeBase64Decode(input: string): Uint8Array {
  input = input.replace(/-/g, '+').replace(/_/g, '/')
  while (input.length % 4) {
    input += '='
  }
  const binary = atob(input)
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export async function encryptMessage(message: string, receiverPublicKey: string) {
  const publicKeyBuffer = Buffer.from(noZeroX(receiverPublicKey), 'hex')
  const messageBuffer = Buffer.from(message)
  const ecies = await encrypt(publicKeyBuffer, messageBuffer)
  return await serializeECIES(ecies)
}

export async function decryptMessage(encryptedMessage: string, privateKey: string | any) {
  const ecies = await deserializeECIES(encryptedMessage)
  const pk = typeof privateKey === 'string' ? noZeroX(privateKey) : privateKey
  const decrypted = await decrypt(Buffer.from(pk, 'hex'), ecies)
  return Buffer.from(decrypted, 'hex').toString()
}
// const ENCRYPTION_ENCODING = 'base64'

export async function serializeECIES(ecies: any) {
  const serialized = JSON.stringify({
    iv: Buffer.from(ecies.iv).toString('base64'),
    ephemPublicKey: Buffer.from(ecies.ephemPublicKey).toString('base64'),
    ciphertext: Buffer.from(ecies.ciphertext).toString('base64'),
    mac: Buffer.from(ecies.mac).toString('base64'),
  })
  // console.log('Content BEFORE compression', serialized)
  // console.log('Length BEFORE compression', serialized.length)
  //const compressed = JwtUtils.createCompressedJwt(serialized)
  //return serialized
  //return compressToBase64(serialized)
  // return compress(serialized)
  //const compressed = Buffer.from(serialized).toString('utf-8')
  return await compress(serialized)
  // console.log('Content AFTER compression', compressed)
  // console.log('Length AFTER compression', compressed.length)
  //return compressed
}

export async function deserializeECIES(serialized: any) {
  //const decoded = decompressFromBase64(serialized)
  //const decoded = decompress(serialized)
  // const decoded = Buffer.from(serialized, 'utf-8').toString()
  const decoded = await decompress(serialized)
  // const decoded = JwtUtils.decompressJwt(serialized)
  const _obj = JSON.parse(decoded)
  //const _obj = JSON.parse(serialized)
  return {
    iv: Buffer.from(_obj.iv, 'base64'),
    ephemPublicKey: Buffer.from(_obj.ephemPublicKey, 'base64'),
    ciphertext: Buffer.from(_obj.ciphertext, 'base64'),
    mac: Buffer.from(_obj.mac, 'base64'),
  }
}
