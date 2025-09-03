# PostingPostingFinancialData

Финансовые данные.

## Top-level fields
- `PostingPostingFinancialData` (top-level fields):
  - `cluster_from`: `string`
  - `cluster_to`: `string`
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Финансовые данные.",
  "properties": {
    "cluster_from": {
      "description": "Код региона, откуда отправляется заказ.",
      "type": "string"
    },
    "cluster_to": {
      "description": "Код региона, куда доставляется заказ.",
      "type": "string"
    },
    "products": {
      "description": "Список товаров в заказе.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/PostingFinancialDataProduct"
      }
    }
  }
}
```
