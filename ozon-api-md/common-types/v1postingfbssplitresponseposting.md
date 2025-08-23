# v1PostingFbsSplitResponsePosting

## Top-level fields
- `v1PostingFbsSplitResponsePosting` (top-level fields):
  - `posting_number`: `string`
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "products": {
      "type": "array",
      "description": "Список товаров в отправлении.",
      "items": {
        "$ref": "#/components/schemas/v1ProductFbsSplit"
      }
    }
  }
}
```
