# v2GetConditionalCancellationListV2Response

## Top-level fields
- `v2GetConditionalCancellationListV2Response` (top-level fields):
  - `counter`: `integer`
  - `last_id`: `integer`
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "counter": {
      "description": "Cчётчик заявок в статусе `ON_APPROVAL`.",
      "type": "integer",
      "format": "int64"
    },
    "last_id": {
      "description": "Идентификатор последнего значения на странице.\n\nЧтобы получить следующие значения, передайте полученное значение в следующем запросе в параметре `last_id`.\n",
      "type": "integer",
      "format": "int64"
    },
    "result": {
      "type": "array",
      "description": "Информация о заявках на отмену.",
      "items": {
        "$ref": "#/components/schemas/GetConditionalCancellationListV2ResponseResult"
      }
    }
  }
}
```
