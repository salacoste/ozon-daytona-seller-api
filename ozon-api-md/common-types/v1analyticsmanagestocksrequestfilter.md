# v1AnalyticsManageStocksRequestFilter

Фильтр.

## Top-level fields
- `v1AnalyticsManageStocksRequestFilter` (top-level fields):
  - `skus`: `array`
  - `stock_types`: `array`
  - `warehouse_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр.",
  "properties": {
    "skus": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Идентификаторы товаров в системе Ozon — SKU."
    },
    "stock_types": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "STOCK_TYPE_VALID",
          "STOCK_TYPE_WAITING_DOCS",
          "STOCK_TYPE_EXPIRING",
          "STOCK_TYPE_DEFECT"
        ]
      },
      "description": "Тип оставшегося на складе товара:\n- `STOCK_TYPE_VALID` — валидный сток. Остаток товара, доступного для продажи. \n- `STOCK_TYPE_WAITING_DOCS` — превалидный сток. Остаток товара, который Ozon не может продавать, пока продавец не прислал в Ozon документы по обязательной маркировке. Товар перейдёт в валидный сток, когда документы будут подписаны.\n- `STOCK_TYPE_EXPIRING` — предпросрок. Остаток товара, который снят с полки, но срок годности формально не истёк. \n- `STOCK_TYPE_DEFECT` — брак. Остаток товара, который находится на складах Ozon, но повреждён.\n"
    },
    "warehouse_ids": {
      "type": "array",
      "description": "Идентификаторы складов.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
