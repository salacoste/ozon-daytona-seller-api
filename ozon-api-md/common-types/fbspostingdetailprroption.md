# FbsPostingDetailPrrOption

Информация об услуге погрузочно-разгрузочных работ. Актуально для КГТ-отправлений с доставкой силами продавца или интегрированной службой.

## Top-level fields
- `FbsPostingDetailPrrOption` (top-level fields):
  - `code`: `string`
  - `price`: `string`
  - `currency_code`: `string`
  - `floor`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация об услуге погрузочно-разгрузочных работ. Актуально для КГТ-отправлений с доставкой силами продавца или интегрированной службой.",
  "properties": {
    "code": {
      "type": "string",
      "description": "Код услуги погрузочно-разгрузочных работ:\n- `lift` — подъём на лифте.\n- `stairs` — подъём по лестнице.\n- `none` — покупатель отказался от услуги, поднимать товары не нужно.\n- `delivery_default` — доставка включена в стоимость, по условиям оферты нужно доставить товар на этаж.\n"
    },
    "price": {
      "type": "string",
      "description": "Стоимость услуги, которую Ozon компенсирует продавцу."
    },
    "currency_code": {
      "type": "string",
      "description": "Валюта."
    },
    "floor": {
      "type": "string",
      "description": "Этаж, на который нужно поднять товар."
    }
  }
}
```
