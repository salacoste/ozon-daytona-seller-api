# FbsPostingTrackingNumberSetRequestTrackingNumber

## Top-level fields
- `FbsPostingTrackingNumberSetRequestTrackingNumber` (top-level fields):
  - `posting_number`: `string`
  - `tracking_number`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "posting_number",
    "tracking_number"
  ],
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Идентификатор отправления."
    },
    "tracking_number": {
      "type": "string",
      "description": "Трек-номер отправления."
    }
  },
  "type": "object",
  "title": "object"
}
```
