# productv4GetProductAttributesV4ResponseResult

## Top-level fields
- `productv4GetProductAttributesV4ResponseResult` (top-level fields):
  - `attributes`: `array`
  - `attributes_with_defaults`: `array`
  - `barcode`: `string`
  - `barcodes`: `array of strings`
  - `description_category_id`: `integer`
  - `color_image`: `string`
  - `complex_attributes`: `array`
  - `depth`: `integer`
  - `dimension_unit`: `string`
  - `height`: `integer`
  - `id`: `integer`
  - `images`: `array of strings`
  - `model_info` → `$ref` v4GetProductAttributesResponseModelInfo
  - `name`: `string`
  - `offer_id`: `string`
  - `pdf_list`: `array`
  - `primary_image`: `string`
  - `sku`: `string`
  - `type_id`: `integer`
  - `weight`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "attributes": {
      "items": {
        "$ref": "#/components/schemas/productGetProductAttributesV4ResponseAttribute"
      },
      "type": "array",
      "description": "Список характеристик товара."
    },
    "attributes_with_defaults": {
      "type": "array",
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "description": "Список идентификаторов характеристик со значением по умолчанию."
    },
    "barcode": {
      "type": "string",
      "description": "Штрихкод."
    },
    "barcodes": {
      "type": "array of strings",
      "description": "Все штрихкоды товара."
    },
    "description_category_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор категории.\nИспользуйте его с методами [/v1/description-category/attribute](#operation/DescriptionCategoryAPI_GetAttributes) и [/v1/description-category/attribute/values](#operation/DescriptionCategoryAPI_GetAttributeValues).\n"
    },
    "color_image": {
      "type": "string",
      "description": "Маркетинговый цвет."
    },
    "complex_attributes": {
      "items": {
        "$ref": "#/components/schemas/GetProductAttributesV4ResponseAttribute"
      },
      "type": "array",
      "description": "Массив вложенных характеристик."
    },
    "depth": {
      "format": "int64",
      "type": "integer",
      "description": "Глубина."
    },
    "dimension_unit": {
      "type": "string",
      "description": "Единица измерения габаритов:\n  - `mm` — миллиметры,\n  - `cm` — сантиметры,\n  - `in` — дюймы.\n"
    },
    "height": {
      "format": "int64",
      "type": "integer",
      "description": "Высота упаковки."
    },
    "id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "images": {
      "items": {
        "$ref": "#/components/schemas/GetProductAttributesResponseImage"
      },
      "type": "array of strings",
      "description": "Массив ссылок на изображения товара. Порядок изображений аналогичен порядку в карточке товаров."
    },
    "model_info": {
      "$ref": "#/components/schemas/v4GetProductAttributesResponseModelInfo"
    },
    "name": {
      "type": "string",
      "maxLength": 500,
      "description": "Название товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "pdf_list": {
      "items": {
        "$ref": "#/components/schemas/v4GetProductAttributesResponsePdf"
      },
      "type": "array",
      "description": "Массив PDF-файлов."
    },
    "primary_image": {
      "type": "string",
      "description": "Ссылка на главное изображение товара."
    },
    "sku": {
      "type": "string",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "type_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор типа товара."
    },
    "weight": {
      "format": "int64",
      "type": "integer",
      "description": "Вес товара в упаковке."
    },
    "weight_unit": {
      "type": "string",
      "description": "Единица измерения веса."
    },
    "width": {
      "format": "int64",
      "type": "integer",
      "description": "Ширина упаковки."
    }
  },
  "type": "object",
  "title": "object"
}
```
