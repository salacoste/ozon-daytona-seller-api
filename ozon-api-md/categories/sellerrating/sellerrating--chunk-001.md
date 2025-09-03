# SellerRating

## POST /v1/rating/history

**Summary:** Получить информацию о рейтингах продавца за период

**operationId:** `RatingAPI_RatingHistoryV1`

Информация о рейтингах за заданный период и с фильтром по нужному рейтингу.
Соответствует разделу **Рейтинги → Рейтинги продавца** в личном кабинете.

**Parameters (path/query/header/cookie):**
- none

**Request body (minimal valid example):**
```json
{
  "note": "no example"
}
```

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1RatingHistoryV1Request` — see [../common-types/v1ratinghistoryv1request.md](../common-types/v1ratinghistoryv1request.md)- `v1RatingHistoryV1Response` — see [../common-types/v1ratinghistoryv1response.md](../common-types/v1ratinghistoryv1response.md)
## POST /v1/rating/summary

**Summary:** Получить информацию о текущих рейтингах продавца

**operationId:** `RatingAPI_RatingSummaryV1`

Рейтинг продавца по следующим показателям: индекс цен, доставки вовремя, процент отмен, жалобы и другие.
Соответствует разделу **Рейтинги → Рейтинги продавца** в личном кабинете.

**Parameters (path/query/header/cookie):**
- none

**Request body (minimal valid example):**
```json
{
  "note": "no example"
}
```

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1Empty` — see [../common-types/v1empty.md](../common-types/v1empty.md)- `v1RatingSummaryV1Response` — see [../common-types/v1ratingsummaryv1response.md](../common-types/v1ratingsummaryv1response.md)
