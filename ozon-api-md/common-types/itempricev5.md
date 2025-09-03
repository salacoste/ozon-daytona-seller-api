# ItemPricev5

Цена товара.

## Top-level fields
- `ItemPricev5` (top-level fields):
  - `auto_action_enabled`: `boolean`
  - `auto_add_to_ozon_actions_list_enabled`: `boolean`
  - `currency_code`: `string`
  - `marketing_price`: `number`
  - `marketing_seller_price`: `number`
  - `min_price`: `number`
  - `net_price`: `number`
  - `old_price`: `number`
  - `price`: `number`
  - `retail_price`: `number`
  - `vat`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Цена товара.",
  "properties": {
    "auto_action_enabled": {
      "type": "boolean",
      "description": "`true`, если автоприменение акций у товара включено.\n"
    },
    "auto_add_to_ozon_actions_list_enabled": {
      "type": "boolean",
      "description": "`true`, если автодобавление товара в акции включено.\n"
    },
    "currency_code": {
      "type": "string",
      "description": "Валюта ваших цен. Совпадает с валютой, которая установлена в настройках личного кабинета.\n\nВозможные значения: \n  - `RUB` — российский рубль,\n  - `BYN` — белорусский рубль,\n  - `KZT` — тенге,\n  - `EUR` — евро,\n  - `USD` — доллар США,\n  - `CNY` — юань.\n"
    },
    "marketing_price": {
      "type": "number",
      "format": "double",
      "description": "Цена на товар с учётом всех акций, которая будет указана на витрине Ozon, без учёта скидки по Ozon Карте."
    },
    "marketing_seller_price": {
      "type": "number",
      "format": "double",
      "description": "Цена на товар с учётом акций продавца."
    },
    "min_price": {
      "type": "number",
      "format": "double",
      "description": "Минимальная цена товара после применения всех скидок."
    },
    "net_price": {
      "type": "number",
      "format": "double",
      "description": "Себестоимость товара."
    },
    "old_price": {
      "type": "number",
      "format": "double",
      "description": "Цена до учёта скидок. На карточке товара отображается зачёркнутой."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Цена товара с учётом скидок — это значение показывается на карточке товара."
    },
    "retail_price": {
      "type": "number",
      "format": "double",
      "description": "Цена поставщика."
    },
    "vat": {
      "type": "number",
      "format": "double",
      "description": "Ставка НДС для товара."
    }
  }
}
```
