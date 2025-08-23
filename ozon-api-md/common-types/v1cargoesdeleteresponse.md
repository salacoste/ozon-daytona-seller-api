# v1CargoesDeleteResponse

## Top-level fields
- `v1CargoesDeleteResponse` (top-level fields):
  - `errors` → `$ref` v1CargoesDeleteResponseError
  - `operation_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "errors": {
      "$ref": "#/components/schemas/v1CargoesDeleteResponseError"
    },
    "operation_id": {
      "description": "Идентификатор операции.",
      "type": "string"
    }
  }
}
```
