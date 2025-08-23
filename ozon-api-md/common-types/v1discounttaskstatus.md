# v1DiscountTaskStatus

Статус заявки на скидку:
- `NEW` — новая,
- `SEEN` — просмотренная,
- `APPROVED` — одобренная,
- `PARTLY_APPROVED` — одобренная частично,
- `DECLINED` — отклонённая,
- `AUTO_DECLINED` — отклонена автоматически,
- `DECLINED_BY_USER` — отклонена покупателем,
- `COUPON` — скидка по купону,
- `PURCHASED` — купленная.


## Full schema (JSON)
```json
{
  "type": "string",
  "default": "UNKNOWN",
  "enum": [
    "NEW",
    "SEEN",
    "APPROVED",
    "PARTLY_APPROVED",
    "DECLINED",
    "AUTO_DECLINED",
    "DECLINED_BY_USER",
    "COUPON",
    "PURCHASED"
  ],
  "description": "Статус заявки на скидку:\n- `NEW` — новая,\n- `SEEN` — просмотренная,\n- `APPROVED` — одобренная,\n- `PARTLY_APPROVED` — одобренная частично,\n- `DECLINED` — отклонённая,\n- `AUTO_DECLINED` — отклонена автоматически,\n- `DECLINED_BY_USER` — отклонена покупателем,\n- `COUPON` — скидка по купону,\n- `PURCHASED` — купленная.\n"
}
```
