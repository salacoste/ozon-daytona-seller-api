# DeliveryrFBS

## POST /v2/fbs/posting/sent-by-seller

**Summary:** Изменить статус на «Отправлено продавцом»

**operationId:** `PostingAPI_FbsPostingSentbyseller`

Перевести отправление в статус «Отправлено продавцом». Статус доступен только продавцам с первой милей, продающим из-за рубежа.

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

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
- `postingFbsPostingSentbysellerRequest` — see [../common-types/postingfbspostingsentbysellerrequest.md](../common-types/postingfbspostingsentbysellerrequest.md)- `postingFbsPostingSentbysellerResponse` — see [../common-types/postingfbspostingsentbysellerresponse.md](../common-types/postingfbspostingsentbysellerresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
## POST /v2/fbs/posting/tracking-number/set

**Summary:** Добавить трек-номера

**operationId:** `PostingAPI_FbsPostingTrackingNumberSet`

Добавить трек-номера к отправлениям. Вы можете передать до 20 трек-номеров за раз.

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

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
- `postingFbsPostingMoveStatusResponse` — see [../common-types/postingfbspostingmovestatusresponse.md](../common-types/postingfbspostingmovestatusresponse.md)- `postingFbsPostingTrackingNumberSetRequest` — see [../common-types/postingfbspostingtrackingnumbersetrequest.md](../common-types/postingfbspostingtrackingnumbersetrequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)
