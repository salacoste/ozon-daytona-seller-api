# CreateReportResponseCodeNoDeadline

Результат запроса.

## Top-level fields
- `CreateReportResponseCodeNoDeadline` (top-level fields):
  - `code`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "code": {
      "type": "string",
      "description": "Уникальный идентификатор отчёта. Чтобы получить отчёт, передайте это значение в метод [/v1/report/info](#operation/ReportAPI_ReportInfo)."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результат запроса."
}
```
