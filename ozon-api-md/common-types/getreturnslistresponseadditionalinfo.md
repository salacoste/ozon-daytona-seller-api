# GetReturnsListResponseAdditionalInfo

Дополнительная информация.

## Top-level fields
- `GetReturnsListResponseAdditionalInfo` (top-level fields):
  - `is_opened`: `boolean`
  - `is_super_econom`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Дополнительная информация.",
  "properties": {
    "is_opened": {
      "type": "boolean",
      "description": "`true`, если возврат вскрыт.\n"
    },
    "is_super_econom": {
      "type": "boolean",
      "description": "`true`, если возврат относится к товарам «Суперэконом».\n"
    }
  }
}
```
