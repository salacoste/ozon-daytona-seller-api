# SupplyCheckExpireDatePresentedRule

Правило указания сроков годности для товаров.

## Top-level fields
- `SupplyCheckExpireDatePresentedRule` (top-level fields):
  - `count_sku_with_expiration`: `integer`
  - `count_sku_with_expiration_filled`: `integer`
  - `is_applicable`: `boolean`
  - `is_required`: `boolean`
  - `satisfied`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Правило указания сроков годности для товаров.",
  "properties": {
    "count_sku_with_expiration": {
      "type": "integer",
      "format": "int32",
      "description": "Количество SKU с корректным сроком годности."
    },
    "count_sku_with_expiration_filled": {
      "type": "integer",
      "format": "int32",
      "description": "Количество SKU, для которых обязателен срок годности."
    },
    "is_applicable": {
      "type": "boolean",
      "description": "`true`, если правило применимо к текущей поставке.\n"
    },
    "is_required": {
      "type": "boolean",
      "description": "`true`, если правило обязательно для текущей поставки.\n"
    },
    "satisfied": {
      "type": "boolean",
      "description": "`true`, если сроки годности указаны корректно.\n"
    }
  }
}
```
