[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [conditions](../modules/conditions.md) / ConditionParameters

# Interface: ConditionParameters<Extra\>

[conditions](../modules/conditions.md).ConditionParameters

## Type parameters

| Name |
| :------ |
| `Extra` |

## Table of contents

### Properties

- [list](conditions.ConditionParameters.md#list)
- [params](conditions.ConditionParameters.md#params)

## Properties

### list

• **list**: `any`[]

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:27](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L27)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:28](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L28)
