# v1DraftSupplyCreateStatusResponse

## Top-level fields
- `v1DraftSupplyCreateStatusResponse` (top-level fields):
  - `error_messages`: `array`
  - `result` → `$ref` DraftSupplyCreateStatusResponseResult
  - `status` → `$ref` v1DraftSupplyCreateStatus

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "error_messages": {
      "type": "array",
      "description": "Ошибки создания заявок.",
      "items": {
        "type": "string"
      }
    },
    "result": {
      "$ref": "#/components/schemas/DraftSupplyCreateStatusResponseResult"
    },
    "status": {
      "$ref": "#/components/schemas/v1DraftSupplyCreateStatus"
    }
  }
}
```
