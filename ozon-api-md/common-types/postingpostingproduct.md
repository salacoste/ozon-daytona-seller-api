# PostingPostingProduct

## Top-level fields
- `PostingPostingProduct` (top-level fields):
  - `currency_code`: `string`
  - `name`: `string`
  - `offer_id`: `string`
  - `price`: `string`
  - `required_qty_for_digital_code`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "currency_code": {
      "description": "Валюта ваших цен. Cовпадает с валютой, которая установлена в настройках личного кабинета.\n\nВозможные значения:\n\n- `RUB` — российский рубль,\n- `BYN` — белорусский рубль,\n- `KZT` — тенге,\n- `EUR` — евро,\n- `USD` — доллар США,\n- `CNY` — юань.\n",
      "type": "string"
    },
    "name": {
      "description": "Название товара.",
      "type": "string"
    },
    "offer_id": {
      "description": "Идентификатор товара в системе продавца — артикул.",
      "type": "string"
    },
    "price": {
      "description": "Цена товара.",
      "type": "string"
    },
    "required_qty_for_digital_code": {
      "description": "Количество кодов цифровых товаров, которое нужно передать по товару в отправлении. Передайте коды цифровых товаров с помощью метода [/v1/posting/digital/codes/upload](#operation/UploadPostingCodes).",
      "type": "integer",
      "format": "int32"
    },
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
