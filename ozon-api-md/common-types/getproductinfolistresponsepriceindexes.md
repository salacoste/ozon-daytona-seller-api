# GetProductInfoListResponsePriceIndexes

Ценовые индексы товара.

## Top-level fields
- `GetProductInfoListResponsePriceIndexes` (top-level fields):
  - `color_index` → `$ref` PriceIndexesColorIndex
  - `external_index_data` → `$ref` PriceIndexesIndexDataExternal
  - `ozon_index_data` → `$ref` PriceIndexesIndexDataOzon
  - `self_marketplaces_index_data` → `$ref` PriceIndexesIndexDataSelf

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Ценовые индексы товара.",
  "properties": {
    "color_index": {
      "$ref": "#/components/schemas/PriceIndexesColorIndex"
    },
    "external_index_data": {
      "$ref": "#/components/schemas/PriceIndexesIndexDataExternal"
    },
    "ozon_index_data": {
      "$ref": "#/components/schemas/PriceIndexesIndexDataOzon"
    },
    "self_marketplaces_index_data": {
      "$ref": "#/components/schemas/PriceIndexesIndexDataSelf"
    }
  }
}
```
