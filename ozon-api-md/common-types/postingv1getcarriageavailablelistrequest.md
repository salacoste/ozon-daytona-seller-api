# postingv1GetCarriageAvailableListRequest

## Top-level fields
- `postingv1GetCarriageAvailableListRequest` (top-level fields):
  - `delivery_method_id`: `integer`
  - `departure_date`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "delivery_method_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "delivery_method_id": {
      "type": "integer",
      "format": "int64",
      "description": "Фильтр по методу доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList)."
    },
    "departure_date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата отгрузки. По умолчанию — текущая дата."
    }
  }
}
```
