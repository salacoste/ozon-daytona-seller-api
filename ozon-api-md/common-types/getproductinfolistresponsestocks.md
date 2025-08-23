# GetProductInfoListResponseStocks

Информация об остатках товара.

## Top-level fields
- `GetProductInfoListResponseStocks` (top-level fields):
  - `has_stock`: `boolean`
  - `stocks`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация об остатках товара.",
  "properties": {
    "has_stock": {
      "type": "boolean",
      "description": "`true`, если есть остаток на складах.\n"
    },
    "stocks": {
      "description": "Статус остатков товара.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetProductInfoListResponseStocksStock"
      }
    }
  }
}
```
