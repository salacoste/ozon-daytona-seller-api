# v1ApproveDeclineDiscountTasksResponseResult

Результат работы метода.

## Top-level fields
- `v1ApproveDeclineDiscountTasksResponseResult` (top-level fields):
  - `fail_details`: `array`
  - `success_count`: `integer`
  - `fail_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "fail_details": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ApproveDeclineDiscountTasksResponseFailDetail"
      },
      "description": "Ошибки при создании заявки."
    },
    "success_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество заявок с успешной сменой статуса."
    },
    "fail_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество заявок, у которых не удалось сменить статус."
    }
  },
  "description": "Результат работы метода."
}
```
