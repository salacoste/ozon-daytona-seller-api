# AverageDeliveryTimeSummaryResponseTariffStatus

Статус тарифа FBO:
 - `TariffStatus_Unspecified` — неизвестное значение;
 - `GOOD` — быстро;
 - `MEDIUM` — средне;
 - `BAD` — долго.


## Full schema (JSON)
```json
{
  "type": "string",
  "description": "Статус тарифа FBO:\n - `TariffStatus_Unspecified` — неизвестное значение;\n - `GOOD` — быстро;\n - `MEDIUM` — средне;\n - `BAD` — долго.\n",
  "default": "TariffStatus_Unspecified",
  "enum": [
    "TariffStatus_Unspecified",
    "GOOD",
    "MEDIUM",
    "BAD"
  ]
}
```
