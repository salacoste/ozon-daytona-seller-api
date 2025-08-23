# v1UpdateStatusStrategyRequest

## Top-level fields
- `v1UpdateStatusStrategyRequest` (top-level fields):
  - `enabled`: `boolean`
  - `strategy_id`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "strategy_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "enabled": {
      "type": "boolean",
      "description": "Статус стратегии:\n- `true` — включена,\n- `false` — отключена.\n"
    },
    "strategy_id": {
      "type": "string",
      "description": "Идентификатор стратегии."
    }
  }
}
```
