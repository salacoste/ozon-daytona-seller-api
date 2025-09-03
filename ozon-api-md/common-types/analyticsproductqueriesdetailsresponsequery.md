# AnalyticsProductQueriesDetailsResponseQuery

## Top-level fields
- `AnalyticsProductQueriesDetailsResponseQuery` (top-level fields):
  - `currency`: `string`
  - `gmv`: `number`
  - `order_count`: `integer`
  - `position`: `number`
  - `query`: `string`
  - `query_index`: `integer`
  - `sku`: `integer`
  - `unique_search_users`: `integer`
  - `unique_view_users`: `integer`
  - `view_conversion`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "currency": {
      "type": "string",
      "description": "Валюта."
    },
    "gmv": {
      "type": "number",
      "format": "float",
      "description": "Продажи по запросам."
    },
    "order_count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество заказов по запросу."
    },
    "position": {
      "type": "number",
      "format": "float",
      "description": "Средняя позиция товара. Доступно только с подпиской [Premium](https://seller-edu.ozon.ru/seller-rating/about-rating/premium-program) или [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus), иначе поле вернётся пустым."
    },
    "query": {
      "type": "string",
      "description": "Текст запроса."
    },
    "query_index": {
      "type": "integer",
      "format": "int64",
      "description": "Порядковый номер запроса."
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
