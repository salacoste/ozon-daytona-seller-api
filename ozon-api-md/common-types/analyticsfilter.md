# analyticsFilter

## Top-level fields
- `analyticsFilter` (top-level fields):
  - `key`: `string`
  - `op` → `$ref` FilterOp
  - `value`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "key": {
      "type": "string",
      "description": "Параметр сортировки. Можно передать любой атрибут из параметров `dimension` и `metric`, кроме атрибута `brand`."
    },
    "op": {
      "$ref": "#/components/schemas/FilterOp"
    },
    "value": {
      "type": "string",
      "description": "Значение для сравнения."
    }
  },
  "type": "object",
  "title": "object"
}
```
