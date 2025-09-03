# v1PostingFBSPickupCodeVerifyRequest

## Top-level fields
- `v1PostingFBSPickupCodeVerifyRequest` (top-level fields):
  - `pickup_code`: `string`
  - `posting_number`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "pickup_code": {
      "description": "Код курьера.",
      "type": "string"
    },
    "posting_number": {
      "description": "Номер отправления.",
      "type": "string"
    }
  },
  "required": [
    "pickup_code",
    "posting_number"
  ]
}
```
