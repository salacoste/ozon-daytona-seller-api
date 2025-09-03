# CargoesCreateInfoResponseResultCargo

## Top-level fields
- `CargoesCreateInfoResponseResultCargo` (top-level fields):
  - `key`: `string`
  - `value` → `$ref` CargoesCreateInfoResponseResultCargoValue

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "key": {
      "description": "Ключ грузоместа.",
      "type": "string"
    },
    "value": {
      "$ref": "#/components/schemas/CargoesCreateInfoResponseResultCargoValue"
    }
  }
}
```
