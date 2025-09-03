# FinanceTransactionListV3ResponseOperation

## Top-level fields
- `FinanceTransactionListV3ResponseOperation` (top-level fields):
  - `accruals_for_sale`: `number`
  - `amount`: `number`
  - `delivery_charge`: `number`
  - `items`: `array`
  - `operation_date`: `string`
  - `operation_id`: `integer`
  - `operation_type`: `string`
  - `operation_type_name`: `string`
  - `posting` → `$ref` OperationPosting
  - `return_delivery_charge`: `number`
  - `sale_commission`: `number`
  - `services`: `array`
  - `type`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "accruals_for_sale": {
      "format": "double",
      "type": "number",
      "description": "Стоимость товаров с учётом скидок продавца."
    },
    "amount": {
      "format": "double",
      "type": "number",
      "description": "Итоговая сумма операции."
    },
    "delivery_charge": {
      "format": "double",
      "type": "number",
      "description": "Стоимость доставки для начислений по тарифам, которые действовали до 1 февраля 2021 года, а также начислений для крупногабаритных товаров."
    },
    "items": {
      "items": {
        "$ref": "#/components/schemas/OperationItem"
      },
      "type": "array",
      "description": "Информация о товаре."
    },
    "operation_date": {
      "type": "string",
      "description": "Дата операции."
    },
    "operation_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор операции."
    },
    "operation_type": {
      "type": "string",
      "description": "Тип операции."
    },
    "operation_type_name": {
      "type": "string",
      "description": "Название типа операции."
    },
    "posting": {
      "$ref": "#/components/schemas/OperationPosting"
    },
    "return_delivery_charge": {
      "format": "double",
      "type": "number",
      "description": "Плата за возвраты и отмены для начислений по тарифам, которые действовали до 1 февраля 2021 года, а также начислений для крупногабаритных товаров."
    },
    "sale_commission": {
      "format": "double",
      "type": "number",
      "description": "Комиссия за продажу или возврат комиссии за продажу."
    },
    "services": {
      "items": {
        "$ref": "#/components/schemas/OperationService"
      },
      "type": "array",
      "description": "Название услуги."
    },
    "type": {
      "type": "string",
      "description": "Тип начисления:\n- `all` — все,\n- `orders` — заказы,\n- `returns` — возвраты и отмены,\n- `services` — сервисные сборы,\n- `compensation` — компенсация,\n- `transferDelivery` — стоимость доставки,\n- `other` — прочее.\n"
    }
  },
  "type": "object",
  "title": "object"
}
```
