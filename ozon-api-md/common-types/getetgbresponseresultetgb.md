# GetEtgbResponseResultEtgb

Информация о декларации.

## Top-level fields
- `GetEtgbResponseResultEtgb` (top-level fields):
  - `number`: `string`
  - `date`: `string`
  - `url`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о декларации.",
  "properties": {
    "number": {
      "type": "string",
      "description": "Номер."
    },
    "date": {
      "type": "string",
      "description": "Дата создания."
    },
    "url": {
      "type": "string",
      "description": "Ссылка на файл.\n\nЕсли поле пустое и вам нужен файл, обратитесь в поддержку Ozon.\n"
    }
  }
}
```
