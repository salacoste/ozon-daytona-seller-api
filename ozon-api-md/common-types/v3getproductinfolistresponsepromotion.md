# v3GetProductInfoListResponsePromotion

## Top-level fields
- `v3GetProductInfoListResponsePromotion` (top-level fields):
  - `is_enabled`: `boolean`
  - `type` → `$ref` v3GetProductInfoListResponsePromotionType

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "is_enabled": {
      "description": "`true`, если акция включена.\n",
      "type": "boolean"
    },
    "type": {
      "$ref": "#/components/schemas/v3GetProductInfoListResponsePromotionType"
    }
  }
}
```
