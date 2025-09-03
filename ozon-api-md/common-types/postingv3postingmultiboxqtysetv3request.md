# postingv3PostingMultiBoxQtySetV3Request

## Top-level fields
- `postingv3PostingMultiBoxQtySetV3Request` (top-level fields):
  - `posting_number`: `string`
  - `multi_box_qty`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "posting_number",
    "multi_box_qty"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Идентификатор многокоробочного отправления."
    },
    "multi_box_qty": {
      "type": "integer",
      "format": "int64",
      "description": "Количество коробок, в которые упакован товар."
    }
  }
}
```
