# SetPostingsResponseResult

## Top-level fields
- `SetPostingsResponseResult` (top-level fields):
  - `error`: `string`
  - `posting_number`: `string`
  - `result`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "error": {
      "type": "string",
      "description": "Описание ошибки."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "result": {
      "description": "Результат обработки запроса. `true`, если запрос был обработан успешно.\n",
      "type": "boolean"
    }
  }
}
```
