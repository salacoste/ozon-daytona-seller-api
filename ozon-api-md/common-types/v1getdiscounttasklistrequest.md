# v1GetDiscountTaskListRequest

## Top-level fields
- `v1GetDiscountTaskListRequest` (top-level fields):
  - `status` → `$ref` v1DiscountTaskStatus
  - `page`: `integer`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "status",
    "limit"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "status": {
      "$ref": "#/components/schemas/v1DiscountTaskStatus"
    },
    "page": {
      "type": "integer",
      "format": "uint64",
      "description": "Страница, с которой нужно выгрузить список заявок на скидку."
    },
    "limit": {
      "type": "integer",
      "format": "uint64",
      "description": "Максимальное количество заявок на странице."
    }
  }
}
```
