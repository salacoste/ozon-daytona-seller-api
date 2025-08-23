# v1AnalyticsProductQueriesResponseItem

## Top-level fields
- `v1AnalyticsProductQueriesResponseItem` (top-level fields):
  - `category`: `string`
  - `currency`: `string`
  - `gmv`: `number`
  - `name`: `string`
  - `offer_id`: `string`
  - `position`: `number`
  - `sku`: `integer`
  - `unique_search_users`: `integer`
  - `unique_view_users`: `integer`
  - `view_conversion`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "category": {
      "type": "string",
      "description": "Название категории."
    },
    "currency": {
      "type": "string",
      "description": "Валюта."
    },
    "gmv": {
      "type": "number",
      "format": "float",
      "description": "Продажи по запросам."
    },
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "position": {
      "type": "number",
      "format": "float",
      "description": "Средняя позиция товара. Доступно только с подпиской [Premium](https://seller-edu.ozon.ru/seller-rating/about-rating/premium-program) или [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus), иначе поле вернётся пустым."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "unique_search_users": {
      "type": "integer",
      "format": "int64",
      "description": "Количество покупателей, которые искали ваш товар на Ozon."
    },
    "unique_view_users": {
      "type": "integer",
      "format": "int64",
      "description": "Количество покупателей, которые увидели ваш товар на Ozon. Доступно только с подпиской [Premium](https://seller-edu.ozon.ru/seller-rating/about-rating/premium-program) или [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus), иначе поле вернётся пустым."
    },
    "view_conversion": {
      "type": "number",
      "format": "float",
      "description": "Конверсия из просмотра товара. Доступно только с подпиской [Premium](https://seller-edu.ozon.ru/seller-rating/about-rating/premium-program) или [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus), иначе поле вернётся пустым."
    }
  }
}
```
