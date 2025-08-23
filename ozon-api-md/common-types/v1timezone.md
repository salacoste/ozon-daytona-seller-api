# v1Timezone

## Top-level fields
- `v1Timezone` (top-level fields):
  - `iana_name`: `string`
  - `offset`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "iana_name": {
      "description": "Название часового пояса.",
      "type": "string"
    },
    "offset": {
      "description": "Смещение часового пояса от UTC-0 в секундах.",
      "type": "string"
    }
  }
}
```
