# fbsv4SetProductExemplarRequest

## Top-level fields
- `fbsv4SetProductExemplarRequest` (top-level fields):
  - `posting_number`: `string`
  - `products`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "products": {
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/fbsv4SetProductExemplarRequestProduct"
      }
    }
  }
}
```
