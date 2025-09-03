# productv2ProductsStocksResponseResult

## Top-level fields
- `productv2ProductsStocksResponseResult` (top-level fields):
  - `errors`: `array`
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `updated`: `boolean`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "errors": {
      "items": {
        "$ref": "#/components/schemas/productv2ProductsStocksResponseError"
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
      "description": "Если запрос выполнен успешно и остатки обновлены — `true`."
    },
    "warehouse_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор склада."
    }
  },
  "type": "object",
  "title": "object"
}
```
