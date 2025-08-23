# GetProductInfoListResponseCommission

## Top-level fields
- `GetProductInfoListResponseCommission` (top-level fields):
  - `delivery_amount`: `number`
  - `percent`: `number`
  - `return_amount`: `number`
  - `sale_schema`: `string`
  - `value`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "delivery_amount": {
      "type": "number",
      "format": "double",
      "description": "Стоимость доставки."
    },
    "percent": {
      "type": "number",
      "format": "double",
      "description": "Процент комиссии."
    },
    "return_amount": {
      "description": "Стоимость возврата.",
      "type": "number",
      "format": "double"
    },
    "sale_schema": {
      "type": "string",
      "description": "Схема продажи."
    },
    "value": {
      "type": "number",
      "format": "double",
      "description": "Сумма комиссии."
    }
  }
}
```
