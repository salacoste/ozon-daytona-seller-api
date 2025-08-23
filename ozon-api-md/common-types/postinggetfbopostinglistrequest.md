# postingGetFboPostingListRequest

## Top-level fields
- `postingGetFboPostingListRequest` (top-level fields):
  - `dir`: `string`
  - `filter` → `$ref` postingGetFboPostingListRequestFilter
  - `limit`: `integer`
  - `offset`: `integer`
  - `translit`: `boolean`
  - `with` → `$ref` postingFboPostingWithParams

## Full schema (JSON)
```json
{
  "required": [
    "limit",
    "filter"
  ],
  "properties": {
    "dir": {
      "type": "string",
      "description": "Направление сортировки:\n  - `asc` — по возрастанию,\n  - `desc` — по убыванию.\n"
    },
    "filter": {
      "$ref": "#/components/schemas/postingGetFboPostingListRequestFilter"
    },
    "limit": {
      "format": "int64",
      "type": "integer",
      "description": "Количество значений в ответе:\n  - максимум — 1000,\n  - минимум — 1.\n"
    },
    "offset": {
      "format": "int64",
      "type": "integer",
      "description": "Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента. Максимальное значение — 20000."
    },
    "translit": {
      "type": "boolean",
      "description": "Если включена транслитерация адреса из кириллицы в латиницу — `true`."
    },
    "with": {
      "$ref": "#/components/schemas/postingFboPostingWithParams"
    }
  },
  "type": "object",
  "title": "object"
}
```
