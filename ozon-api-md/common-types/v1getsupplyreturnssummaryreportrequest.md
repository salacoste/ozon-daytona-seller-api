# v1GetSupplyReturnsSummaryReportRequest

## Top-level fields
- `v1GetSupplyReturnsSummaryReportRequest` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `last_id`: `string`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "required": [
    "date_from",
    "date_to",
    "limit"
  ],
  "properties": {
    "date_from": {
      "description": "Дата начала отчётного периода в формате `YYYY-MM-DD`.",
      "type": "string"
    },
    "date_to": {
      "description": "Дата окончания отчётного периода в формате `YYYY-MM-DD`.",
      "type": "string"
    },
    "last_id": {
      "description": "Идентификатор последнего значения на странице. Чтобы получить следующие значения, укажите `last_id` из ответа предыдущего запроса.",
      "type": "string"
    },
    "limit": {
      "description": "Количество элементов в ответе.",
      "minimum": 1,
      "maximum": 500,
      "type": "integer",
      "format": "int32"
    }
  }
}
```
