# v1PostingFbsSplitResponse

## Top-level fields
- `v1PostingFbsSplitResponse` (top-level fields):
  - `parent_posting` → `$ref` v1PostingFbsSplitResponsePostingParent
  - `postings`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "parent_posting": {
      "$ref": "#/components/schemas/v1PostingFbsSplitResponsePostingParent"
    },
    "postings": {
      "type": "array",
      "description": "Список отправлений, на которые разделился заказ.",
      "items": {
        "$ref": "#/components/schemas/v1PostingFbsSplitResponsePosting"
      }
    }
  }
}
```
