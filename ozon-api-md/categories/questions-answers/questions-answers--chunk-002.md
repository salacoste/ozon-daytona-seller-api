# Questions&Answers

## POST /v1/question/info

**Summary:** Информацию по вопросу

**operationId:** `Question_Info`

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
- `v1QuestionAnswerCreateDefault` — see [../common-types/v1questionanswercreatedefault.md](../common-types/v1questionanswercreatedefault.md)- `v1QuestionInfoRequest` — see [../common-types/v1questioninforequest.md](../common-types/v1questioninforequest.md)- `v1QuestionInfoResponse` — see [../common-types/v1questioninforesponse.md](../common-types/v1questioninforesponse.md)
## POST /v1/question/list

**Summary:** Список вопросов

**operationId:** `Question_List`

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
- `v1QuestionAnswerCreateDefault` — see [../common-types/v1questionanswercreatedefault.md](../common-types/v1questionanswercreatedefault.md)- `v1QuestionListRequest` — see [../common-types/v1questionlistrequest.md](../common-types/v1questionlistrequest.md)- `v1QuestionListResponse` — see [../common-types/v1questionlistresponse.md](../common-types/v1questionlistresponse.md)
## POST /v1/question/top-sku

**Summary:** Товары с наибольшим количеством вопросов

**operationId:** `Question_TopSku`

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
- `v1QuestionAnswerCreateDefault` — see [../common-types/v1questionanswercreatedefault.md](../common-types/v1questionanswercreatedefault.md)- `v1QuestionTopSkuRequest` — see [../common-types/v1questiontopskurequest.md](../common-types/v1questiontopskurequest.md)- `v1QuestionTopSkuResponse` — see [../common-types/v1questiontopskuresponse.md](../common-types/v1questiontopskuresponse.md)
