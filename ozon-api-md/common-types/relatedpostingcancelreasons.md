# relatedPostingCancelReasons

## Top-level fields
- `relatedPostingCancelReasons` (top-level fields):
  - `id`: `integer`
  - `title`: `string`
  - `type_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор причины отмены:\n- `352` — товар закончился на складе продавца. \n- `400` — остался только бракованный товар.\n- `401` — продавец отклонил арбитраж.\n- `402` — другое (вина продавца).\n- `665` — покупатель не забрал заказ.\n- `666` — возврат из службы доставки: нет доставки в указанный регион.\n- `667` — заказ утерян службой доставки.\n"
    },
    "title": {
      "type": "string",
      "description": "Описание причины отмены."
    },
    "type_id": {
      "type": "string",
      "description": "Инициатор отмены отправления: \n  - `buyer` — покупатель,\n  - `seller` — продавец.\n"
    }
  }
}
```
