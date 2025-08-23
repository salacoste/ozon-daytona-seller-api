# v1ProductCertificateDeleteResponseResult

Результат удаления сертификата.

## Top-level fields
- `v1ProductCertificateDeleteResponseResult` (top-level fields):
  - `is_delete`: `boolean`
  - `error_message`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "is_delete": {
      "type": "boolean",
      "description": "Удалён ли сертификат:\n- `true` — удалён,\n- `false` — не удалён.\n"
    },
    "error_message": {
      "type": "string",
      "description": "Описание ошибок при удалении сертификата."
    }
  },
  "description": "Результат удаления сертификата."
}
```
