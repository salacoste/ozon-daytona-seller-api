# v3Addressee

Контактные данные получателя.

## Top-level fields
- `v3Addressee` (top-level fields):
  - `name`: `string`
  - `phone`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "name": {
      "type": "string",
      "description": "Имя покупателя."
    },
    "phone": {
      "type": "string",
      "description": "Контактный телефон. \n\nВсегда возвращает пустую строку `\"\"`.\n"
    }
  },
  "type": "object",
  "title": "object",
  "description": "Контактные данные получателя."
}
```
