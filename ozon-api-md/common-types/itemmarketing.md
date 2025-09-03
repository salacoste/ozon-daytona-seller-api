# ItemMarketing

Маркетинговые акции продавца.

## Top-level fields
- `ItemMarketing` (top-level fields):
  - `actions`: `array`
  - `current_period_from`: `string`
  - `current_period_to`: `string`
  - `ozon_actions_exist`: `boolean`

## Full schema (JSON)
```json
{
  "properties": {
    "actions": {
      "items": {
        "$ref": "#/components/schemas/MarketingAction"
      },
      "type": "array",
      "description": "Маркетинговые акции продавца. Параметры `date_from`, `date_to`, `title` и `value` указываются для каждой акции продавца."
    },
    "current_period_from": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время начала текущего периода по всем действующим акциям."
    },
    "current_period_to": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время окончания текущего периода по всем действующим акциям."
    },
    "ozon_actions_exist": {
      "type": "boolean",
      "description": "`true`, если к товару можно применить акцию за счёт Ozon.\n"
    }
  },
  "type": "object",
  "title": "object",
  "description": "Маркетинговые акции продавца."
}
```
