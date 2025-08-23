# v1GetStrategyItemInfoResponseResult

Результат работы метода.

## Top-level fields
- `v1GetStrategyItemInfoResponseResult` (top-level fields):
  - `strategy_id`: `string`
  - `is_enabled`: `boolean`
  - `strategy_product_price`: `integer`
  - `price_downloaded_at`: `string`
  - `strategy_competitor_id`: `integer`
  - `strategy_competitor_product_url`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат работы метода.",
  "properties": {
    "strategy_id": {
      "type": "string",
      "description": "Идентификатор стратегии."
    },
    "is_enabled": {
      "type": "boolean",
      "description": "`true`, если товар участвует в стратегии ценообразования.\n"
    },
    "strategy_product_price": {
      "type": "integer",
      "format": "int32",
      "description": "Цена по стратегии."
    },
    "price_downloaded_at": {
      "type": "string",
      "description": "Дата установки цены по стратегии."
    },
    "strategy_competitor_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор конкурента.",
      "deprecated": true
    },
    "strategy_competitor_product_url": {
      "type": "string",
      "description": "Ссылка на товар конкурента."
    }
  }
}
```
