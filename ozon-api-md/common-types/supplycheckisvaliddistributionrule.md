# SupplyCheckIsValidDistributionRule

Правило совпадения составов грузомест с составом поставки.

## Top-level fields
- `SupplyCheckIsValidDistributionRule` (top-level fields):
  - `count_distributed_sku`: `integer`
  - `count_sku_total`: `integer`
  - `is_applicable`: `boolean`
  - `percents_int`: `integer`
  - `satisfied`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Правило совпадения составов грузомест с составом поставки.",
  "properties": {
    "count_distributed_sku": {
      "type": "integer",
      "format": "int32",
      "description": "Количество SKU, которые совпадают с поставкой."
    },
    "count_sku_total": {
      "type": "integer",
      "format": "int32",
      "description": "Общее количество SKU."
    },
    "is_applicable": {
      "type": "boolean",
      "description": "`true`, если правило применимо к текущей поставке.\n"
    },
    "percents_int": {
      "type": "integer",
      "format": "int32",
      "description": "Процент совпадения состава грузомест с составом поставки."
    },
    "satisfied": {
      "type": "boolean",
      "description": "`true`, если состав грузомест совпадает с составом поставки.\n"
    }
  }
}
```
