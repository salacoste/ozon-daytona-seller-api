# PostingFBSActCheckStatusResponseStatus

Результат работы метода.

## Top-level fields
- `PostingFBSActCheckStatusResponseStatus` (top-level fields):
  - `act_type`: `string`
  - `added_to_act`: `array`
  - `removed_from_act`: `array`
  - `status`: `string`
  - `is_partial`: `boolean`
  - `has_postings_for_next_carriage`: `boolean`
  - `partial_num`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "act_type": {
      "type": "string",
      "description": "Тип документов.\n\nЕсли значение `ozon_digital`, используйте методы [/v2/posting/fbs/digital/act/check-status](#operation/PostingAPI_PostingFBSDigitalActCheckStatus) \n    и [/v2/posting/fbs/digital/act/get-pdf](#operation/PostingAPI_PostingFBSGetDigitalAct) для получения электронной транспортной накладной.\n"
    },
    "added_to_act": {
      "items": {
        "type": "string"
      },
      "type": "array",
      "description": "Массив c номерами отправлений, которые добавлены в перевозку. Эти отправления нужно передать сегодня."
    },
    "removed_from_act": {
      "items": {
        "type": "string"
      },
      "type": "array",
      "description": "Массив с номерами отправлений, которые не попали в перевозку. Такие отправления нужно передавать со следующей отгрузкой."
    },
    "status": {
      "type": "string",
      "description": "Статус запроса:\n - `in_process` — документы формируются, нужно подождать.\n - `ready` — документы сформированы и готовы для скачивания.\n - `error` — произошла ошибка при формировании документов, запросите документы повторно.\n - `cancelled` — создание документов отменено, запросите их повторно.\n - `The next postings aren't ready` — произошла ошибка, отправления не включены в отгрузку. Подождите некоторое время и проверьте результат запроса. Если ошибка повторяется, обратитесь в службу поддержки.\n"
    },
    "is_partial": {
      "type": "boolean",
      "description": "Признак частичной перевозки. `true`, если перевозка частичная.\n\nЧастичная перевозка значит, что отгрузка была разделена на несколько частей.\n"
    },
    "has_postings_for_next_carriage": {
      "type": "boolean",
      "description": "`true`, если есть отправления, не попавшие в текущую перевозку, но которые нужно отгрузить.\n\nЕсли в ответе вернулось `true`, подтвердите отгрузку или создайте новый акт через метод [/v2/posting/fbs/act/create](#operation/PostingAPI_PostingFBSActCreate) и проверьте их статус. Повторяйте действия, пока в ответе не вернётся `false`.\n"
    },
    "partial_num": {
      "type": "integer",
      "format": "int64",
      "description": "Порядковый номер частичной перевозки."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результат работы метода."
}
```
