# ProductV1QuantListResponse

## Top-level fields
- `ProductV1QuantListResponse` (top-level fields):
  - `cursor`: `string`
  - `products`: `object`
  - `total_items`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных."
    },
    "products": {
      "description": "Эконом-товары.",
      "items": {
        "$ref": "#/components/schemas/ProductV1QuantListResponseProducts"
      }
    },
    "total_items": {
      "type": "integer",
      "format": "int32",
      "description": "Остаток на всех складах, шт."
    }
  }
}
```
