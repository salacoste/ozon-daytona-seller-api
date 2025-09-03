# v1DraftSupplyCreateRequest

## Top-level fields
- `v1DraftSupplyCreateRequest` (top-level fields):
  - `draft_id`: `integer`
  - `timeslot` → `$ref` v1DayTimeSlot
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "DraftSupplyCreate",
  "properties": {
    "draft_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор черновика заявки на поставку."
    },
    "timeslot": {
      "$ref": "#/components/schemas/v1DayTimeSlot"
    },
    "warehouse_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада размещения. Можно получить с помощью метода [/v1/draft/create/info](#operation/SupplyDraftAPI_DraftCreateInfo)."
    }
  },
  "required": [
    "draft_id",
    "warehouse_id"
  ]
}
```
