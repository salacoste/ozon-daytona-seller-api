# v2Order

## Top-level fields
- `v2Order` (top-level fields):
  - `can_cancel`: `boolean`
  - `creation_date`: `string`
  - `data_filling_deadline_utc`: `string`
  - `dropoff_warehouse_id`: `integer`
  - `is_econom`: `boolean`
  - `is_super_fbo`: `boolean`
  - `is_virtual`: `boolean`
  - `product_super_fbo`: `boolean`
  - `state` → `$ref` v2State
  - `supplies`: `array`
  - `supply_order_id`: `integer`
  - `supply_order_number`: `string`
  - `timeslot` → `$ref` v2OrderTimeslot
  - `vehicle` → `$ref` v2OrderVehicle

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "can_cancel": {
      "description": "`true`, если заявку можно отменить.\n",
      "type": "boolean"
    },
    "creation_date": {
      "description": "Дата создания заявки на поставку.",
      "type": "string"
    },
    "data_filling_deadline_utc": {
      "description": "Время в секундах, оставшееся на заполнение данных по поставке. Только для заявок с вРЦ.",
      "type": "string",
      "format": "date-time"
    },
    "dropoff_warehouse_id": {
      "description": "Идентификатор склада поставки.",
      "type": "integer",
      "format": "int64"
    },
    "is_econom": {
      "description": "`true`, если заявка на поставку относится к товарам «Суперэконом».\n",
      "type": "boolean"
    },
    "is_super_fbo": {
      "description": "`true`, если продавец подключен к Super-поставкам.\n",
      "type": "boolean"
    },
    "is_virtual": {
      "description": "`true`, если заявка на поставку виртуальная.\n",
      "type": "boolean"
    },
    "product_super_fbo": {
      "description": "`true`, если заявка на поставку относится к Super-товарам.\n",
      "type": "boolean"
    },
    "state": {
      "$ref": "#/components/schemas/v2State"
    },
    "supplies": {
      "description": "Состав заявки на поставку.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v2OrderSupply"
      }
    },
    "supply_order_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заявки на поставку."
    },
    "supply_order_number": {
      "type": "string",
      "description": "Номер заявки."
    },
    "timeslot": {
      "$ref": "#/components/schemas/v2OrderTimeslot"
    },
    "vehicle": {
      "$ref": "#/components/schemas/v2OrderVehicle"
    }
  }
}
```
