# v1PostingFbsTimeslotSetRequest

## Top-level fields
- `v1PostingFbsTimeslotSetRequest` (top-level fields):
  - `new_timeslot` → `$ref` v1PostingFbsTimeslotSetNewTimeslot
  - `posting_number`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "new_timeslot",
    "posting_number"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "new_timeslot": {
      "$ref": "#/components/schemas/v1PostingFbsTimeslotSetNewTimeslot"
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    }
  }
}
```
