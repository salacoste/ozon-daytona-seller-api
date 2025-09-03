# v1CarriageDeliveryListResponseResultCarriages

## Top-level fields
- `v1CarriageDeliveryListResponseResultCarriages` (top-level fields):
  - `id`: `string`
  - `postings_count`: `integer`
  - `quantum_count`: `integer`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "int64",
      "description": "Идентификатор перевозки."
    },
    "postings_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество отправлений в перевозке."
    },
    "quantum_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество квантов в перевозке."
    },
    "status": {
      "type": "string",
      "description": "Статус перевозки для запрашиваемых метода и даты."
    }
  }
}
```
