# CreateReportResponseCode

Результаты запроса.

## Top-level fields
- `CreateReportResponseCode` (top-level fields):
  - `code`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "code": {
      "type": "string",
      "description": "Уникальный идентификатор отчёта. По нему вы можете получить отчёт в течение 3 дней после запроса. Чтобы получить отчёт, передайте это значение в метод [/v1/report/info](#operation/ReportAPI_ReportInfo)."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результаты запроса."
}
```
