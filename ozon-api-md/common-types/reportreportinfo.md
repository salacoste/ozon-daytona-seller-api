# reportReportinfo

Информация об отчёте.

## Top-level fields
- `reportReportinfo` (top-level fields):
  - `code`: `string`
  - `created_at`: `string`
  - `error`: `string`
  - `file`: `string`
  - `params`: `object`
  - `report_type`: `string`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "code": {
      "type": "string",
      "description": "Уникальный идентификатор отчёта."
    },
    "created_at": {
      "format": "date-time",
      "type": "string",
      "description": "Дата создания отчёта."
    },
    "error": {
      "type": "string",
      "description": "Код ошибки при генерации отчёта."
    },
    "file": {
      "type": "string",
      "description": "Ссылка на XLSX-файл.\n\nДля отчёта с типом `SELLER_RETURNS` ссылка доступна 5 минут после выполнения запроса.\n"
    },
    "params": {
      "additionalProperties": {
        "type": "string",
        "description": "Фильтр."
      },
      "type": "object",
      "description": "Массив с фильтрами, указанными при создании отчёта продавцом."
    },
    "report_type": {
      "type": "string",
      "description": "Тип отчёта:\n  - `SELLER_PRODUCTS` — отчёт по товарам,\n  - `SELLER_TRANSACTIONS` — отчёт по транзакциям,\n  - `SELLER_PRODUCT_PRICES` — отчёт по ценам товаров,\n  - `SELLER_STOCK` — отчёт об остатках товаров,\n  - `SELLER_RETURNS` — отчёт о возвратах,\n  - `SELLER_POSTINGS` — отчёт об отправлениях,\n  - `SELLER_FINANCE` — отчёт о финансах,\n  - `SELLER_PRODUCT_DISCOUNTED` — отчёт об уценённых товарах,\n  - `DOCUMENT_B2B_SALES` — отчёт о продажах юридическим лицам,\n  - `MUTUAL_SETTLEMENT` — отчёт о взаиморасчётах,\n  - `SELLER_RETURNS_V2` — отчёт о возвратах FBO и FBS,\n  - `COMPENSATION` — отчёт о компенсациях,\n  - `DECOMPENSATION` — отчёт о декомпенсациях.\n"
    },
    "status": {
      "type": "string",
      "description": "Статус генерации отчёта:\n  - `waiting` — в очереди на обработку,\n  - `processing` — обрабатывается,\n  - `success` — отчёт успешно создан,\n  - `failed` — ошибка при создании отчёта.\n"
    }
  },
  "title": "Common",
  "type": "object",
  "description": "Информация об отчёте."
}
```
