# postingPostingFBSActCheckStatusRequest

## Top-level fields
- `postingPostingFBSActCheckStatusRequest` (top-level fields):
  - `id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "id"
  ],
  "properties": {
    "id": {
      "format": "int64",
      "type": "integer",
      "description": "Номер задания на формирование документов (также идентификатор перевозки) из метода [POST /v2/posting/fbs/act/create](#operation/PostingAPI_PostingFBSActCreate)."
    }
  },
  "type": "object",
  "title": "object"
}
```
