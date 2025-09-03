# v2ReturnsRfbsRejectRequest

## Top-level fields
- `v2ReturnsRfbsRejectRequest` (top-level fields):
  - `return_id`: `integer`
  - `comment`: `string`
  - `rejection_reason_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "return_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заявки на возврат."
    },
    "comment": {
      "type": "string",
      "description": "Комментарий.\n\nПередайте комментарий, если в ответе метода [/v2/returns/rfbs/get](#operation/RFBSReturnsAPI_ReturnsRfbsGetV2) параметр `rejection_reason.is_comment_required` — `true`.\n"
    },
    "rejection_reason_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор причины отмены.\n\nПередайте идентификатор из списка причин, полученного в ответе метода [/v2/returns/rfbs/get](#operation/RFBSReturnsAPI_ReturnsRfbsGetV2) в параметре `rejection_reason`.\n"
    }
  },
  "required": [
    "return_id",
    "rejection_reason_id"
  ]
}
```
