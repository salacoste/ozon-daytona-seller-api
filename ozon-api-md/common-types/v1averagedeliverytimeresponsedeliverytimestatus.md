# v1AverageDeliveryTimeResponseDeliveryTimeStatus

Нормативное время доставки:
- `UNKNOWN` — неизвестное значение;
- `FAST` — до 29 часов;
- `MEDIUM` — от 30 до 49 часов;
- `LONG` — от 50 часов.


## Full schema (JSON)
```json
{
  "type": "string",
  "description": "Нормативное время доставки:\n- `UNKNOWN` — неизвестное значение;\n- `FAST` — до 29 часов;\n- `MEDIUM` — от 30 до 49 часов;\n- `LONG` — от 50 часов.\n",
  "default": "UNKNOWN",
  "enum": [
    "UNKNOWN",
    "FAST",
    "MEDIUM",
    "LONG"
  ]
}
```
