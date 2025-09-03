# ListPostingCodesRequestWithParams

Дополнительные поля, которые нужно добавить в ответ.

## Top-level fields
- `ListPostingCodesRequestWithParams` (top-level fields):
  - `analytics_data`: `boolean`
  - `financial_data`: `boolean`
  - `legal_info`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Дополнительные поля, которые нужно добавить в ответ.",
  "properties": {
    "analytics_data": {
      "description": "Передайте `true`, чтобы добавить в ответ данные аналитики.",
      "type": "boolean"
    },
    "financial_data": {
      "description": "Передайте `true`, чтобы добавить в ответ финансовые данные.",
      "type": "boolean"
    },
    "legal_info": {
      "description": "Передайте `true`, чтобы добавить в ответ юридическую информацию.",
      "type": "boolean"
    }
  }
}
```
