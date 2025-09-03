# v1PostingFbsTimeslotChangeRestrictionsResponse

## Top-level fields
- `v1PostingFbsTimeslotChangeRestrictionsResponse` (top-level fields):
  - `delivery_interval` → `$ref` v1PostingFbsTimeslotChangeRestrictionsDeliveryInterval
  - `remaining_changes_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "delivery_interval": {
      "$ref": "#/components/schemas/v1PostingFbsTimeslotChangeRestrictionsDeliveryInterval"
    },
    "remaining_changes_count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество оставшихся переносов."
    }
  }
}
```
