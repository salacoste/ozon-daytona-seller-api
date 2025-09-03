# v1GetDiscountTaskListResponseTask

## Top-level fields
- `v1GetDiscountTaskListResponseTask` (top-level fields):
  - `id`: `integer`
  - `created_at`: `string`
  - `end_at`: `string`
  - `edited_till`: `string`
  - `status`: `string`
  - `customer_name`: `string`
  - `sku`: `integer`
  - `user_comment`: `string`
  - `seller_comment`: `string`
  - `requested_price`: `number`
  - `approved_price`: `number`
  - `original_price`: `number`
  - `discount`: `number`
  - `discount_percent`: `number`
  - `base_price`: `number`
  - `min_auto_price`: `number`
  - `prev_task_id`: `integer`
  - `is_damaged`: `boolean`
  - `moderated_at`: `string`
  - `approved_discount`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор заявки."
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания заявки."
    },
    "end_at": {
      "type": "string",
      "format": "date-time",
      "description": "Время окончания действия заявки."
    },
    "edited_till": {
      "type": "string",
      "format": "date-time",
      "description": "Время для изменения решения."
    },
    "status": {
      "type": "string",
      "description": "Статус заявки."
    },
    "customer_name": {
      "type": "string",
      "description": "Имя покупателя."
    },
    "sku": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "user_comment": {
      "type": "string",
      "description": "Комментарий покупателя к заявке."
    },
    "seller_comment": {
      "type": "string",
      "description": "Комментарий продавца к заявке."
    },
    "requested_price": {
      "type": "number",
      "format": "double",
      "description": "Цена по заявке."
    },
    "approved_price": {
      "type": "number",
      "format": "double",
      "description": "Одобренная цена."
    },
    "original_price": {
      "type": "number",
      "format": "double",
      "description": "Цена товара до всех скидок."
    },
    "discount": {
      "type": "number",
      "format": "double",
      "description": "Скидка в рублях."
    },
    "discount_percent": {
      "type": "number",
      "format": "double",
      "description": "Скидка в процентах."
    },
    "base_price": {
      "type": "number",
      "format": "double",
      "description": "Базовая цена, по которой товар продаётся на Ozon, если не участвует в акции."
    },
    "min_auto_price": {
      "type": "number",
      "format": "double",
      "description": "Минимальное значение цены после автоприменения скидок и акций."
    },
    "prev_task_id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор предыдущей заявки от покупателя по этому товару."
    },
    "is_damaged": {
      "type": "boolean",
      "description": "Является ли товар уценённым. `true`, если уценённый."
    },
    "moderated_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата модерации: просмотра, одобрения или отклонения заявки.\n"
    },
    "approved_discount": {
      "type": "number",
      "format": "double",
      "description": "Скидка в рублях, которую одобрил продавец. Передайте значение `0`, если продавец не одобрял заявку."
    },
    "approved_discount_percent": {
      "type": "number",
      "format": "double",
      "description": "Скидка в процентах, которую одобрил продавец. Передайте значение `0`, если продавец не одобрял заявку."
    },
    "is_purchased": {
      "type": "boolean",
      "description": "Покупал ли пользователь товар. `true`, если покупал."
    },
    "is_auto_moderated": {
      "type": "boolean",
      "description": "Была ли заявка промодерирована автоматически. `true`, если модерация была автоматической."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "email": {
      "type": "string",
      "description": "Электронный адрес сотрудника продавца, который обработал заявку."
    },
    "last_name": {
      "type": "string",
      "description": "Фамилия сотрудника продавца, который обработал заявку."
    },
    "first_name": {
      "type": "string",
      "description": "Имя сотрудника продавца, который обработал заявку."
    },
    "patronymic": {
      "type": "string",
      "description": "Отчество сотрудника продавца, который обработал заявку."
    },
    "approved_quantity_min": {
      "type": "integer",
      "format": "uint64",
      "description": "Минимальное одобренное количество товаров."
    },
    "approved_quantity_max": {
      "type": "integer",
      "format": "uint64",
      "description": "Максимальное одобренное количество товаров."
    },
    "requested_quantity_min": {
      "type": "integer",
      "format": "uint64",
      "description": "Запрошенное минимальное количество товаров."
    },
    "requested_quantity_max": {
      "type": "integer",
      "format": "uint64",
      "description": "Запрошенное максимальное количество товаров."
    },
    "requested_price_with_fee": {
      "type": "number",
      "format": "double",
      "description": "Цена по заявке c региональной наценкой."
    },
    "approved_price_with_fee": {
      "type": "number",
      "format": "double",
      "description": "Одобренная цена с региональной наценкой."
    },
    "approved_price_fee_percent": {
      "type": "number",
      "format": "double",
      "description": "Региональная наценка в процентах."
    }
  }
}
```
