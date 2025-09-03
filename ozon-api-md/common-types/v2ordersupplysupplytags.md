# v2OrderSupplySupplyTags

## Top-level fields
- `v2OrderSupplySupplyTags` (top-level fields):
  - `is_ettn_required`: `boolean`
  - `is_evsd_required`: `boolean`
  - `is_jewelry`: `boolean`
  - `is_marking_possible`: `boolean`
  - `is_marking_required`: `boolean`
  - `is_traceable`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "is_ettn_required": {
      "type": "boolean",
      "description": "Признак, что для поставки нужна электронная ТТН."
    },
    "is_evsd_required": {
      "description": "`true`, если в поставке есть товары с сертификацией в системе «Меркурий».\n",
      "type": "boolean"
    },
    "is_jewelry": {
      "type": "boolean",
      "description": "`true`, если в поставке есть ювелирные товары.\n"
    },
    "is_marking_possible": {
      "type": "boolean",
      "description": "`true`, если в поставке есть товары, для которых возможна маркировка.\n"
    },
    "is_marking_required": {
      "type": "boolean",
      "description": "`true`, если в поставке есть товары, для которых маркировка обязательна.\n"
    },
    "is_traceable": {
      "type": "boolean",
      "description": "Признак, что поставка содержит прослеживаемые товары."
    }
  }
}
```
