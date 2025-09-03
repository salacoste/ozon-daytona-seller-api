# GetReturnsListRequestFilter

Фильтры. Используйте только один фильтр в запросе: `logistic_return_date`, `storage_tariffication_start_date` или `visual_status_change_moment`, иначе вернётся ошибка.


## Top-level fields
- `GetReturnsListRequestFilter` (top-level fields):
  - `logistic_return_date` → `$ref` v1TimeRange_return_date
  - `storage_tariffication_start_date` → `$ref` v1TimeRange_storage_tariffication
  - `visual_status_change_moment` → `$ref` v1TimeRange_visual_status
  - `order_id`: `integer`
  - `posting_numbers`: `array`
  - `product_name`: `string`
  - `offer_id`: `string`
  - `visual_status_name`: `string`
  - `warehouse_id`: `integer`
  - `barcode`: `string`
  - `return_schema`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтры. Используйте только один фильтр в запросе: `logistic_return_date`, `storage_tariffication_start_date` или `visual_status_change_moment`, иначе вернётся ошибка.\n",
  "properties": {
    "logistic_return_date": {
      "$ref": "#/components/schemas/v1TimeRange_return_date"
    },
    "storage_tariffication_start_date": {
      "$ref": "#/components/schemas/v1TimeRange_storage_tariffication"
    },
    "visual_status_change_moment": {
      "$ref": "#/components/schemas/v1TimeRange_visual_status"
    },
    "order_id": {
      "type": "integer",
      "description": "Фильтр по идентификатору заказа.",
      "format": "int64"
    },
    "posting_numbers": {
      "type": "array",
      "description": "Фильтр по номеру отправления. Передавайте не больше 50 постингов.",
      "items": {
        "type": "string"
      }
    },
    "product_name": {
      "type": "string",
      "description": "Фильтр по названию товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Фильтр по артикулу товара."
    },
    "visual_status_name": {
      "type": "string",
      "description": "Фильтр по статусу возврата:\n- `DisputeOpened` — открыт спор с покупателем;\n- `OnSellerApproval` — на согласовании у продавца;\n- `ArrivedAtReturnPlace` — в пункте выдачи;\n- `OnSellerClarification` — на уточнении у продавца;\n- `OnSellerClarificationAfterPartialCompensation` — на уточнении у продавца после частичной компенсации;\n- `OfferedPartialCompensation` — предложена частичная компенсация;\n- `ReturnMoneyApproved` — одобрен возврат денег;\n- `PartialCompensationReturned` — вернули часть денег;\n- `CancelledDisputeNotOpen` — возврат отклонён, спор не открыт;\n- `Rejected` — заявка отклонена;\n- `CrmRejected` — заявка отклонена Ozon;\n- `Cancelled` — заявка отменена;\n- `Approved` — заявка одобрена продавцом;\n- `ApprovedByOzon` — заявка одобрена Ozon;\n- `ReceivedBySeller` — продавец получил возврат;\n- `MovingToSeller` — возврат на пути к продавцу;\n- `ReturnCompensated` — продавец получил компенсацию;\n- `ReturningToSellerByCourier` — курьер везёт возврат продавцу;\n- `Utilizing` — на утилизации;\n- `Utilized` — утилизирован;\n- `MoneyReturned` — покупателю вернули всю сумму;\n- `PartialCompensationInProcess` — одобрен частичный возврат денег;\n- `DisputeYouOpened` — продавец открыл спор;\n- `CompensationRejected` — отказано в компенсации;\n- `DisputeOpening` — обращение в поддержку отправлено;\n- `CompensationOffered` — ожидает вашего решения по компенсации;\n- `WaitingCompensation` — ожидает компенсации;\n- `SendingError` — ошибка при отправке обращения в поддержку;\n- `CompensationRejectedBySla` — истёк срок решения;\n- `CompensationRejectedBySeller` — продавец отказался от компенсации;\n- `MovingToOzon` — едет на склад Ozon;\n- `ReturnedToOzon` — на складе Ozon;\n- `MoneyReturnedBySystem` — быстрый возврат;\n- `WaitingShipment` — ожидает отправки.\n"
    },
    "warehouse_id": {
      "type": "integer",
      "description": "Фильтр по идентификатору склада. Можно получить с помощью метода [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList).",
      "format": "int64"
    },
    "barcode": {
      "type": "string",
      "description": "Фильтр по штрихкоду возвратной этикетки."
    },
    "return_schema": {
      "type": "string",
      "description": "Фильтр по схеме доставки: `FBS` или `FBO`.\n"
    }
  }
}
```
