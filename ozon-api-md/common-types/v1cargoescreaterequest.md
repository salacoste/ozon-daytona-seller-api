# v1CargoesCreateRequest

## Top-level fields
- `v1CargoesCreateRequest` (top-level fields):
  - `cargoes`: `array`
  - `delete_current_version`: `boolean`
  - `supply_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "required": [
    "cargoes",
    "supply_id"
  ],
  "properties": {
    "cargoes": {
      "description": "Информация о грузоместах. Вы можете передать не больше 40 палет или 30 коробок.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1CargoesCreateRequestCargo"
      }
    },
    "delete_current_version": {
      "description": "`true`, если нужно удалить предыдущие грузоместа.\n",
      "type": "boolean"
    },
    "supply_id": {
      "description": "Идентификатор поставки. Можно получить с помощью метода [/v2/supply-order/get](#operation/SupplyOrderAPI_GetSupplyOrdersV2). Нужное значение — в параметре ответа `orders.supplies.supply_id`.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
