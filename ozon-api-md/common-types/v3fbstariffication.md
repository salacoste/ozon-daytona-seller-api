# v3FbsTariffication

## Full schema (JSON)
```json
{
  "properties": {
    "current_tariff_rate": {
      "type": "number",
      "format": "double",
      "description": "Текущий процент тарификации."
    },
    "current_tariff_type": {
      "type": "string",
      "description": "Текущий тип тарификации — скидка или надбавка."
    },
    "current_tariff_charge": {
      "type": "string",
      "description": "Текущая сумма скидки или надбавки."
    },
    "current_tariff_charge_currency_code": {
      "type": "string",
      "description": "Валюта суммы."
    },
    "next_tariff_rate": {
      "type": "number",
      "format": "double",
      "description": "Процент, по которому будет тарифицироваться отправление через указанное в параметре `next_tariff_starts_at` время."
    },
    "next_tariff_type": {
      "type": "string",
      "description": "Тип тарифа, по которому будет тарифицироваться отправление через указанное в параметре `next_tariff_starts_at` время — скидка или надбавка."
    },
    "next_tariff_charge": {
      "type": "string",
      "description": "Сумма скидки или надбавки на следующем шаге тарификации."
    },
    "next_tariff_starts_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата и время, когда начнёт применяться новый тариф.\n\nФормат: `YYYY-MM-DDThh:mm:ss.mcsZ`. \n\nПример: `2023-11-13T08:05:57.657Z`.\n"
    },
    "next_tariff_charge_currency_code": {
      "type": "string",
      "description": "Валюта нового тарифа."
    }
  }
}
```
