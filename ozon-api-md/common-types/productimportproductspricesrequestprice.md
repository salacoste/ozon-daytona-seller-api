# productImportProductsPricesRequestPrice

## Top-level fields
- `productImportProductsPricesRequestPrice` (top-level fields):
  - `auto_action_enabled`: `string`
  - `auto_add_to_ozon_actions_list_enabled`: `string`
  - `currency_code`: `string`
  - `min_price`: `string`
  - `min_price_for_auto_actions_enabled`: `boolean`
  - `net_price`: `string`
  - `offer_id`: `string`
  - `old_price`: `string`
  - `price`: `string`
  - `price_strategy_enabled`: `string`
  - `product_id`: `integer`
  - `quant_size`: `integer`
  - `vat`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "auto_action_enabled": {
      "type": "string",
      "description": "Атрибут для включения и выключения автоматического применения к товару доступных акций Ozon:\n- `ENABLED` — включить;\n- `DISABLED` — выключить;\n- `UNKNOWN` — ничего не менять, передаётся по умолчанию.\n\nНапример, если ранее вы включили автодобавление и не хотите выключать его, передавайте `UNKNOWN`.\n\nЕсли вы передаёте `ENABLED` в этом параметре, установите значение минимальной цены в параметре `min_price`. Цена не опустится ниже минимальной.\n",
      "default": "UNKNOWN",
      "enum": [
        "UNKNOWN",
        "ENABLED",
        "DISABLED"
      ]
    },
    "auto_add_to_ozon_actions_list_enabled": {
      "type": "string",
      "description": "Атрибут для включения и выключения автодобавления товара в акции:\n- `ENABLED` — включить;\n- `DISABLED` — выключить;\n- `UNKNOWN` — ничего не менять, передаётся по умолчанию.\n\nНапример, если ранее вы включили автодобавление товара в акции и не хотите выключать его, передавайте `UNKNOWN`.\n",
      "default": "UNKNOWN",
      "enum": [
        "UNKNOWN",
        "ENABLED",
        "DISABLED"
      ]
    },
    "currency_code": {
      "type": "string",
      "description": "Валюта ваших цен. Переданное значение должно совпадать с валютой, которая установлена в настройках личного кабинета. По умолчанию передаётся `RUB` — российский рубль.\n\nНапример, если у вас установлена валюта взаиморасчётов юань, передавайте значение `CNY`, иначе вернётся ошибка.\n\nВозможные значения: \n  - `RUB` — российский рубль,\n  - `BYN` — белорусский рубль,\n  - `KZT` — тенге,\n  - `EUR` — евро,\n  - `USD` — доллар США,\n  - `CNY` — юань.\n"
    },
    "min_price": {
      "type": "string",
      "description": "Минимальная цена товара после применения акций."
    },
    "min_price_for_auto_actions_enabled": {
      "type": "boolean",
      "description": "`true`, если Ozon учитывает минимальную цену при добавлении в акции. Если ничего не передать, изменений в статусе учёта цены не будет.\n"
    },
    "net_price": {
      "type": "string",
      "description": "Себестоимость товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "old_price": {
      "type": "string",
      "description": "Цена до скидок (зачеркнута на карточке товара). Указывается в рублях. Разделитель дробной части — точка, до двух знаков после точки.\n\nЕсли на товар нет скидок, укажите значение `0` в этом поле, а текущую цену передайте в поле `price`.\n"
    },
    "price": {
      "type": "string",
      "description": "Цена товара с учётом скидок, отображается на карточке товара.\n\nЕсли значение параметра `old_price` больше 0, между `price` и `old_price` должна быть определённая разница.\nОна зависит от значения `price`.\n\n| Значение `price` | Минимальная разница |\n|---|---|\n| < 400 | 20 рублей |\n| 400–10 000 | 5% |\n| > 10 000 | 500 рублей |\n"
    },
    "price_strategy_enabled": {
      "type": "string",
      "description": "Атрибут для автоприменения стратегий цены:\n- `ENABLED` — включить;\n- `DISABLED` — выключить;\n- `UNKNOWN` — ничего не менять, передаётся по умолчанию.\n\nЕсли ранее вы включили автоприменение стратегий цены и не хотите выключать его, передавайте `UNKNOWN` в следующих запросах.\n\nЕсли вы передаёте `ENABLED` в этом параметре, установите значение минимальной цены в параметре `min_price`.\n\nЕсли вы передаёте `DISABLED` в этом параметре, товар удаляется из стратегии.\n",
      "default": "UNKNOWN",
      "enum": [
        "UNKNOWN",
        "ENABLED",
        "DISABLED"
      ]
    },
    "product_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "quant_size": {
      "type": "integer",
      "format": "int64",
      "description": "Используйте параметр, если у обычного и эконом-товара совпадает артикул — `offer_id = quant_id`. Чтобы обновить цену:\n- обычного товара — передайте значение `1`;\n- эконом-товара — передайте размер его кванта.\n\nЕсли у обычного и эконом-товара разные артикулы, не передавайте параметр.\n"
    },
    "vat": {
      "type": "string",
      "description": "Ставка НДС для товара:\n  - `0` — не облагается НДС,\n  - `0.05` — 5%,\n  - `0.07` — 7%,\n  - `0.1` — 10%,\n  - `0.2` — 20%.\n\nПередавайте значение ставки, актуальное на данный момент.\n"
    }
  },
  "type": "object",
  "title": "object"
}
```
