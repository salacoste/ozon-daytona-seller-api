# GetEtgbResponseResult

## Top-level fields
- `GetEtgbResponseResult` (top-level fields):
  - `posting_number`: `string`
  - `etgb` → `$ref` GetEtgbResponseResultEtgb

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "etgb": {
      "$ref": "#/components/schemas/GetEtgbResponseResultEtgb"
    }
  }
}
```
