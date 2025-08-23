# polygonv1PolygonBindRequest

## Top-level fields
- `polygonv1PolygonBindRequest` (top-level fields):
  - `delivery_method_id`: `integer`
  - `polygons`: `array`
  - `warehouse_location` → `$ref` PolygonBindRequestwh_location

## Full schema (JSON)
```json
{
  "required": [
    "delivery_method_id",
    "polygons",
    "warehouse_location"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "delivery_method_id": {
      "type": "integer",
      "format": "int32",
      "description": "Идентификатор метода доставки."
    },
    "polygons": {
      "type": "array",
      "description": "Список полигонов.",
      "items": {
        "$ref": "#/components/schemas/PolygonBindRequestpolygon"
      }
    },
    "warehouse_location": {
      "$ref": "#/components/schemas/PolygonBindRequestwh_location"
    }
  }
}
```
