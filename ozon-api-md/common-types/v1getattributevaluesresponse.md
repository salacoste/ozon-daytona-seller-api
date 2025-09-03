# v1GetAttributeValuesResponse

## Top-level fields
- `v1GetAttributeValuesResponse` (top-level fields):
  - `has_next`: `boolean`
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "has_next": {
      "type": "boolean",
      "description": "Признак, что в ответе вернулась только часть значений характеристики:\n- `true` — сделайте повторный запрос с новым параметром `last_value_id` для получения остальных значений;\n- `false` — ответ содержит все значения характеристики.\n"
    },
    "result": {
      "type": "array",
      "description": "Значения характеристики.",
      "items": {
        "$ref": "#/components/schemas/v1GetAttributeValuesResponseDictionaryValue"
      }
    }
  }
}
```
