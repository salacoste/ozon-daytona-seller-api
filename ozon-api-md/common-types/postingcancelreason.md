# postingCancelReason

## Top-level fields
- `postingCancelReason` (top-level fields):
  - `id`: `integer`
  - `is_available_for_cancellation`: `boolean`
  - `title`: `string`
  - `type_id`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор причины отмены.\n"
    },
    "is_available_for_cancellation": {
      "type": "boolean",
      "description": "Результат отмены отправления. `true`, если запрос доступен для отмены."
    },
    "title": {
      "type": "string",
      "description": "Название категории."
    },
    "type_id": {
      "type": "string",
      "description": "Инициатор отмены отправления:\n- `buyer` — покупатель,\n- `seller` — продавец.\n"
    }
  },
  "type": "object",
  "title": "object"
}
```
