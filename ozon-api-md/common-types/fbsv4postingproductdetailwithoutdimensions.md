# fbsv4PostingProductDetailWithoutDimensions

## Top-level fields
- `fbsv4PostingProductDetailWithoutDimensions` (top-level fields):
  - `mandatory_mark`: `object`
  - `name`: `string`
  - `offer_id`: `string`
  - `price`: `string`
  - `quantity`: `integer`
  - `sku`: `integer`
  - `currency_code`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "mandatory_mark": {
      "description": "Обязательная маркировка «Честный ЗНАК».",
      "items": {
        "type": "string"
      }
    },
    "name": {
      "description": "Название товара.",
      "type": "string"
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "price": {
      "type": "string",
      "description": "Цена."
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товара в отправлении."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "currency_code": {
      "type": "string",
      "description": "Валюта ваших цен. Cовпадает с валютой, которая установлена в настройках личного кабинета.\n\nВозможные значения: \n  - `RUB` — российский рубль,\n  - `BYN` — белорусский рубль,\n  - `KZT` — тенге,\n  - `EUR` — евро,\n  - `USD` — доллар США,\n  - `CNY` — юань.\n"
    }
  }
}
```
