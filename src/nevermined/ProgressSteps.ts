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
  DidRegistered,
}

export enum UpdateProgressStep {
  ResolveAsset,
  UpdateMetadataInDDO,
  AddVersionInDDO,
  CalculateChecksum,
  StoringImmutableDDO,
  UpdatingAssetOnChain,
  StoringDDOMarketplaceAPI,
  AssetUpdated,
}

export enum OrderProgressStep {
  LockingPayment,
  LockedPayment,
  ApprovingPayment,
  ApprovedPayment,
  CreatingAgreement,
  AgreementInitialized,
}

export enum ExecuteProgressStep {
  CreatingAgreement,
  AgreementInitialized,
  LockingPayment,
  LockedPayment,
}
