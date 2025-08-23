# v1ApproveDiscountTasksRequestTask

## Top-level fields
- `v1ApproveDiscountTasksRequestTask` (top-level fields):
  - `id`: `integer`
  - `approved_price`: `number`
  - `seller_comment`: `string`
  - `approved_quantity_min`: `integer`
  - `approved_quantity_max`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "id",
    "approved_price",
    "approved_quantity_min",
    "approved_quantity_max"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор заявки. Можно получить с помощью метода [/v1/actions/discounts-task/list](#operation/promos_task_list)."
    },
    "approved_price": {
      "type": "number",
      "format": "double",
      "description": "Согласованная цена."
    },
    "seller_comment": {
      "type": "string",
      "description": "Комментарий продавца к заявке."
    },
    "approved_quantity_min": {
      "type": "integer",
      "format": "uint64",
      "description": "Одобренное минимальное количество товаров."
    },
    "approved_quantity_max": {
      "type": "integer",
      "format": "uint64",
      "description": "Одобренное максимальное количество товаров."
    }
  }
}
```
