# v1BundleId

## Top-level fields
- `v1BundleId` (top-level fields):
  - `bundle_id`: `string`
  - `is_docless`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "bundle_id": {
      "type": "string",
      "description": "Идентификатор комплекта. Используйте параметр в методе [/v1/supply-order/bundle](#operation/SupplyOrderBundle), чтобы получить подробную информацию.\n"
    },
    "is_docless": {
      "type": "boolean",
      "description": "Признак необходимости передачи УПД:\n- `true` — документы не требуются,\n- `false` — требуются.\n"
    }
  }
}
```
