# v1GetLabelBatchResponseResult

Результат работы метода.

## Top-level fields
- `v1GetLabelBatchResponseResult` (top-level fields):
  - `error`: `string`
  - `file_url`: `string`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат работы метода.",
  "properties": {
    "error": {
      "type": "string",
      "description": "Код ошибки."
    },
    "file_url": {
      "type": "string",
      "description": "Ссылка на файл с этикетками."
    },
    "status": {
      "type": "string",
      "description": "Статус формирования этикеток:\n- `pending` — задание в очереди.\n- `in_progress` — формируются.\n- `completed` — файл с этикетками готов.\n- `error` — при формировании файла произошла ошибка.\n"
    }
  }
}
```
