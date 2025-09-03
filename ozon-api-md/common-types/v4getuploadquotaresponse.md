# v4GetUploadQuotaResponse

## Top-level fields
- `v4GetUploadQuotaResponse` (top-level fields):
  - `daily_create` → `$ref` GetUploadQuotaResponseDailyCreate
  - `daily_update` → `$ref` GetUploadQuotaResponseDailyUpdate
  - `total` → `$ref` GetUploadQuotaResponseTotal

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "daily_create": {
      "$ref": "#/components/schemas/GetUploadQuotaResponseDailyCreate"
    },
    "daily_update": {
      "$ref": "#/components/schemas/GetUploadQuotaResponseDailyUpdate"
    },
    "total": {
      "$ref": "#/components/schemas/GetUploadQuotaResponseTotal"
    }
  }
}
```
