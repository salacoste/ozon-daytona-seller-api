# v2GetConditionalCancellationListV2Request

## Top-level fields
- `v2GetConditionalCancellationListV2Request` (top-level fields):
  - `filters` → `$ref` GetConditionalCancellationListV2RequestFilters
  - `last_id`: `integer`
  - `limit`: `integer`
  - `with` → `$ref` GetConditionalCancellationListV2RequestWith

## Full schema (JSON)
```json
{
  "required": [
    "limit"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "filters": {
      "$ref": "#/components/schemas/GetConditionalCancellationListV2RequestFilters"
    },
    "last_id": {
      "description": "Идентификатор последнего значения на странице. Оставьте это поле пустым при выполнении первого запроса.\n\nЧтобы получить следующие значения, укажите `last_id` из ответа предыдущего запроса.\n",
      "type": "integer",
      "format": "int64"
    },
    "limit": {
      "type": "integer",
      "format": "int32",
      "description": "Количество заявок в ответе.",
      "maximum": 500
    },
    "with": {
      "$ref": "#/components/schemas/GetConditionalCancellationListV2RequestWith"
    }
  }
}
```
