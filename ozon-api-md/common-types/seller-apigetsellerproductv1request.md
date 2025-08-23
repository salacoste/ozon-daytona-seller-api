# seller_apiGetSellerProductV1Request

Список товаров.

## Top-level fields
- `seller_apiGetSellerProductV1Request` (top-level fields):
  - `action_id`: `number`
  - `limit`: `number`
  - `offset`: `number`
  - `last_id`: `number`

## Full schema (JSON)
```json
{
  "required": [
    "action_id",
    "offset"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "action_id": {
      "type": "number",
      "format": "double",
      "description": "Идентификатор акции. Можно получить с помощью метода [/v1/actions](#operation/Promos)."
    },
    "limit": {
      "type": "number",
      "format": "double",
      "description": "Количество ответов на странице. По умолчанию — 100."
    },
    "offset": {
      "type": "number",
      "format": "double",
      "description": "Количество элементов, которое будет пропущено в ответе. Например, если `offset=10`, ответ начнётся с 11-го найденного элемента.",
      "deprecated": true
    },
    "last_id": {
      "type": "number",
      "format": "double",
      "description": "Идентификатор последнего значения на странице. При первом запросе оставьте это поле пустым."
    }
  },
  "description": "Список товаров."
}
```
