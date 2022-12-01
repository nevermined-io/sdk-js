/**
 * Nevermined Config DDO section
 * 
 * @example
 * ```ts
 * "_nvm": {
    "userId": "dff40170-37fc-11ed-be5b-9984d9f9ec35",
    "appId": "acde070d-8c4c-4f0d-9d8a-162843c10333",
    "versions": [
      {
        "id": 1,
        "updated": "2020-01-01T19:13:24Z",
        "checksum": "89328493849328493284932"
      },
      {
        "id": 2,
        "updated": "2021-02-21T20:13:24Z",
        "checksum": "045328094852309483203443"
      }
    ]
  }
 * ```
 */
export interface NvmConfig {
    /**
     * The `userId` will be a `string` storing an identifier in `UUID` format.
     *
     * @remarks
     * Used to identify a user in the marketplace api
     */
    userId: string
    /**
     * The `appId` will be a `string` storing an identifier in `UUID` format.
     *
     * @remarks
     * Used to identity the application responsible for the DDO in the marketplace-api.
     * Useful for querying assets belonging to a particular app, allowing us to have multiple
     * apps using the same marketplace api
     */
    appId: string
    /**
     * The `versions` list stores the reference to all the changes done to the Metadata document.
     */
    versions: NvmConfigVersions[]
}

export enum ImmutableBackendsSupported {
  Filecoin = 'filecoin',
  IPFS = 'ipfs',
  Arweave = 'arweave',
  Other = 'other'
}

export interface NvmConfigVersions {
    /**
     * The id of the DDO revision.
     *
     * @remarks
     * This is a self incrementing number
     */
    id: number
    /**
     * The date when the update occurred.
     */
    updated: string
    /**
     * The checksum of the document
     */
    checksum: string

    /**
     * ID Hash of the metadata recorded in an immutable data store (IPFS, Filecoin, Arweave, ..)
     */
     immutableUrl?: string

    /**
     * The immutable solution to record the DDO
     */
     immutableBackend?: ImmutableBackendsSupported
}
