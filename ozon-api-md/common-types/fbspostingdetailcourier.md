# FbsPostingDetailCourier

Данные о курьере.

## Top-level fields
- `FbsPostingDetailCourier` (top-level fields):
  - `car_model`: `string`
  - `car_number`: `string`
  - `name`: `string`
  - `phone`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Данные о курьере.",
  "properties": {
    "car_model": {
      "type": "string",
      "description": "Модель автомобиля."
    },
    "car_number": {
      "type": "string",
      "description": "Номер автомобиля."
    },
    "name": {
      "type": "string",
      "description": "Полное имя курьера."
    },
    "phone": {
      "type": "string",
      "description": "Телефон курьера. \n\nВсегда возвращает пустую строку `\"\"`.\n"
    }
  }
}
```
