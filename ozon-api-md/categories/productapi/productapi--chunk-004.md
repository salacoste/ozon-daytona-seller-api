# ProductAPI

## POST /v3/product/import

**Summary:** Создать или обновить товар

**operationId:** `ProductAPI_ImportProductsV3`

Метод для создания товаров и обновления информации о них.

В сутки можно создать или обновить определённое количество товаров. Чтобы узнать лимит, используйте
[/v4/product/info/limit](#operation/ProductAPI_GetUploadQuota). Если количество загрузок и обновлений товаров
превысит лимит, появится ошибка `item_limit_exceeded`.

В одном запросе можно передать до 100 товаров. Каждый товар — это отдельный элемент в массиве `items`. Укажите
всю информацию о товаре: его характеристики, штрихкод, изображения, габариты, цену и валюту цены.

При обновлении товара передайте в запросе всю информацию о нём.

Указанная валюта должна совпадать с той, которая установлена в настройках личного кабинета. По умолчанию передаётся `RUB` — российский рубль.
Например, если у вас установлена валюта юань, передавайте значение `CNY`, иначе вернётся ошибка.

Товар не будет создан или обновлён, если вы заполните неправильно или не укажете:
   - **Обязательные характеристики**: характеристики отличаются для разных категорий — их можно посмотреть в [Базе знаний продавца](https://docs.ozon.ru/global/products/requirements/product-info/product-characteristics/#обязательные-характеристики) или получить методом [/v1/description-category/attribute](#operation/DescriptionCategoryAPI_GetAttributes).
   - **Реальные объёмно-весовые характеристики**: `depth`, `width`, `height`, `dimension_unit`, `weight`, `weight_unit`. Не пропускайте эти параметры в запросе и не указывайте 0.

Для некоторых характеристик можно использовать HTML-теги.

После модерации товар появится в вашем личном кабинете, но не будет виден пользователям, пока вы не выставите его
на продажу.

Каждый товар в запросе — отдельный элемент массива `items`.

Чтобы объединить две карточки, для каждой передайте `9048` в массиве `attributes`. Все атрибуты в этих карточках, кроме размера или цвета, должны совпадать.

## Загрузка изображений

Для загрузки передайте в запросе ссылки на изображения в общедоступном облачном хранилище.
Формат изображения по ссылке — JPG или PNG.

Изображения в массиве `images` располагайте в соответствии с желаемым порядком на сайте. Для загрузки главного
изображения товара используйте параметр `primary_image`. Если не передать значение `primary_image`, главным будет
первое изображение в массиве `images`.

Для каждого товара вы можете загрузить до 15 изображений, включая главное.
Если передать значение `primary_image`, максимальное количество изображений в `images` — 14.
Если параметр `primary_image` пустой, то в `images` можно передать до 15 изображений.

Для загрузки изображений 360 используйте поле `images360`, для загрузки маркетингового цвета — `color_image`.

Если вы хотите изменить состав или порядок изображений, получите информацию с помощью метода
[/v3/product/info/list](#operation/ProductAPI_GetProductInfoList) — в нём отображается текущий порядок и
состав изображений. Скопируйте данные полей `images`, `images360`, `color_image`, измените и дополните состав или
порядок в соответствии с необходимостью.

## Загрузка видео

Для загрузки передайте в запросе ссылки на видео.

Для этого в параметре `complex_attributes` передайте объект. В нём в массиве `attributes` передайте 2 объекта с `complex_id = 100001`:

- В первом передайте укажите `id = 21841` и в массиве `values` передайте объект с ссылкой на видео.

  __Пример__:

  ```
  {
    "complex_id": 100001,
    "id": 21841,
    "values": [
      {
        "value": "https://www.youtube.com/watch?v=ZwM0iBn03dY"
      }
    ]
  }
  ```

- Во втором укажите значение `id = 21837` и в массиве `values` передайте объект с названием видео.

  __Пример__:

  ```
  {
    "complex_id": 100001,
    "id": 21837,
    "values": [
      {
        "value": "videoName_1"
      }
    ]
  }
  ```

Если вы хотите загрузить несколько видео, передавайте значения для каждого видео в разных объектах массива `values`.

  __Пример__:

  ```
  {
    "complex_id": 100001,
    "id": 21837,
    "values": [
      {
        "value": "videoName_1"
      },
      {
        "value": "videoName_2"
      }
    ]
  },
  {
    "complex_id": 100001,
    "id": 21841,
    "values": [
      {
        "value": "https://www.youtube.com/watch?v=ZwM0iBn03dY"
      },
      {
        "value": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    ]
  }
```

## Загрузка таблицы размеров
Вы можете добавить в карточку товара таблицу размеров, созданную с помощью [конструктора](https://table-constructor.ozon.ru/visual-editor). Передайте её в массиве `attributes` в формате JSON как Rich-контент `id = 13164`. &lt;br&gt;&lt;br&gt;
[Конструктор в формате JSON](https://table-constructor.ozon.ru/schema.json)&lt;br&gt;
[Подробнее о конструкторе в Базе знаний продавца](https://docs.ozon.ru/global/products/requirements/size-table-constructor/)

## Загрузка видеообложки

Вы можете загрузить видеообложку через `complex_attributes`.

__Пример__:

```
"complex_attributes": [
  {
    "attributes": [
      {
        "id": 21845,
        "complex_id": 100002,
        "values": [
          {
          "dictionary_value_id": 0,
          "value": "https://v.ozone.ru/vod/video-10/01GFATWQVCDE7G5B721421P1231Q7/asset_1.mp4"
          }
        ]
      }
    ]
  }
]
```

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
```json
{
  "note": "no example"
}
```

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v3ImportProductsRequest` — see [../common-types/v3importproductsrequest.md](../common-types/v3importproductsrequest.md)- `v3ImportProductsResponse` — see [../common-types/v3importproductsresponse.md](../common-types/v3importproductsresponse.md)
