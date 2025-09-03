# FbsPostingMoveStatusResponseMoveStatus

## Top-level fields
- `FbsPostingMoveStatusResponseMoveStatus` (top-level fields):
  - `error`: `string`
  - `posting_number`: `string`
  - `result`: `boolean`

## Full schema (JSON)
```json
{
  "properties": {
    "error": {
      "type": "string",
      "description": "Ошибка при обработке запроса."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "result": {
      "type": "boolean",
      "description": "Если запрос выполнен без ошибок — `true`."
    }
  },
  "type": "object",
  "title": "object"
}
```
