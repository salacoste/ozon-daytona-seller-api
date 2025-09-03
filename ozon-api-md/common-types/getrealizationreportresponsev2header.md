# GetRealizationReportResponseV2Header

Титульный лист отчёта.

## Top-level fields
- `GetRealizationReportResponseV2Header` (top-level fields):
  - `contract_date`: `string`
  - `contract_number`: `string`
  - `currency_sys_name`: `string`
  - `doc_amount`: `number`
  - `doc_date`: `string`
  - `number`: `string`
  - `payer_inn`: `string`
  - `payer_kpp`: `string`
  - `payer_name`: `string`
  - `receiver_inn`: `string`
  - `receiver_kpp`: `string`
  - `receiver_name`: `string`
  - `start_date`: `string`
  - `stop_date`: `string`
  - `vat_amount`: `number`

## Full schema (JSON)
```json
{
  "properties": {
    "contract_date": {
      "type": "string",
      "description": "Дата заключения договора."
    },
    "contract_number": {
      "type": "string",
      "description": "Номер договора."
    },
    "currency_sys_name": {
      "type": "string",
      "description": "Валюта."
    },
    "doc_amount": {
      "type": "number",
      "format": "double",
      "description": "Всего к начислению."
    },
    "doc_date": {
      "type": "string",
      "description": "Дата формирования документа."
    },
    "number": {
      "type": "string",
      "description": "Номер отчёта о реализации."
    },
    "payer_inn": {
      "type": "string",
      "description": "ИНН плательщика."
    },
    "payer_kpp": {
      "type": "string",
      "description": "КПП плательщика."
    },
    "payer_name": {
      "type": "string",
      "description": "Название плательщика."
    },
    "receiver_inn": {
      "type": "string",
      "description": "ИНН получателя."
    },
    "receiver_kpp": {
      "type": "string",
      "description": "КПП получателя."
    },
    "receiver_name": {
      "type": "string",
      "description": "Название получателя."
    },
    "start_date": {
      "type": "string",
      "description": "Начало периода."
    },
    "stop_date": {
      "type": "string",
      "description": "Конец периода."
    },
    "vat_amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма НДС в составе начислений."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Титульный лист отчёта."
}
```
