# productsv1GetProductInfoStocksByWarehouseFbsRequest

## Top-level fields
- `productsv1GetProductInfoStocksByWarehouseFbsRequest` (top-level fields):
  - `sku`: `object`

## Full schema (JSON)
```json
{
  "required": [
    "sku"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
