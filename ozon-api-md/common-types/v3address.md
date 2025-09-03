# v3Address

Информация об адресе доставки.

## Top-level fields
- `v3Address` (top-level fields):
  - `address_tail`: `string`
  - `city`: `string`
  - `comment`: `string`
  - `country`: `string`
  - `district`: `string`
  - `latitude`: `number`
  - `longitude`: `number`
  - `provider_pvz_code`: `string`
  - `pvz_code`: `integer`
  - `region`: `string`
  - `zip_code`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "address_tail": {
      "type": "string",
      "description": "Адрес в текстовом формате."
    },
    "city": {
      "type": "string",
      "description": "Город доставки."
    },
    "comment": {
      "type": "string",
      "description": "Комментарий к заказу."
    },
    "country": {
      "type": "string",
      "description": "Страна доставки."
    },
    "district": {
      "type": "string",
      "description": "Район доставки."
    },
    "latitude": {
      "format": "double",
      "type": "number",
      "description": "Широта."
    },
    "longitude": {
      "format": "double",
      "type": "number",
      "description": "Долгота."
    },
    "provider_pvz_code": {
      "type": "string",
      "description": "Код пункта выдачи заказов 3PL провайдера."
    },
    "pvz_code": {
      "format": "int64",
      "type": "integer",
      "description": "Код пункта выдачи заказов."
    },
    "region": {
      "type": "string",
      "description": "Регион доставки."
    },
    "zip_code": {
      "type": "string",
      "description": "Почтовый индекс получателя."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Информация об адресе доставки."
}
```
