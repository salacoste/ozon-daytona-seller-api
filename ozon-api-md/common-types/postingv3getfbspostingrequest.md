# postingv3GetFbsPostingRequest

## Top-level fields
- `postingv3GetFbsPostingRequest` (top-level fields):
  - `posting_number`: `string`
  - `with` → `$ref` postingv3FbsPostingWithParamsExamplars

## Full schema (JSON)
```json
{
  "required": [
    "posting_number"
  ],
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Идентификатор отправления."
    },
    "with": {
      "$ref": "#/components/schemas/postingv3FbsPostingWithParamsExamplars"
    }
  },
  "type": "object",
  "title": "object"
}
```
