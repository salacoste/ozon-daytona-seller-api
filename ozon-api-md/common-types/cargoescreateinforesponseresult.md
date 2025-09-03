# CargoesCreateInfoResponseResult

Результат запроса.

## Top-level fields
- `CargoesCreateInfoResponseResult` (top-level fields):
  - `cargoes`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Результат запроса.",
  "properties": {
    "cargoes": {
      "description": "Информация о грузоместах.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/CargoesCreateInfoResponseResultCargo"
      }
    }
  }
}
```
