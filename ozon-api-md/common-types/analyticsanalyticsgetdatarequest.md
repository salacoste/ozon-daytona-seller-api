# analyticsAnalyticsGetDataRequest

## Top-level fields
- `analyticsAnalyticsGetDataRequest` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `dimension`: `array`
  - `filters`: `array`
  - `limit`: `integer`
  - `metrics`: `array`
  - `offset`: `integer`
  - `sort`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "date_from",
    "date_to",
    "dimension",
    "metrics",
    "limit"
  ],
  "properties": {
    "date_from": {
      "type": "string",
      "description": "Дата, с которой будут данные в отчёте.\n\nЕсли у вас нет Premium-подписки, укажите дату в пределах последних трёх месяцев.\n"
    },
    "date_to": {
      "type": "string",
      "description": "Дата, по которую будут данные в отчёте."
    },
    "dimension": {
      "items": {
        "$ref": "#/components/schemas/seller_serviceanalyticsDimension"
      },
      "type": "array",
      "description": "Группировка данных в отчёте.\n\nСпособы группировки, доступные всем продавцам:\n  - `unknownDimension` — неизвестное измерение,\n  - `sku` — идентификатор товара,\n  - `spu` — идентификатор товара,\n  - `day` — день,\n  - `week` — неделя,\n  - `month` — месяц.\n\nСпособы группировки, доступные только продавцам с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus):\n  - `year` — год,\n  - `category1` — категория первого уровня,\n  - `category2` — категория второго уровня,\n  - `category3` — категория третьего уровня,\n  - `category4` — категория четвертого уровня,\n  - `brand` — бренд,\n  - `modelID` — модель.\n"
    },
    "filters": {
      "items": {
        "$ref": "#/components/schemas/analyticsFilter"
      },
      "type": "array",
      "description": "Фильтры."
    },
    "limit": {
      "format": "int64",
      "type": "integer",
      "description": "Количество значений в ответе:\n  - максимум — 1000,\n  - минимум — 1.\n"
    },
    "metrics": {
      "items": {
        "$ref": "#/components/schemas/analyticsMetric"
      },
      "type": "array",
      "description": "Укажите до 14 метрик. Если их будет больше, вы получите ошибку с кодом `InvalidArgument`.\n\nСписок метриĸ, по ĸоторым будет сформирован отчёт.\n\nМетрики, доступные всем продавцам:\n  - `revenue` — заказано на сумму,\n  - `ordered_units` — заказано товаров.\n\nМетрики, доступные только продавцам с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus):\n  - `unknown_metric` — неизвестная метрика.\n  - `hits_view_search` — показы в поиске и в категории.\n  - `hits_view_pdp` — показы на карточке товара.\n  - `hits_view` — всего показов.\n  - `hits_tocart_search` — в корзину из поиска или категории.\n  - `hits_tocart_pdp` — в корзину из карточки товара.\n  - `hits_tocart` — всего добавлено в корзину.\n  - `session_view_search` — сессии с показом в поиске или в каталоге. Считаются уникальные посетители с просмотром в поиске или каталоге.\n  - `session_view_pdp` — сессии с показом на карточке товара. Считаются уникальные посетители, которые просмотрели карточку товара.\n  - `session_view` — всего сессий. Считаются уникальные посетители.\n  - `conv_tocart_search` — конверсия в корзину из поиска или категории.\n  - `conv_tocart_pdp` — конверсия в корзину из карточки товара.\n  - `conv_tocart` — общая конверсия в корзину.\n  - `returns` — возвращено товаров.\n  - `cancellations` — отменено товаров.\n  - `delivered_units` — доставлено товаров.\n  - `position_category` — позиция в поиске и категории.\n"
    },
    "offset": {
      "format": "int64",
      "type": "integer",
      "description": "Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента."
    },
    "sort": {
      "items": {
        "$ref": "#/components/schemas/analyticsSorting"
      },
      "type": "array",
      "description": "Настройки сортировки отчёта."
    }
  },
  "type": "object",
  "title": "object"
}
```
