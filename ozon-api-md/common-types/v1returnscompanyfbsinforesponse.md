# v1ReturnsCompanyFbsInfoResponse

## Top-level fields
- `v1ReturnsCompanyFbsInfoResponse` (top-level fields):
  - `drop_off_points`: `array`
  - `has_next`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "drop_off_points": {
      "description": "Информация о drop-off пунктах.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ReturnsCompanyFbsInfoResponseDropOffPoints"
      }
    },
    "has_next": {
      "type": "boolean",
      "description": "Признак, есть ли ещё пункты, где продавца ожидают возвраты."
    }
  }
}
```
