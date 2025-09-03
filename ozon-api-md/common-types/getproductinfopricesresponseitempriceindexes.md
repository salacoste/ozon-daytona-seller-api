# GetProductInfoPricesResponseItemPriceIndexes

Индексы цены товара.

[Подробнее об индексе цен в Базе знаний продавца](https://seller-edu.ozon.ru/seller-rating/metrics/price-index)


## Top-level fields
- `GetProductInfoPricesResponseItemPriceIndexes` (top-level fields):
  - `color_index`: `string`
  - `external_index_data` → `$ref` PriceIndexesIndexExternalData
  - `ozon_index_data` → `$ref` PriceIndexesIndexOzonData
  - `self_marketplaces_index_data` → `$ref` PriceIndexesIndexSelfData

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Индексы цены товара.\n\n[Подробнее об индексе цен в Базе знаний продавца](https://seller-edu.ozon.ru/seller-rating/metrics/price-index)\n",
  "properties": {
    "color_index": {
      "description": "Итоговый индекс цены товара:\n- `WITHOUT_INDEX` — нет индекса, \n- `GREEN` — выгодный,\n- `YELLOW` — умеренный, \n- `RED` — невыгодный.\n",
      "type": "string",
      "enum": [
        "WITHOUT_INDEX",
        "GREEN",
        "YELLOW",
        "RED"
      ],
      "default": "WITHOUT_INDEX"
    },
    "external_index_data": {
      "$ref": "#/components/schemas/PriceIndexesIndexExternalData"
    },
    "ozon_index_data": {
      "$ref": "#/components/schemas/PriceIndexesIndexOzonData"
    },
    "self_marketplaces_index_data": {
      "$ref": "#/components/schemas/PriceIndexesIndexSelfData"
    }
  }
}
```
