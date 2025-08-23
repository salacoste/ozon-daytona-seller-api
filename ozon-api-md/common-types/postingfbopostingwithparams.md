# postingFboPostingWithParams

Дополнительные поля, которые нужно добавить в ответ.

## Top-level fields
- `postingFboPostingWithParams` (top-level fields):
  - `analytics_data`: `boolean`
  - `financial_data`: `boolean`
  - `legal_info`: `boolean`

## Full schema (JSON)
```json
{
  "properties": {
    "analytics_data": {
      "type": "boolean",
      "description": "Передайте `true`, чтобы добавить в ответ данные аналитики."
    },
    "financial_data": {
      "type": "boolean",
      "description": "Передайте `true`, чтобы добавить в ответ финансовые данные."
    },
    "legal_info": {
      "type": "boolean",
      "description": "Передайте `true`, чтобы добавить в ответ юридическую информацию."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Дополнительные поля, которые нужно добавить в ответ."
}
```
