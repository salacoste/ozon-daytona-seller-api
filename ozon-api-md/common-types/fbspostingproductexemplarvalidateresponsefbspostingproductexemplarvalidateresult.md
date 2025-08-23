# FbsPostingProductExemplarValidateResponseFbsPostingProductExemplarValidateResult

Результат работы метода.

## Top-level fields
- `FbsPostingProductExemplarValidateResponseFbsPostingProductExemplarValidateResult` (top-level fields):
  - `products`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат работы метода.",
  "properties": {
    "products": {
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/FbsPostingProductExemplarValidateResponseFbsPostingProductExemplarValidateResultProduct"
      }
    }
  }
}
```
