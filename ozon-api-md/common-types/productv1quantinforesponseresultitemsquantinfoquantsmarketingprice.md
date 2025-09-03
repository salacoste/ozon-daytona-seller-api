# ProductV1QuantInfoResponseResultItemsQuantInfoQuantsMarketingPrice

Цена на товар с учётом всех акций, которая будет указана на витрине Ozon, без учёта скидки по Ozon Карте.

## Top-level fields
- `ProductV1QuantInfoResponseResultItemsQuantInfoQuantsMarketingPrice` (top-level fields):
  - `price`: `string`
  - `seller_price`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Цена на товар с учётом всех акций, которая будет указана на витрине Ozon, без учёта скидки по Ozon Карте.",
  "properties": {
    "price": {
      "type": "string",
      "description": "Цена продажи."
    },
    "seller_price": {
      "type": "string",
      "description": "Цена, которую указал продавец."
    }
  }
}
```
