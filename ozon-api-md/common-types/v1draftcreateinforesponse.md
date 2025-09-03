# v1DraftCreateInfoResponse

## Top-level fields
- `v1DraftCreateInfoResponse` (top-level fields):
  - `clusters`: `array`
  - `draft_id`: `integer`
  - `errors`: `array`
  - `status` → `$ref` v1CalculationStatus

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "clusters": {
      "type": "array",
      "description": "Кластеры.",
      "items": {
        "$ref": "#/components/schemas/draftv1Cluster"
      }
    },
    "draft_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор черновика заявки на поставку."
    },
    "errors": {
      "type": "array",
      "description": "Ошибки.",
      "items": {
        "$ref": "#/components/schemas/v1CalculationError"
      }
    },
    "status": {
      "$ref": "#/components/schemas/v1CalculationStatus"
    }
  }
}
```
