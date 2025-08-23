# productImportProductsBySKURequestItem

## Top-level fields
- `productImportProductsBySKURequestItem` (top-level fields):
  - `name`: `string`
  - `offer_id`: `string`
  - `old_price`: `string`
  - `price`: `string`
  - `sku`: `integer`
  - `vat`: `string`
  - `currency_code`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "sku"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Название товара. До 500 символов."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул.\n\nМаксимальная длина строки — 50 символов.\n"
    },
    "old_price": {
      "type": "string",
      "description": "Цена до скидок (будет зачеркнута на карточке товара). Указывается в рублях. Разделитель дробной части — точка, до двух знаков после точки."
    },
    "price": {
      "type": "string",
      "description": "Цена товара с учётом скидок, отображается на карточке товара. Если на товар нет скидок, укажите значение `old_price` в этом параметре."
    },
    "sku": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "vat": {
      "type": "string",
      "description": "Ставка НДС для товара:\n  - `0` — не облагается НДС,\n  - `0.05` — 5%,\n  - `0.07` — 7%,\n  - `0.1` — 10%,\n  - `0.2` — 20%.\n\nПередавайте значение ставки, актуальное на данный момент.\n"
    },
    "currency_code": {
      "type": "string",
      "description": "Валюта ваших цен. Переданное значение должно совпадать с валютой, которая установлена в настройках личного кабинета. По умолчанию передаётся `RUB` — российский рубль.\n\nНапример, если у вас установлена валюта взаиморасчётов юань, передавайте значение `CNY`, иначе вернётся ошибка.\n\nВозможные значения: \n  - `RUB` — российский рубль,\n  - `BYN` — белорусский рубль,\n  - `KZT` — тенге,\n  - `EUR` — евро,\n  - `USD` — доллар США,\n  - `CNY` — юань.\n"
    }
  },
  "type": "object",
  "title": "object"
}
```
