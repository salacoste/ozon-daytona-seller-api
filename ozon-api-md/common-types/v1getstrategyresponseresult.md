# v1GetStrategyResponseResult

Результат работы метода.

## Top-level fields
- `v1GetStrategyResponseResult` (top-level fields):
  - `competitors`: `array`
  - `enabled`: `boolean`
  - `name`: `string`
  - `type`: `string`
  - `update_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат работы метода.",
  "properties": {
    "competitors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1Competitor"
      },
      "description": "Список конкурентов."
    },
    "enabled": {
      "type": "boolean",
      "description": "Статус стратегии:\n- `true` — включена,\n- `false` — отключена.\n"
    },
    "name": {
      "type": "string",
      "description": "Название стратегии."
    },
    "type": {
      "type": "string",
      "description": "Тип стратегии:\n- `MIN_EXT_PRICE` — системная стратегия,\n- `COMP_PRICE` — пользовательская стратегия.\n"
    },
    "update_type": {
      "type": "string",
      "description": "Тип последнего изменения стратегии:\n  - `strategyEnabled` — возобновлена,\n  - `strategyDisabled` — остановлена,\n  - `strategyChanged` — обновлена,\n  - `strategyCreated` — создана,\n  - `strategyItemsListChanged` — изменён набор товаров в стратегии.\n"
    }
  }
}
```
