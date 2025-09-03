# v3PostingProductDetail

Размеры товара.

## Top-level fields
- `v3PostingProductDetail` (top-level fields):
  - `dimensions` → `$ref` v3Dimensions
  - `mandatory_mark`: `array`
  - `name`: `string`
  - `offer_id`: `string`
  - `price`: `string`
  - `jw_uin`: `array of strings`
  - `currency_code`: `string`
  - `is_blr_traceable`: `boolean`
  - `is_marketplace_buyout`: `boolean`
  - `quantity`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "dimensions": {
      "$ref": "#/components/schemas/v3Dimensions"
    },
    "mandatory_mark": {
      "items": {
        "type": "string"
      },
      "type": "array",
      "description": "Обязательная маркировка товара.",
      "deprecated": true
    },
    "name": {
      "type": "string",
      "description": "Название."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "price": {
      "type": "string",
      "description": "Цена товара с учётом скидок — это значение показывается на карточке товара."
    },
    "jw_uin": {
      "type": "array of strings",
      "description": "Уникальный идентификационный номер (УИН) ювелирного изделия."
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
    },
    "quantity": {
      "format": "int32",
      "type": "integer",
      "description": "Количество товара."
    },
    "sku": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара на Ozon."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Размеры товара."
}
```
