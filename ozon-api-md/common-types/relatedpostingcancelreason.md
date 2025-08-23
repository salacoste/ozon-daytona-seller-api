# relatedPostingCancelReason

## Top-level fields
- `relatedPostingCancelReason` (top-level fields):
  - `posting_number`: `string`
  - `reasons`: `array`

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
    "reasons": {
      "type": "array",
      "description": "Информация о причинах отмены.",
      "items": {
        "$ref": "#/components/schemas/relatedPostingCancelReasons"
      }
    }
  }
}
```
