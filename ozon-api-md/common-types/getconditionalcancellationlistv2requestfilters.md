# GetConditionalCancellationListV2RequestFilters

Фильтры.

## Top-level fields
- `GetConditionalCancellationListV2RequestFilters` (top-level fields):
  - `cancellation_initiator`: `array`
  - `posting_number`: `array`
  - `state` → `$ref` v2CancellationStateEnumFilters

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Фильтры.",
  "properties": {
    "cancellation_initiator": {
      "type": "array",
      "description": "Инициатор отмены:\n- `SELLER` — продавец, \n- `CLIENT` — покупатель,\n- `OZON` — Ozon,  \n- `SYSTEM` — система, \n- `DELIVERY` — служба доставки.\n",
      "items": {
        "$ref": "#/components/schemas/v2CancellationInitiatorEnum"
      }
    },
    "posting_number": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Фильтр по номеру отправления."
    },
    "state": {
      "description": "Фильтр по статусу заявки на отмену:\n  - `ALL` — заявки в любом статусе,\n  - `ON_APPROVAL` — заявки на рассмотрении,\n  - `APPROVED` — подтверждённые заявки,\n  - `REJECTED` — отклонённые заявки.\n",
      "$ref": "#/components/schemas/v2CancellationStateEnumFilters"
    }
  }
}
```
