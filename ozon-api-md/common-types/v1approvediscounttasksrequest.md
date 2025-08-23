# v1ApproveDiscountTasksRequest

## Top-level fields
- `v1ApproveDiscountTasksRequest` (top-level fields):
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
        "$ref": "#/components/schemas/v1ApproveDiscountTasksRequestTask"
      },
      "description": "Список заявок."
    }
  }
}
```
