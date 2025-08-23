# v1CargoesCreateInfoResponse

## Top-level fields
- `v1CargoesCreateInfoResponse` (top-level fields):
  - `result` → `$ref` CargoesCreateInfoResponseResult
  - `status` → `$ref` v1CargoesCreateInfoResponseStatus
  - `errors` → `$ref` v1CargoesCreateErrors

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "result": {
      "$ref": "#/components/schemas/CargoesCreateInfoResponseResult"
    },
    "status": {
      "$ref": "#/components/schemas/v1CargoesCreateInfoResponseStatus"
    },
    "errors": {
      "$ref": "#/components/schemas/v1CargoesCreateErrors"
    }
  }
}
```
