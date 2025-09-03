# DraftGetWarehouseFboListResponseWarehouseType

Тип склада, пункта выдачи заказов или сортировочного центра:
- `WAREHOUSE_TYPE_DELIVERY_POINT` — пункт выдачи заказов,
- `WAREHOUSE_TYPE_ORDERS_RECEIVING_POINT` — пункт приёма заказов,
- `WAREHOUSE_TYPE_SORTING_CENTER` — сортировочный центр,
- `WAREHOUSE_TYPE_FULL_FILLMENT` — фулфилмент,
- `WAREHOUSE_TYPE_CROSS_DOCK` — кросс-докинг.


## Full schema (JSON)
```json
{
  "type": "string",
  "description": "Тип склада, пункта выдачи заказов или сортировочного центра:\n- `WAREHOUSE_TYPE_DELIVERY_POINT` — пункт выдачи заказов,\n- `WAREHOUSE_TYPE_ORDERS_RECEIVING_POINT` — пункт приёма заказов,\n- `WAREHOUSE_TYPE_SORTING_CENTER` — сортировочный центр,\n- `WAREHOUSE_TYPE_FULL_FILLMENT` — фулфилмент,\n- `WAREHOUSE_TYPE_CROSS_DOCK` — кросс-докинг.\n",
  "enum": [
    "WAREHOUSE_TYPE_DELIVERY_POINT",
    "WAREHOUSE_TYPE_ORDERS_RECEIVING_POINT",
    "WAREHOUSE_TYPE_SORTING_CENTER",
    "WAREHOUSE_TYPE_FULL_FILLMENT",
    "WAREHOUSE_TYPE_CROSS_DOCK"
  ]
}
```
