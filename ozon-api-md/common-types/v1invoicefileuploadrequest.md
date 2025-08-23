# v1InvoiceFileUploadRequest

## Top-level fields
- `v1InvoiceFileUploadRequest` (top-level fields):
  - `base64_content`: `string`
  - `posting_number`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "base64_content",
    "posting_number"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "base64_content": {
      "type": "string",
      "description": "Счёт-фактура в кодировке Base64."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    }
  }
}
```
