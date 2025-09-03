# GetReturnsListResponseLogistic

Информация о возврате.

## Top-level fields
- `GetReturnsListResponseLogistic` (top-level fields):
  - `technical_return_moment`: `string`
  - `final_moment`: `string`
  - `cancelled_with_compensation_moment`: `string`
  - `return_date`: `string`
  - `barcode`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о возврате.",
  "properties": {
    "technical_return_moment": {
      "type": "string",
      "description": "Дата, когда заказ поставили на технический возврат.",
      "format": "date-time"
    },
    "final_moment": {
      "type": "string",
      "description": "Дата, когда возврат прибыл на фулфилмент или выдан продавцу.",
      "format": "date-time"
    },
    "cancelled_with_compensation_moment": {
      "type": "string",
      "description": "Дата, когда продавцу компенсировали возврат.",
      "format": "date-time"
    },
    "return_date": {
      "type": "string",
      "description": "Дата, когда покупатель вернул товар.",
      "format": "date-time"
    },
    "barcode": {
      "type": "string",
      "description": "Штрихкод этикетки возврата."
    }
  }
}
```
