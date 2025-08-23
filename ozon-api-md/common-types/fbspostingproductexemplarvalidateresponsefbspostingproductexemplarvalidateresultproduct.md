# FbsPostingProductExemplarValidateResponseFbsPostingProductExemplarValidateResultProduct

## Top-level fields
- `FbsPostingProductExemplarValidateResponseFbsPostingProductExemplarValidateResultProduct` (top-level fields):
  - `error`: `string`
  - `exemplars`: `object`
  - `product_id`: `integer`
  - `valid`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "error": {
      "type": "string",
      "description": "Код ошибки."
    },
    "exemplars": {
      "description": "Информация об экземплярах.",
      "items": {
        "$ref": "#/components/schemas/FbsPostingProductExemplarValidateResponseFbsPostingProductExemplarValidateResultProductExemplar"
      }
    },
    "product_id": {
      "description": "Идентификатор товара в системе продавца — `product_id`.",
      "type": "integer",
      "format": "int64"
    },
    "valid": {
      "description": "Результат прохождения проверки. `true`, если коды всех экземпляров соответствуют требованиям.",
      "type": "boolean"
    }
  }
}
```
