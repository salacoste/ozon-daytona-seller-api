# warehouseDeliveryMethodListRequest

## Top-level fields
- `warehouseDeliveryMethodListRequest` (top-level fields):
  - `filter` → `$ref` DeliveryMethodListRequestFilter
  - `limit`: `integer`
  - `offset`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "limit"
  ],
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/DeliveryMethodListRequestFilter"
    },
    "limit": {
      "format": "int64",
      "type": "integer",
      "description": "Количество элементов в ответе. Максимум — 50, минимум — 1."
    },
    "offset": {
      "format": "int64",
      "type": "integer",
      "description": "Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента."
    }
  },
  "type": "object",
  "title": "object"
}
```
