# v1GetLabelBatchRequest

## Top-level fields
- `v1GetLabelBatchRequest` (top-level fields):
  - `task_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "task_id": {
      "type": "integer",
      "format": "int64",
      "description": "Номер задания на формирование этикеток из ответа метода [/v1/posting/fbs/package-label/create](#operation/PostingAPI_CreateLabelBatch)."
    }
  },
  "required": [
    "task_id"
  ]
}
```
