# GetReturnsListResponseProduct

Информация о товаре.

## Top-level fields
- `GetReturnsListResponseProduct` (top-level fields):
  - `sku`: `integer`
  - `offer_id`: `string`
  - `name`: `string`
  - `price` → `$ref` seller_returnsv1Money_product
  - `price_without_commission` → `$ref` seller_returnsv1Money_without_commission
  - `commission_percent`: `number`
  - `commission` → `$ref` seller_returnsv1Money_commission
  - `quantity`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о товаре.",
  "properties": {
    "sku": {
      "type": "integer",
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "format": "int64"
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "price": {
      "$ref": "#/components/schemas/seller_returnsv1Money_product"
    },
    "price_without_commission": {
      "$ref": "#/components/schemas/seller_returnsv1Money_without_commission"
    },
    "commission_percent": {
      "type": "number",
      "description": "Процент комиссии.",
      "format": "double"
    },
    "commission": {
      "$ref": "#/components/schemas/seller_returnsv1Money_commission"
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товара."
    }
  }
}
```
