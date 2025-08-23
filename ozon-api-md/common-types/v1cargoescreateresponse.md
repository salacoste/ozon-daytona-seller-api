# v1CargoesCreateResponse

## Top-level fields
- `v1CargoesCreateResponse` (top-level fields):
  - `operation_id`: `string`
  - `errors` → `$ref` v1CargoesCreateErrors

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "operation_id": {
      "description": "Идентификатор операции.",
      "type": "string"
    },
    "errors": {
      "$ref": "#/components/schemas/v1CargoesCreateErrors"
    }
  }
}
```
