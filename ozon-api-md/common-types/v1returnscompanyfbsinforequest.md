# v1ReturnsCompanyFbsInfoRequest

## Top-level fields
- `v1ReturnsCompanyFbsInfoRequest` (top-level fields):
  - `filter` → `$ref` v1ReturnsCompanyFbsInfoRequestFilter
  - `pagination` → `$ref` ReturnsCompanyFbsInfoRequestPagination

## Full schema (JSON)
```json
{
  "required": [
    "pagination"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/v1ReturnsCompanyFbsInfoRequestFilter"
    },
    "pagination": {
      "$ref": "#/components/schemas/ReturnsCompanyFbsInfoRequestPagination"
    }
  }
}
```
