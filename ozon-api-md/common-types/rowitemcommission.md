# RowItemCommission

Комиссия за доставку.

## Top-level fields
- `RowItemCommission` (top-level fields):
  - `amount`: `number`
  - `bonus`: `number`
  - `commission`: `number`
  - `compensation`: `number`
  - `price_per_instance`: `number`
  - `quantity`: `integer`
  - `standard_fee`: `number`
  - `bank_coinvestment`: `number`
  - `stars`: `number`
  - `pick_up_point_coinvestment`: `number`
  - `total`: `number`

## Full schema (JSON)
```json
{
  "properties": {
    "amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма."
    },
    "bonus": {
      "type": "number",
      "format": "double",
      "description": "Баллы за скидки."
    },
    "commission": {
      "type": "number",
      "format": "double",
      "description": "Итого комиссия с учётом скидок и наценки."
    },
    "compensation": {
      "type": "number",
      "format": "double",
      "description": "Доплата за счёт Ozon."
    },
    "price_per_instance": {
      "type": "number",
      "format": "double",
      "description": "Цена за экземпляр."
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товара."
    },
    "standard_fee": {
      "type": "number",
      "format": "double",
      "description": "Базовое вознаграждение Ozon."
    },
    "bank_coinvestment": {
      "type": "number",
      "format": "double",
      "description": "Выплаты по механикам лояльности партнёров: зелёные цены."
    },
    "stars": {
      "type": "number",
      "format": "double",
      "description": "Выплаты по механикам лояльности партнёров: звёзды."
    },
    "pick_up_point_coinvestment": {
      "type": "number",
      "format": "double",
      "description": "Выплаты по механикам лояльности партнёров: АПВЗ."
    },
    "total": {
      "type": "number",
      "format": "double",
      "description": "Итого к начислению."
    }
  },
  "description": "Комиссия за доставку.",
  "type": "object",
  "title": "object"
}
```
