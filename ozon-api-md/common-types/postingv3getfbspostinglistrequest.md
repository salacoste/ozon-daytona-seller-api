# postingv3GetFbsPostingListRequest

## Top-level fields
- `postingv3GetFbsPostingListRequest` (top-level fields):
  - `dir`: `string`
  - `filter` → `$ref` postingv3GetFbsPostingListRequestFilter
  - `limit`: `integer`
  - `offset`: `integer`
  - `with` → `$ref` postingv3FbsPostingWithParams

## Full schema (JSON)
```json
{
  "required": [
    "filter",
    "limit",
    "offset"
  ],
  "properties": {
    "dir": {
      "type": "string",
      "description": "Направление сортировки:\n  - `asc` — по возрастанию,\n  - `desc` — по убыванию.\n"
    },
    "filter": {
      "$ref": "#/components/schemas/postingv3GetFbsPostingListRequestFilter"
    },
    "limit": {
      "format": "int64",
      "type": "integer",
      "description": "Количество значений в ответе:\n  - максимум — 1000,\n  - минимум — 1.\n"
    },
    "offset": {
      "format": "int64",
      "type": "integer",
      "description": "Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента."
    },
    "with": {
      "$ref": "#/components/schemas/postingv3FbsPostingWithParams"
    }
  },
  "type": "object",
  "title": "object"
}
```
