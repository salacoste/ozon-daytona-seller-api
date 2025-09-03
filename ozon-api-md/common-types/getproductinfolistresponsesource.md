# GetProductInfoListResponseSource

## Top-level fields
- `GetProductInfoListResponseSource` (top-level fields):
  - `created_at`: `string`
  - `quant_code`: `string`
  - `shipment_type` → `$ref` SourceShipmentType
  - `sku`: `integer`
  - `source`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "created_at": {
      "description": "Дата создания товара.",
      "type": "string",
      "format": "date-time"
    },
    "quant_code": {
      "description": "Список квантов с товарами.",
      "type": "string"
    },
    "shipment_type": {
      "$ref": "#/components/schemas/SourceShipmentType"
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара на Ozon — SKU."
    },
    "source": {
      "type": "string",
      "description": "Схема продажи:\n- `SDS` — FBO и FBS с одинаковым SKU;\n- `FBO`;\n- `FBS`.\n"
    }
  }
}
```
