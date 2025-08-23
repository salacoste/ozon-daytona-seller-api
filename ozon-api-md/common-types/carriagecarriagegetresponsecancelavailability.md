# carriageCarriageGetResponseCancelAvailability

Возможность отмены.

## Top-level fields
- `carriageCarriageGetResponseCancelAvailability` (top-level fields):
  - `is_cancel_available`: `boolean`
  - `reason`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Возможность отмены.",
  "properties": {
    "is_cancel_available": {
      "type": "boolean",
      "description": "`true`, если перевозку можно отменить.\n"
    },
    "reason": {
      "type": "string",
      "description": "Причина, почему перевозку нельзя отменить."
    }
  }
}
```
