# seller_apiProduct

## Top-level fields
- `seller_apiProduct` (top-level fields):
  - `id`: `number`
  - `price`: `number`
  - `action_price`: `number`
  - `alert_max_action_price_failed`: `boolean`
  - `alert_max_action_price`: `number`
  - `max_action_price`: `number`
  - `add_mode`: `string`
  - `min_stock`: `number`
  - `stock`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "number",
      "format": "double",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Текущая цена товара без скидки."
    },
    "action_price": {
      "type": "number",
      "format": "double",
      "description": "Цена товара по акции."
    },
    "alert_max_action_price_failed": {
      "type": "boolean",
      "description": "`true`, если цена товара выше рекомендуемой. Товар отмечен красным и может быть исключён из акции.\n"
    },
    "alert_max_action_price": {
      "type": "number",
      "format": "double",
      "description": "Рекомендуемая цена товара по акции."
    },
    "max_action_price": {
      "type": "number",
      "format": "double",
      "description": "Максимально возможная цена товара по акции."
    },
    "add_mode": {
      "type": "string",
      "description": "Тип добавления товара в акцию: автоматически или вручную продавцом.\n"
    },
    "min_stock": {
      "type": "number",
      "format": "double",
      "description": "Минимальное число единиц товара в акции типа «Скидка на сток»."
    },
    "stock": {
      "type": "number",
      "format": "double",
      "description": "Число единиц товара в акции типа «Скидка на сток»."
    }
  }
}
```
