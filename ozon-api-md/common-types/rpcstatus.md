# rpcStatus

## Top-level fields
- `rpcStatus` (top-level fields):
  - `code`: `integer`
  - `details`: `array`
  - `message`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "code": {
      "type": "integer",
      "format": "int32",
      "description": "Код ошибки."
    },
    "details": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/protobufAny"
      },
      "description": "Дополнительная информация об ошибке."
    },
    "message": {
      "type": "string",
      "description": "Описание ошибки."
    }
  }
}
```
