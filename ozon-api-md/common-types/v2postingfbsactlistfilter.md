# v2PostingFBSActListFilter

Параметры фильтра.

## Top-level fields
- `v2PostingFBSActListFilter` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `integration_type`: `string`
  - `status`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Параметры фильтра.",
  "properties": {
    "date_from": {
      "type": "string",
      "description": "Начальная дата создания отгрузок."
    },
    "date_to": {
      "type": "string",
      "description": "Конечная дата создания отгрузок."
    },
    "integration_type": {
      "type": "string",
      "description": "Тип интеграции со службой доставки:\n  - `ozon` — доставка через Ozon логистику.\n  - `aggregator` — доставка внешней службой, Ozon регистрирует заказ.\n  - `3pl_tracking` — доставка внешней службой, продавец регистрирует заказ.\n  - `non_integrated` — доставка силами продавца.\n"
    },
    "status": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Статусы перевозок:\n  - `new` — новая,\n  - `awaiting_retry` — повторная попытка создания,\n  - `in_process` — собирается,\n  - `success` — создана,\n  - `error` — ошибка при создании,\n  - `sended` — отправлена,\n  - `received` — получена,\n  - `formed` — собрана,\n  - `cancelled` — отменена,\n  - `pending` — в очереди на сборку,\n  - `completion_enqueued` — в очереди на завершение,\n  - `completion_processing` — в процессе завершения,\n  - `completion_failed` — ошибка при завершении,\n  - `cancelation_enqueued` — в очереди на отмену,\n  - `cancelation_processing` — в процессе отмены,\n  - `cancelation_failed` — ошибка при отмене,\n  - `completed` — завершена,\n  - `closed` — закрыта.\n"
    }
  },
  "required": [
    "date_from",
    "date_to"
  ]
}
```
