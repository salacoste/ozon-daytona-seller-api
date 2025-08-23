# v1PostingUnpaidLegalProductListResponse

## Top-level fields
- `v1PostingUnpaidLegalProductListResponse` (top-level fields):
  - `products`: `array`
  - `cursor`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "products": {
      "type": "array",
      "description": "Список неоплаченных товаров.",
      "items": {
        "$ref": "#/components/schemas/v1PostingUnpaidLegalProductListResponseProducts"
      }
    },
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных."
    }
  }
}
```
