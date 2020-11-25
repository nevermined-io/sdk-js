import Config from './models/Config'
import Account from './nevermined/Account'
import DID from './nevermined/DID'
import { Nevermined } from './nevermined/Nevermined'
import { LoggerInstance as Logger } from './utils/Logger'
import Keeper from './keeper/Keeper'

import * as templates from './keeper/contracts/templates'
import * as conditions from './keeper/contracts/conditions'
import * as utils from './utils'

// Exports
export * from './ddo/DDO'
export * from './ddo/MetaData'

export { OrderProgressStep, CreateProgressStep } from './nevermined/Assets'
export {
    PlatformTechStatus,
    PlatformTech,
    PlatformKeeperTech,
    PlatformVersions
} from './nevermined/Versions'

export { AgreementTemplate } from './keeper/contracts/templates'
export { Condition, ConditionState } from './keeper/contracts/conditions'

export { Nevermined, Account, Config, DID, Logger, Keeper, conditions, templates, utils }
