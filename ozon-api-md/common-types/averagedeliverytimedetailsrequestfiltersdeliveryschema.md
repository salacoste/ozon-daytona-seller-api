# AverageDeliveryTimeDetailsRequestFiltersDeliverySchema

Схема доставки:
- `ALL` — все;
- `FBO` — доставка со склада Ozon;
- `FBS` — доставка со своего склада.


## Full schema (JSON)
```json
{
  "type": "string",
  "default": "ALL",
  "description": "Схема доставки:\n- `ALL` — все;\n- `FBO` — доставка со склада Ozon;\n- `FBS` — доставка со своего склада.\n",
  "enum": [
    "ALL",
    "FBO",
    "FBS"
  ]
}
```
