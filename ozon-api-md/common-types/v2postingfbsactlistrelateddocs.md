# v2PostingFBSActListRelatedDocs

Информация про акты перевозки.

## Top-level fields
- `v2PostingFBSActListRelatedDocs` (top-level fields):
  - `act_of_acceptance`: `object`
  - `act_of_mismatch`: `object`
  - `act_of_excess`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация про акты перевозки.",
  "properties": {
    "act_of_acceptance": {
      "type": "object",
      "description": "Информация про акт приёма-передачи.",
      "properties": {
        "created_at": {
          "type": "string",
          "format": "date-time",
          "description": "Дата создания акта."
        },
        "document_status": {
          "type": "string",
          "description": "Статус акта:\n  - `FORMING` — ещё не готов,\n  - `FORMED` — сформирован,\n  - `CONFIRMED` — подписан Ozon,\n  - `CONFIRMED_WITH_MISMATCH` — подписан Ozon с расхождениями,\n  - `ACCEPTED_BY_CARGO_PLACES` — принят по грузовым местам,\n  - `PRINTED_CARRIAGE` — электронная подпись не нужна,\n  - `ERROR`, `UNKNOWN_ERROR` — ошибка.\n"
        }
      }
    },
    "act_of_mismatch": {
      "type": "object",
      "description": "Информация про акт о расхождениях.",
      "properties": {
        "created_at": {
          "type": "string",
          "format": "date-time",
          "description": "Дата создания перевозки."
        },
        "document_status": {
          "type": "string",
          "description": "Статус перевозки или акта:\n  - `NEED_TO_SIGN` — требуется подпись,\n  - `ON_CONFIRMATION` — на подписании Ozon,\n  - `CONFIRMED` — подписан Ozon,\n  - `DISPUTE_OPENED` — принят по грузовым местам,\n  - `PRINTED_CARRIAGE` — электронная подпись не нужна,\n  - `UNKNOWN_ERROR` — ошибка.\n"
        }
      }
    },
    "act_of_excess": {
      "type": "object",
      "description": "Информация про акт об излишках.",
      "properties": {
        "created_at": {
          "type": "string",
          "format": "date-time",
          "description": "Дата создания акта."
        },
        "document_status": {
          "type": "string",
          "description": "Статус акта:\n  - `NEED_TO_SIGN` — требуется подпись,\n  - `CONFIRMED` — подписан Ozon,\n  - `UNKNOWN_ERROR` — ошибка.\n"
        }
      }
    }
  }
}
```
