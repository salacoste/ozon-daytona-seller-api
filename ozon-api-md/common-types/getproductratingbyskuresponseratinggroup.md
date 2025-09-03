# GetProductRatingBySkuResponseRatingGroup

## Top-level fields
- `GetProductRatingBySkuResponseRatingGroup` (top-level fields):
  - `conditions`: `object`
  - `improve_at_least`: `integer`
  - `improve_attributes`: `object`
  - `key`: `string`
  - `name`: `string`
  - `rating`: `number`
  - `weight`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "conditions": {
      "description": "Список условий, увеличивающих контент-рейтинг товара.",
      "items": {
        "$ref": "#/components/schemas/GetProductRatingBySkuResponseRatingCondition"
      }
    },
    "improve_at_least": {
      "type": "integer",
      "foramt": "int64",
      "description": "Количество атрибутов, которые нужно заполнить для получения максимального балла в этой группе характеристик."
    },
    "improve_attributes": {
      "description": "Cписок атрибутов, заполнение которых может увеличить контент-рейтинг товара.",
      "items": {
        "$ref": "#/components/schemas/GetProductRatingBySkuResponseRatingImproveAttribute"
      }
    },
    "key": {
      "type": "string",
      "description": "Идентификатор группы."
    },
    "name": {
      "type": "string",
      "description": "Название группы."
    },
    "rating": {
      "type": "number",
      "format": "float",
      "description": "Рейтинг в группе."
    },
    "weight": {
      "type": "number",
      "format": "float",
      "description": "Процент влияния характеристик группы на контент-рейтинг."
    }
  }
}
```
