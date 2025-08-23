# postingv3FbsPostingWithParamsExamplars

Дополнительные поля, которые нужно добавить в ответ.

## Top-level fields
- `postingv3FbsPostingWithParamsExamplars` (top-level fields):
  - `analytics_data`: `boolean`
  - `barcodes`: `boolean`
  - `financial_data`: `boolean`
  - `legal_info`: `boolean`
  - `product_exemplars`: `boolean`
  - `related_postings`: `boolean`
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
    "product_exemplars": {
      "type": "boolean",
      "description": "Добавить в ответ данные о продуктах и их экземплярах."
    },
    "related_postings": {
      "type": "boolean",
      "description": "Добавить в ответ номера связанных отправлений. Связанные отправления — те, на которое было разделено родительское отправление при сборке.\n"
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
