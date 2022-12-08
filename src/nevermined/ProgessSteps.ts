
export enum CreateProgressStep {
    ServicesAdded,
    GeneratingProof,
    ProofGenerated,
    ConditionsFilled,
    EncryptingFiles,
    FilesEncrypted,
    RegisteringDid,
    SettingRoyaltyScheme,
    SettingRoyalties,
    StoringDdo,
    DdoStored,
    DdoStoredImmutable,
    DidRegistered
}

export enum UpdateProgressStep {
    ResolveAsset,
    UpdateMetadataInDDO,
    AddVersionInDDO,
    CalculateChecksum,
    StoringImmutableDDO,
    UpdatingAssetOnChain,
    StoringDDOMarketplaceAPI,
    AssetUpdated
}

export enum OrderProgressStep {
    CreatingAgreement,
    AgreementInitialized,
    LockingPayment,
    LockedPayment
}

export enum ExecuteProgressStep {
    CreatingAgreement,
    AgreementInitialized,
    LockingPayment,
    LockedPayment
}
