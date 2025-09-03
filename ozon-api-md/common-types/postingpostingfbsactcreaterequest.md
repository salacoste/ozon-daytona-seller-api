# postingPostingFBSActCreateRequest

## Top-level fields
- `postingPostingFBSActCreateRequest` (top-level fields):
  - `containers_count`: `integer`
  - `delivery_method_id`: `integer`
  - `departure_date`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "delivery_method_id"
  ],
  "properties": {
    "containers_count": {
      "format": "int32",
      "type": "integer",
      "description": "Количество грузовых мест. \n\nИспользуйте параметр, если вы подключены к доверительной приёмке и отгружаете заказы грузовыми местами. Если вы не подключены к доверительной приёмке, пропустите его.\n\n[Подробнее в Базе знаний продавца](https://docs.ozon.ru/partners/prodayoa-so-svoego-sklada-fbs/doveritel-naya-priemka-gruzovogo-mesta)\n"
    },
    "delivery_method_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор метода доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList)."
    },
    "departure_date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата отгрузки."
    }
  },
  "type": "object",
  "title": "object"
}
```
