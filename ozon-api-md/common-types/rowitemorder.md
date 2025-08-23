# RowItemOrder

Информация о заказе.

## Top-level fields
- `RowItemOrder` (top-level fields):
  - `posting_number`: `string`
  - `created_date`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о заказе.",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "created_date": {
      "type": "string",
      "description": "Дата заказа в формате «ГГГГ-ММ-ДД»."
    }
  }
}
```
