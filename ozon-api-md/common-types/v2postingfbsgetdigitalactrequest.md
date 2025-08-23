# v2PostingFBSGetDigitalActRequest

## Top-level fields
- `v2PostingFBSGetDigitalActRequest` (top-level fields):
  - `id`: `integer`
  - `doc_type`: `object`

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
      "format": "int64",
      "type": "integer",
      "description": "Номер задания на формирование документов (также идентификатор перевозки) из метода [POST /v2/posting/fbs/act/create](#operation/PostingAPI_PostingFBSActCreate)."
    },
    "doc_type": {
      "format": "string",
      "description": "Тип электронного документа:\n- `act_of_acceptance` — лист отгрузки,\n- `act_of_mismatch` — акт о расхождениях,\n- `act_of_excess` — акт об излишках.\n"
    }
  }
}
```
