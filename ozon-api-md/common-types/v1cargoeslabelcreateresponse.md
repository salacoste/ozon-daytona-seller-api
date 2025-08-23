# v1CargoesLabelCreateResponse

## Top-level fields
- `v1CargoesLabelCreateResponse` (top-level fields):
  - `operation_id`: `string`
  - `errors` → `$ref` v1CargoesLabelCreateErrors

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
      "$ref": "#/components/schemas/v1CargoesLabelCreateErrors"
    }
  }
}
```
