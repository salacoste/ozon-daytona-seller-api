# v1GetReturnsListResponse

## Top-level fields
- `v1GetReturnsListResponse` (top-level fields):
  - `returns`: `array`
  - `has_next`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "returns": {
      "type": "array",
      "description": "Информация о возвратах.",
      "items": {
        "$ref": "#/components/schemas/GetReturnsListResponseReturnsItem"
      }
    },
    "has_next": {
      "type": "boolean",
      "description": "`true`, если у продавца есть другие возвраты.\n"
    }
  }
}
```
