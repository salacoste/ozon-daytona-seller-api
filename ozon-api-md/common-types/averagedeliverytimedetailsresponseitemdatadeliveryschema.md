# AverageDeliveryTimeDetailsResponseItemDataDeliverySchema

Схема доставки:
- `ALL` — все:
- `FBO` — доставка со склада Ozon;
- `FBS` — доставка со своего склада;
- `UNKNOWN` — неизвестное значение.


## Full schema (JSON)
```json
{
  "type": "string",
  "description": "Схема доставки:\n- `ALL` — все:\n- `FBO` — доставка со склада Ozon;\n- `FBS` — доставка со своего склада;\n- `UNKNOWN` — неизвестное значение.\n",
  "enum": [
    "ALL",
    "FBO",
    "FBS",
    "UNKNOWN"
  ]
}
```
