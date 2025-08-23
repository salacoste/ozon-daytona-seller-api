# v2ReturnsRfbsCompensateRequest

## Top-level fields
- `v2ReturnsRfbsCompensateRequest` (top-level fields):
  - `compensation_amount`: `string`
  - `return_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "compensation_amount": {
      "type": "string",
      "description": "Сумма компенсации."
    },
    "return_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заявки на возврат."
    }
  },
  "required": [
    "return_id"
  ]
}
```
