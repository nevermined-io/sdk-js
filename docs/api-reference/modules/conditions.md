[@nevermined-io/nevermined-sdk-js](../code-reference.md) / conditions

# Namespace: conditions

## Table of contents

### References

- [Condition](conditions.md#condition)
- [ConditionState](conditions.md#conditionstate)

### Classes

- [AaveBorrowCondition](../classes/conditions.AaveBorrowCondition.md)
- [AaveCollateralDepositCondition](../classes/conditions.AaveCollateralDepositCondition.md)
- [AaveCollateralWithdrawCondition](../classes/conditions.AaveCollateralWithdrawCondition.md)
- [AaveRepayCondition](../classes/conditions.AaveRepayCondition.md)
- [AccessCondition](../classes/conditions.AccessCondition.md)
- [ComputeExecutionCondition](../classes/conditions.ComputeExecutionCondition.md)
- [ConditionSmall](../classes/conditions.ConditionSmall.md)
- [ConsumerCondition](../classes/conditions.ConsumerCondition.md)
- [DistributeNFTCollateralCondition](../classes/conditions.DistributeNFTCollateralCondition.md)
- [EscrowPaymentCondition](../classes/conditions.EscrowPaymentCondition.md)
- [LockPaymentCondition](../classes/conditions.LockPaymentCondition.md)
- [NFT721HolderCondition](../classes/conditions.NFT721HolderCondition.md)
- [NFT721LockCondition](../classes/conditions.NFT721LockCondition.md)
- [NFTAccessCondition](../classes/conditions.NFTAccessCondition.md)
- [NFTHolderCondition](../classes/conditions.NFTHolderCondition.md)
- [NFTLockCondition](../classes/conditions.NFTLockCondition.md)
- [ProviderCondition](../classes/conditions.ProviderCondition.md)
- [TransferDIDOwnershipCondition](../classes/conditions.TransferDIDOwnershipCondition.md)
- [TransferNFT721Condition](../classes/conditions.TransferNFT721Condition.md)
- [TransferNFTCondition](../classes/conditions.TransferNFTCondition.md)

### Interfaces

- [ConditionContext](../interfaces/conditions.ConditionContext.md)
- [ConditionInstance](../interfaces/conditions.ConditionInstance.md)
- [ConditionInstanceSmall](../interfaces/conditions.ConditionInstanceSmall.md)
- [ConditionParameters](../interfaces/conditions.ConditionParameters.md)

### Type Aliases

- [ConditionMethod](conditions.md#conditionmethod)

### Variables

- [conditionStateNames](conditions.md#conditionstatenames)

## References

### Condition

Re-exports [Condition](../classes/Condition.md)

___

### ConditionState

Re-exports [ConditionState](../enums/ConditionState.md)

## Type Aliases

### ConditionMethod

Ƭ **ConditionMethod**: ``"fulfill"`` \| ``"fulfillForDelegate"``

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:17](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L17)

## Variables

### conditionStateNames

• `Const` **conditionStateNames**: `string`[]

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:43](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L43)
