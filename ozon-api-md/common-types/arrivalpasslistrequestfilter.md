# ArrivalPassListRequestFilter

Фильтры.

## Top-level fields
- `ArrivalPassListRequestFilter` (top-level fields):
  - `arrival_pass_ids`: `array`
  - `arrival_reason`: `string`
  - `dropoff_point_ids`: `array`
  - `only_active_passes`: `boolean`
  - `warehouse_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтры.",
  "properties": {
    "arrival_pass_ids": {
      "type": "array",
      "description": "Фильтр по идентификатору пропуска.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "arrival_reason": {
      "type": "string",
      "description": "Фильтр по цели въезда:\n- `FBS_DELIVERY` — отгрузка.\n- `FBS_RETURN` — вывоз возвратов.\n\nЕсли параметр не указан, учитываются обе цели.\n\nУказанная причина должна быть в списке причин в пропусках.\n"
    },
    "dropoff_point_ids": {
      "type": "array",
      "description": "Фильтр по точке отгрузки.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "only_active_passes": {
      "type": "boolean",
      "description": "`true`, чтобы получить только активные заявки на пропуск.\n"
    },
    "warehouse_ids": {
      "type": "array",
      "description": "Фильтр по складу продавца. Можно получить с помощью метода [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList).",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
