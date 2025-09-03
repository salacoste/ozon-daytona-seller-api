# PolygonBindRequestpolygon

## Top-level fields
- `PolygonBindRequestpolygon` (top-level fields):
  - `polygon_id`: `integer`
  - `time`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "polygon_id",
    "time"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "polygon_id": {
      "description": "Идентификатор полигона.",
      "type": "integer",
      "format": "int64"
    },
    "time": {
      "description": "Время в минутах, за которое доставят товар в этом полигоне.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
