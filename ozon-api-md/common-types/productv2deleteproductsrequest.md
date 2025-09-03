# productv2DeleteProductsRequest

## Top-level fields
- `productv2DeleteProductsRequest` (top-level fields):
  - `products`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "products"
  ],
  "properties": {
    "products": {
      "items": {
        "$ref": "#/components/schemas/DeleteProductsRequestProduct"
      },
      "type": "array",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    }
  },
  "type": "object",
  "title": "object"
}
```
