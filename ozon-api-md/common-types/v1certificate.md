# v1Certificate

Информация о сертификате.

## Top-level fields
- `v1Certificate` (top-level fields):
  - `certificate_id`: `integer`
  - `certificate_number`: `string`
  - `certificate_name`: `string`
  - `type_code`: `string`
  - `status_code`: `string`
  - `accordance_type_code`: `string`
  - `rejection_reason_code`: `string`
  - `verification_comment`: `string`
  - `issue_date`: `string`
  - `expire_date`: `string`
  - `products_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "certificate_id": {
      "type": "integer",
      "format": "int32",
      "description": "Идентификатор."
    },
    "certificate_number": {
      "type": "string",
      "description": "Номер."
    },
    "certificate_name": {
      "type": "string",
      "description": "Название."
    },
    "type_code": {
      "type": "string",
      "description": "Тип."
    },
    "status_code": {
      "type": "string",
      "description": "Статус."
    },
    "accordance_type_code": {
      "type": "string",
      "description": "Тип соответствия требованиям."
    },
    "rejection_reason_code": {
      "type": "string",
      "description": "Причина отклонения сертификата."
    },
    "verification_comment": {
      "type": "string",
      "description": "Комментарий модератора."
    },
    "issue_date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания."
    },
    "expire_date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата окончания действия."
    },
    "products_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товаров, привязанных к сертификату."
    }
  },
  "description": "Информация о сертификате."
}
```
