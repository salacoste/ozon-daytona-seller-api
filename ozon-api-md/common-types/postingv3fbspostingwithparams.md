# postingv3FbsPostingWithParams

Дополнительные поля, которые нужно добавить в ответ.

## Top-level fields
- `postingv3FbsPostingWithParams` (top-level fields):
  - `analytics_data`: `boolean`
  - `barcodes`: `boolean`
  - `financial_data`: `boolean`
  - `legal_info`: `boolean`
  - `translit`: `boolean`

## Full schema (JSON)
```json
{
  "properties": {
    "analytics_data": {
      "type": "boolean",
      "description": "Добавить в ответ данные аналитики."
    },
    "barcodes": {
      "type": "boolean",
      "description": "Добавить в ответ штрихкоды отправления."
    },
    "financial_data": {
      "type": "boolean",
      "description": "Добавить в ответ финансовые данные."
    },
    "legal_info": {
      "type": "boolean",
      "description": "Добавить в ответ юридическую информацию."
    },
    "translit": {
      "type": "boolean",
      "description": "Выполнить транслитерацию возвращаемых значений."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Дополнительные поля, которые нужно добавить в ответ."
}
```
