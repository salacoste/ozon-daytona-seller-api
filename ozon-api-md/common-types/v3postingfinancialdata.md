# v3PostingFinancialData

Данные о стоимости товара, размере скидки, выплате и комиссии.

## Top-level fields
- `v3PostingFinancialData` (top-level fields):
  - `cluster_from`: `string`
  - `cluster_to`: `string`
  - `products`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "cluster_from": {
      "type": "string",
      "description": "Код региона, откуда отправляется заказ."
    },
    "cluster_to": {
      "type": "string",
      "description": "Код региона, куда доставляется заказ."
    },
    "products": {
      "items": {
        "$ref": "#/components/schemas/PostingFinancialDataProduct"
      },
      "type": "array",
      "description": "Список товаров в заказе."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Данные о стоимости товара, размере скидки, выплате и комиссии."
}
```
