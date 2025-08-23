# v1DraftClusterListResponseWarehouse

## Top-level fields
- `v1DraftClusterListResponseWarehouse` (top-level fields):
  - `name`: `string`
  - `type`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Название склада."
    },
    "type": {
      "type": "string",
      "enum": [
        "FULL_FILLMENT",
        "EXPRESS_DARK_STORE",
        "SORTING_CENTER",
        "ORDERS_RECEIVING_POINT",
        "CROSS_DOCK",
        "DISTRIBUTION_CENTER"
      ],
      "description": "Тип склада:\n- `FULL_FILLMENT` — фулфилмент,\n- `EXPRESS_DARK_STORE` — даркстор,\n- `SORTING_CENTER` — сортировочный центр,\n- `ORDERS_RECEIVING_POINT` — пункт приёма заказов,\n- `CROSS_DOCK` — кросс-докинг,\n- `DISTRIBUTION_CENTER` — распределительный центр.\n"
    },
    "warehouse_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада."
    }
  }
}
```
