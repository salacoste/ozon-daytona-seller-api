# postingFbsPostingTrackingNumberSetRequest

## Top-level fields
- `postingFbsPostingTrackingNumberSetRequest` (top-level fields):
  - `tracking_numbers`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "tracking_numbers"
  ],
  "properties": {
    "tracking_numbers": {
      "items": {
        "$ref": "#/components/schemas/FbsPostingTrackingNumberSetRequestTrackingNumber"
      },
      "type": "array",
      "description": "Массив с парами идентификатор отправления — трек-номер."
    }
  },
  "type": "object",
  "title": "object"
}
```
