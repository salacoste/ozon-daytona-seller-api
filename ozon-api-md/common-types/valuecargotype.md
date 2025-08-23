# ValueCargoType

Тип грузоместа: 
   - `BOX` — коробка.
   - `PALLET` — палета.


## Full schema (JSON)
```json
{
  "required": [
    "type"
  ],
  "type": "string",
  "description": "Тип грузоместа: \n   - `BOX` — коробка.\n   - `PALLET` — палета.\n",
  "default": "BOX",
  "enum": [
    "BOX",
    "PALLET"
  ]
}
```
