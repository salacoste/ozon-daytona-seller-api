# ProductV1QuantInfoResponseResultItemsQuantInfoQuants

## Top-level fields
- `ProductV1QuantInfoResponseResultItemsQuantInfoQuants` (top-level fields):
  - `barcodes_extended`: `object`
  - `dimensions` → `$ref` ProductV1QuantInfoResponseResultItemsQuantInfoQuantsDimensions
  - `marketing_price` → `$ref` ProductV1QuantInfoResponseResultItemsQuantInfoQuantsMarketingPrice
  - `min_price`: `string`
  - `old_price`: `string`
  - `price`: `string`
  - `quant_code`: `string`
  - `quant_sice`: `integer`
  - `shipment_type`: `string`
  - `sku`: `integer`
  - `statuses` → `$ref` ProductV1QuantInfoResponseResultItemsQuantInfoQuantsTexts

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "barcodes_extended": {
      "description": "Информация о штрихкодах.",
      "items": {
        "$ref": "#/components/schemas/ProductV1QuantInfoResponseResultItemsQuantInfoQuantsBarcodesExtended"
      }
    },
    "dimensions": {
      "$ref": "#/components/schemas/ProductV1QuantInfoResponseResultItemsQuantInfoQuantsDimensions"
    },
    "marketing_price": {
      "$ref": "#/components/schemas/ProductV1QuantInfoResponseResultItemsQuantInfoQuantsMarketingPrice"
    },
    "min_price": {
      "type": "string",
      "description": "Минимальная цена, указанная продавцом."
    },
    "old_price": {
      "type": "string",
      "description": "Зачёркнутая цена, указанная продавцом."
    },
    "price": {
      "type": "string",
      "description": "Цена продажи, указанная продавцом."
    },
    "quant_code": {
      "type": "string",
      "description": "Идентификатор эконом-товара."
    },
    "quant_sice": {
      "type": "integer",
      "format": "int64",
      "description": "Размер кванта."
    },
    "shipment_type": {
      "type": "string",
      "description": "Тип доставки товара."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "statuses": {
      "$ref": "#/components/schemas/ProductV1QuantInfoResponseResultItemsQuantInfoQuantsTexts"
    }
  }
}
```
