# Questions&Answers

## POST /v1/question/answer/create

**Summary:** Создать ответ на вопрос

**operationId:** `QuestionAnswer_Create`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к обсуждению в [сообществе разработчиков Ozon for dev](https://dev.ozon.ru/community/1198-Metody-dlia-raboty-s-voprosami-otvetami).

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
- `v1QuestionAnswerCreateDefault` — see [../common-types/v1questionanswercreatedefault.md](../common-types/v1questionanswercreatedefault.md)- `v1QuestionAnswerCreateRequest` — see [../common-types/v1questionanswercreaterequest.md](../common-types/v1questionanswercreaterequest.md)- `v1QuestionAnswerCreateResponse` — see [../common-types/v1questionanswercreateresponse.md](../common-types/v1questionanswercreateresponse.md)
## POST /v1/question/answer/delete

**Summary:** Удалить ответ на вопрос

**operationId:** `QuestionAnswer_Delete`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к обсуждению в [сообществе разработчиков Ozon for dev](https://dev.ozon.ru/community/1198-Metody-dlia-raboty-s-voprosami-otvetami).

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
- `v1QuestionAnswerCreateDefault` — see [../common-types/v1questionanswercreatedefault.md](../common-types/v1questionanswercreatedefault.md)- `v1QuestionAnswerDeleteRequest` — see [../common-types/v1questionanswerdeleterequest.md](../common-types/v1questionanswerdeleterequest.md)
## POST /v1/question/answer/list

**Summary:** Список ответов на вопрос

**operationId:** `QuestionAnswer_List`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к обсуждению в [сообществе разработчиков Ozon for dev](https://dev.ozon.ru/community/1198-Metody-dlia-raboty-s-voprosami-otvetami).

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
- `v1QuestionAnswerCreateDefault` — see [../common-types/v1questionanswercreatedefault.md](../common-types/v1questionanswercreatedefault.md)- `v1QuestionAnswerListRequest` — see [../common-types/v1questionanswerlistrequest.md](../common-types/v1questionanswerlistrequest.md)- `v1QuestionAnswerListResponse` — see [../common-types/v1questionanswerlistresponse.md](../common-types/v1questionanswerlistresponse.md)
## POST /v1/question/change-status

**Summary:** Изменить статус вопросов

**operationId:** `Question_ChangeStatus`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к обсуждению в [сообществе разработчиков Ozon for dev](https://dev.ozon.ru/community/1198-Metody-dlia-raboty-s-voprosami-otvetami).

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
- `v1QuestionAnswerCreateDefault` — see [../common-types/v1questionanswercreatedefault.md](../common-types/v1questionanswercreatedefault.md)- `v1QuestionChangeStatusRequest` — see [../common-types/v1questionchangestatusrequest.md](../common-types/v1questionchangestatusrequest.md)
## POST /v1/question/count

**Summary:** Количество вопросов по статусам

**operationId:** `Question_Count`

Доступно для продавцов с подпиской [Premium Plus](https://seller-edu.ozon.ru/seller-rating/about-rating/subscription-premium-plus).

Вы можете оставить обратную связь по этому методу в комментариях к обсуждению в [сообществе разработчиков Ozon for dev](https://dev.ozon.ru/community/1198-Metody-dlia-raboty-s-voprosami-otvetami).

**Parameters (path/query/header/cookie):**
_query_:
- `` (optional)
- `` (optional)

**Request body (minimal valid example):**
_no request body_

**Success response (example):**
```json
{
  "result": "ok"
}
```

**Related schemas:**
- `v1QuestionAnswerCreateDefault` — see [../common-types/v1questionanswercreatedefault.md](../common-types/v1questionanswercreatedefault.md)- `v1QuestionCountResponse` — see [../common-types/v1questioncountresponse.md](../common-types/v1questioncountresponse.md)
