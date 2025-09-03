# GetSellerActionsV1ResponseAction

## Top-level fields
- `GetSellerActionsV1ResponseAction` (top-level fields):
  - `id`: `number`
  - `title`: `string`
  - `action_type`: `string`
  - `description`: `string`
  - `date_start`: `string`
  - `date_end`: `string`
  - `freeze_date`: `string`
  - `potential_products_count`: `number`
  - `participating_products_count`: `number`
  - `is_participating`: `boolean`
  - `is_voucher_action`: `boolean`
  - `banned_products_count`: `number`
  - `with_targeting`: `boolean`
  - `order_amount`: `number`
  - `discount_type`: `string`
  - `discount_value`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "number",
      "format": "double",
      "description": "Идентификатор акции."
    },
    "title": {
      "type": "string",
      "description": "Название акции."
    },
    "action_type": {
      "type": "string",
      "description": "Тип акции."
    },
    "description": {
      "type": "string",
      "description": "Описание акции."
    },
    "date_start": {
      "type": "string",
      "description": "Дата начала акции."
    },
    "date_end": {
      "type": "string",
      "description": "Дата окончания акции."
    },
    "freeze_date": {
      "type": "string",
      "description": "Дата приостановки акции.\n\nЕсли поле заполнено, продавец не может повышать цены, изменять список товаров и уменьшать количество единиц товаров в акции.\n\nПродавец может понижать цены и увеличивать количество единиц товара в акции.\n"
    },
    "potential_products_count": {
      "type": "number",
      "format": "double",
      "description": "Количество товаров, доступных для акции."
    },
    "participating_products_count": {
      "type": "number",
      "format": "double",
      "description": "Количество товаров, которые участвуют в акции."
    },
    "is_participating": {
      "type": "boolean",
      "description": "Участвуете вы в этой акции или нет."
    },
    "is_voucher_action": {
      "type": "boolean",
      "description": "Признак, что для участия в акции покупателям нужен промокод."
    },
    "banned_products_count": {
      "type": "number",
      "format": "double",
      "description": "Количество заблокированных товаров."
    },
    "with_targeting": {
      "type": "boolean",
      "description": "Признак, что акция с целевой аудиторией."
    },
    "order_amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма заказа."
    },
    "discount_type": {
      "type": "string",
      "description": "Тип скидки."
    },
    "discount_value": {
      "type": "number",
      "format": "double",
      "description": "Размер скидки."
    }
  }
}
```
