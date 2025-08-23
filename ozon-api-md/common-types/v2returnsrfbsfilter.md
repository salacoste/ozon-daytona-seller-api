# v2ReturnsRfbsFilter

Фильтр.

## Top-level fields
- `v2ReturnsRfbsFilter` (top-level fields):
  - `offer_id`: `string`
  - `posting_number`: `string`
  - `group_state`: `array`
  - `created_at` → `$ref` CreatedAt

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр.",
  "properties": {
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "group_state": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Фильтр по статусам заявок:\n- `All` — все заявки.\n- `New` — новые.\n- `Delivering` — в пути.\n- `Checkout` — на проверке.\n- `Arbitration` — спорные.\n- `Approved` — согласованные.\n- `Rejected` — отклонённые.\n"
    },
    "created_at": {
      "$ref": "#/components/schemas/CreatedAt"
    }
  }
}
```
