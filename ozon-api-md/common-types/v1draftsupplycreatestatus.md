# v1DraftSupplyCreateStatus

Статус создания заявки на поставку:
  - `DraftSupplyCreateStatusUnknown` — неизвестный,
  - `DraftSupplyCreateStatusSuccess` — создана,
  - `DraftSupplyCreateStatusFailed` — не создана,
  - `DraftSupplyCreateStatusInProgress` — создаётся.


## Full schema (JSON)
```json
{
  "type": "string",
  "default": "DraftSupplyCreateStatusUnknown",
  "enum": [
    "DraftSupplyCreateStatusUnknown",
    "DraftSupplyCreateStatusSuccess",
    "DraftSupplyCreateStatusFailed",
    "DraftSupplyCreateStatusInProgress"
  ],
  "description": "Статус создания заявки на поставку:\n  - `DraftSupplyCreateStatusUnknown` — неизвестный,\n  - `DraftSupplyCreateStatusSuccess` — создана,\n  - `DraftSupplyCreateStatusFailed` — не создана,\n  - `DraftSupplyCreateStatusInProgress` — создаётся.\n"
}
```
