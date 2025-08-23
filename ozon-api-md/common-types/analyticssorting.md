# analyticsSorting

## Top-level fields
- `analyticsSorting` (top-level fields):
  - `key`: `string`
  - `order` → `$ref` SortingOrder

## Full schema (JSON)
```json
{
  "properties": {
    "key": {
      "type": "string",
      "description": "Метрика, по которой будет отсортирован результат запроса."
    },
    "order": {
      "$ref": "#/components/schemas/SortingOrder"
    }
  },
  "type": "object",
  "title": "object"
}
```
