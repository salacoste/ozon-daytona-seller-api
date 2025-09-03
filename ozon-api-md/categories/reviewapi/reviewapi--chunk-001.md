# ReviewAPI

## POST /v1/review/change-status

**Summary:** Изменить статус отзывов

**operationId:** `ReviewAPI_ReviewChangeStatus`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1190-Metody-dlia-raboty-s-otzyvami) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ReviewChangeStatusRequest` — see [../common-types/v1reviewchangestatusrequest.md](../common-types/v1reviewchangestatusrequest.md)
## POST /v1/review/comment/create

**Summary:** Оставить комментарий на отзыв

**operationId:** `ReviewAPI_CommentCreate`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1190-Metody-dlia-raboty-s-otzyvami) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CommentCreateRequest` — see [../common-types/v1commentcreaterequest.md](../common-types/v1commentcreaterequest.md)- `v1CommentCreateResponse` — see [../common-types/v1commentcreateresponse.md](../common-types/v1commentcreateresponse.md)
## POST /v1/review/comment/delete

**Summary:** Удалить комментарий на отзыв

**operationId:** `ReviewAPI_CommentDelete`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1190-Metody-dlia-raboty-s-otzyvami) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CommentDeleteRequest` — see [../common-types/v1commentdeleterequest.md](../common-types/v1commentdeleterequest.md)
## POST /v1/review/comment/list

**Summary:** Список комментариев на отзыв

**operationId:** `ReviewAPI_CommentList`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1190-Metody-dlia-raboty-s-otzyvami) в сообществе разработчиков Ozon for dev.

Метод возвращает информацию по комментариям на отзывы, которые прошли модерацию.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1CommentListRequest` — see [../common-types/v1commentlistrequest.md](../common-types/v1commentlistrequest.md)- `v1CommentListResponse` — see [../common-types/v1commentlistresponse.md](../common-types/v1commentlistresponse.md)
## POST /v1/review/count

**Summary:** Количество отзывов по статусам

**operationId:** `ReviewAPI_ReviewCount`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1190-Metody-dlia-raboty-s-otzyvami) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ReviewCountResponse` — see [../common-types/v1reviewcountresponse.md](../common-types/v1reviewcountresponse.md)
## POST /v1/review/info

**Summary:** Получить информацию об отзыве

**operationId:** `ReviewAPI_ReviewInfo`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к [обсуждению](https://dev.ozon.ru/community/1190-Metody-dlia-raboty-s-otzyvami) в сообществе разработчиков Ozon for dev.

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1ReviewInfoRequest` — see [../common-types/v1reviewinforequest.md](../common-types/v1reviewinforequest.md)- `v1ReviewInfoResponse` — see [../common-types/v1reviewinforesponse.md](../common-types/v1reviewinforesponse.md)
