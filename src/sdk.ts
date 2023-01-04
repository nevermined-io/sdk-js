import Account from './nevermined/Account'
import DID from './nevermined/DID'
import { Nevermined } from './nevermined/Nevermined'
import { LoggerInstance as Logger } from './utils/Logger'
import Keeper from './keeper/Keeper'

import * as templates from './keeper/contracts/templates'
import * as conditions from './keeper/contracts/conditions'
import * as utils from './utils'
import { NFT721Api } from './nevermined/api/nfts/NFT721Api'
import { NFT1155Api } from './nevermined/api/nfts/NFT1155Api'
import { SearchQuery } from './common/interfaces'

// Exports
export { DDO } from './ddo/DDO'

export { OrderProgressStep, CreateProgressStep } from './nevermined/ProgressSteps'
export {
    PlatformTechStatus,
    PlatformTech,
    PlatformKeeperTech,
    PlatformVersions
} from './nevermined/Versions'

export { AgreementTemplate } from './keeper/contracts/templates'
export { Condition, ConditionState } from './keeper/contracts/conditions'
export { ClientError } from './errors'
export { Bookmark, NewBookmark } from './services/metadata/Bookmarks.interfaces'
export { Profile, NewProfile, State } from './services/metadata/Profiles.interfaces'
export {
    Permission,
    NewPermission,
    PermissionType
} from './services/metadata/Permissions.interfaces'

export * from './models'

import * as events from './events'
import * as subgraphs from './subgraphs'

export {
    Nevermined,
    Account,
    // AccountsApi as Accounts,
    NFT1155Api,
    NFT721Api,
    DID,
    Logger,
    Keeper,
    conditions,
    templates,
    SearchQuery,
    utils,
    events,
    subgraphs
}

export * from './ddo/MetaData'
