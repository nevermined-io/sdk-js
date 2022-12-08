import Config from './models/Config'
import Account from './nevermined/Account'
import DID from './nevermined/DID'
import { Nevermined } from './nevermined/Nevermined'
import { LoggerInstance as Logger } from './utils/Logger'
import Keeper from './keeper/Keeper'

import * as templates from './keeper/contracts/templates'
import * as conditions from './keeper/contracts/conditions'
import * as utils from './utils'
import { NFT721Api } from './nevermined/nfts/NFT721Api'
import { NFT1155Api } from './nevermined/nfts/NFT1155Api'
import { Accounts } from './nevermined/Accounts'
import { SearchQuery } from './common/interfaces'

// Exports
export * from './ddo/DDO'
export * from './ddo/MetaData'

export { ProvenanceRegistry, ProvenanceMethod } from './keeper/contracts/DIDRegistry'
export { OrderProgressStep, CreateProgressStep } from './nevermined/Assets'
export {
    PlatformTechStatus,
    PlatformTech,
    PlatformKeeperTech,
    PlatformVersions
} from './nevermined/Versions'

export { AgreementTemplate } from './keeper/contracts/templates'
export { Condition, ConditionState } from './keeper/contracts/conditions'
export { ClientError } from './errors'
export { Bookmark, NewBookmark } from './bookmarks/Bookmarks.interfaces'
export { Profile, NewProfile, State } from './profiles/Profiles.interfaces'
export {
    Permission,
    NewPermission,
    PermissionType
} from './permissions/Permissions.interfaces'

import * as events from './events'
import * as KeyTransfer from './models/KeyTransfer'
import * as subgraphs from './subgraphs'

export {
    Nevermined,
    Account,
    Accounts,
    NFT1155Api as Nfts,
    NFT721Api as Nft721,
    Config,
    DID,
    Logger,
    Keeper,
    KeyTransfer,
    conditions,
    templates,
    SearchQuery,
    utils,
    events,
    subgraphs
}
