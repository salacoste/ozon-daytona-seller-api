# v1RatingHistoryV1Request

## Top-level fields
- `v1RatingHistoryV1Request` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `ratings`: `object`
  - `with_premium_scores`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "date_from": {
      "description": "Начало периода.",
      "type": "string",
      "format": "date-time"
    },
    "date_to": {
      "description": "Конец периода.",
      "type": "string",
      "format": "date-time"
    },
    "ratings": {
      "description": "Фильтр по рейтингу.\n\nРейтинги, по которым нужно получить значение за период:\n\n- `rating_on_time` — процент заказов, выполненных вовремя за последние 30 дней.\n- `rating_review_avg_score_total` — средняя оценка всех товаров.\n- `rating_price` — индекс цен: отношение стоимости ваших товаров к самой низкой цене на такой же товар на других площадках.\n- `rating_order_cancellation` — процент отмен FBS-отправлений по вашей вине за последние 7 дней. Текущий и предыдущий день не учитываются.\n- `rating_shipment_delay` — процент FBS-отправлений, которые за последние 7 дней не были переданы в доставку по вашей вине. Текущий и предыдущий день не учитываются.\n- `rating_ssl` — оценка работы по FBO. Учитывает `rating_on_time_supply_delivery`, `rating_on_time_supply_cancellation` и `rating_order_accuracy`.\n- `rating_on_time_supply_delivery` — процент поставок, которые вы привезли на склад в выбранный временной интервал за последние 60 дней.\n- `rating_order_accuracy` — процент поставок без излишков, недостач, пересорта и брака за последние 60 дней.\n- `rating_on_time_supply_cancellation` — процент заявок на поставку, которые завершились или были отменены без опоздания за последние 60 дней.\n- `rating_reaction_time` — время, в течение которого покупатели в среднем ждали ответа на своё первое сообщение в чате за последние 30 дней.\n- `rating_average_response_time` — время, в течение которого покупатели в среднем ждали вашего ответа за последние 30 дней.\n- `rating_replied_dialogs_ratio` — доля диалогов хотя бы с одним вашим ответом в течение 24 часов за последние 30 дней.\n\nЕсли вы хотите получить информацию по начисленным штрафным баллам для рейтингов `rating_on_time` и `rating_review_avg_score_total`,\nпередайте значения нужных рейтингов в этом параметре и `with_premium_scores=true`.\n",
      "items": {
        "type": "string"
      }
    },
    "with_premium_scores": {
      "description": "Признак, что в ответе нужно вернуть информацию о штрафных баллах в Premium-программе.",
      "type": "boolean"
    }
  },
  "required": [
    "ratings",
    "date_from",
    "date_to"
  ]
}
```
