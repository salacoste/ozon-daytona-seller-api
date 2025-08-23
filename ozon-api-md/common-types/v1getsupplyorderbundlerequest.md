# v1GetSupplyOrderBundleRequest

## Top-level fields
- `v1GetSupplyOrderBundleRequest` (top-level fields):
  - `bundle_ids`: `array`
  - `is_asc`: `boolean`
  - `item_tags_calculation` → `$ref` GetSupplyOrderBundleRequestItemTagsCalculation
  - `last_id`: `string`
  - `limit`: `integer`
  - `query`: `string`
  - `sort_field` → `$ref` v1ItemSortField

## Full schema (JSON)
```json
{
  "required": [
    "bundle_ids",
    "limit"
  ],
  "type": "object",
  "properties": {
    "bundle_ids": {
      "type": "array",
      "minItems": 1,
      "maxItems": 100,
      "description": "Идентификаторы товарного состава поставки. Можно получить в методе [/v2/supply-order/get](#operation/SupplyOrderAPI_GetSupplyOrdersV2).",
      "items": {
        "type": "string"
      }
    },
    "is_asc": {
      "type": "boolean",
      "description": "`true`, чтобы сортировать по возрастанию.\n"
    },
    "item_tags_calculation": {
      "$ref": "#/components/schemas/GetSupplyOrderBundleRequestItemTagsCalculation"
    },
    "last_id": {
      "type": "string",
      "description": "Идентификатор последнего значения SKU на странице."
    },
    "limit": {
      "type": "integer",
      "format": "int32",
      "minimum": 1,
      "maximum": 100,
      "description": "Количество товаров на странице."
    },
    "query": {
      "type": "string",
      "description": "Поисковый запрос, например: по названию, артикулу или SKU.\n"
    },
    "sort_field": {
      "$ref": "#/components/schemas/v1ItemSortField"
    }
  }
}
```
