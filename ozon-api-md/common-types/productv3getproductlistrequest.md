# productv3GetProductListRequest

## Top-level fields
- `productv3GetProductListRequest` (top-level fields):
  - `filter` → `$ref` productv3GetProductListRequestFilter
  - `last_id`: `string`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/productv3GetProductListRequestFilter"
    },
    "last_id": {
      "type": "string",
      "description": "Идентификатор последнего значения на странице. При первом запросе оставьте это поле пустым.\n\nЧтобы получить следующие значения, укажите `last_id` из ответа предыдущего запроса.\n"
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Количество значений на странице. Минимум — 1, максимум — 1000."
    }
  }
}
```
