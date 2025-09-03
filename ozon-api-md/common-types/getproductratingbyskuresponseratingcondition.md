# GetProductRatingBySkuResponseRatingCondition

## Top-level fields
- `GetProductRatingBySkuResponseRatingCondition` (top-level fields):
  - `cost`: `number`
  - `description`: `string`
  - `fulfilled`: `boolean`
  - `key`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "cost": {
      "type": "number",
      "format": "float",
      "description": "Количество баллов контент-рейтинга, которое даёт выполнение условия."
    },
    "description": {
      "type": "string",
      "description": "Описание условия."
    },
    "fulfilled": {
      "type": "boolean",
      "description": "Признак, что условие выполнено."
    },
    "key": {
      "type": "string",
      "description": "Идентификатор условия."
    }
  }
}
```
