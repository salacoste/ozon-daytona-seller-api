# v1GetSupplyOrderBundleResponse

## Top-level fields
- `v1GetSupplyOrderBundleResponse` (top-level fields):
  - `items`: `array`
  - `total_count`: `integer`
  - `has_next`: `boolean`
  - `last_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1ItemResponse"
      },
      "description": "Список товаров в заявке на поставку."
    },
    "total_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товаров в заявке."
    },
    "has_next": {
      "type": "boolean",
      "description": "Признак, что в ответе вернули не все товары:\n- `true` — сделайте повторный запрос с другим значением `page` и `page_size`, чтобы получить информацию об остальных товарах;\n- `false` — ответ содержит все товары из заявки.\n"
    },
    "last_id": {
      "type": "string",
      "description": "Идентификатор последнего значения на странице."
    }
  }
}
```
