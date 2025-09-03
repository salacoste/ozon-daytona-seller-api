# GetConditionalCancellationListV2ResponseState

Статус заявки на отмену.

## Top-level fields
- `GetConditionalCancellationListV2ResponseState` (top-level fields):
  - `id`: `integer`
  - `name`: `string`
  - `state` → `$ref` v2CancellationStateEnum

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Статус заявки на отмену.",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор статуса."
    },
    "name": {
      "description": "Название статуса.",
      "type": "string"
    },
    "state": {
      "$ref": "#/components/schemas/v2CancellationStateEnum"
    }
  }
}
```
