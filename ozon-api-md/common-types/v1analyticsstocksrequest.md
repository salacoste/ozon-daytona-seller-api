# v1AnalyticsStocksRequest

## Top-level fields
- `v1AnalyticsStocksRequest` (top-level fields):
  - `cluster_ids`: `array`
  - `item_tags`: `array`
  - `skus`: `array`
  - `turnover_grades`: `array`
  - `warehouse_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "required": [
    "skus"
  ],
  "properties": {
    "cluster_ids": {
      "description": "Фильтр по идентификаторам кластеров. Получить идентификаторы можно через метод [/v1/cluster/list](#operation/SupplyDraftAPI_DraftClusterList).",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "item_tags": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "ITEM_ATTRIBUTE_NONE",
          "ECONOM",
          "NOVEL",
          "DISCOUNT",
          "FBS_RETURN",
          "SUPER"
        ]
      },
      "description": "Фильтр по тегам товара:      \n- `ITEM_ATTRIBUTE_NONE` — без тега;\n- `ECONOM` — эконом-товар;\n- `NOVEL` — новинка;\n- `DISCOUNT` — уценённый товар;\n- `FBS_RETURN` — товар из возврата FBS;\n- `SUPER` — Super-товар.\n"
    },
    "skus": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "maximum": 100,
      "description": "Фильтр по идентификаторам товаров в системе Ozon — SKU."
    },
    "turnover_grades": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "TURNOVER_GRADE_NONE",
          "DEFICIT",
          "POPULAR",
          "ACTUAL",
          "SURPLUS",
          "NO_SALES",
          "WAS_NO_SALES",
          "RESTRICTED_NO_SALES",
          "COLLECTING_DATA",
          "WAITING_FOR_SUPPLY",
          "WAS_DEFICIT",
          "WAS_POPULAR",
          "WAS_ACTUAL",
          "WAS_SURPLUS"
        ]
      },
      "description": "Фильтр по статусу ликвидности товаров:      \n- `TURNOVER_GRADE_NONE` — нет статуса ликвидности.      \n- `DEFICIT` — дефицитный. Остатков товара хватит до 28 дней.\n- `POPULAR` — очень популярный. Остатков товара хватит на 28–56 дней.\n- `ACTUAL` — популярный. Остатков товара хватит на 56–120 дней.\n- `SURPLUS` — избыточный. Товар продаётся медленно, остатков хватит более чем на 120 дней.\n- `NO_SALES` — без продаж. У товара нет продаж последние 28 дней.\n- `WAS_NO_SALES` — был без продаж. У товара не было продаж и остатков последние 28 дней.\n- `RESTRICTED_NO_SALES` — без продаж, ограничен. У товара не было продаж более 120 дней. Такой товар [нельзя добавить в поставку](https://seller-edu.ozon.ru/fbo/rabota-so-stokom/nehodovye-tovary).\n- `COLLECTING_DATA` — сбор данных. Для расчёта ликвидности нового товара собираем данные в течение 60 дней после поставки.\n- `WAITING_FOR_SUPPLY` — ожидаем поставки. На складе нет остатков, доступных к продаже. Сделайте поставку для начала сбора данных.\n- `WAS_DEFICIT` — был дефицитным. Товар был дефицитным последние 56 дней. Сейчас у него нет остатков.\n- `WAS_POPULAR` — был очень популярным. Товар был очень популярным последние 56 дней. Сейчас у него нет остатков.\n- `WAS_ACTUAL` — был популярным. Товар был популярным последние 56 дней. Сейчас у него нет остатков.\n- `WAS_SURPLUS` — был избыточным. Товар был избыточным последние 56 дней. Сейчас у него нет остатков.\n"
    },
    "warehouse_ids": {
      "description": "Фильтр по идентификаторам складов. Получить идентификаторы можно через метод [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList).",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
