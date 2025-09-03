# v2PostingProduct

## Top-level fields
- `v2PostingProduct` (top-level fields):
  - `digital_codes`: `object`
  - `name`: `string`
  - `offer_id`: `string`
  - `currency_code`: `string`
  - `price`: `string`
  - `is_marketplace_buyout`: `boolean`
  - `quantity`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "digital_codes": {
      "items": {
        "type": "string"
      },
      "description": "Коды активации для услуг и цифровых товаров."
    },
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
    "is_marketplace_buyout": {
      "type": "boolean",
      "description": "Признак выкупа товара."
    },
    "quantity": {
      "format": "int64",
      "type": "integer",
      "description": "Количество товара в отправлении."
    },
    "sku": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  },
  "type": "object",
  "title": "object"
}
```
