# v1AnalyticsStocksResponseItem

## Top-level fields
- `v1AnalyticsStocksResponseItem` (top-level fields):
  - `ads`: `number`
  - `ads_cluster`: `number`
  - `available_stock_count`: `integer`
  - `cluster_id`: `integer`
  - `cluster_name`: `string`
  - `days_without_sales`: `integer`
  - `days_without_sales_cluster`: `integer`
  - `excess_stock_count`: `integer`
  - `expiring_stock_count`: `integer`
  - `idc`: `number`
  - `idc_cluster`: `number`
  - `item_tags`: `array`
  - `name`: `string`
  - `offer_id`: `string`
  - `other_stock_count`: `integer`
  - `requested_stock_count`: `integer`
  - `return_from_customer_stock_count`: `integer`
  - `return_to_seller_stock_count`: `integer`
  - `sku`: `integer`
  - `stock_defect_stock_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "ads": {
      "type": "number",
      "format": "double",
      "description": "Среднесуточное количество проданных единиц товара за последние 28 дней по всем кластерам."
    },
    "ads_cluster": {
      "type": "number",
      "format": "double",
      "description": "Среднесуточное количество проданных единиц товара за последние 28 дней в кластере."
    },
    "available_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество единиц товара, доступное к продаже."
    },
    "cluster_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор кластера. Получить подробную информацию о кластере можно через метод [/v1/cluster/list](#operation/SupplyDraftAPI_DraftClusterList)."
    },
    "cluster_name": {
      "type": "string",
      "description": "Название кластера."
    },
    "days_without_sales": {
      "type": "integer",
      "format": "int32",
      "description": "Количество дней без продаж по всем кластерам."
    },
    "days_without_sales_cluster": {
      "type": "integer",
      "format": "int32",
      "description": "Количество дней без продаж в кластере."
    },
    "excess_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество излишков с поставки, которые доступны к вывозу."
    },
    "expiring_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество единиц товара с истекающим сроком годности."
    },
    "idc": {
      "type": "number",
      "format": "double",
      "description": "Количество дней, на которое хватит остатка товара с учётом среднесуточных продаж за 28 дней по всем кластерам."
    },
    "idc_cluster": {
      "type": "number",
      "format": "double",
      "description": "Количество дней, на которое хватит остатка товара с учётом среднесуточных продаж за 28 дней в кластере."
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
      "description": "Теги товара:      \n- `ITEM_ATTRIBUTE_NONE` — без тега;\n- `ECONOM` — эконом-товар;\n- `NOVEL` — новинка;\n- `DISCOUNT` — уценённый товар;\n- `FBS_RETURN` — товар из возврата FBS;\n- `SUPER` — Super-товар.\n"
    },
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "other_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество единиц товара, проходящих проверку."
    },
    "requested_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество единиц товара в заявках на поставку."
    },
    "return_from_customer_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество единиц товара в процессе возврата от покупателей."
    },
    "return_to_seller_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество единиц товара, готовящихся к вывозу по вашей заявке."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "stock_defect_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество брака, доступное к вывозу со стока."
    },
    "transit_defect_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество брака, доступное к вывозу с поставки."
    },
    "transit_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество единиц товара в поставках в пути."
    },
    "turnover_grade": {
      "type": "string",
      "enum": [
        "UNSPECIFIED",
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
      ],
      "description": "Статус ликвидности товара по всем кластерам:      \n- `UNSPECIFIED` — значение не определено.\n- `TURNOVER_GRADE_NONE` — нет статуса ликвидности.\n- `DEFICIT` — дефицитный. Остатков товара хватит до 28 дней.\n- `POPULAR` — очень популярный. Остатков товара хватит на 28–56 дней.\n- `ACTUAL` — популярный. Остатков товара хватит на 56–120 дней.\n- `SURPLUS` — избыточный. Товар продаётся медленно, остатков хватит более чем на 120 дней.\n- `NO_SALES` — без продаж. У товара нет продаж последние 28 дней.\n- `WAS_NO_SALES` — был без продаж. У товара не было продаж и остатков последние 28 дней.\n- `RESTRICTED_NO_SALES` — без продаж, ограничен. У товара не было продаж более 120 дней. Такой товар [нельзя добавить в поставку](https://seller-edu.ozon.ru/fbo/rabota-so-stokom/nehodovye-tovary).\n- `COLLECTING_DATA` — сбор данных. Для расчёта ликвидности нового товара собираем данные в течение 60 дней после поставки.\n- `WAITING_FOR_SUPPLY` — ожидаем поставки. На складе нет остатков, доступных к продаже. Сделайте поставку для начала сбора данных.\n- `WAS_DEFICIT` — был дефицитным. Товар был дефицитным последние 56 дней. Сейчас у него нет остатков.\n- `WAS_POPULAR` — был очень популярным. Товар был очень популярным последние 56 дней. Сейчас у него нет остатков.\n- `WAS_ACTUAL` — был популярным. Товар был популярным последние 56 дней. Сейчас у него нет остатков.\n- `WAS_SURPLUS` — был избыточным. Товар был избыточным последние 56 дней. Сейчас у него нет остатков.\n"
    },
    "turnover_grade_cluster": {
      "type": "string",
      "enum": [
        "UNSPECIFIED",
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
      ],
      "description": "Статус ликвидности товара в кластере:      \n- `UNSPECIFIED` — значение не определено.\n- `TURNOVER_GRADE_NONE` — нет статуса ликвидности.\n- `DEFICIT` — дефицитный. Остатков товара хватит до 28 дней.\n- `POPULAR` — очень популярный. Остатков товара хватит на 28–56 дней.\n- `ACTUAL` — популярный. Остатков товара хватит на 56–120 дней.\n- `SURPLUS` — избыточный. Товар продаётся медленно, остатков хватит более чем на 120 дней.\n- `NO_SALES` — без продаж. У товара нет продаж последние 28 дней.\n- `WAS_NO_SALES` — был без продаж. У товара не было продаж и остатков последние 28 дней.\n- `RESTRICTED_NO_SALES` — без продаж, ограничен. У товара не было продаж более 120 дней. Такой товар [нельзя добавить в поставку](https://seller-edu.ozon.ru/fbo/rabota-so-stokom/nehodovye-tovary).\n- `COLLECTING_DATA` — сбор данных. Для расчёта ликвидности нового товара собираем данные в течение 60 дней после поставки.\n- `WAITING_FOR_SUPPLY` — ожидаем поставки. На складе нет остатков, доступных к продаже. Сделайте поставку для начала сбора данных.\n- `WAS_DEFICIT` — был дефицитным. Товар был дефицитным последние 56 дней. Сейчас у него нет остатков.\n- `WAS_POPULAR` — был очень популярным. Товар был очень популярным последние 56 дней. Сейчас у него нет остатков.\n- `WAS_ACTUAL` — был популярным. Товар был популярным последние 56 дней. Сейчас у него нет остатков.\n- `WAS_SURPLUS` — был избыточным. Товар был избыточным последние 56 дней. Сейчас у него нет остатков.\n"
    },
    "valid_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товара без брака и с достаточным сроком годности, которое скоро разместим на складе Ozon и начнём продавать."
    },
    "waiting_docs_stock_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество маркируемых товаров, которые ожидают ваших действий."
    },
    "warehouse_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада."
    },
    "warehouse_name": {
      "type": "string",
      "description": "Название склада."
    }
  }
}
```
