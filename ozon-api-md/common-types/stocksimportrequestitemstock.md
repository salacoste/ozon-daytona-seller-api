# StocksImportRequestItemStock

## Top-level fields
- `StocksImportRequestItemStock` (top-level fields):
  - `offer_id`: `string`
  - `stock`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "required": [
    "offer_id",
    "stock"
  ],
  "properties": {
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "stock": {
      "type": "integer",
      "format": "int64",
      "description": "Количество товара в наличии."
    }
  }
}
```
