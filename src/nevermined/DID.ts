import { generateId } from '@/sdk'

const prefix = 'did:nv:'
/**
 * Decentralized ID.
 */
export class DID {
  /**
   * Parses a DID from a string.
   * @param didString  - DID in string format or DID instance.
   * The didString can be in did:nv: format or 0x: format.
   * @returns {@link DID}
   */
  public static parse(didString: string | DID): DID {
    if (didString instanceof DID) {
      didString = didString.getDid()
    }
    let did: DID

    const did0xMatch = didString.match(/^0x([a-f0-9]{64})$/i)

    if (did0xMatch) {
      did = new DID(did0xMatch[1])
    } else {
      const didMatch = didString.match(/^did:nv:([a-f0-9]{64})$/i)

      if (didMatch) {
        did = new DID(didMatch[1])
      }
    }

    if (!did) {
      throw new Error(`Parsing DID failed, ${didString}`)
    }

    return did
  }

  /**
   * Returns a new DID.
   * @returns {@link DID}
   */
  public static generate(): DID {
    return new DID(generateId())
  }

  public static parseBigInt(value, radix = 36) {
    // value: string
    const size = 10
    const factor = BigInt(radix ** size)
    let i = value.length % size || size
    const parts = [value.slice(0, i)]

    while (i < value.length) parts.push(value.slice(i, (i += size)))

    return parts.reduce((r, v) => r * factor + BigInt(parseInt(v, radix)), BigInt(0))
  }

  /**
   * Returns a new DID from a base36 encoded string.
   * @param encoded - Base36 encoded string.
   * @returns {@link DID}
   */
  public static fromEncoded(encoded: string): DID {
    const decoded = this.parseBigInt(encoded).toString(16)
    if (decoded.length !== 64) return new DID(`0${decoded}`)
    else return new DID(decoded)
  }

  /**
   * Generates an encoded string in base 36 from a DID.
   * @returns A base36 encoded string.
   */
  public getEncoded(): string {
    return BigInt(`0x${this.id}`).toString(36)
  }

  /**
   * Short ID.
   */
  private id: string

  private constructor(id: string) {
    this.id = id
  }

  /**
   * Returns the DID (i.e did:nv:...)
   * @returns A string with the prefixed id.
   */
  public getDid(): string {
    return `${prefix}${this.id}`
  }

  /**
   * Returns the Short ID.
   * @returns A string of the _id_ without the prefix.
   */
  public getId(): string {
    return this.id
  }
}
