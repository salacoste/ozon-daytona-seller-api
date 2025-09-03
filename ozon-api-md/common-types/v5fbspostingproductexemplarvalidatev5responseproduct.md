# v5FbsPostingProductExemplarValidateV5ResponseProduct

## Top-level fields
- `v5FbsPostingProductExemplarValidateV5ResponseProduct` (top-level fields):
  - `error`: `string`
  - `exemplars`: `array`
  - `product_id`: `integer`
  - `valid`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "error": {
      "type": "string",
      "description": "Код ошибки."
    },
    "exemplars": {
      "type": "array",
      "description": "Информация об экземплярах.",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarValidateV5ResponseProductExemplar"
      }
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "valid": {
      "type": "boolean",
      "description": "Результат прохождения проверки. `true`, если коды всех экземпляров соответствуют требованиям."
    }
  }
}
```
