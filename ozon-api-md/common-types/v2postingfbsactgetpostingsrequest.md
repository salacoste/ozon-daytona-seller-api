# v2PostingFBSActGetPostingsRequest

## Top-level fields
- `v2PostingFBSActGetPostingsRequest` (top-level fields):
  - `id`: `int`

## Full schema (JSON)
```json
{
  "required": [
    "id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "int",
      "format": "int64",
      "description": "Идентификатор акта. Можно получить с помощью метода [/v2/posting/fbs/act/list](#operation/PostingAPI_FbsActList). Нужное значение — в параметре ответа `result.id`."
    }
  }
}
```
