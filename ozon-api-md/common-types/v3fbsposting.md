# v3FbsPosting

## Top-level fields
- `v3FbsPosting` (top-level fields):
  - `addressee` → `$ref` v3AddresseeFbsLists
  - `analytics_data` → `$ref` v3FbsPostingAnalyticsData
  - `available_actions`: `object`
  - `barcodes` → `$ref` v3Barcodes
  - `cancellation` → `$ref` v3Cancellation
  - `customer` → `$ref` v3CustomerFbsLists
  - `delivering_date`: `string`
  - `delivery_method` → `$ref` v3DeliveryMethod
  - `financial_data` → `$ref` v3PostingFinancialData
  - `in_process_at`: `string`
  - `is_express`: `boolean`
  - `is_multibox`: `boolean`
  - `legal_info` → `$ref` v2FboSinglePostingLegalInfo
  - `multi_box_qty`: `integer`
  - `optional` → `$ref` v3FbsPostingDetailOptional
  - `order_id`: `integer`
  - `order_number`: `string`
  - `parent_posting_number`: `string`
  - `pickup_code_verified_at`: `string`
  - `posting_number`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "addressee": {
      "$ref": "#/components/schemas/v3AddresseeFbsLists"
    },
    "analytics_data": {
      "$ref": "#/components/schemas/v3FbsPostingAnalyticsData"
    },
    "available_actions": {
      "items": {
        "type": "string"
      },
      "description": "Доступные действия и информация об отправлении:\n- `arbitration` — открыть спор;\n- `awaiting_delivery` — перевести в статус «Ожидает отгрузки»;\n- `can_create_chat` — начать чат с покупателем;\n- `cancel` — отменить отправление;\n- `click_track_number` — просмотреть по трек-номеру историю изменения статусов в личном кабинете;\n- `customer_phone_available` — телефон покупателя;\n- `has_weight_products` — весовые товары в отправлении;\n- `hide_region_and_city` — скрыть регион и город покупателя в отчёте;\n- `invoice_get` —  получить информацию из счёта-фактуры;\n- `invoice_send` — создать счёт-фактуру;\n- `invoice_update` — отредактировать счёт-фактуру;\n- `label_download_big` — скачать большую этикетку;\n- `label_download_small` — скачать маленькую этикетку;\n- `label_download` — скачать этикетку;\n- `non_int_delivered` — перевести в статус «Условно доставлен»;\n- `non_int_delivering` — перевести в статус «Доставляется»;\n- `non_int_last_mile` — перевести в статус «Курьер в пути»;\n- `product_cancel` — отменить часть товаров в отправлении;\n- `set_cutoff` — необходимо указать дату отгрузки, воспользуйтесь методом [/v1/posting/cutoff/set](#operation/PostingAPI_SetPostingCutoff);\n- `set_timeslot` — изменить время доставки покупателю;\n- `set_track_number` — указать или изменить трек-номер;\n- `ship_async_in_process` — отправление собирается;\n- `ship_async_retry` — собрать отправление повторно после ошибки сборки;\n- `ship_async` — собрать отправление;\n- `ship_with_additional_info` — необходимо заполнить дополнительную информацию;\n- `ship` — собрать отправление;\n- `update_cis` — изменить дополнительную информацию.\n"
    },
    "barcodes": {
      "$ref": "#/components/schemas/v3Barcodes"
    },
    "cancellation": {
      "$ref": "#/components/schemas/v3Cancellation"
    },
    "customer": {
      "$ref": "#/components/schemas/v3CustomerFbsLists"
    },
    "delivering_date": {
      "format": "date-time",
      "type": "string",
      "description": "Дата передачи отправления в доставку."
    },
    "delivery_method": {
      "$ref": "#/components/schemas/v3DeliveryMethod"
    },
    "financial_data": {
      "$ref": "#/components/schemas/v3PostingFinancialData"
    },
    "in_process_at": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время начала обработки отправления."
    },
    "is_express": {
      "type": "boolean",
      "description": "Если использовалась быстрая доставка Ozon Express — `true`."
    },
    "is_multibox": {
      "type": "boolean",
      "description": "Признак, что в отправлении есть многокоробочный товар и нужно передать количество коробок для него:\n\n- `true` — до сборки передайте количество коробок через метод [/v3/posting/multiboxqty/set](#operation/PostingAPI_PostingMultiBoxQtySetV3).\n- `false` — отправление собрано с указанием количества коробок в параметре `multi_box_qty` или в отправлении нет многокоробочного товара.\n"
    },
    "legal_info": {
      "$ref": "#/components/schemas/v2FboSinglePostingLegalInfo"
    },
    "multi_box_qty": {
      "type": "integer",
      "format": "int32",
      "description": "Количество коробок, в которые упакован товар."
    },
    "optional": {
      "$ref": "#/components/schemas/v3FbsPostingDetailOptional"
    },
    "order_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор заказа, к которому относится отправление."
    },
    "order_number": {
      "type": "string",
      "description": "Номер заказа, к которому относится отправление."
    },
    "parent_posting_number": {
      "type": "string",
      "description": "Номер родительского отправления, в результате разделения которого появилось текущее."
    },
    "pickup_code_verified_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата и время успешной валидации кода курьера. Чтобы проверить код курьера, воспользуйтесь методом [/v1/posting/fbs/pick-up-code/verify](#operation/PostingAPI_PostingFBSPickupCodeVerify)."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "products": {
      "items": {
        "$ref": "#/components/schemas/v3FbsPostingProduct"
      },
      "type": "array",
      "description": "Список товаров в отправлении."
    },
    "prr_option": {
      "type": "string",
      "description": "Код услуги погрузочно-разгрузочных работ:\n- `lift` — подъём на лифте.\n- `stairs` — подъём по лестнице.\n- `none` — покупатель отказался от услуги, поднимать товары не нужно.\n- `delivery_default` — доставка включена в стоимость, по условиям оферты нужно доставить товар на этаж.\n\nПараметр актуален для КГТ-отправлений с доставкой силами продавца или интегрированной службой.\n"
    },
    "quantum_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор эконом-товара."
    },
    "requirements": {
      "$ref": "#/components/schemas/v3FbsPostingRequirementsV3"
    },
    "shipment_date": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время, до которой необходимо собрать отправление. Показываем рекомендованное время отгрузки. По истечении этого времени начнёт применяться новый тариф, информацию о нём уточняйте в поле `tariffication`."
    },
    "status": {
      "type": "string",
      "description": "Статус отправления:\n- `acceptance_in_progress` — идёт приёмка,\n- `arbitration` — арбитраж,\n- `awaiting_approve` — ожидает подтверждения,\n- `awaiting_deliver` — ожидает отгрузки,\n- `awaiting_packaging` — ожидает упаковки,\n- `awaiting_registration` — ожидает регистрации,\n- `awaiting_verification` — создано,\n- `cancelled` — отменено,\n- `cancelled_from_split_pending` — отменён из-за разделения отправления,\n- `client_arbitration` — клиентский арбитраж доставки,\n- `delivering` — доставляется,\n- `driver_pickup` — у водителя,\n- `not_accepted` — не принят на сортировочном центре,\n- `sent_by_seller` — отправлено продавцом.\n"
    },
    "substatus": {
      "type": "string",
      "description": "Подстатус отправления:\n- `posting_acceptance_in_progress`— идёт приёмка,\n- `posting_in_arbitration` — арбитраж,\n- `posting_created` — создано,\n- `posting_in_carriage` — в перевозке,\n- `posting_not_in_carriage` — не добавлено в перевозку,\n- `posting_registered` — зарегистрировано,\n- `posting_transferring_to_delivery` (`status=awaiting_deliver`) — передаётся в доставку,\n- `posting_awaiting_passport_data` — ожидает паспортных данных, \n- `posting_created` — создано,\n- `posting_awaiting_registration` — ожидает регистрации,\n- `posting_registration_error` — ошибка регистрации,\n- `posting_transferring_to_delivery` (`status=awaiting_registration`) — передаётся курьеру,\n- `posting_split_pending` — создано,\n- `posting_canceled` — отменено,\n- `posting_in_client_arbitration` — клиентский арбитраж доставки,\n- `posting_delivered` — доставлено,\n- `posting_received` — получено,\n- `posting_conditionally_delivered` — условно доставлено,\n- `posting_in_courier_service` — курьер в пути,\n- `posting_in_pickup_point` — в пункте выдачи,\n- `posting_on_way_to_city` — в пути в ваш город,\n- `posting_on_way_to_pickup_point` — в пути в пункт выдачи,\n- `posting_returned_to_warehouse` — возвращено на склад,\n- `posting_transferred_to_courier_service` — передаётся в службу доставки,\n- `posting_driver_pick_up` — у водителя,\n- `posting_not_in_sort_center` — не принято на сортировочном центре,\n- `sent_by_seller` — отправлено продавцом.\n"
    },
    "tpl_integration_type": {
      "type": "string",
      "description": "Тип интеграции со службой доставки:\n  - `ozon` — доставка службой Ozon.\n  - `3pl_tracking` — доставка интегрированной службой.\n  - `non_integrated` — доставка сторонней службой.\n  - `aggregator` — доставка через партнёрскую доставку Ozon.\n  - `hybryd` — схема доставки Почты России.\n"
    },
    "tracking_number": {
      "type": "string",
      "description": "Трек-номер отправления."
    },
    "tariffication": {
      "items": {
        "$ref": "#/components/schemas/v3FbsTariffication"
      },
      "type": "array",
      "description": "Информация по тарификации отгрузки."
    }
  },
  "type": "object",
  "title": "object"
}
```
