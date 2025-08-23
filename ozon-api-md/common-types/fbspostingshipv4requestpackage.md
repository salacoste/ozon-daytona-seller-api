# FbsPostingShipV4RequestPackage

## Top-level fields
- `FbsPostingShipV4RequestPackage` (top-level fields):
  - `products`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "products"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "products": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/FbsPostingShipV4RequestPackageProduct"
      },
      "description": "Список товаров в отправлении."
    }
  }
}
```
