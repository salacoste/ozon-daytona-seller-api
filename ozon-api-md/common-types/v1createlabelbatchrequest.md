# v1CreateLabelBatchRequest

## Top-level fields
- `v1CreateLabelBatchRequest` (top-level fields):
  - `posting_number`: `object`

## Full schema (JSON)
```json
{
  "required": [
    "posting_number"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "posting_number": {
      "description": "Номера отправлений, для которых нужны этикетки.",
      "items": {
        "type": "string"
      }
    }
  }
}
```
