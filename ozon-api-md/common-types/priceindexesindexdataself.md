# PriceIndexesIndexDataSelf

Цена вашего товара на других площадках.

## Top-level fields
- `PriceIndexesIndexDataSelf` (top-level fields):
  - `minimal_price`: `string`
  - `minimal_price_currency`: `string`
  - `price_index_value`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Цена вашего товара на других площадках.",
  "properties": {
    "minimal_price": {
      "type": "string",
      "description": "Минимальная цена вашего товара на других площадках."
    },
    "minimal_price_currency": {
      "type": "string",
      "description": "Валюта цены."
    },
    "price_index_value": {
      "type": "number",
      "format": "double",
      "description": "Значение индекса цены."
    }
  }
}
```
