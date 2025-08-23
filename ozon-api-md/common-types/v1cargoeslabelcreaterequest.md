# v1CargoesLabelCreateRequest

## Top-level fields
- `v1CargoesLabelCreateRequest` (top-level fields):
  - `cargoes`: `array`
  - `supply_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "supply_id"
  ],
  "type": "object",
  "properties": {
    "cargoes": {
      "description": "Информация о грузоместах.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1CargoesLabelCreateRequestCargo"
      }
    },
    "supply_id": {
      "description": "Идентификатор поставки.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
