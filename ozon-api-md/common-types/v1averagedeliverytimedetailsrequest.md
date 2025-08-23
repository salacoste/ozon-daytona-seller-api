# v1AverageDeliveryTimeDetailsRequest

## Top-level fields
- `v1AverageDeliveryTimeDetailsRequest` (top-level fields):
  - `cluster_id`: `integer`
  - `filters` → `$ref` AverageDeliveryTimeDetailsRequestFilters
  - `limit`: `integer`
  - `offset`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "required": [
    "cluster_id",
    "limit",
    "offset"
  ],
  "properties": {
    "cluster_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор кластера."
    },
    "filters": {
      "$ref": "#/components/schemas/AverageDeliveryTimeDetailsRequestFilters"
    },
    "limit": {
      "type": "integer",
      "format": "int32",
      "default": 100,
      "maximum": 1000,
      "description": "Количество элементов в ответе.\n"
    },
    "offset": {
      "type": "integer",
      "format": "int32",
      "default": 0,
      "description": "Количество элементов, которое будет пропущено в ответе. \nНапример, если `offset=10`, ответ начнётся с 11-го найденного элемента.\n"
    }
  }
}
```
