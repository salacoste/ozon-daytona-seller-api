# PostingFinancialDataProduct

## Top-level fields
- `PostingFinancialDataProduct` (top-level fields):
  - `actions`: `array`
  - `currency_code`: `string`
  - `commission_amount`: `number`
  - `commission_percent`: `integer`
  - `commissions_currency_code`: `string`
  - `old_price`: `number`
  - `payout`: `number`
  - `price`: `number`
  - `product_id`: `integer`
  - `quantity`: `integer`
  - `total_discount_percent`: `number`
  - `total_discount_value`: `number`

## Full schema (JSON)
```json
{
  "properties": {
    "actions": {
      "items": {
        "type": "string"
      },
      "type": "array",
      "description": "Список акций."
    },
    "currency_code": {
      "type": "string",
      "description": "Валюта ваших цен. Cовпадает с валютой, которая установлена в настройках личного кабинета.\n\nВозможные значения: \n  - `RUB` — российский рубль,\n  - `BYN` — белорусский рубль,\n  - `KZT` — тенге,\n  - `EUR` — евро,\n  - `USD` — доллар США,\n  - `CNY` — юань.\n"
    },
    "commission_amount": {
      "format": "double",
      "type": "number",
      "description": "Размер комиссии за товар."
    },
    "commission_percent": {
      "format": "int64",
      "type": "integer",
      "description": "Процент комиссии."
    },
    "commissions_currency_code": {
      "type": "string",
      "description": "Код валюты, в которой рассчитывались комиссии."
    },
    "old_price": {
      "format": "double",
      "type": "number",
      "description": "Цена до учёта скидок. На карточке товара отображается зачёркнутой."
    },
    "payout": {
      "format": "double",
      "type": "number",
      "description": "Выплата продавцу."
    },
    "price": {
      "format": "double",
      "type": "number",
      "description": "Цена товара с учётом скидок — это значение показывается на карточке товара."
    },
    "product_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "quantity": {
      "format": "int64",
      "type": "integer",
      "description": "Количество товара в отправлении."
    },
    "total_discount_percent": {
      "format": "double",
      "type": "number",
      "description": "Процент скидки."
    },
    "total_discount_value": {
      "format": "double",
      "type": "number",
      "description": "Сумма скидки."
    }
  },
  "type": "object",
  "title": "object"
}
```
