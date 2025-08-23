# ApproveDeclineDiscountTasksResponseFailDetail

## Top-level fields
- `ApproveDeclineDiscountTasksResponseFailDetail` (top-level fields):
  - `task_id`: `integer`
  - `error_for_user`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "task_id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор заявки."
    },
    "error_for_user": {
      "type": "string",
      "description": "Текст ошибки."
    }
  }
}
```
