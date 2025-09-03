# v2InvoiceCreateOrUpdateV2Request

## Top-level fields
- `v2InvoiceCreateOrUpdateV2Request` (top-level fields):
  - `date`: `string`
  - `hs_codes`: `array`
  - `number`: `string`
  - `posting_number`: `string`
  - `price`: `number`
  - `price_currency`: `string`
  - `url`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "date",
    "posting_number",
    "url"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата счёта-фактуры."
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
      "description": "Номер счёта-фактуры. Номер может содержать буквы и цифры, максимальная длина — 50 символов."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Стоимость, указанная в счёте-фактуре. Разделитель дробной части — точка, до двух знаков после точки."
    },
    "price_currency": {
      "type": "string",
      "description": "Валюта счёта-фактуры:\n- `USD` — доллар, \n- `EUR` — евро, \n- `TRY` — турецкая лира, \n- `CNY` — юань, \n- `RUB` — рубль, \n- `GBP` — фунт стерлингов.\n\nЗначение по умолчанию — `USD`.\n"
    },
    "url": {
      "type": "string",
      "description": "Ссылка на счёт-фактуру. Чтобы создать ссылку, используйте метод [v1/invoice/file/upload](#operation/invoice_upload)."
    }
  }
}
```
