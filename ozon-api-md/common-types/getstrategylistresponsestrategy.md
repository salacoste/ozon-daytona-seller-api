# GetStrategyListResponseStrategy

## Top-level fields
- `GetStrategyListResponseStrategy` (top-level fields):
  - `id`: `string`
  - `name`: `string`
  - `type`: `string`
  - `update_type`: `string`
  - `updated_at`: `string`
  - `products_count`: `integer`
  - `competitors_count`: `integer`
  - `enabled`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "Идентификатор стратегии."
    },
    "name": {
      "type": "string",
      "description": "Название стратегии."
    },
    "type": {
      "type": "string",
      "description": "Тип стратегии:\n- `MIN_EXT_PRICE` — системная,\n- `COMP_PRICE` — пользовательская.\n"
    },
    "update_type": {
      "type": "string",
      "description": "Тип последнего изменения стратегии:\n- `strategyEnabled` — возобновлена,\n- `strategyDisabled` — остановлена,\n- `strategyChanged` — обновлена,\n- `strategyCreated` — создана,\n- `strategyItemsListChanged` — изменён набор товаров в стратегии.\n"
    },
    "updated_at": {
      "type": "string",
      "description": "Дата последнего изменения."
    },
    "products_count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество товаров в стратегии."
    },
    "competitors_count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество выбранных конкурентов."
    },
    "enabled": {
      "type": "boolean",
      "description": "Статус стратегии:\n- `true` — включена,\n- `false` — отключена.\n"
    }
  }
}
```
