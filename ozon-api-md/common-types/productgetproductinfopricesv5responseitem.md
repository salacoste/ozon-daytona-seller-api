# productGetProductInfoPricesV5ResponseItem

## Top-level fields
- `productGetProductInfoPricesV5ResponseItem` (top-level fields):
  - `acquiring`: `integer`
  - `commissions` → `$ref` ItemCommissionsv5
  - `marketing_actions` → `$ref` ItemMarketing
  - `offer_id`: `string`
  - `price` → `$ref` ItemPricev5
  - `price_indexes` → `$ref` GetProductInfoPricesResponseItemPriceIndexes
  - `product_id`: `integer`
  - `volume_weight`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "acquiring": {
      "type": "integer",
      "format": "int32",
      "description": "Максимальная комиссия за эквайринг.\n\n[Подробнее об эквайринге в Базе знаний продавца](https://seller-edu.ozon.ru/commissions-tariffs/commissions-tariffs-ozon/rashody-na-dop-uslugi#экваиринг)\n"
    },
    "commissions": {
      "$ref": "#/components/schemas/ItemCommissionsv5"
    },
    "marketing_actions": {
      "$ref": "#/components/schemas/ItemMarketing",
      "description": "Маркетинговые акции продавца."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "price": {
      "$ref": "#/components/schemas/ItemPricev5"
    },
    "price_indexes": {
      "$ref": "#/components/schemas/GetProductInfoPricesResponseItemPriceIndexes"
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "volume_weight": {
      "type": "number",
      "format": "double",
      "description": "Объёмный вес товара."
    }
  }
}
```
