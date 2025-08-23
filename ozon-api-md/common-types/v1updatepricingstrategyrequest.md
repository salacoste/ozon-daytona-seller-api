# v1UpdatePricingStrategyRequest

## Top-level fields
- `v1UpdatePricingStrategyRequest` (top-level fields):
  - `competitors`: `array`
  - `strategy_id`: `string`
  - `strategy_name`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "competitors",
    "strategy_id",
    "strategy_name"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "competitors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1Competitor"
      },
      "description": "Список конкурентов."
    },
    "strategy_id": {
      "type": "string",
      "description": "Идентификатор стратегии."
    },
    "strategy_name": {
      "type": "string",
      "description": "Название стратегии."
    }
  }
}
```
