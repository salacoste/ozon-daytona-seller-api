# v2CreateLabelBatchResponseResult

Результат работы метода.

## Top-level fields
- `v2CreateLabelBatchResponseResult` (top-level fields):
  - `tasks`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат работы метода.",
  "properties": {
    "tasks": {
      "type": "array",
      "description": "Список заданий.",
      "items": {
        "$ref": "#/components/schemas/v2CreateLabelBatchResponseResultTasks"
      }
    }
  }
}
```
