# PostingLegalInfo

Юридическая информация о покупателе.

## Top-level fields
- `PostingLegalInfo` (top-level fields):
  - `company_name`: `string`
  - `inn`: `string`
  - `kpp`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Юридическая информация о покупателе.",
  "properties": {
    "company_name": {
      "description": "Название компании.",
      "type": "string"
    },
    "inn": {
      "description": "ИНН.",
      "type": "string"
    },
    "kpp": {
      "description": "КПП.",
      "type": "string"
    }
  }
}
```
