# v2PostingFBSGetDigitalActResponse

## Top-level fields
- `v2PostingFBSGetDigitalActResponse` (top-level fields):
  - `file_content`: `string`
  - `file_name`: `string`
  - `content_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "file_content": {
      "type": "string",
      "format": "byte",
      "description": "Содержание файла в бинарном виде."
    },
    "file_name": {
      "type": "string",
      "description": "Название файла."
    },
    "content_type": {
      "type": "string",
      "description": "Тип файла."
    }
  }
}
```
