# FbsPostingShipV4ResponseShipAdditionalData

## Full schema (JSON)
```json
{
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "products": {
      "description": "Список товаров в отправлении.",
      "items": {
        "$ref": "#/components/schemas/fbsv4PostingProductDetailWithoutDimensions"
      }
    }
  }
}
```
