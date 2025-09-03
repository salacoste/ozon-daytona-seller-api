# v1AnalyticsTurnoverStocksResponseItem

## Top-level fields
- `v1AnalyticsTurnoverStocksResponseItem` (top-level fields):
  - `ads`: `number`
  - `current_stock`: `integer`
  - `idc`: `number`
  - `idc_grade`: `string`
  - `name`: `string`
  - `offer_id`: `string`
  - `sku`: `integer`
  - `turnover`: `number`
  - `turnover_grade`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "ads": {
      "type": "number",
      "format": "double",
      "description": "Среднесуточное количество проданных единиц товара за последние 60 дней."
    },
    "current_stock": {
      "type": "integer",
      "format": "int64",
      "description": "Остаток товара, шт."
    },
    "idc": {
      "type": "number",
      "format": "double",
      "description": "На сколько дней хватит остатка товара с учётом среднесуточных продаж."
    },
    "idc_grade": {
      "type": "string",
      "enum": [
        "GRADES_NONE",
        "GRADES_NOSALES",
        "GRADES_GREEN",
        "GRADES_YELLOW",
        "GRADES_RED",
        "GRADES_CRITICAL"
      ],
      "default": "GRADES_NONE",
      "description": "Уровень остатка товара:\n- `GRADES_NONE` — ожидаются поставки;\n- `GRADES_NOSALES` — нет продаж;\n- `GRADES_GREEN` — зелёный, «хороший»;\n- `GRADES_YELLOW` — жёлтый, «средний»;\n- `GRADES_RED` — красный, «плохой»;\n- `GRADES_CRITICAL` — критический.\n"
    },
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "turnover": {
      "type": "number",
      "format": "double",
      "description": "Фактическая оборачиваемость в днях."
    },
    "turnover_grade": {
      "type": "string",
      "enum": [
        "GRADES_NONE",
        "GRADES_NOSALES",
        "GRADES_GREEN",
        "GRADES_YELLOW",
        "GRADES_RED",
        "GRADES_CRITICAL"
      ],
      "default": "GRADES_NONE",
      "description": "Уровень оборачиваемости:\n- `GRADES_NONE` — ожидаются поставки;\n- `GRADES_NOSALES` — нет продаж;\n- `GRADES_GREEN` — зелёный, «хороший»;\n- `GRADES_YELLOW` — жёлтый, «средний»;\n- `GRADES_RED` — красный, «плохой»;\n- `GRADES_CRITICAL` — критический.\n"
    }
  }
}
```
