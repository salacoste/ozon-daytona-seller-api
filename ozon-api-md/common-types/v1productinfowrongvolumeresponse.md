# v1ProductInfoWrongVolumeResponse

## Top-level fields
- `v1ProductInfoWrongVolumeResponse` (top-level fields):
  - `cursor`: `string`
  - `products`: `object`

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
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/ProductInfoWrongVolumeResponseWrongVolumeProduct"
      }
    }
  }
}
```
