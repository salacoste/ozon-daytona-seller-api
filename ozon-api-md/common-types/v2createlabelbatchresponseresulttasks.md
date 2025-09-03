# v2CreateLabelBatchResponseResultTasks

## Top-level fields
- `v2CreateLabelBatchResponseResultTasks` (top-level fields):
  - `task_id`: `integer`
  - `task_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "task_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор задания на формирование этикеток. В зависимости от типа этикетки передайте значение в метод [/v1/posting/fbs/package-label/get](#operation/PostingAPI_GetLabelBatch)."
    },
    "task_type": {
      "type": "string",
      "description": "Тип задания на формирование этикеток:\n- `big_label` — для обычной этикетки,\n- `small_label` — для маленькой этикетки.\n"
    }
  }
}
```
