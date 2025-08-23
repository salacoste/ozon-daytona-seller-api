# fbsv4FbsPostingShipV4Response

## Top-level fields
- `fbsv4FbsPostingShipV4Response` (top-level fields):
  - `additional_data`: `object`
  - `result`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "additional_data": {
      "description": "Дополнительная информация об отправлениях.",
      "items": {
        "$ref": "#/components/schemas/FbsPostingShipV4ResponseShipAdditionalData"
      }
    },
    "result": {
      "description": "Результат сборки отправлений.",
      "items": {
        "type": "string"
      }
    }
  }
}
```
