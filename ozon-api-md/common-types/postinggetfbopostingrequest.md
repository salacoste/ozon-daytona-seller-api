# postingGetFboPostingRequest

## Top-level fields
- `postingGetFboPostingRequest` (top-level fields):
  - `posting_number`: `string`
  - `translit`: `boolean`
  - `with` → `$ref` postingFboPostingWithParams

## Full schema (JSON)
```json
{
  "required": [
    "posting_number"
  ],
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "translit": {
      "type": "boolean",
      "description": "Если включена транслитерация адреса из кириллицы в латиницу — `true`."
    },
    "with": {
      "$ref": "#/components/schemas/postingFboPostingWithParams"
    }
  },
  "type": "object",
  "title": "object"
}
```
