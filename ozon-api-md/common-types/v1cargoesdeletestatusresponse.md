# v1CargoesDeleteStatusResponse

## Top-level fields
- `v1CargoesDeleteStatusResponse` (top-level fields):
  - `errors` → `$ref` v1CargoesDeleteStatusResponseError
  - `status` → `$ref` CargoesDeleteStatusResponseStatusEnum

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "errors": {
      "$ref": "#/components/schemas/v1CargoesDeleteStatusResponseError"
    },
    "status": {
      "$ref": "#/components/schemas/CargoesDeleteStatusResponseStatusEnum"
    }
  }
}
```
