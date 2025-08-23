# v1ProductActionTimerStatusResponseStatuses

## Top-level fields
- `v1ProductActionTimerStatusResponseStatuses` (top-level fields):
  - `expired_at`: `string`
  - `min_price_for_auto_actions_enabled`: `boolean`
  - `product_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "expired_at": {
      "type": "string",
      "format": "date-time",
      "description": "Время окончания таймера."
    },
    "min_price_for_auto_actions_enabled": {
      "type": "boolean",
      "description": "`true`, если Ozon учитывает минимальную цену при добавлении в акции.\n"
    },
    "product_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    }
  }
}
```
