# v1PostingFbsSplitResponsePostingParent

Информация об изначальном отправлении.

## Top-level fields
- `v1PostingFbsSplitResponsePostingParent` (top-level fields):
  - `posting_number`: `string`
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Информация об изначальном отправлении.",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер изначального отправления."
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
