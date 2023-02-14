import { generateId } from '../utils'

const prefix = 'did:nv:'

/**
 * Decentralized ID.
 */
export class DID {
  /**
   * Parses a DID from a string.
   * @param didString  - DID in string.
   * @returns {@link DID}
   */
  public static parse(didString: string | DID): DID {
    if (didString instanceof DID) {
      didString = didString.getDid()
    }
    let did: DID
    const didMatch = didString.match(/^did:nv:([a-f0-9]{64})$/i)

    if (didMatch) {
      did = new DID(didMatch[1])
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

  /**
   * ID.
   */
  private id: string

  private constructor(id: string) {
    this.id = id
  }

  /**
   * Returns the DID.
   * @returns A string with the prefixed id.
   */
  public getDid(): string {
    return `${prefix}${this.id}`
  }

  /**
   * Returns the ID.
   * @returns A string of the _id_ without the prefix.
   */
  public getId(): string {
    return this.id
  }
}
