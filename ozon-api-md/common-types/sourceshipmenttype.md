# SourceShipmentType

Тип упаковки:
- `SHIPMENT_TYPE_UNSPECIFIED` — не указано;
- `SHIPMENT_TYPE_GENERAL` — обычный товар;
- `SHIPMENT_TYPE_BOX` — коробка;
- `SHIPMENT_TYPE_PALLET` — палета.


## Full schema (JSON)
```json
{
  "type": "string",
  "title": "string",
  "default": "SHIPMENT_TYPE_UNSPECIFIED",
  "enum": [
    "SHIPMENT_TYPE_UNSPECIFIED",
    "SHIPMENT_TYPE_GENERAL",
    "SHIPMENT_TYPE_BOX",
    "SHIPMENT_TYPE_PALLET"
  ],
  "description": "Тип упаковки:\n- `SHIPMENT_TYPE_UNSPECIFIED` — не указано;\n- `SHIPMENT_TYPE_GENERAL` — обычный товар;\n- `SHIPMENT_TYPE_BOX` — коробка;\n- `SHIPMENT_TYPE_PALLET` — палета.\n"
}
```
