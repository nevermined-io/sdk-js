import { RoyaltyScheme } from '../../keeper/contracts/royalties'

/**
 * Attributes defining the royalties model attached to the asset
 */

export interface RoyaltyAttributes {
    royaltyKind: RoyaltyKind;
    scheme: RoyaltyScheme;
    amount: number;
}
/**
 * The type of royalty
 */

export enum RoyaltyKind {
    Standard,
    Curve,
    Legacy
}
