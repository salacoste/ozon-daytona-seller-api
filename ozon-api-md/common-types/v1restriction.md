# v1Restriction

## Top-level fields
- `v1Restriction` (top-level fields):
  - `posting_number`: `string`
  - `max_posting_weight`: `number`
  - `min_posting_weight`: `number`
  - `width`: `number`
  - `length`: `number`
  - `height`: `number`
  - `max_posting_price`: `number`
  - `min_posting_price`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "max_posting_weight": {
      "type": "number",
      "format": "double",
      "description": "Ограничение по максимальному весу в граммах."
    },
    "min_posting_weight": {
      "type": "number",
      "format": "double",
      "description": "Ограничение по минимальному весу в граммах."
    },
    "width": {
      "type": "number",
      "format": "double",
      "description": "Ограничение по ширине в сантиметрах."
    },
    "length": {
      "type": "number",
      "format": "double",
      "description": "Ограничение по длине в сантиметрах."
    },
    "height": {
      "type": "number",
      "format": "double",
      "description": "Ограничение по высоте в сантиметрах."
    },
    "max_posting_price": {
      "type": "number",
      "format": "double",
      "description": "Ограничение по максимальной стоимости отправления в рублях."
    },
    "min_posting_price": {
      "type": "number",
      "format": "double",
      "description": "Ограничение по минимальной стоимости отправления в рублях."
    }
  }
}
```
