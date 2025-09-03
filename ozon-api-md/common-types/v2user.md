# v2User

Информация об участнике чата.

## Top-level fields
- `v2User` (top-level fields):
  - `id`: `string`
  - `type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация об участнике чата.",
  "properties": {
    "id": {
      "type": "string",
      "description": "Идентификатор участника чата."
    },
    "type": {
      "type": "string",
      "description": "Тип участника чата:\n- `customer` — покупатель,\n- `seller` — продавец,\n- `crm` — системные сообщения,\n- `courier` — курьер,\n- `support` — поддержка.\n"
    }
  }
}
```
