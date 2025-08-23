# productImportProductsPricesResponseProcessResult

## Top-level fields
- `productImportProductsPricesResponseProcessResult` (top-level fields):
  - `errors`: `array`
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `updated`: `boolean`

## Full schema (JSON)
```json
{
  "properties": {
    "errors": {
      "items": {
        "$ref": "#/components/schemas/productImportProductsPricesResponseError"
      },
      "type": "array",
      "description": "Массив ошибок, которые возникли при обработке запроса."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "product_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "updated": {
      "type": "boolean",
      "description": "Если информации о товаре успешно обновлена — `true`."
    }
  },
  "type": "object",
  "title": "object"
}
```
