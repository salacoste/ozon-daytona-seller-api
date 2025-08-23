# v1GetAttributesResponseAttribute

## Top-level fields
- `v1GetAttributesResponseAttribute` (top-level fields):
  - `category_dependent`: `boolean`
  - `description`: `string`
  - `dictionary_id`: `integer`
  - `group_id`: `integer`
  - `group_name`: `string`
  - `id`: `integer`
  - `is_aspect`: `boolean`
  - `is_collection`: `boolean`
  - `is_required`: `boolean`
  - `name`: `string`
  - `type`: `string`
  - `attribute_complex_id`: `integer`
  - `max_value_count`: `integer`
  - `complex_is_collection`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "category_dependent": {
      "type": "boolean",
      "description": "Признак, что значения словарного атрибута зависят от категории:\n- `true` — у атрибута разные значения для каждой категории.\n- `false` — у атрибута одинаковые значения для всех категорий.\n"
    },
    "description": {
      "type": "string",
      "description": "Описание характеристики."
    },
    "dictionary_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор справочника."
    },
    "group_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор группы характеристик."
    },
    "group_name": {
      "type": "string",
      "description": "Название группы характеристик."
    },
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор характеристики."
    },
    "is_aspect": {
      "type": "boolean",
      "description": "Признак аспектного атрибута. Аспектный атрибут — характеристика, по которой отличаются товары одной модели. \n\nНапример, у одежды и обуви одной модели могут быть разные расцветки и размеры. То есть цвет и размер — это аспектные атрибуты.\n\nЗначения поля:\n  - `true` — атрибут аспектный и его нельзя изменить после поставки товара на склад или продажи со своего склада.\n  - `false` — атрибут не аспектный, можно изменить в любое время.\n"
    },
    "is_collection": {
      "type": "boolean",
      "description": "- `true`, если характеристика — набор значений.\n- `false`, если характеристика — одно значение.\n"
    },
    "is_required": {
      "type": "boolean",
      "description": "Признак обязательной характеристики:\n  - `true` — обязательная характеристика,\n  - `false` — характеристику можно не указывать.\n"
    },
    "name": {
      "type": "string",
      "description": "Название."
    },
    "type": {
      "type": "string",
      "description": "Тип характеристики."
    },
    "attribute_complex_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор комплексного атрибута."
    },
    "max_value_count": {
      "format": "int64",
      "type": "integer",
      "description": "Максимальное количество значений для атрибута."
    },
    "complex_is_collection": {
      "type": "boolean",
      "description": "Признак, что комплексная характеристика — набор значений:\n- `true`, если комплексная характеристика — набор значений,\n- `false`, если комплексная характеристика — одно значение.\n"
    }
  }
}
```
