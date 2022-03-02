// import { assert } from 'chai'
// import { AaveBorrowCondition } from '../../../src/keeper/contracts/conditions/'
// import { Nevermined } from '../../../src/nevermined/Nevermined'
// import config from '../../config'
// import TestContractHandler from '../TestContractHandler'
// import {zeroX} from "../../../src/utils";
//
// let condition: AaveBorrowCondition
//
// describe('AaveBorrowCondition', () => {
//     const did = `did:nv:${'a'.repeat(64)}`
//     const vaultAddress = `0x${'a'.repeat(40)}`
//     const assetToBorrow = `0x${'a'.repeat(40)}`
//     const amount = 100
//     const interestRateMode = 1
//
//     before(async () => {
//         await TestContractHandler.prepareContracts()
//         condition = (await Nevermined.getInstance(config)).keeper.conditions
//             .aaveBorrowCondition
//     })
//
//     describe('#hashValues()', () => {
//         it('should hash the values', async () => {
//             const hash = await condition.hashValues(
//                 zeroX(did),
//                 vaultAddress,
//                 assetToBorrow,
//                 amount,
//                 interestRateMode
//             )
//             assert.match(hash, /^0x[a-f0-9]{64}$/i)
//         })
//     })
//
// })
