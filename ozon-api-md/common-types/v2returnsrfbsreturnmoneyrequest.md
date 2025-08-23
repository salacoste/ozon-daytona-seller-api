# v2ReturnsRfbsReturnMoneyRequest

## Top-level fields
- `v2ReturnsRfbsReturnMoneyRequest` (top-level fields):
  - `return_id`: `integer`
  - `return_for_back_way`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "return_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заявки на возврат."
    },
    "return_for_back_way": {
      "type": "integer",
      "format": "int64",
      "description": "Сумма, возмещаемая покупателю за пересылку товара."
    }
  },
  "required": [
    "return_id"
  ]
}
```
