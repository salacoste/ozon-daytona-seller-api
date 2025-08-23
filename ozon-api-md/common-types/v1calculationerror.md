# v1CalculationError

## Top-level fields
- `v1CalculationError` (top-level fields):
  - `error_message`: `string`
  - `items_validation`: `array`
  - `unknown_cluster_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "error_message": {
      "type": "string",
      "description": "Возможные ошибки:\n- `vdc_is_not_supported` — не поддерживается тип поставки вРЦ;\n- `drop_off_point_warehouse_is_required` — не передано значение `drop_off_point_warehouse_id`;\n- `empty_items_list` — передан пустой список `items`;\n- `items_count_more_than_max` — превышено количество `sku`;\n- `invalid_shipment_type` — неверный тип черновика;\n- `unknown_cluster_ids` — кластер с таким `id` не существует;\n- `items_validation` — ошибки валидации товарного состава;\n- `drop_off_point_does_not_exist` — точка отгрузки с таким `id` не существует;\n- `drop_off_point_has_no_timeslots` — нет доступных таймслотов на точке отгрузки;\n- `total_volume_in_litres_invalid` — объём поставляемых товаров слишком большой для этой точки;\n- `xdock_in_delivery_point_disabled_for_seller` — поставка кросс-докингом через пункт выдачи заказов недоступна для продавца.\n"
    },
    "items_validation": {
      "type": "array",
      "description": "Ошибки валидации.",
      "items": {
        "$ref": "#/components/schemas/v1ItemsValidation"
      }
    },
    "unknown_cluster_ids": {
      "type": "array",
      "description": "Неизвестные идентификаторы кластеров.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
