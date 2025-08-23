# v1SetPostingCutoffRequest

## Top-level fields
- `v1SetPostingCutoffRequest` (top-level fields):
  - `new_cutoff_date`: `string`
  - `posting_number`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "new_cutoff_date": {
      "type": "string",
      "format": "date-time",
      "description": "Новая дата отгрузки."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    }
  },
  "required": [
    "new_cutoff_date",
    "posting_number"
  ]
}
```
