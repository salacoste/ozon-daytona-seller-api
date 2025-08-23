# v1QuestionInfoResponse

## Top-level fields
- `v1QuestionInfoResponse` (top-level fields):
  - `answers_count`: `int64`
  - `author_name`: `string`
  - `id`: `string`
  - `product_url`: `string`
  - `published_at`: `timestamp`
  - `question_link`: `string`
  - `sku`: `int64`
  - `status`: `enum`
  - `text`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "answers_count": {
      "type": "int64",
      "description": "Количество ответов на вопрос."
    },
    "author_name": {
      "type": "string",
      "description": "Автор вопроса."
    },
    "id": {
      "type": "string",
      "description": "Идентификатор вопроса."
    },
    "product_url": {
      "type": "string",
      "description": "Ссылка на товар."
    },
    "published_at": {
      "type": "timestamp",
      "description": "Дата публикации вопроса."
    },
    "question_link": {
      "type": "string",
      "description": "Ссылка на вопрос."
    },
    "sku": {
      "type": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "status": {
      "type": "enum",
      "description": "Статус вопроса:\n  - `NEW` — новый,\n  - `ALL` — все вопросы,\n  - `VIEWED` — просмотренный,\n  - `PROCESSED` — обработанный,\n  - `UNPROCESSED` — необработанный.\n"
    },
    "text": {
      "type": "string",
      "description": "Текст вопроса."
    }
  }
}
```
