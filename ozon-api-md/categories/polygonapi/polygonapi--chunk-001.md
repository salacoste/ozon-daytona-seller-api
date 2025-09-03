# PolygonAPI

## POST /v1/polygon/bind

**Summary:** Свяжите метод доставки с полигоном доставки

**operationId:** `PolygonAPI_BindPolygon`

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
- `polygonv1Empty` — see [../common-types/polygonv1empty.md](../common-types/polygonv1empty.md)- `polygonv1PolygonBindRequest` — see [../common-types/polygonv1polygonbindrequest.md](../common-types/polygonv1polygonbindrequest.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `rpcStatus_v1PolygonBind` — see [../common-types/rpcstatus-v1polygonbind.md](../common-types/rpcstatus-v1polygonbind.md)
## POST /v1/polygon/create

**Summary:** Создайте полигон доставки

**operationId:** `PolygonAPI_CreatePolygon`

Вы можете добавить полигон к методу доставки.

Создайте полигон, получив его координаты на https://geojson.io: отметьте на карте минимум 3 точки и соедините их линиями.

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
- `polygonv1PolygonCreateRequest` — see [../common-types/polygonv1polygoncreaterequest.md](../common-types/polygonv1polygoncreaterequest.md)- `polygonv1PolygonCreateResponse` — see [../common-types/polygonv1polygoncreateresponse.md](../common-types/polygonv1polygoncreateresponse.md)- `rpcStatus` — see [../common-types/rpcstatus.md](../common-types/rpcstatus.md)- `rpcStatus_v1PolygonCreate` — see [../common-types/rpcstatus-v1polygoncreate.md](../common-types/rpcstatus-v1polygoncreate.md)
