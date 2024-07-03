import { URL } from 'whatwg-url'
import { v4 } from 'uuid'
import { SearchQuery } from '../types'
import { encrypt, decrypt } from 'eccrypto'
import { noZeroX } from '../utils/ConversionTypeHelpers'

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
  return serializeECIES(ecies)
}

export async function decryptMessage(encryptedMessage: string, privateKey: string | any) {
  const ecies = deserializeECIES(encryptedMessage)
  const pk = typeof privateKey === 'string' ? noZeroX(privateKey) : privateKey
  const decrypted = await decrypt(Buffer.from(pk, 'hex'), ecies)
  return Buffer.from(decrypted, 'hex').toString()
}

export function serializeECIES(ecies: any) {
  const serialized = JSON.stringify({
    iv: Buffer.from(ecies.iv).toString('base64'),
    ephemPublicKey: Buffer.from(ecies.ephemPublicKey).toString('base64'),
    ciphertext: Buffer.from(ecies.ciphertext).toString('base64'),
    mac: Buffer.from(ecies.mac).toString('base64'),
  })
  return Buffer.from(serialized).toString('binary')
}

export function deserializeECIES(serialized: any) {
  const decoded = Buffer.from(serialized, 'binary').toString()
  const _obj = JSON.parse(decoded)
  return {
    iv: Buffer.from(_obj.iv, 'base64'),
    ephemPublicKey: Buffer.from(_obj.ephemPublicKey, 'base64'),
    ciphertext: Buffer.from(_obj.ciphertext, 'base64'),
    mac: Buffer.from(_obj.mac, 'base64'),
  }
}
