# rpcStatus_v1PolygonCreate

## Top-level fields
- `rpcStatus_v1PolygonCreate` (top-level fields):
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
      "description": "Информация об ошибке."
    },
    "message": {
      "type": "string",
      "description": "Сообщение об ошибке:\n\n  - `coordinates not provided` — координаты не переданы;\n  - `invalid coordinates, must have two points in coordinate` — в какой-то точке передана только широта или долгота, нужно передать две точки;\n  - `the first and last points in loop must be same` — первая и последняя точка не совпадают (по стандартным правилам geojson точки должны совпадать);\n  - `non-full loops must have at least 4 unique vertices for polygons` — для полигона передано менее четырех точек.\n"
    }
  }
}
```
