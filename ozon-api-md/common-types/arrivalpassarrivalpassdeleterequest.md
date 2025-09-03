# arrivalpassArrivalPassDeleteRequest

## Top-level fields
- `arrivalpassArrivalPassDeleteRequest` (top-level fields):
  - `arrival_pass_ids`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "arrival_pass_ids"
  ],
  "type": "object",
  "properties": {
    "arrival_pass_ids": {
      "type": "array",
      "description": "Идентификаторы пропусков.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
