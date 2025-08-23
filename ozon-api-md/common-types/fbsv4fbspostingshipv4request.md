# fbsv4FbsPostingShipV4Request

## Top-level fields
- `fbsv4FbsPostingShipV4Request` (top-level fields):
  - `packages`: `object`
  - `posting_number`: `string`
  - `with` → `$ref` FbsPostingShipV4RequestWith

## Full schema (JSON)
```json
{
  "required": [
    "packages",
    "posting_number"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "packages": {
      "items": {
        "$ref": "#/components/schemas/FbsPostingShipV4RequestPackage"
      },
      "description": "Список упаковок. Каждая упаковка содержит список отправлений, на которые делится заказ."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "with": {
      "$ref": "#/components/schemas/FbsPostingShipV4RequestWith"
    }
  }
}
```
