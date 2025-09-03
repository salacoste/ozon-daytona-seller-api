# arrivalpassArrivalPassListResponse

## Top-level fields
- `arrivalpassArrivalPassListResponse` (top-level fields):
  - `arrival_passes`: `array`
  - `cursor`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "arrival_passes": {
      "type": "array",
      "description": "Список пропусков для перевозки.",
      "items": {
        "$ref": "#/components/schemas/arrivalpassArrivalPassListResponseArrivalPass"
      }
    },
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных.\nЕсли параметр пустой, данных больше нет.\n"
    }
  }
}
```
