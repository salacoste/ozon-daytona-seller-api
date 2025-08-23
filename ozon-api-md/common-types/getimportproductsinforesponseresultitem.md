# GetImportProductsInfoResponseResultItem

## Top-level fields
- `GetImportProductsInfoResponseResultItem` (top-level fields):
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `status`: `string`
  - `errors`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул.\n\nМаксимальная длина строки в значении поля — 50 символов.\n"
    },
    "product_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "status": {
      "type": "string",
      "description": "Статус создания или обновления товара. Информация о товаре обрабатывается очередями.\nВозможные значения параметра:\n- `pending` — товар в очереди на обработку;\n- `imported` — товар успешно загружен;\n- `failed` — товар загружен с ошибками;\n- `skipped` — товар не был обновлен, так как запрос не содержал изменений.\n"
    },
    "errors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1ItemError"
      },
      "description": "Массив ошибок."
    }
  },
  "type": "object",
  "title": "object"
}
```
