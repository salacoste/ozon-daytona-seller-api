# productv3GetProductListResponseItem

## Top-level fields
- `productv3GetProductListResponseItem` (top-level fields):
  - `archived`: `boolean`
  - `has_fbo_stocks`: `boolean`
  - `has_fbs_stocks`: `boolean`
  - `is_discounted`: `boolean`
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `quants` → `$ref` productv3GetProductListResponseItemQuant

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "archived": {
      "type": "boolean",
      "description": "Товар в архиве."
    },
    "has_fbo_stocks": {
      "type": "boolean",
      "description": "Есть остатки на складах FBO."
    },
    "has_fbs_stocks": {
      "type": "boolean",
      "description": "Есть остатки на складах FBS."
    },
    "is_discounted": {
      "type": "boolean",
      "description": "Уценённый товар."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "quants": {
      "description": "Список квантов.",
      "$ref": "#/components/schemas/productv3GetProductListResponseItemQuant"
    }
  }
}
```
