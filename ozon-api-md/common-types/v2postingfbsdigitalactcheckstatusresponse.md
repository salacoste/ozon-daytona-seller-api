# v2PostingFBSDigitalActCheckStatusResponse

## Top-level fields
- `v2PostingFBSDigitalActCheckStatusResponse` (top-level fields):
  - `id`: `integer`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Номер задания на формирование документов."
    },
    "status": {
      "type": "string",
      "description": "Cтатус формирования документов:\n- `FORMING` — ещё не готовы,\n- `FORMED` — сформированы успешно,\n- `CONFIRMED` — подписаны Ozon,\n- `CONFIRMED_WITH_MISMATCH` — подписаны Ozon с расхождениями,\n- `NOT_FOUND` — документы не найдены,\n- `UNKNOWN_ERROR` — произошла ошибка.\n"
    }
  }
}
```
