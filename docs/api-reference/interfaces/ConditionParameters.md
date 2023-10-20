[@nevermined-io/sdk](../code-reference.md) / ConditionParameters

# Interface: ConditionParameters<Extra\>

## Type parameters

| Name    |
| :------ |
| `Extra` |

## Table of contents

### Properties

- [list](ConditionParameters.md#list)
- [params](ConditionParameters.md#params)

## Properties

### list

• **list**: `any`[]

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:26](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L26)

---

### params

• **params**: (`method`: [`ConditionMethod`](../code-reference.md#conditionmethod), `arg`: `Extra`) => `Promise`<`any`[]\>

#### Type declaration

▸ (`method`, `arg`): `Promise`<`any`[]\>

##### Parameters

| Name     | Type                                                      |
| :------- | :-------------------------------------------------------- |
| `method` | [`ConditionMethod`](../code-reference.md#conditionmethod) |
| `arg`    | `Extra`                                                   |

##### Returns

`Promise`<`any`[]\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:27](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L27)
