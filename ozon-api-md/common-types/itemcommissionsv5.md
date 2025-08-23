# ItemCommissionsv5

Информация о комиссиях.

## Top-level fields
- `ItemCommissionsv5` (top-level fields):
  - `fbo_deliv_to_customer_amount`: `number`
  - `fbo_direct_flow_trans_max_amount`: `number`
  - `fbo_direct_flow_trans_min_amount`: `number`
  - `fbo_return_flow_amount`: `number`
  - `fbs_deliv_to_customer_amount`: `number`
  - `fbs_direct_flow_trans_max_amount`: `number`
  - `fbs_direct_flow_trans_min_amount`: `number`
  - `fbs_first_mile_max_amount`: `number`
  - `fbs_first_mile_min_amount`: `number`
  - `fbs_return_flow_amount`: `number`
  - `sales_percent_fbo`: `number`
  - `sales_percent_fbs`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о комиссиях.",
  "properties": {
    "fbo_deliv_to_customer_amount": {
      "format": "double",
      "type": "number",
      "description": "Последняя миля (FBO)."
    },
    "fbo_direct_flow_trans_max_amount": {
      "format": "double",
      "type": "number",
      "description": "Магистраль до (FBO)."
    },
    "fbo_direct_flow_trans_min_amount": {
      "format": "double",
      "type": "number",
      "description": "Магистраль от (FBO)."
    },
    "fbo_return_flow_amount": {
      "format": "double",
      "type": "number",
      "description": "Комиссия за возврат и отмену (FBO)."
    },
    "fbs_deliv_to_customer_amount": {
      "format": "double",
      "type": "number",
      "description": "Последняя миля (FBS)."
    },
    "fbs_direct_flow_trans_max_amount": {
      "format": "double",
      "type": "number",
      "description": "Магистраль до (FBS)."
    },
    "fbs_direct_flow_trans_min_amount": {
      "format": "double",
      "type": "number",
      "description": "Магистраль от (FBS)."
    },
    "fbs_first_mile_max_amount": {
      "format": "double",
      "type": "number",
      "description": "Максимальная комиссия за обработку отправления (FBS).\n\n[Подробнее о тарифах в Базе знаний продавца](https://seller-edu.ozon.ru/commissions-tariffs/commissions-tariffs-ozon/rashody-na-dop-uslugi#выезд-транспортного-средства-по-адресу-продавца-для-забора-отправлении-(pick-up))\n"
    },
    "fbs_first_mile_min_amount": {
      "format": "double",
      "type": "number",
      "description": "Минимальная комиссия за обработку отправления (FBS).\n\n[Подробнее о тарифах в Базе знаний продавца](https://seller-edu.ozon.ru/commissions-tariffs/commissions-tariffs-ozon/rashody-na-dop-uslugi#выезд-транспортного-средства-по-адресу-продавца-для-забора-отправлении-(pick-up))\n"
    },
    "fbs_return_flow_amount": {
      "format": "double",
      "type": "number",
      "description": "Комиссия за возврат и отмену, обработка отправления (FBS)."
    },
    "sales_percent_fbo": {
      "format": "double",
      "type": "number",
      "description": "Процент комиссии за продажу (FBO)."
    },
    "sales_percent_fbs": {
      "format": "double",
      "type": "number",
      "description": "Процент комиссии за продажу (FBS)."
    }
  }
}
```
