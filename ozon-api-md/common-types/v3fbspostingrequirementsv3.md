# v3FbsPostingRequirementsV3

Cписок продуктов, для которых нужно передать страну-изготовителя, номер грузовой таможенной декларации (ГТД), регистрационный номер партии товара (РНПТ) или маркировку «Честный ЗНАК», чтобы перевести отправление в следующий статус.

## Top-level fields
- `v3FbsPostingRequirementsV3` (top-level fields):
  - `products_requiring_change_country`: `array`
  - `products_requiring_gtd`: `array`
  - `products_requiring_country`: `array`
  - `products_requiring_mandatory_mark`: `array`
  - `products_requiring_jw_uin`: `array`
  - `products_requiring_rnpt`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "products_requiring_change_country": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Список идентификаторов товаров (SKU), для которых нужно изменить страну-изготовитель. Чтобы изменить страну-изготовитель, используйте методы [/v2/posting/fbs/product/country/list](#operation/PostingAPI_ListCountryProductFbsPostingV2) и [/v2/posting/fbs/product/country/set](#operation/PostingAPI_SetCountryProductFbsPostingV2)."
    },
    "products_requiring_gtd": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Список идентификаторов товаров (SKU), для которых нужно передать номера таможенной декларации (ГТД).\n\nДля сборки отправления передайте для всех перечисленных товаров номер таможенной декларации или информацию о том,\nчто номера нет, с помощью метода [/v3/posting/fbs/ship/package](#operation/PostingAPI_PackageShipFbsPostingV3)\nили [/v3/posting/fbs/ship](#operation/PostingAPI_ShipFbsPostingV3).\n"
    },
    "products_requiring_country": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Список идентификаторов товаров (SKU), для которых нужно передать информацию о стране-изготовителе.\n\nДля сборки отправления передайте информацию о стране-изготовителе для всех перечисленных товаров с помощью метода [/v2/posting/fbs/product/country/set](#operation/PostingAPI_SetCountryProductFbsPostingV2).\n"
    },
    "products_requiring_mandatory_mark": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Список идентификаторов товаров (SKU), для которых нужно передать маркировку «Честный ЗНАК».\n"
    },
    "products_requiring_jw_uin": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Список товаров, для которых нужно передать уникальный идентификационный номер (УИН) ювелирного изделия."
    },
    "products_requiring_rnpt": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Список идентификаторов товаров (SKU), для которых нужно передать регистрационный номер партии товара (РНПТ).\n"
    }
  },
  "description": "Cписок продуктов, для которых нужно передать страну-изготовителя, номер грузовой таможенной декларации (ГТД), регистрационный номер партии товара (РНПТ) или маркировку «Честный ЗНАК», чтобы перевести отправление в следующий статус."
}
```
