# SupplyCheckEditDeadlineExpireRule

Правило крайнего срока редактирования грузомест.

## Top-level fields
- `SupplyCheckEditDeadlineExpireRule` (top-level fields):
  - `is_applicable`: `boolean`
  - `is_required`: `boolean`
  - `satisfied`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Правило крайнего срока редактирования грузомест.",
  "properties": {
    "is_applicable": {
      "type": "boolean",
      "description": "`true`, если правило применимо к текущей поставке.\n"
    },
    "is_required": {
      "type": "boolean",
      "description": "`true`, если правило обязательно для текущей поставки.\n"
    },
    "satisfied": {
      "type": "boolean",
      "description": "`true`, если крайний срок для редактирования не наступил.\n"
    }
  }
}
```
