# v3GetProductInfoListResponseItem

## Top-level fields
- `v3GetProductInfoListResponseItem` (top-level fields):
  - `barcodes`: `array`
  - `color_image`: `array`
  - `commissions`: `array`
  - `created_at`: `string`
  - `currency_code`: `string`
  - `description_category_id`: `integer`
  - `discounted_fbo_stocks`: `integer`
  - `errors`: `array`
  - `has_discounted_fbo_item`: `boolean`
  - `id`: `integer`
  - `images`: `array`
  - `images360`: `array`
  - `is_archived`: `boolean`
  - `is_autoarchived`: `boolean`
  - `is_discounted`: `boolean`
  - `is_kgt`: `boolean`
  - `is_prepayment_allowed`: `boolean`
  - `is_super`: `boolean`
  - `marketing_price`: `string`
  - `min_price`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "barcodes": {
      "description": "Все штрихкоды товара.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "color_image": {
      "description": "Изображение цвета товара.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "commissions": {
      "description": "Информация о комиссиях.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetProductInfoListResponseCommission"
      }
    },
    "created_at": {
      "description": "Дата и время создания товара.",
      "type": "string",
      "format": "date-time"
    },
    "currency_code": {
      "description": "Валюта.",
      "type": "string"
    },
    "description_category_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор категории.\nИспользуйте его с методами [/v1/description-category/attribute](#operation/DescriptionCategoryAPI_GetAttributes) и [/v1/description-category/attribute/values](#operation/DescriptionCategoryAPI_GetAttributeValues).\n"
    },
    "discounted_fbo_stocks": {
      "type": "integer",
      "format": "int32",
      "description": "Остатки уценённого товара на складе Ozon."
    },
    "errors": {
      "description": "Информация об ошибках при создании или валидации товара.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetProductInfoListResponseError"
      }
    },
    "has_discounted_fbo_item": {
      "type": "boolean",
      "description": "Признак, что у товара есть уценённые аналоги на складе Ozon."
    },
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "images": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Массив ссылок на изображения. Изображения в массиве расположены в порядке их расположения на сайте. Если параметр\n`primary_image` не указан, первое изображение в массиве главное для товара.\n"
    },
    "images360": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Массив изображений 360."
    },
    "is_archived": {
      "type": "boolean",
      "description": "`true`, если товар архивирован вручную.\n"
    },
    "is_autoarchived": {
      "type": "boolean",
      "description": "`true`, если товар архивирован автоматически.\n"
    },
    "is_discounted": {
      "type": "boolean",
      "description": "Признак, является ли товар уценённым:\n  - Если товар создавался продавцом как уценённый — `true`. \n  - Если товар не уценённый или был уценён Ozon — `false`.\n"
    },
    "is_kgt": {
      "type": "boolean",
      "description": "Признак крупногабаритного товара."
    },
    "is_prepayment_allowed": {
      "description": "`true`, если возможна предоплата.\n",
      "type": "boolean",
      "deprecated": true
    },
    "is_super": {
      "type": "boolean",
      "description": "Признак супер-товара.\n\n[Подробнее о супер-товарах в Базе знаний продавца](https://seller-edu.ozon.ru/fbo/rabota-so-stokom/super-tovary)\n"
    },
    "marketing_price": {
      "description": "Цена на товар с учётом всех акций, которая будет указана на витрине Ozon, без учёта скидки по Ozon Карте.",
      "type": "string"
    },
    "min_price": {
      "description": "Минимальная цена товара после применения акций.",
      "type": "string"
    },
    "model_info": {
      "$ref": "#/components/schemas/GetProductInfoListResponseModelInfo"
    },
    "name": {
      "type": "string",
      "description": "Название."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "old_price": {
      "type": "string",
      "description": "Цена до учёта скидок. На карточке товара отображается зачёркнутой."
    },
    "price": {
      "type": "string",
      "description": "Цена товара с учётом скидок — это значение показывается на карточке товара."
    },
    "price_indexes": {
      "$ref": "#/components/schemas/GetProductInfoListResponsePriceIndexes"
    },
    "primary_image": {
      "description": "Главное изображение товара.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "promotions": {
      "description": "Акции.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v3GetProductInfoListResponsePromotion"
      }
    },
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "integer",
      "format": "int64"
    },
    "sources": {
      "description": "Информация об источниках создания товара.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetProductInfoListResponseSource"
      }
    },
    "statuses": {
      "$ref": "#/components/schemas/GetProductInfoListResponseStatuses"
    },
    "stocks": {
      "$ref": "#/components/schemas/GetProductInfoListResponseStocks"
    },
    "type_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор типа товара."
    },
    "updated_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата последнего обновления товара."
    },
    "vat": {
      "type": "string",
      "description": "Ставка НДС для товара."
    },
    "visibility_details": {
      "$ref": "#/components/schemas/GetProductInfoListResponseVisibilityDetails"
    },
    "volume_weight": {
      "description": "Объёмный вес товара.",
      "type": "number",
      "format": "double"
    }
  }
}
```
