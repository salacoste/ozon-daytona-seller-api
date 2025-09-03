# v2GetSupplyOrdersListRequest

## Top-level fields
- `v2GetSupplyOrdersListRequest` (top-level fields):
  - `filter` → `$ref` GetSupplyOrdersListRequestFilter
  - `paging` → `$ref` GetSupplyOrdersListRequestPaging

## Full schema (JSON)
```json
{
  "required": [
    "paging"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/GetSupplyOrdersListRequestFilter"
    },
    "paging": {
      "$ref": "#/components/schemas/GetSupplyOrdersListRequestPaging"
    }
  }
}
```
