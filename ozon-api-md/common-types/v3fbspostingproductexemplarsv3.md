# v3FbsPostingProductExemplarsV3

Информация по продуктам и их экзмеплярам.

Ответ содержит поле `product_exemplars`, если в запросе передан признак `with.product_exemplars = true`.


## Top-level fields
- `v3FbsPostingProductExemplarsV3` (top-level fields):
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "products": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v3FbsPostingExemplarProductV3"
      }
    }
  },
  "description": "Информация по продуктам и их экзмеплярам.\n\nОтвет содержит поле `product_exemplars`, если в запросе передан признак `with.product_exemplars = true`.\n"
}
```
