# AnalyticsGetStockOnWarehousesRequestWarehouseType

Фильтр по типу склада:
  - `EXPRESS_DARK_STORE` — склады Ozon с доставкой Fresh.
  - `NOT_EXPRESS_DARK_STORE` — склады Ozon без доставки Fresh.
  - `ALL` — все склады Ozon.


## Full schema (JSON)
```json
{
  "default": "ALL",
  "enum": [
    "ALL",
    "EXPRESS_DARK_STORE",
    "NOT_EXPRESS_DARK_STORE"
  ],
  "description": "Фильтр по типу склада:\n  - `EXPRESS_DARK_STORE` — склады Ozon с доставкой Fresh.\n  - `NOT_EXPRESS_DARK_STORE` — склады Ozon без доставки Fresh.\n  - `ALL` — все склады Ozon.\n",
  "type": "string"
}
```
