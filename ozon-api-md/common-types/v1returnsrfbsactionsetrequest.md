# v1ReturnsRfbsActionSetRequest

## Top-level fields
- `v1ReturnsRfbsActionSetRequest` (top-level fields):
  - `comment`: `string`
  - `compensation_amount`: `number`
  - `id`: `integer`
  - `rejection_reason_id`: `integer`
  - `return_for_back_way`: `number`
  - `return_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "comment": {
      "type": "string",
      "description": "Комментарий продавца.\n\nОбязателен для `id: -1` и `id: -10`.\n"
    },
    "compensation_amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма компенсации.\n\nОбязательна для `id: 1020`.\n"
    },
    "id": {
      "type": "integer",
      "format": "int32",
      "description": "Идентификатор действия. \n\nПолучите доступные действия `returns.available_actions` методом [/v2/returns/rfbs/get](#operation/RFBSReturnsAPI_ReturnsRfbsGetV2).\n"
    },
    "rejection_reason_id": {
      "type": "integer",
      "format": "int32",
      "description": "Идентификатор причины отмены.\n\nОбязателен для `id: -1` и `id: -10`.\n\nПолучите возможные причины отмены `returns.rejection_reason` методом [/v2/returns/rfbs/get](#operation/RFBSReturnsAPI_ReturnsRfbsGetV2).\n"
    },
    "return_for_back_way": {
      "type": "number",
      "format": "double",
      "description": "Сумма, возмещаемая покупателю за пересылку товара.\n\nОтрицательные значения приравниваются к `0`.\n"
    },
    "return_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заявки на возврат."
    }
  }
}
```
