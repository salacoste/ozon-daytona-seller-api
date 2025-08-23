# v1CargoesDeleteRequest

## Top-level fields
- `v1CargoesDeleteRequest` (top-level fields):
  - `cargo_ids`: `array`
  - `supply_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "cargo_ids": {
      "type": "array",
      "description": "Список идентификаторов грузомест, которые нужно удалить.\n\nМаксимум 70 значений.\n",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "supply_id": {
      "description": "Идентификатор поставки.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
