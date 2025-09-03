# v2OrderTimeslot

Интервал поставки.

## Top-level fields
- `v2OrderTimeslot` (top-level fields):
  - `can_not_set_reasons`: `array`
  - `can_set`: `boolean`
  - `is_required`: `boolean`
  - `value` → `$ref` v2TimeslotZonedMessage

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Интервал поставки.",
  "properties": {
    "can_not_set_reasons": {
      "description": "Причина, по которой не получается выбрать интервал поставки.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "can_set": {
      "description": "`true`, если интервал поставки можно выбрать или изменить.\n",
      "type": "boolean"
    },
    "is_required": {
      "type": "boolean",
      "description": "`true`, если характеристику указывать обязательно.\n"
    },
    "value": {
      "$ref": "#/components/schemas/v2TimeslotZonedMessage"
    }
  }
}
```
