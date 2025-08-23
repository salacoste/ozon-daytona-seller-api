# ReturnsCompanyFbsInfoResponseDropOffPoints

## Top-level fields
- `ReturnsCompanyFbsInfoResponseDropOffPoints` (top-level fields):
  - `address`: `string`
  - `box_count`: `integer`
  - `id`: `integer`
  - `name`: `string`
  - `pass_info` → `$ref` ReturnsCompanyFbsInfoResponsePass_info
  - `place_id`: `integer`
  - `returns_count`: `integer`
  - `utc_offset`: `string`
  - `warehouses_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "address": {
      "type": "string",
      "description": "Адрес drop-off пункта."
    },
    "box_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество коробок в drop-off пункте."
    },
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор drop-off пункта."
    },
    "name": {
      "type": "string",
      "description": "Название drop-off пункта."
    },
    "pass_info": {
      "$ref": "#/components/schemas/ReturnsCompanyFbsInfoResponsePass_info"
    },
    "place_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада, на который приедет отгрузка."
    },
    "returns_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество возвратов в drop-off пункте."
    },
    "utc_offset": {
      "type": "string",
      "description": "Смещение часового пояса времени отгрузки от UTC-0."
    },
    "warehouses_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Идентификатор складов продавца."
    }
  }
}
```
