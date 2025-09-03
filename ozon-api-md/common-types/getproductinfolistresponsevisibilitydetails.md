# GetProductInfoListResponseVisibilityDetails

Настройки видимости товара.

## Top-level fields
- `GetProductInfoListResponseVisibilityDetails` (top-level fields):
  - `has_price`: `boolean`
  - `has_stock`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Настройки видимости товара.",
  "properties": {
    "has_price": {
      "type": "boolean",
      "description": "Если установлена цена — `true`."
    },
    "has_stock": {
      "type": "boolean",
      "description": "Если есть остаток на складах — `true`."
    }
  }
}
```
