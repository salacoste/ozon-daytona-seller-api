# v2ReturnsRfbsVerifyRequest

## Top-level fields
- `v2ReturnsRfbsVerifyRequest` (top-level fields):
  - `return_id`: `integer`
  - `return_method_description`: `string`

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
    "return_method_description": {
      "type": "string",
      "description": "Способ возврата товара."
    }
  },
  "required": [
    "return_id"
  ]
}
```
