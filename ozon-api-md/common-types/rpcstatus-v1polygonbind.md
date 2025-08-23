# rpcStatus_v1PolygonBind

## Top-level fields
- `rpcStatus_v1PolygonBind` (top-level fields):
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
      "format": "int32"
    },
    "details": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/protobufAny"
      }
    },
    "message": {
      "type": "string",
      "description": "Сообщение об ошибке:\n\n  - **delivery target polygons not provided** — полигоны не переданы;\n  - **no delivery method id provided** — delivery_method_id не передан;\n  - **no warehouse points provided** — не передана координата склада;\n  - **polygon id .... not found** — переданы ID полигонов, которые не найдены в базе данных;\n  - **not found polygon for warehouse point** — точка склада не принадлежит ни одному переданному полигону.\n"
    }
  }
}
```
