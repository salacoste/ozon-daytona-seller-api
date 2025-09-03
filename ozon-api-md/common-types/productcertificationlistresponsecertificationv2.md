# ProductCertificationListResponseCertificationv2

## Top-level fields
- `ProductCertificationListResponseCertificationv2` (top-level fields):
  - `category_id`: `integer`
  - `category_name`: `string`
  - `is_required`: `boolean`
  - `type_id`: `integer`
  - `type_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "category_id": {
      "description": "Идентификатор сертифицируемой категории.",
      "type": "integer",
      "format": "int64"
    },
    "category_name": {
      "description": "Название сертифицируемой категории.",
      "type": "string"
    },
    "is_required": {
      "description": "Признак обязательной характеристики.",
      "type": "boolean"
    },
    "type_id": {
      "description": "Идентификатор типа сертифицируемой категории.",
      "type": "integer",
      "format": "int64"
    },
    "type_name": {
      "description": "Название типа сертифицируемой категории.",
      "type": "string"
    }
  }
}
```
