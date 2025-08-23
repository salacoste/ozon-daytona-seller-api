# v2ProductInfoPicturesResponseItem

## Top-level fields
- `v2ProductInfoPicturesResponseItem` (top-level fields):
  - `product_id`: `integer`
  - `primary_photo`: `array`
  - `photo`: `array`
  - `color_photo`: `array`
  - `photo_360`: `array`
  - `errors`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "primary_photo": {
      "type": "array",
      "description": "Ссылка на главное изображение.",
      "items": {
        "type": "string"
      }
    },
    "photo": {
      "type": "array",
      "description": "Ссылки на фотографии товара.",
      "items": {
        "type": "string"
      }
    },
    "color_photo": {
      "type": "array",
      "description": "Ссылки на загруженные образцы цвета.",
      "items": {
        "type": "string"
      }
    },
    "photo_360": {
      "type": "array",
      "description": "Ссылки на изображения 360.",
      "items": {
        "type": "string"
      }
    },
    "errors": {
      "type": "array",
      "description": "Список ошибок по изображениям товара.",
      "items": {
        "$ref": "#/components/schemas/v2ProductInfoPicturesResponseError"
      }
    }
  }
}
```
