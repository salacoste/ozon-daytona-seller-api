# GetConditionalCancellationListRequestFilters

Фильтры.

## Top-level fields
- `GetConditionalCancellationListRequestFilters` (top-level fields):
  - `cancellation_initiator`: `object`
  - `posting_number`: `array of strings`
  - `state`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтры.",
  "properties": {
    "cancellation_initiator": {
      "description": "Инициатор отмены:\n- `SELLER` — продавец, \n- `CLIENT` — клиент или покупатель,\n- `OZON` — Ozon,  \n- `SYSTEM` — система, \n- `DELIVERY` — служба доставки.\n\nНеобязательный параметр. Можно передавать несколько значений.\n",
      "items": {
        "type": "string",
        "enum": [
          "OZON",
          "SELLER",
          "CLIENT",
          "SYSTEM",
          "DELIVER"
        ]
      }
    },
    "posting_number": {
      "description": "Фильтр по номеру отправления.\n\nНеобязательный параметр. Можно передавать несколько значений.\n",
      "type": "array of strings"
    },
    "state": {
      "description": "Фильтр по статусу заявки на отмену:\n- `ALL` — заявки в любом статусе, \n- `ON_APPROVAL` — заявки на рассмотрении,\n- `APPROVED` — подтверждённые заявки, \n- `REJECTED` — отклонённые заявки.\n",
      "type": "string",
      "enum": [
        "ALL",
        "ON_APPROVAL",
        "APPROVED",
        "REJECTED"
      ]
    }
  }
}
```
