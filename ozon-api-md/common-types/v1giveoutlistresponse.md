# v1GiveoutListResponse

## Top-level fields
- `v1GiveoutListResponse` (top-level fields):
  - `giveouts`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "giveouts": {
      "description": "Идентификатор отгрузки.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GiveoutListResponseGiveoutDetails"
      }
    }
  }
}
```
