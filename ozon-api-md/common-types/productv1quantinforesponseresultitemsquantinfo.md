# ProductV1QuantInfoResponseResultItemsQuantInfo

Информация о кванте.

## Top-level fields
- `ProductV1QuantInfoResponseResultItemsQuantInfo` (top-level fields):
  - `quants`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о кванте.",
  "properties": {
    "quants": {
      "description": "Список квантов.",
      "items": {
        "$ref": "#/components/schemas/ProductV1QuantInfoResponseResultItemsQuantInfoQuants"
      }
    }
  }
}
```
