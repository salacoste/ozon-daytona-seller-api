# v2Product

Данные о товаре.

## Top-level fields
- `v2Product` (top-level fields):
  - `name`: `string`
  - `offer_id`: `string`
  - `currency_code`: `string`
  - `price`: `string`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Данные о товаре.",
  "properties": {
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "currency_code": {
      "type": "string",
      "description": "Валюта ваших цен. Cовпадает с валютой, которая установлена в настройках личного кабинета.\n\nВозможные значения: \n  - `RUB` — российский рубль,\n  - `BYN` — белорусский рубль,\n  - `KZT` — тенге,\n  - `EUR` — евро,\n  - `USD` — доллар США,\n  - `CNY` — юань.\n"
    },
    "price": {
      "type": "string",
      "description": "Цена товара."
    },
    "sku": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  }
}
```
