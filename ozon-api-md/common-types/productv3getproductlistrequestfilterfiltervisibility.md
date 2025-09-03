# productv3GetProductListRequestFilterFilterVisibility

Фильтр по видимости товара:
  - `ALL` — все товары.
  - `VISIBLE` — товары, которые видны покупателям.
  - `INVISIBLE` — товары, которые не видны покупателям.
  - `EMPTY_STOCK` — товары, у которых не указано наличие.
  - `NOT_MODERATED` — товары, которые не прошли модерацию.
  - `MODERATED` — товары, которые прошли модерацию.
  - `DISABLED` — товары, которые видны покупателям, но недоступны к покупке.
  - `STATE_FAILED` — товары, создание которых завершилось ошибкой.
  - `READY_TO_SUPPLY` — товары, готовые к поставке.
  - `VALIDATION_STATE_PENDING` — товары, которые проходят проверку валидатором на премодерации.
  - `VALIDATION_STATE_FAIL` — товары, которые не прошли проверку валидатором на премодерации.
  - `VALIDATION_STATE_SUCCESS` — товары, которые прошли проверку валидатором на премодерации.
  - `TO_SUPPLY` — товары, готовые к продаже.
  - `IN_SALE` — товары в продаже.
  - `REMOVED_FROM_SALE` — товары, скрытые от покупателей.
  - `OVERPRICED` — товары с завышенной ценой.
  - `CRITICALLY_OVERPRICED` — товары со слишком завышенной ценой.
  - `EMPTY_BARCODE` — товары без штрихкода.
  - `BARCODE_EXISTS` — товары со штрихкодом.
  - `QUARANTINE` — товары на карантине после изменения цены более чем на 50%.
  - `ARCHIVED` — товары в архиве.
  - `OVERPRICED_WITH_STOCK` — товары в продаже со стоимостью выше, чем у конкурентов.
  - `PARTIAL_APPROVED` — товары в продаже с пустым или неполным описанием.


## Full schema (JSON)
```json
{
  "default": "ALL",
  "enum": [
    "ALL",
    "VISIBLE",
    "INVISIBLE",
    "EMPTY_STOCK",
    "NOT_MODERATED",
    "MODERATED",
    "DISABLED",
    "STATE_FAILED",
    "READY_TO_SUPPLY",
    "VALIDATION_STATE_PENDING",
    "VALIDATION_STATE_FAIL",
    "VALIDATION_STATE_SUCCESS",
    "TO_SUPPLY",
    "IN_SALE",
    "REMOVED_FROM_SALE",
    "OVERPRICED",
    "CRITICALLY_OVERPRICED",
    "EMPTY_BARCODE",
    "BARCODE_EXISTS",
    "QUARANTINE",
    "ARCHIVED",
    "OVERPRICED_WITH_STOCK",
    "PARTIAL_APPROVED"
  ],
  "type": "string",
  "title": "string",
  "description": "Фильтр по видимости товара:\n  - `ALL` — все товары.\n  - `VISIBLE` — товары, которые видны покупателям.\n  - `INVISIBLE` — товары, которые не видны покупателям.\n  - `EMPTY_STOCK` — товары, у которых не указано наличие.\n  - `NOT_MODERATED` — товары, которые не прошли модерацию.\n  - `MODERATED` — товары, которые прошли модерацию.\n  - `DISABLED` — товары, которые видны покупателям, но недоступны к покупке.\n  - `STATE_FAILED` — товары, создание которых завершилось ошибкой.\n  - `READY_TO_SUPPLY` — товары, готовые к поставке.\n  - `VALIDATION_STATE_PENDING` — товары, которые проходят проверку валидатором на премодерации.\n  - `VALIDATION_STATE_FAIL` — товары, которые не прошли проверку валидатором на премодерации.\n  - `VALIDATION_STATE_SUCCESS` — товары, которые прошли проверку валидатором на премодерации.\n  - `TO_SUPPLY` — товары, готовые к продаже.\n  - `IN_SALE` — товары в продаже.\n  - `REMOVED_FROM_SALE` — товары, скрытые от покупателей.\n  - `OVERPRICED` — товары с завышенной ценой.\n  - `CRITICALLY_OVERPRICED` — товары со слишком завышенной ценой.\n  - `EMPTY_BARCODE` — товары без штрихкода.\n  - `BARCODE_EXISTS` — товары со штрихкодом.\n  - `QUARANTINE` — товары на карантине после изменения цены более чем на 50%.\n  - `ARCHIVED` — товары в архиве.\n  - `OVERPRICED_WITH_STOCK` — товары в продаже со стоимостью выше, чем у конкурентов.\n  - `PARTIAL_APPROVED` — товары в продаже с пустым или неполным описанием.\n"
}
```
