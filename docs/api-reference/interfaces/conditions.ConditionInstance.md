[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [conditions](../modules/conditions.md) / ConditionInstance

# Interface: ConditionInstance<Extra\>

[conditions](../modules/conditions.md).ConditionInstance

## Type parameters

| Name |
| :------ |
| `Extra` |

## Table of contents

### Properties

- [agreementId](conditions.ConditionInstance.md#agreementid)
- [id](conditions.ConditionInstance.md#id)
- [list](conditions.ConditionInstance.md#list)
- [params](conditions.ConditionInstance.md#params)
- [seed](conditions.ConditionInstance.md#seed)

## Properties

### agreementId

• **agreementId**: `string`

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/keeper/contracts/conditions/Condition.abstract.ts#L42)

___

### id

• **id**: `string`

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:40](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/keeper/contracts/conditions/Condition.abstract.ts#L40)

___

### list

• **list**: `any`[]

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:38](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/keeper/contracts/conditions/Condition.abstract.ts#L38)

___

### params

• **params**: (`method`: `string`, `arg`: `Extra`) => `Promise`<`any`[]\>

#### Type declaration

▸ (`method`, `arg`): `Promise`<`any`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `arg` | `Extra` |

##### Returns

`Promise`<`any`[]\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:41](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/keeper/contracts/conditions/Condition.abstract.ts#L41)

___

### seed

• **seed**: `string`

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:39](https://github.com/nevermined-io/sdk-js/blob/2dcaeeb/src/keeper/contracts/conditions/Condition.abstract.ts#L39)
