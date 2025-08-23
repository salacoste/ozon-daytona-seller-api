# RowItemLegalEntityDocument

Информация о продаже юридическому лицу.

## Top-level fields
- `RowItemLegalEntityDocument` (top-level fields):
  - `number`: `string`
  - `sale_date`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о продаже юридическому лицу.",
  "properties": {
    "number": {
      "type": "string",
      "description": "Номер счёта-фактуры."
    },
    "sale_date": {
      "type": "string",
      "description": "Дата в формате «ГГГГ-ММ-ДД»."
    }
  }
}
```
