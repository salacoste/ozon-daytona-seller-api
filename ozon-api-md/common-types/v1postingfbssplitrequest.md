# v1PostingFbsSplitRequest

## Top-level fields
- `v1PostingFbsSplitRequest` (top-level fields):
  - `posting_number`: `string`
  - `postings`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "postings": {
      "type": "array",
      "description": "Список отправлений, на которые поделится заказ. За один запрос можно разделить один заказ.",
      "items": {
        "$ref": "#/components/schemas/v1PostingFbsSplitRequestPosting"
      }
    }
  },
  "required": [
    "posting_number",
    "postings"
  ]
}
```
