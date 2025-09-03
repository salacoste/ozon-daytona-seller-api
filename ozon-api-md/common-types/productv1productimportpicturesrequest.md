# productv1ProductImportPicturesRequest

## Top-level fields
- `productv1ProductImportPicturesRequest` (top-level fields):
  - `color_image`: `string`
  - `images`: `object`
  - `images360`: `object`
  - `product_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "product_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "color_image": {
      "type": "string",
      "description": "Маркетинговый цвет."
    },
    "images": {
      "description": "Массив ссылок на изображения. \nИзображения в массиве расположены в порядке их расположения на сайте. \nПервое изображение в массиве будет главным.\n",
      "items": {
        "type": "string"
      }
    },
    "images360": {
      "items": {
        "type": "string"
      },
      "description": "Массив изображений 360. До 70 штук.\n\nФормат: адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG.\n"
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    }
  }
}
```
