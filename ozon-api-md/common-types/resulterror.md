# ResultError

## Top-level fields
- `ResultError` (top-level fields):
  - `code`: `string`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "Код ошибки."
    },
    "status": {
      "type": "string",
      "description": "Тип ошибки:\n- `warning` — предупреждение;\n- `critical` — критическая ошибка.\n"
    }
  }
}
```
