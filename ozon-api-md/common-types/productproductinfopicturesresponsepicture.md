# productProductInfoPicturesResponsePicture

## Top-level fields
- `productProductInfoPicturesResponsePicture` (top-level fields):
  - `is_360`: `boolean`
  - `is_color`: `boolean`
  - `is_primary`: `boolean`
  - `product_id`: `integer`
  - `state`: `string`
  - `url`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "is_360": {
      "type": "boolean",
      "description": "Признак, что картинка — изображение 360."
    },
    "is_color": {
      "type": "boolean",
      "description": "Признак, что картинка — образец цвета."
    },
    "is_primary": {
      "type": "boolean",
      "description": "Признак, что картинка — главное изображение."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "state": {
      "type": "string",
      "description": "Статус загрузки изображения. \n\nЕсли вызывали метод [/v1/product/pictures/import](#operation/ProductAPI_ProductImportPictures), то в ответе метода всегда будет `imported` — картинка не обработана.\nЧтобы посмотреть финальный статус, примерно через 10 секунд вызовите метод [/v1/product/pictures/info](#operation/ProductAPI_ProductInfoPictures).\n\nЕсли вызывали метод [/v1/product/pictures/info](#operation/ProductAPI_ProductInfoPictures), вы увидите один из статусов:\n- `uploaded` — изображение загружено;\n- `pending` — при загрузке изображения возникла ошибка. Повторите попытку позже.\n"
    },
    "url": {
      "description": "Адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG или PNG.",
      "type": "string"
    }
  }
}
```
