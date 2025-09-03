# warehouseDeliveryMethodListResponse

## Top-level fields
- `warehouseDeliveryMethodListResponse` (top-level fields):
  - `has_next`: `boolean`
  - `result`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "has_next": {
      "type": "boolean",
      "description": "Признак, что в запросе вернулась только часть методов доставки:\n- `true` — сделайте повторный запрос с новым параметром `offset` для получения остальных методов;\n- `false` — ответ содержит все методы доставки по запросу.\n"
    },
    "result": {
      "items": {
        "$ref": "#/components/schemas/DeliveryMethodListResponseDeliveryMethod"
      },
      "type": "array",
      "description": "Результат запроса."
    }
  },
  "type": "object",
  "title": "object"
}
```
