# GetFinanceProductsBuyoutResponseProduct

## Top-level fields
- `GetFinanceProductsBuyoutResponseProduct` (top-level fields):
  - `amount`: `number`
  - `buyout_price`: `number`
  - `deduction_by_category_percent`: `number`
  - `name`: `string`
  - `offer_id`: `string`
  - `posting_number`: `string`
  - `quantity`: `integer`
  - `seller_price_per_instance`: `number`
  - `sku`: `integer`
  - `vat_percent`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "amount": {
      "type": "number",
      "format": "float",
      "description": "Сумма к начислению."
    },
    "buyout_price": {
      "type": "number",
      "format": "float",
      "description": "Цена выкупа товара с НДС."
    },
    "deduction_by_category_percent": {
      "type": "number",
      "format": "float",
      "description": "Скидка по категории в процентах."
    },
    "name": {
      "description": "Название товара.",
      "type": "string"
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товара."
    },
    "seller_price_per_instance": {
      "type": "number",
      "format": "float",
      "description": "Цена продавца с учётом скидки."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "vat_percent": {
      "type": "integer",
      "format": "int32",
      "description": "Ставка НДС для товара в процентах."
    }
  }
}
```
