# v1QuestionTopSkuResponse

## Top-level fields
- `v1QuestionTopSkuResponse` (top-level fields):
  - `sku`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "sku": {
      "description": "Список Идентификаторы товаров в системе Ozon — SKU.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
