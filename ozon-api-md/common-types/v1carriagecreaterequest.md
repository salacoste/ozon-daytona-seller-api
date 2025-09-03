# v1CarriageCreateRequest

## Top-level fields
- `v1CarriageCreateRequest` (top-level fields):
  - `delivery_method_id`: `integer`
  - `departure_date`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "delivery_method_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор метода доставки."
    },
    "departure_date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата отгрузки. По умолчанию — текущая дата."
    }
  }
}
```
