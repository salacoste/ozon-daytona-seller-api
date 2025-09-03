# GetSupplyOrdersListRequestPaging

Настройка отображения списка заявок.

## Top-level fields
- `GetSupplyOrdersListRequestPaging` (top-level fields):
  - `from_supply_order_id`: `integer`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Настройка отображения списка заявок.",
  "properties": {
    "from_supply_order_id": {
      "description": "Номер поставки, с которой отобразится список заявок.",
      "type": "integer",
      "format": "int64"
    },
    "limit": {
      "description": "Количество значений в ответе:\n  - максимум — 100,\n  - минимум — 1.\n",
      "type": "integer",
      "format": "int32"
    }
  },
  "required": [
    "limit"
  ]
}
```
