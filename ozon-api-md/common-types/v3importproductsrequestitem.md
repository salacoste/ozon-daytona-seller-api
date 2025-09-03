# v3ImportProductsRequestItem

## Top-level fields
- `v3ImportProductsRequestItem` (top-level fields):
  - `attributes`: `array`
  - `barcode`: `string`
  - `color_image`: `string`
  - `complex_attributes`: `array`
  - `currency_code`: `string`
  - `depth`: `integer`
  - `description_category_id`: `integer`
  - `new_description_category_id`: `integer`
  - `dimension_unit`: `string`
  - `geo_names`: `array`
  - `height`: `integer`
  - `images`: `array`
  - `images360`: `array`
  - `name`: `string`
  - `offer_id`: `string`
  - `old_price`: `string`
  - `pdf_list`: `array`
  - `price`: `string`
  - `primary_image`: `string`
  - `promotions`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "attributes": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v3ImportProductsRequestAttribute"
      },
      "description": "Массив с характеристиками товара. Характеристики отличаются для разных категорий — их можно посмотреть в [Базе знаний продавца](https://seller-edu.ozon.ru/) или через API."
    },
    "barcode": {
      "type": "string",
      "description": "Штрихкод товара."
    },
    "color_image": {
      "type": "string",
      "description": "Маркетинговый цвет.\n\nФормат: адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG.\n"
    },
    "complex_attributes": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v3ImportProductsRequestComplexAttribute"
      },
      "description": "Массив характеристик, у которых есть вложенные атрибуты."
    },
    "currency_code": {
      "type": "string",
      "description": "Валюта ваших цен. Переданное значение должно совпадать с валютой, которая установлена в настройках личного кабинета. По умолчанию передаётся `RUB` — российский рубль.\n\nНапример, если у вас установлена валюта взаиморасчётов юань, передавайте значение `CNY`, иначе вернётся ошибка.\n\nВозможные значения: \n  - `RUB` — российский рубль,\n  - `BYN` — белорусский рубль,\n  - `KZT` — тенге,\n  - `EUR` — евро,\n  - `USD` — доллар США,\n  - `CNY` — юань.\n"
    },
    "depth": {
      "type": "integer",
      "format": "int32",
      "description": "Глубина упаковки."
    },
    "description_category_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор категории. Можно получить с помощью метода [/v1/description-category/tree](#operation/DescriptionCategoryAPI_GetTree)."
    },
    "new_description_category_id": {
      "type": "integer",
      "format": "int64",
      "description": "Новый идентификатор категории. Укажите его, если нужно изменить текущую категорию товара."
    },
    "dimension_unit": {
      "type": "string",
      "description": "Единица измерения габаритов:\n  - `mm` — миллиметры,\n  - `cm` — сантиметры,\n  - `in` — дюймы.\n"
    },
    "geo_names": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Геоограничения — при необходимости заполните параметр в личном кабинете при создании или редактировании товара.\n\nНеобязательный параметр.\n"
    },
    "height": {
      "type": "integer",
      "format": "int32",
      "description": "Высота упаковки."
    },
    "images": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Массив изображений. До 15 штук. Изображения показываются на сайте в таком же порядке, как в массиве.\n\nЕсли не передать значение `primary_image`, первое изображение в массиве будет главным для товара.\n\nЕсли вы передали значение `primary_image`, передайте до 14 изображений.\nЕсли параметр `primary_image` пустой, передайте до 15 изображений.\n\nФормат: адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG или PNG.\n"
    },
    "images360": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Массив изображений 360. До 70 штук.\n\nФормат: адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG.\n"
    },
    "name": {
      "type": "string",
      "description": "Название товара. До 500 символов."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул.\n\nМаксимальная длина строки — 50 символов.\n"
    },
    "old_price": {
      "type": "string",
      "description": "Цена до скидок (будет зачёркнута на карточке товара). Указывается в рублях. Разделитель дробной\nчасти — точка, до двух знаков после точки.\n\nЕсли вы раньше передавали `old_price`, то при обновлении `price` также обновите `old_price`.\n"
    },
    "pdf_list": {
      "type": "array",
      "description": "Список PDF-файлов.",
      "items": {
        "$ref": "#/components/schemas/ImportProductsRequestPdfList"
      }
    },
    "price": {
      "type": "string",
      "description": "Цена товара с учётом скидок, отображается на карточке товара. Если на товар нет скидок, укажите\nзначение `old_price` в этом параметре.\n"
    },
    "primary_image": {
      "type": "string",
      "description": "Ссылка на главное изображение товара."
    },
    "promotions": {
      "type": "array",
      "description": "Акции.",
      "items": {
        "$ref": "#/components/schemas/ImportProductRequestPromotion"
      }
    },
    "service_type": {
      "$ref": "#/components/schemas/v3ServiceType"
    },
    "type_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор типа товара. \nЗначения можно получить из такого же параметра `type_id` в ответе метода [/v1/description-category/tree](#operation/DescriptionCategoryAPI_GetTree).\nПри заполнении этого параметра можно не указывать в `attibutes ` атрибут с параметром `id:8229`, `type_id` будет использоваться в приоритете.\n"
    },
    "vat": {
      "type": "string",
      "description": "Ставка НДС для товара:\n  - `0` — не облагается НДС,\n  - `0.05` — 5%,\n  - `0.07` — 7%,\n  - `0.1` — 10%,\n  - `0.2` — 20%.\n\nПередавайте значение ставки, актуальное на данный момент.\n"
    },
    "weight": {
      "type": "integer",
      "format": "int32",
      "description": "Вес товара в упаковке. Предельное значение — 1000 килограммов или конвертированная величина в других\nединицах измерения.\n"
    },
    "weight_unit": {
      "type": "string",
      "description": "Единица измерения веса:\n  - `g` — граммы,\n  - `kg` — килограммы,\n  - `lb` — фунты.\n"
    },
    "width": {
      "type": "integer",
      "format": "int32",
      "description": "Ширина упаковки."
    }
  },
  "required": [
    "description_category_id",
    "type_id"
  ]
}
```
