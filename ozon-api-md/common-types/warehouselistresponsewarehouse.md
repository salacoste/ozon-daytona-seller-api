# WarehouseListResponseWarehouse

## Top-level fields
- `WarehouseListResponseWarehouse` (top-level fields):
  - `has_entrusted_acceptance`: `boolean`
  - `is_rfbs`: `boolean`
  - `name`: `string`
  - `warehouse_id`: `integer`
  - `can_print_act_in_advance`: `boolean`
  - `first_mile_type` → `$ref` WarehouseFirstMileType
  - `has_postings_limit`: `boolean`
  - `is_karantin`: `boolean`
  - `is_kgt`: `boolean`
  - `is_economy`: `boolean`
  - `is_timetable_editable`: `boolean`
  - `min_postings_limit`: `integer`
  - `postings_limit`: `integer`
  - `min_working_days`: `integer`
  - `status`: `string`
  - `working_days`: `object`

## Full schema (JSON)
```json
{
  "properties": {
    "has_entrusted_acceptance": {
      "type": "boolean",
      "description": "Признак доверительной приёмки. `true`, если доверительная приёмка включена на складе."
    },
    "is_rfbs": {
      "type": "boolean",
      "description": "Признак работы склада по схеме rFBS:\n- `true` — склад работает по схеме rFBS;\n- `false` — не работает по схеме rFBS.\n"
    },
    "name": {
      "type": "string",
      "description": "Название склада."
    },
    "warehouse_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор склада."
    },
    "can_print_act_in_advance": {
      "type": "boolean",
      "description": "Возможность печати акта приёма-передачи заранее. `true`, если печатать заранее возможно."
    },
    "first_mile_type": {
      "$ref": "#/components/schemas/WarehouseFirstMileType"
    },
    "has_postings_limit": {
      "type": "boolean",
      "description": "Признак наличия лимита минимального количества заказов. `true`, если лимит есть."
    },
    "is_karantin": {
      "type": "boolean",
      "description": "Признак, что склад не работает из-за карантина."
    },
    "is_kgt": {
      "type": "boolean",
      "description": "Признак, что склад принимает крупногабаритные товары."
    },
    "is_economy": {
      "type": "boolean",
      "description": "`true`, если склад работает с эконом-товарами.\n"
    },
    "is_timetable_editable": {
      "type": "boolean",
      "description": "Признак, что можно менять расписание работы складов."
    },
    "min_postings_limit": {
      "type": "integer",
      "format": "int32",
      "description": "Минимальное значение лимита — количество заказов, которые можно привезти в одной поставке."
    },
    "postings_limit": {
      "type": "integer",
      "format": "int32",
      "description": "Значение лимита. `-1`, если лимита нет."
    },
    "min_working_days": {
      "type": "integer",
      "format": "int64",
      "description": "Количество рабочих дней склада."
    },
    "status": {
      "type": "string",
      "description": "Статус склада.\n\nСоответствие статусов склада со статусами с личном кабинете:\n\n| Статус Seller&nbsp;API | Статус в личном кабинете |\n|---|---|\n| `new` | Активируется |\n| `created` | Активный |\n| `disabled` | В архиве |\n| `blocked` | Заблокирован |\n| `disabled_due_to_limit` | На паузе |\n| `error` | Ошибка |\n"
    },
    "working_days": {
      "description": "Рабочие дни склада.",
      "items": {
        "type": "string",
        "enum": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7"
        ]
      }
    }
  },
  "type": "object",
  "title": "object"
}
```
