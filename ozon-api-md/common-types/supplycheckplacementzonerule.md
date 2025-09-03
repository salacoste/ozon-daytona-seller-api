# SupplyCheckPlacementZoneRule

Правило распределения товаров в грузоместах по зонам размещения.

## Top-level fields
- `SupplyCheckPlacementZoneRule` (top-level fields):
  - `count_cargoes_all`: `integer`
  - `count_cargoes_with_mono_placement_zone`: `integer`
  - `is_applicable`: `boolean`
  - `satisfied`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Правило распределения товаров в грузоместах по зонам размещения.",
  "properties": {
    "count_cargoes_all": {
      "type": "integer",
      "format": "int32",
      "description": "Количество грузомест."
    },
    "count_cargoes_with_mono_placement_zone": {
      "type": "integer",
      "format": "int32",
      "description": "Количество грузомест с распределением по зонам размещения."
    },
    "is_applicable": {
      "type": "boolean",
      "description": "`true`, если правило применимо к текущей поставке.\n"
    },
    "satisfied": {
      "type": "boolean",
      "description": "`true`, если товары во всех грузоместах распределены по зонам размещения.\n"
    }
  }
}
```
