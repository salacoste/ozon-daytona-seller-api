# arrivalpassArrivalPassUpdateRequest

## Top-level fields
- `arrivalpassArrivalPassUpdateRequest` (top-level fields):
  - `arrival_passes`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "arrival_passes"
  ],
  "type": "object",
  "properties": {
    "arrival_passes": {
      "type": "array",
      "description": "Список пропусков.",
      "items": {
        "$ref": "#/components/schemas/arrivalpassArrivalPassUpdateRequestArrivalPass"
      }
    }
  }
}
```
