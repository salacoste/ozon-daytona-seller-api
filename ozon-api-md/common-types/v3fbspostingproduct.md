# v3FbsPostingProduct

## Top-level fields
- `v3FbsPostingProduct` (top-level fields):
  - `name`: `string`
  - `offer_id`: `string`
  - `price`: `string`
  - `quantity`: `integer`
  - `sku`: `integer`
  - `currency_code`: `string`
  - `is_blr_traceable`: `boolean`
  - `is_marketplace_buyout`: `boolean`

## Full schema (JSON)
```json
{
  "properties": {
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "price": {
      "type": "string",
      "description": "Цена товара."
    },
    "quantity": {
      "format": "int32",
      "type": "integer",
      "description": "Количество товара в отправлении."
    },
    "sku": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "currency_code": {
      "type": "string",
      "description": "Валюта ваших цен. Совпадает с валютой, которая установлена в настройках личного кабинета.\n\nВозможные значения: \n  - `RUB` — российский рубль,\n  - `BYN` — белорусский рубль,\n  - `KZT` — тенге,\n  - `EUR` — евро,\n  - `USD` — доллар США,\n  - `CNY` — юань.\n"
    },
    "is_blr_traceable": {
      "type": "boolean",
      "description": "Признак прослеживаемости товара."
    },
    "is_marketplace_buyout": {
      "type": "boolean",
      "description": "Признак выкупа товара."
    }
  },
  "type": "object",
  "title": "object"
}
```
