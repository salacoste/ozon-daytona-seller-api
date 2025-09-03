# v1CargoesDeleteResponseErrorCargoErrorReason

## Top-level fields
- `v1CargoesDeleteResponseErrorCargoErrorReason` (top-level fields):
  - `cargo_id`: `integer`
  - `error_reasons`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "cargo_id": {
      "description": "Идентификатор грузоместа.",
      "type": "integer",
      "format": "int64"
    },
    "error_reasons": {
      "description": "Список ошибок грузоместа.\n\nЕсли значение `CARGO_NOT_FOUND`, грузоместо не найдено.\n",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1CargoesDeleteResponseErrorCargoErrorReasonErrorReasonEnum"
      }
    }
  }
}
```
