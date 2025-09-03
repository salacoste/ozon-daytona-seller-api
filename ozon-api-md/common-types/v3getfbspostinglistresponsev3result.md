# v3GetFbsPostingListResponseV3Result

Массив отправлений.

## Top-level fields
- `v3GetFbsPostingListResponseV3Result` (top-level fields):
  - `has_next`: `boolean`
  - `postings`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "has_next": {
      "type": "boolean",
      "description": "Признак, что в ответе вернули не весь массив отправлений:\n- `true` — необходимо сделать новый запрос с другим значением `offset`, чтобы получить информацию об остальных отправлениях;\n- `false` — в ответе вернули весь массив отправлений для фильтра, который был задан в запросе.\n"
    },
    "postings": {
      "items": {
        "$ref": "#/components/schemas/v3FbsPosting"
      },
      "type": "array",
      "description": "Информация об отправлении."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Массив отправлений."
}
```
