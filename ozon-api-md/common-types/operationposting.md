# OperationPosting

Информация об отправлении.

## Top-level fields
- `OperationPosting` (top-level fields):
  - `delivery_schema`: `string`
  - `order_date`: `string`
  - `posting_number`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "delivery_schema": {
      "type": "string",
      "description": "Схема доставки:\n  - `FBO` — доставка со склада Ozon,\n  - `FBS` — доставка со своего склада,\n  - `CROSSBORDER` — доставка из-за рубежа,\n  - `RFBS` — доставка по выбору продавца,\n  - `FBP` — доставка с партнёрских складов Ozon,\n  - `FBOECONOMY` — доставка эконом-товаров со склада Ozon,\n  - `FBSECONOMY` — доставка эконом-товаров со своего склада.\n"
    },
    "order_date": {
      "type": "string",
      "description": "Дата принятия отправления в обработку."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "warehouse_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор склада."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Информация об отправлении."
}
```
