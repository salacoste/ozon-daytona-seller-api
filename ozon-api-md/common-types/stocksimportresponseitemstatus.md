# StocksImportResponseItemStatus

## Top-level fields
- `StocksImportResponseItemStatus` (top-level fields):
  - `errors`: `array`
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `sku`: `integer`
  - `updated`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "errors": {
      "type": "array",
      "description": "Ошибки, которые возникли при обработке запроса.",
      "items": {
        "$ref": "#/components/schemas/ItemStatusError"
      }
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "updated": {
      "type": "boolean",
      "description": "`true`, если запрос выполнен успешно и остатки обновлены.\n"
    }
  }
}
```
