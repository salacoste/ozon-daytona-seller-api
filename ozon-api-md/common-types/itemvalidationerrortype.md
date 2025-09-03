# ItemValidationErrorType

Тип ошибки:
  - `SUPPLY_ITEM_NOT_FOUND` — товар не найден.
  - `DUPLICATED_SUPPLY_ITEM` — найден дубликат товара.
  - `BEFORE_DEADLINE` — некорректный срок годности.
  - `SAME_BARCODES` — у разных SKU одинаковые штрихкоды.
  - `SAME_ARTICLES` — у разных SKU одинаковые артикулы.
  - `NOT_UNIQUE_SKU_BY_PRODUCT` — одинаковый SKU в грузоместе используется для разных товаров.
  - `QUANTITY_NOT_DIVISIBLE_BY_QUANT` — количество SKU в грузоместе не кратно кванту.
  - `NOT_SINGLE_PALLET_SKU_IN_PALLET_CARGO` — в грузоместе отсутствует палетная SKU.
  - `NOT_ONE_QUANT_PALLET_SKU` — в квантовом палетном грузоместе должен быть только один квант.
  - `NOT_ECONOM_SKU` — в эконом-поставке указан не эконом-SKU.
  - `QUANTITY_LESS_ONE` — количество SKU в эконом-поставке меньше 1.
  - `SUPPLY_ITEM_WITH_QUANT_NOT_FOUND` — товар не найден по артикулу, штрихкоду и размеру кванта.


## Full schema (JSON)
```json
{
  "type": "string",
  "description": "Тип ошибки:\n  - `SUPPLY_ITEM_NOT_FOUND` — товар не найден.\n  - `DUPLICATED_SUPPLY_ITEM` — найден дубликат товара.\n  - `BEFORE_DEADLINE` — некорректный срок годности.\n  - `SAME_BARCODES` — у разных SKU одинаковые штрихкоды.\n  - `SAME_ARTICLES` — у разных SKU одинаковые артикулы.\n  - `NOT_UNIQUE_SKU_BY_PRODUCT` — одинаковый SKU в грузоместе используется для разных товаров.\n  - `QUANTITY_NOT_DIVISIBLE_BY_QUANT` — количество SKU в грузоместе не кратно кванту.\n  - `NOT_SINGLE_PALLET_SKU_IN_PALLET_CARGO` — в грузоместе отсутствует палетная SKU.\n  - `NOT_ONE_QUANT_PALLET_SKU` — в квантовом палетном грузоместе должен быть только один квант.\n  - `NOT_ECONOM_SKU` — в эконом-поставке указан не эконом-SKU.\n  - `QUANTITY_LESS_ONE` — количество SKU в эконом-поставке меньше 1.\n  - `SUPPLY_ITEM_WITH_QUANT_NOT_FOUND` — товар не найден по артикулу, штрихкоду и размеру кванта.\n",
  "default": "SUPPLY_ITEM_NOT_FOUND",
  "enum": [
    "SUPPLY_ITEM_NOT_FOUND",
    "DUPLICATED_SUPPLY_ITEM",
    "BEFORE_DEADLINE",
    "SAME_BARCODES",
    "SAME_ARTICLES",
    "NOT_UNIQUE_SKU_BY_PRODUCT",
    "QUANTITY_NOT_DIVISIBLE_BY_QUANT",
    "NOT_SINGLE_PALLET_SKU_IN_PALLET_CARGO",
    "NOT_ONE_QUANT_PALLET_SKU",
    "NOT_ECONOM_SKU",
    "QUANTITY_LESS_ONE",
    "SUPPLY_ITEM_WITH_QUANT_NOT_FOUND"
  ]
}
```
