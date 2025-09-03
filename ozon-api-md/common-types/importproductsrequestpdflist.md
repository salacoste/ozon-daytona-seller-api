# ImportProductsRequestPdfList

## Top-level fields
- `ImportProductsRequestPdfList` (top-level fields):
  - `index`: `integer`
  - `name`: `string`
  - `src_url`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "index": {
      "format": "int64",
      "type": "integer",
      "description": "Индекс документа в хранилище, который задаёт порядок."
    },
    "name": {
      "type": "string",
      "description": "Название файла."
    },
    "src_url": {
      "type": "string",
      "description": "Адрес файла."
    }
  },
  "type": "object",
  "title": "object"
}
```
