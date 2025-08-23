# productProductUnarchiveRequest

## Top-level fields
- `productProductUnarchiveRequest` (top-level fields):
  - `product_id`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "product_id"
  ],
  "properties": {
    "product_id": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array",
      "description": "Список идентификаторов товаров в системе продавца — `product_id`.  Вы можете передать до 100 идентификаторов за раз. \n\nВ сутки можно восстановить из архива не больше 10 товаров, которые были архивированы автоматически.  \nЛимит обновляется в 03:00 по московскому времени.\nНа разархивацию товаров, перенесённых в архив вручную, ограничений нет.\n"
    }
  },
  "type": "object",
  "title": "object"
}
```
