# productv4GetProductAttributesV4Request

## Top-level fields
- `productv4GetProductAttributesV4Request` (top-level fields):
  - `filter` → `$ref` productv4Filter
  - `last_id`: `string`
  - `limit`: `integer`
  - `sort_by`: `string`
  - `sort_dir`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/productv4Filter"
    },
    "last_id": {
      "type": "string",
      "description": "Идентификатор последнего значения на странице. Оставьте это поле пустым при выполнении первого запроса.\n\nЧтобы получить следующие значения, укажите `last_id` из ответа предыдущего запроса.\n"
    },
    "limit": {
      "type": "integer",
      "format": "int32",
      "minimum": 1,
      "maximum": 1000,
      "description": "Количество значений на странице."
    },
    "sort_by": {
      "type": "string",
      "description": "Параметр, по которому товары будут отсортированы:\n- `sku` — сортировка по идентификатору товара в системе Ozon;\n- `offer_id` — сортировка по артикулу товара;\n- `id` — сортировка по идентификатору товара;\n- `title` — сортировка по названию товара.\n"
    },
    "sort_dir": {
      "type": "string",
      "description": "Направление сортировки:\n- `asc` — по возрастанию,\n- `desc` — по убыванию.\n"
    }
  }
}
```
