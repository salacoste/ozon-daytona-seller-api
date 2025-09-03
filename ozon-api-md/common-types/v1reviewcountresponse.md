# v1ReviewCountResponse

## Top-level fields
- `v1ReviewCountResponse` (top-level fields):
  - `processed`: `integer`
  - `total`: `integer`
  - `unprocessed`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "processed": {
      "description": "Количество обработанных отзывов.",
      "type": "integer",
      "format": "int32"
    },
    "total": {
      "description": "Количество всех отзывов.",
      "type": "integer",
      "format": "int32"
    },
    "unprocessed": {
      "description": "Количество необработанных отзывов.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
