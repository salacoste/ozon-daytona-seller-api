# v1CargoesCreateRequestCargo

## Top-level fields
- `v1CargoesCreateRequestCargo` (top-level fields):
  - `key`: `string`
  - `value` → `$ref` v1CargoesCreateRequestCargoValue

## Full schema (JSON)
```json
{
  "type": "object",
  "required": [
    "key",
    "value"
  ],
  "properties": {
    "key": {
      "description": "Уникальный ключ для идентификации грузоместа.",
      "type": "string"
    },
    "value": {
      "$ref": "#/components/schemas/v1CargoesCreateRequestCargoValue"
    }
  }
}
```
