# v2ReturnsRfbsListV2ResponseState

Статусы заявки и возврата денег.

## Top-level fields
- `v2ReturnsRfbsListV2ResponseState` (top-level fields):
  - `group_state`: `string`
  - `money_return_state_name`: `string`
  - `state`: `string`
  - `state_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Статусы заявки и возврата денег.",
  "properties": {
    "group_state": {
      "type": "string",
      "description": "Статус заявки по применённому фильтру."
    },
    "money_return_state_name": {
      "type": "string",
      "description": "Статус возврата денег."
    },
    "state": {
      "type": "string",
      "description": "Статус заявки."
    },
    "state_name": {
      "type": "string",
      "description": "Название статуса заявки на русском."
    }
  }
}
```
