# v1ListPostingCodesRequest

## Top-level fields
- `v1ListPostingCodesRequest` (top-level fields):
  - `dir` → `$ref` DirEnum
  - `filter` → `$ref` ListPostingCodesRequestFilter
  - `limit`: `integer`
  - `offset`: `integer`
  - `with` → `$ref` ListPostingCodesRequestWithParams

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "dir": {
      "$ref": "#/components/schemas/DirEnum"
    },
    "filter": {
      "$ref": "#/components/schemas/ListPostingCodesRequestFilter"
    },
    "limit": {
      "description": "Количество значений в ответе:\n - максимум — 1000,\n - минимум — 1.\n",
      "type": "integer",
      "format": "int64"
    },
    "offset": {
      "description": "Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента. Максимальное значение — 20000.",
      "type": "integer",
      "format": "int64"
    },
    "with": {
      "$ref": "#/components/schemas/ListPostingCodesRequestWithParams"
    }
  }
}
```
