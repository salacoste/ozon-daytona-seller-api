# SupplyCheckPackageUnitWithDistributionRule

Правило заполнения состава грузомест.

## Top-level fields
- `SupplyCheckPackageUnitWithDistributionRule` (top-level fields):
  - `count_all`: `integer`
  - `count_with_distribution`: `integer`
  - `is_applicable`: `boolean`
  - `is_required`: `boolean`
  - `satisfied`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Правило заполнения состава грузомест.",
  "properties": {
    "count_all": {
      "type": "integer",
      "format": "int32",
      "description": "Общее количество грузомест."
    },
    "count_with_distribution": {
      "type": "integer",
      "format": "int32",
      "description": "Количество заполненных грузомест."
    },
    "is_applicable": {
      "type": "boolean",
      "description": "`true`, если правило применимо к текущей поставке.\n"
    },
    "is_required": {
      "type": "boolean",
      "description": "`true`, если правило обязательно для текущей поставки.\n"
    },
    "satisfied": {
      "type": "boolean",
      "description": "`true`, если указаны составы для всех грузомест.\n"
    }
  }
}
```
