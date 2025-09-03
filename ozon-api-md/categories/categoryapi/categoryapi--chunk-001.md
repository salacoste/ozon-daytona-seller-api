# CategoryAPI

## POST /v1/description-category/attribute

**Summary:** Список характеристик категории

**operationId:** `DescriptionCategoryAPI_GetAttributes`

Получение характеристик для указанных категории и типа товара.

Если у `dictionary_id` значение `0`, у атрибута нет вложенных справочников.
Если значение другое, то справочники есть. Запросите их методом [/v1/description-category/attribute/values](#operation/DescriptionCategoryAPI_GetAttributeValues).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetAttributesRequest` — see [../common-types/v1getattributesrequest.md](../common-types/v1getattributesrequest.md)- `v1GetAttributesResponse` — see [../common-types/v1getattributesresponse.md](../common-types/v1getattributesresponse.md)
## POST /v1/description-category/attribute/values

**Summary:** Справочник значений характеристики

**operationId:** `DescriptionCategoryAPI_GetAttributeValues`

Возвращает справочник значений характеристики.

Узнать, есть ли вложенный справочник, можно через метод [/v1/description-category/attribute](#operation/DescriptionCategoryAPI_GetAttributes).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetAttributeValuesRequest` — see [../common-types/v1getattributevaluesrequest.md](../common-types/v1getattributevaluesrequest.md)- `v1GetAttributeValuesResponse` — see [../common-types/v1getattributevaluesresponse.md](../common-types/v1getattributevaluesresponse.md)
## POST /v1/description-category/attribute/values/search

**Summary:** Поиск по справочным значениям характеристики

**operationId:** `DescriptionCategoryAPI_SearchAttributeValues`

Возвращает справочные значения характеристики по заданному значению `value` в запросе.

Узнать, есть ли вложенный справочник, можно через метод [/v1/description-category/attribute](#operation/DescriptionCategoryAPI_GetAttributes).

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1SearchAttributeValuesRequest` — see [../common-types/v1searchattributevaluesrequest.md](../common-types/v1searchattributevaluesrequest.md)- `v1SearchAttributeValuesResponse` — see [../common-types/v1searchattributevaluesresponse.md](../common-types/v1searchattributevaluesresponse.md)
## POST /v1/description-category/tree

**Summary:** Дерево категорий и типов товаров

**operationId:** `DescriptionCategoryAPI_GetTree`

Возвращает категории и типы для товаров в виде дерева.

Создание товаров доступно только в категориях последнего уровня, сравните именно их с категориями на своей площадке.
Категории не создаются по запросу пользователя.

&lt;aside class="warning"&gt;
  Внимательно выбирайте категорию для товара: для разных категорий применяется разный размер комиссии.
&lt;/aside&gt;

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
- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `v1GetTreeRequest` — see [../common-types/v1gettreerequest.md](../common-types/v1gettreerequest.md)- `v1GetTreeResponse` — see [../common-types/v1gettreeresponse.md](../common-types/v1gettreeresponse.md)
