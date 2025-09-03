# v1CreatePricingStrategyRequest

## Top-level fields
- `v1CreatePricingStrategyRequest` (top-level fields):
  - `competitors`: `array`
  - `strategy_name`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "competitors",
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
    "strategy_name": {
      "type": "string",
      "description": "Название стратегии."
    }
  }
}
```
