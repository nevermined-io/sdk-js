[@nevermined-io/sdk](../code-reference.md) / ConditionInstance

# Interface: ConditionInstance<Extra\>

## Type parameters

| Name    |
| :------ |
| `Extra` |

## Hierarchy

- [`ConditionInstanceSmall`](ConditionInstanceSmall.md)

  ↳ **`ConditionInstance`**

## Table of contents

### Properties

- [agreementId](ConditionInstance.md#agreementid)
- [condition](ConditionInstance.md#condition)
- [id](ConditionInstance.md#id)
- [list](ConditionInstance.md#list)
- [params](ConditionInstance.md#params)
- [seed](ConditionInstance.md#seed)

## Properties

### agreementId

• **agreementId**: `string`

#### Inherited from

[ConditionInstanceSmall](ConditionInstanceSmall.md).[agreementId](ConditionInstanceSmall.md#agreementid)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L34)

---

### condition

• **condition**: `string`

#### Inherited from

[ConditionInstanceSmall](ConditionInstanceSmall.md).[condition](ConditionInstanceSmall.md#condition)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L35)

---

### id

• **id**: `string`

#### Inherited from

[ConditionInstanceSmall](ConditionInstanceSmall.md).[id](ConditionInstanceSmall.md#id)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L33)

---

### list

• **list**: `any`[]

#### Inherited from

[ConditionInstanceSmall](ConditionInstanceSmall.md).[list](ConditionInstanceSmall.md#list)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L31)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L39)

---

### seed

• **seed**: `string`

#### Inherited from

[ConditionInstanceSmall](ConditionInstanceSmall.md).[seed](ConditionInstanceSmall.md#seed)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L32)
