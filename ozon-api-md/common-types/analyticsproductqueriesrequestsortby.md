# AnalyticsProductQueriesRequestSortBy

Параметр, по которому товары будут отсортированы. Возможные значения: 
- `BY_SEARCHES` — по количеству запросов;
- `BY_VIEWS` — по количеству просмотров;
- `BY_POSITION` — по средней позиции товара;
- `BY_CONVERSION` — по значению конверсии;
- `BY_GMV` — по объёму продаж по запросам.


## Full schema (JSON)
```json
{
  "type": "string",
  "description": "Параметр, по которому товары будут отсортированы. Возможные значения: \n- `BY_SEARCHES` — по количеству запросов;\n- `BY_VIEWS` — по количеству просмотров;\n- `BY_POSITION` — по средней позиции товара;\n- `BY_CONVERSION` — по значению конверсии;\n- `BY_GMV` — по объёму продаж по запросам.\n",
  "default": "BY_SEARCHES",
  "enum": [
    "BY_SEARCHES",
    "BY_VIEWS",
    "BY_POSITION",
    "BY_CONVERSION",
    "BY_GMV"
  ]
}
```
