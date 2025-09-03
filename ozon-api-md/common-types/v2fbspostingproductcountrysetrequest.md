# v2FbsPostingProductCountrySetRequest

## Top-level fields
- `v2FbsPostingProductCountrySetRequest` (top-level fields):
  - `posting_number`: `string`
  - `product_id`: `integer`
  - `country_iso_code`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "posting_number",
    "product_id",
    "country_iso_code"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "country_iso_code": {
      "type": "string",
      "description": "Двухбуквенный код добавляемой страны по стандарту ISO_3166-1.\n\nСписок доступных стран-изготовителей и их ISO коды можно получить с помощью метода [/v2/posting/fbs/product/country/list](#operation/PostingAPI_ListCountryProductFbsPostingV2).\n"
    }
  }
}
```
