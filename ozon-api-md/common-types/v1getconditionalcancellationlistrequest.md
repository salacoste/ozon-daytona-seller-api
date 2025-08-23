# v1GetConditionalCancellationListRequest

## Top-level fields
- `v1GetConditionalCancellationListRequest` (top-level fields):
  - `filters` → `$ref` GetConditionalCancellationListRequestFilters
  - `limit`: `integer`
  - `offset`: `integer`
  - `with` → `$ref` GetConditionalCancellationListRequestWith

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "filters": {
      "$ref": "#/components/schemas/GetConditionalCancellationListRequestFilters"
    },
    "limit": {
      "type": "integer",
      "format": "int32",
      "description": "Количество заявок в ответе."
    },
    "offset": {
      "type": "integer",
      "format": "int32",
      "description": "Количество элементов, которое будет пропущено в ответе. Например, если `offset=10`, ответ начнётся с 11-го найденного элемента."
    },
    "with": {
      "$ref": "#/components/schemas/GetConditionalCancellationListRequestWith"
    }
  },
  "required": [
    "limit"
  ]
}
```
