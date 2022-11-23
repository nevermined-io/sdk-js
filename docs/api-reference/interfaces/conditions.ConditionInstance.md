[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [conditions](../modules/conditions.md) / ConditionInstance

# Interface: ConditionInstance<Extra\>

[conditions](../modules/conditions.md).ConditionInstance

## Type parameters

| Name |
| :------ |
| `Extra` |

## Hierarchy

- [`ConditionInstanceSmall`](conditions.ConditionInstanceSmall.md)

  ↳ **`ConditionInstance`**

## Table of contents

### Properties

- [agreementId](conditions.ConditionInstance.md#agreementid)
- [condition](conditions.ConditionInstance.md#condition)
- [id](conditions.ConditionInstance.md#id)
- [list](conditions.ConditionInstance.md#list)
- [params](conditions.ConditionInstance.md#params)
- [seed](conditions.ConditionInstance.md#seed)

## Properties

### agreementId

• **agreementId**: `string`

#### Inherited from

[ConditionInstanceSmall](conditions.ConditionInstanceSmall.md).[agreementId](conditions.ConditionInstanceSmall.md#agreementid)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L35)

___

### condition

• **condition**: `string`

#### Inherited from

[ConditionInstanceSmall](conditions.ConditionInstanceSmall.md).[condition](conditions.ConditionInstanceSmall.md#condition)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:36](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L36)

___

### id

• **id**: `string`

#### Inherited from

[ConditionInstanceSmall](conditions.ConditionInstanceSmall.md).[id](conditions.ConditionInstanceSmall.md#id)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:34](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L34)

___

### list

• **list**: `any`[]

#### Inherited from

[ConditionInstanceSmall](conditions.ConditionInstanceSmall.md).[list](conditions.ConditionInstanceSmall.md#list)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:32](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L32)

___

### params

• **params**: (`method`: [`ConditionMethod`](../modules/conditions.md#conditionmethod), `arg`: `Extra`) => `Promise`<`any`[]\>

#### Type declaration

▸ (`method`, `arg`): `Promise`<`any`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `method` | [`ConditionMethod`](../modules/conditions.md#conditionmethod) |
| `arg` | `Extra` |

##### Returns

`Promise`<`any`[]\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:40](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L40)

___

### seed

• **seed**: `string`

#### Inherited from

[ConditionInstanceSmall](conditions.ConditionInstanceSmall.md).[seed](conditions.ConditionInstanceSmall.md#seed)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L33)
