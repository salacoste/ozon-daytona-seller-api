# InvoiceGetV2ResponseResult

Информация о счёте-фактуре.

## Top-level fields
- `InvoiceGetV2ResponseResult` (top-level fields):
  - `date`: `string`
  - `file_url`: `string`
  - `hs_codes`: `array`
  - `number`: `string`
  - `price`: `number`
  - `price_currency`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о счёте-фактуре.",
  "properties": {
    "date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата загрузки счёта-фактуры."
    },
    "file_url": {
      "type": "string",
      "description": "Ссылка на счёт-фактуру."
    },
    "hs_codes": {
      "type": "array",
      "description": "HS-коды товаров.",
      "items": {
        "$ref": "#/components/schemas/v2HsCode"
      }
    },
    "number": {
      "type": "string",
      "description": "Номер счёта-фактуры."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Стоимость, указанная в счёте-фактуре.\nРазделитель дробной части — точка, до двух знаков после точки.\nПример: `199.99`.\n"
    },
    "price_currency": {
      "type": "string",
      "description": "Валюта счёта-фактуры:\n- `USD` — доллар, \n- `EUR` — евро, \n- `TRY` — турецкая лира, \n- `CNY` — юань, \n- `RUB` — рубль, \n- `GBP` — фунт стерлингов.\n\nЗначение по умолчанию — `USD`.\n"
    }
  }
}
```
