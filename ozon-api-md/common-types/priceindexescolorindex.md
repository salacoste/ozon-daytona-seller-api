# PriceIndexesColorIndex

Виды индекса цен:
- `COLOR_INDEX_UNSPECIFIED` — не определён,
- `COLOR_INDEX_WITHOUT_INDEX` — отсутствует,
- `COLOR_INDEX_GREEN` — выгодный,
- `COLOR_INDEX_YELLOW` — умеренный,
- `COLOR_INDEX_RED` — невыгодный.

[Подробнее об индексе цен в Базе знаний продавца](https://seller-edu.ozon.ru/ceny-i-akcii/rabota-s-cenami/price-index)


## Full schema (JSON)
```json
{
  "type": "string",
  "title": "string",
  "default": "COLOR_INDEX_UNSPECIFIED",
  "enum": [
    "COLOR_INDEX_UNSPECIFIED",
    "COLOR_INDEX_WITHOUT_INDEX",
    "COLOR_INDEX_GREEN",
    "COLOR_INDEX_YELLOW",
    "COLOR_INDEX_RED"
  ],
  "description": "Виды индекса цен:\n- `COLOR_INDEX_UNSPECIFIED` — не определён,\n- `COLOR_INDEX_WITHOUT_INDEX` — отсутствует,\n- `COLOR_INDEX_GREEN` — выгодный,\n- `COLOR_INDEX_YELLOW` — умеренный,\n- `COLOR_INDEX_RED` — невыгодный.\n\n[Подробнее об индексе цен в Базе знаний продавца](https://seller-edu.ozon.ru/ceny-i-akcii/rabota-s-cenami/price-index)\n"
}
```
