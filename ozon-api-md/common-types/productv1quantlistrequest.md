# ProductV1QuantListRequest

## Top-level fields
- `ProductV1QuantListRequest` (top-level fields):
  - `cursor`: `string`
  - `limit`: `integer`
  - `visibility`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных."
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Максимальное количество элементов в ответе."
    },
    "visibility": {
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
      "description": "Фильтр по видимости товара:\n- `ALL` — все товары, кроме архивных.\n- `VISIBLE` — товары, которые видны покупателям.\n- `INVISIBLE` — товары, которые не видны покупателям.\n- `EMPTY_STOCK` — товары, которых нет в наличии.\n- `NOT_MODERATED` — товары, которые не прошли модерацию.\n- `MODERATED` — товары, которые прошли модерацию.\n- `DISABLED` — товары, которые видны покупателям, но недоступны к покупке.\n- `STATE_FAILED` — товары, создание которых завершилось ошибкой.\n- `READY_TO_SUPPLY` — товары, готовые к поставке.\n- `VALIDATION_STATE_PENDING` — товары, которые проходят проверку валидатором на премодерации.\n- `VALIDATION_STATE_FAIL` — товары, которые не прошли проверку валидатором на премодерации.\n- `VALIDATION_STATE_SUCCESS` — товары, которые прошли проверку валидатором на премодерации.\n- `TO_SUPPLY` — товары, готовые к продаже.\n- `IN_SALE` — товары в продаже.\n- `REMOVED_FROM_SALE` — товары, скрытые от покупателей.\n- `OVERPRICED` — превышение цены.\n- `CRITICALLY_OVERPRICED` — критическое превышение цены.\n- `EMPTY_BARCODE` — пустой штрихкод.\n- `BARCODE_EXISTS` — штрихкод указан.\n- `QUARANTINE` — товар в карантине после изменения цены на 50% и больше.\n- `ARCHIVED` — товары в архиве.\n- `OVERPRICED_WITH_STOCK` — товары в продаже, цена которых выше, чем у конкурентов.\n- `PARTIAL_APPROVED` — товары в продаже, у которых пустое или неполное описание.\n"
    }
  }
}
```
