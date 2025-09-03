# v1ItemSortField

Сортировка по параметрам:
- `SKU` — SKU;
- `NAME` — названию товара;
- `QUANTITY` — количеству;
- `TOTAL_VOLUME_IN_LITRES` — объёму в литрах.


## Full schema (JSON)
```json
{
  "type": "string",
  "title": "string",
  "default": "UNSPECIFIED",
  "enum": [
    "UNSPECIFIED",
    "SKU",
    "NAME",
    "QUANTITY",
    "TOTAL_VOLUME_IN_LITRES"
  ],
  "description": "Сортировка по параметрам:\n- `SKU` — SKU;\n- `NAME` — названию товара;\n- `QUANTITY` — количеству;\n- `TOTAL_VOLUME_IN_LITRES` — объёму в литрах.\n"
}
```
