# productv5GetProductInfoPricesV5Request

## Top-level fields
- `productv5GetProductInfoPricesV5Request` (top-level fields):
  - `cursor`: `string`
  - `filter` → `$ref` productv5Filter
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "limit",
    "filter"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных."
    },
    "filter": {
      "$ref": "#/components/schemas/productv5Filter"
    },
    "limit": {
      "type": "integer",
      "format": "int32",
      "minimum": 1,
      "maximum": 1000,
      "description": "Количество значений на странице."
    }
  }
}
```
