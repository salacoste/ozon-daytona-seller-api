# v1DeclineDiscountTasksRequest

## Top-level fields
- `v1DeclineDiscountTasksRequest` (top-level fields):
  - `tasks`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "tasks"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "tasks": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1DeclineDiscountTasksRequestTask"
      },
      "description": "Список заявок."
    }
  }
}
```
