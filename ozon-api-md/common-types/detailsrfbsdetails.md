# DetailsRfbsDetails

Перечисления по схеме rFBS.

## Top-level fields
- `DetailsRfbsDetails` (top-level fields):
  - `total`: `number`
  - `transfer_delivery`: `number`
  - `transfer_delivery_return`: `number`
  - `compensation_delivery_return`: `number`
  - `partial_compensation`: `number`
  - `partial_compensation_return`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Перечисления по схеме rFBS.",
  "properties": {
    "total": {
      "type": "number",
      "format": "double",
      "description": "Общая сумма."
    },
    "transfer_delivery": {
      "type": "number",
      "format": "double",
      "description": "Перечисления от покупателей."
    },
    "transfer_delivery_return": {
      "type": "number",
      "format": "double",
      "description": "Возврат перечислений покупателям."
    },
    "compensation_delivery_return": {
      "type": "number",
      "format": "double",
      "description": "Компенсация перечислений за доставку."
    },
    "partial_compensation": {
      "type": "number",
      "format": "double",
      "description": "Перечисления частичных компенсаций покупателям."
    },
    "partial_compensation_return": {
      "type": "number",
      "format": "double",
      "description": "Возврат частичных компенсаций."
    }
  }
}
```
