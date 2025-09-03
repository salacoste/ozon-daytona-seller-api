# v1CarriageApproveRequest

## Top-level fields
- `v1CarriageApproveRequest` (top-level fields):
  - `carriage_id`: `integer`
  - `containers_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "required": [
    "carriage_id"
  ],
  "properties": {
    "carriage_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор отгрузки.",
      "required": true
    },
    "containers_count": {
      "format": "int32",
      "type": "integer",
      "description": "Количество грузовых мест. \n\nИспользуйте параметр, если вы подключены к доверительной приёмке и отгружаете заказы грузовыми местами. Если вы не подключены к доверительной приёмке, пропустите его.\n"
    }
  }
}
```
