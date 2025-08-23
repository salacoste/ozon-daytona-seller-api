# v1CargoesLabelGetResponse

## Top-level fields
- `v1CargoesLabelGetResponse` (top-level fields):
  - `result` → `$ref` v1CargoesLabelGetResponseResult
  - `status` → `$ref` v1CargoesLabelGetResponseStatus
  - `errors` → `$ref` v1CargoesLabelCreateErrors

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "result": {
      "$ref": "#/components/schemas/v1CargoesLabelGetResponseResult"
    },
    "status": {
      "$ref": "#/components/schemas/v1CargoesLabelGetResponseStatus"
    },
    "errors": {
      "$ref": "#/components/schemas/v1CargoesLabelCreateErrors"
    }
  }
}
```
