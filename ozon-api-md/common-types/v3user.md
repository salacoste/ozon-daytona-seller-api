# v3User

Информация об участнике чата.

## Top-level fields
- `v3User` (top-level fields):
  - `id`: `string`
  - `type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Информация об участнике чата.",
  "properties": {
    "id": {
      "description": "Идентификатор участника чата.",
      "type": "string"
    },
    "type": {
      "type": "string",
      "description": "Тип участника чата:\n- `customer` — покупатель,\n- `seller` — продавец,\n- `crm` — системные сообщения,\n- `courier` — курьер,\n- `support` — поддержка.\n"
    }
  }
}
```
