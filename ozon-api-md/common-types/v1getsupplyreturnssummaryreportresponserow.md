# v1GetSupplyReturnsSummaryReportResponseRow

## Top-level fields
- `v1GetSupplyReturnsSummaryReportResponseRow` (top-level fields):
  - `barcode`: `string`
  - `box_barcode`: `string`
  - `box_height`: `number`
  - `box_id`: `integer`
  - `box_length`: `number`
  - `box_state`: `string`
  - `box_volume`: `number`
  - `box_weight`: `number`
  - `box_width`: `number`
  - `clearing_warehouse_name`: `string`
  - `delivery_date`: `string`
  - `delivery_type`: `string`
  - `destination_warehouse_address`: `string`
  - `destination_warehouse_name`: `string`
  - `given_out_date`: `string`
  - `is_auto_return`: `boolean`
  - `name`: `string`
  - `offer_id`: `string`
  - `preliminary_delivery_price`: `number`
  - `quant_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "barcode": {
      "description": "Штрихкод товара.",
      "type": "string"
    },
    "box_barcode": {
      "description": "Штрихкод коробки.",
      "type": "string"
    },
    "box_height": {
      "description": "Высота коробки в метрах.",
      "type": "number",
      "format": "double"
    },
    "box_id": {
      "description": "Идентификатор коробки.",
      "type": "integer",
      "format": "int64"
    },
    "box_length": {
      "description": "Длина коробки в метрах.",
      "type": "number",
      "format": "double"
    },
    "box_state": {
      "description": "Статус коробки:\n- `доступно к вывозу`;\n- `уже в заявке на вывоз`;\n- `подготовка к вывозу`;\n- `потеряна`;\n- `в пути`;\n- `компенсировано продавцу`;\n- `утилизирована`;\n- `собрано`;\n- `на СЦ`;\n- `у курьера`;\n- `неудачная попытка доставки`;\n- `получена`;\n- `отменено`;\n- `в процессе утилизации`;\n- `в пункте выдачи`;\n- `расформирована`.\n",
      "type": "string"
    },
    "box_volume": {
      "description": "Объём коробки в литрах.",
      "type": "number",
      "format": "double"
    },
    "box_weight": {
      "description": "Вес коробки в килограммах.",
      "type": "number",
      "format": "double"
    },
    "box_width": {
      "description": "Ширина коробки в метрах.",
      "type": "number",
      "format": "double"
    },
    "clearing_warehouse_name": {
      "description": "Склад, на котором подготовили товары для вывоза.",
      "type": "string"
    },
    "delivery_date": {
      "description": "Дата доставки товара в ПВЗ, СЦ или курьером.",
      "type": "string"
    },
    "delivery_type": {
      "description": "Способ вывоза:\n- `самовывоз`;\n- `ПВЗ`;\n- `СЦ`;\n- `курьерская доставка`.\n",
      "type": "string"
    },
    "destination_warehouse_address": {
      "description": "Адрес склада назначения.",
      "type": "string"
    },
    "destination_warehouse_name": {
      "description": "Название склада назначения.",
      "type": "string"
    },
    "given_out_date": {
      "description": "Дата, когда продавец забрал товары самовывозом со склада Ozon.",
      "type": "string"
    },
    "is_auto_return": {
      "description": "Признак, что заявка на вывоз была создана автоматически.\n\n[Подробнее об автовывозе в Базе знаний продавца](https://seller-edu.ozon.ru/fbo/vozvraty-utilizaciya-izlishki/vyvoz-tovarov-so-sklada-ozon/avtovyvoz-tovarov-so-sklada-ozon)\n",
      "type": "boolean"
    },
    "name": {
      "description": "Название товара.",
      "type": "string"
    },
    "offer_id": {
      "description": "Артикул товара.",
      "type": "string"
    },
    "preliminary_delivery_price": {
      "description": "Предварительная стоимость вывоза товара со склада силами Ozon.",
      "type": "number",
      "format": "double"
    },
    "quant_count": {
      "description": "Количество квантов в заявке на вывоз.",
      "type": "integer",
      "format": "int32"
    },
    "quantity_for_return": {
      "description": "Количество единиц товара в коробке или заявке на вывоз.",
      "type": "integer",
      "format": "int32"
    },
    "return_created_at": {
      "description": "Дата создания заявки на вывоз.",
      "type": "string"
    },
    "return_id": {
      "description": "Идентификатор заявки на вывоз.",
      "type": "integer",
      "format": "int64"
    },
    "return_state": {
      "description": "Статус заявки на вывоз.\n\nВозможные значения для самовывоза со стока:\n- `создана`;\n- `собирается на складе`;\n- `собрана складом`;\n- `завершена`;\n- `заполнение данных`;\n- `утилизирована`.\n\nВозможные значения для СЦ, ПВЗ и курьерской доставки со стока:\n- `создаётся`;\n- `собирается на складке`;\n- `передаём в логистику`;\n- `в пути`;\n- `завершено`;\n- `можно забирать часть`;\n- `можно забирать все`;\n- `утилизирована`.\n\nВозможные значения для вывоза с поставок:\n\n- `заполнение данных`;\n- `подготовка к выдаче`;\n- `выдача`;\n- `завершено`;\n- `отклонено складом`;\n- `готово к вывозу`;\n- `утилизировано`;\n- `обрабатывается`;\n- `собирается на складе`;\n- `передаётся в логистику`;\n- `в пути`;\n- `можно забрать часть`;\n- `можно забрать все`.\n",
      "type": "string"
    },
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "integer",
      "format": "int64"
    },
    "stock_type": {
      "description": "Тип остатков для товаров стока:\n- `доступно к продаже`;\n- `маркируемые товары, ожидающие действий`;\n- `истекает срок годности`;\n- `брак, доступный к вывозу со стока`.\n\nТип остатков для товаров в коробках:\n- `брак`;\n- `опознанные излишки`;\n- `неопознанные излишки без SKU`.\n",
      "type": "string"
    },
    "utilization_date": {
      "description": "Дата утилизации.",
      "type": "string"
    }
  }
}
```
