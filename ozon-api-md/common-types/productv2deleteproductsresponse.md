# productv2DeleteProductsResponse

## Top-level fields
- `productv2DeleteProductsResponse` (top-level fields):
  - `status`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "status": {
      "items": {
        "$ref": "#/components/schemas/DeleteProductsResponseDeleteStatus"
      },
      "type": "array",
      "description": "Статус обработки запроса."
    }
  },
  "type": "object",
  "title": "object"
}
```
