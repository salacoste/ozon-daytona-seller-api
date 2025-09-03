# protobufAny

## Top-level fields
- `protobufAny` (top-level fields):
  - `typeUrl`: `string`
  - `value`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "typeUrl": {
      "type": "string",
      "description": "Тип протокола передачи данных."
    },
    "value": {
      "type": "string",
      "format": "byte",
      "description": "Значение ошибки."
    }
  }
}
```
