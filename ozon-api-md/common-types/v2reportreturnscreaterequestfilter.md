# v2ReportReturnsCreateRequestFilter

Фильтр.

## Top-level fields
- `v2ReportReturnsCreateRequestFilter` (top-level fields):
  - `delivery_schema`: `string`
  - `date_from`: `string`
  - `date_to`: `string`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "delivery_schema": {
      "type": "string",
      "enum": [
        "FBS",
        "FBO",
        "ALL"
      ],
      "description": "Фильтр по схеме работы: \n- `FBS` — возвраты на свой склад. \n- `FBO` — возвраты на склад маркетплейса.\n- `ALL` — все возвраты.\n"
    },
    "date_from": {
      "type": "string",
      "format": "date-time",
      "description": "Дата, с которой данные отображаются в отчёте.\n\nДоступно только за последние три месяца.\n"
    },
    "date_to": {
      "type": "string",
      "format": "date-time",
      "description": "Дата, по которую данные отображаются в отчёте.\n\nДоступно только за последние три месяца.\n"
    },
    "status": {
      "type": "string",
      "enum": [
        "DisputeOpened",
        "OnSellerApproval",
        "ArrivedAtReturnPlace",
        "OnSellerClarification",
        "OnSellerClarificationAfterPartialCompensation",
        "OfferedPartialCompensation",
        "ReturnMoneyApproved",
        "PartialCompensationReturned",
        "CancelledDisputeNotOpen",
        "Rejected",
        "CrmRejected",
        "Cancelled",
        "Approved",
        "ApprovedByOzon",
        "ReceivedBySeller",
        "MovingToSeller",
        "ReturnCompensated",
        "ReturningToSellerByCourier",
        "Utilizing",
        "Utilized",
        "MoneyReturned",
        "PartialCompensationInProcess",
        "DisputeYouOpened",
        "CompensationRejected",
        "DisputeOpening",
        "CompensationOffered",
        "WaitingCompensation",
        "SendingError",
        "CompensationRejectedBySla",
        "CompensationRejectedBySeller",
        "MovingToOzon",
        "ReturnedToOzon",
        "MoneyReturnedBySystem",
        "WaitingShipment"
      ],
      "description": "Фильтр по статусу возврата:\n- `DisputeOpened` — открыт спор с покупателем;\n- `OnSellerApproval` — на согласовании у продавца;\n- `ArrivedAtReturnPlace` — в пункте выдачи;\n- `OnSellerClarification` — на уточнении у продавца;\n- `OnSellerClarificationAfterPartialCompensation` — на уточнении у продавца после частичной компенсации;\n- `OfferedPartialCompensation` — предложена частичная компенсация;\n- `ReturnMoneyApproved` — одобрен возврат денег;\n- `PartialCompensationReturned` — вернули часть денег;\n- `CancelledDisputeNotOpen` — возврат отклонён, спор не открыт;\n- `Rejected` — заявка отклонена;\n- `CrmRejected` — заявка отклонена Ozon;\n- `Cancelled` — заявка отменена;\n- `Approved` — заявка одобрена продавцом;\n- `ApprovedByOzon` — заявка одобрена Ozon;\n- `ReceivedBySeller` — продавец получил возврат;\n- `MovingToSeller` — возврат на пути к продавцу;\n- `ReturnCompensated` — продавец получил компенсацию;\n- `ReturningToSellerByCourier` — курьер везёт возврат продавцу;\n- `Utilizing` — на утилизации;\n- `Utilized` — утилизирован;\n- `MoneyReturned` — покупателю вернули всю сумму;\n- `PartialCompensationInProcess` — одобрен частичный возврат денег;\n- `DisputeYouOpened` — продавец открыл спор;\n- `CompensationRejected` — отказано в компенсации;\n- `DisputeOpening` — обращение в поддержку отправлено;\n- `CompensationOffered` — ожидает вашего решения по компенсации;\n- `WaitingCompensation` — ожидает компенсации;\n- `SendingError` — ошибка при отправке обращения в поддержку;\n- `CompensationRejectedBySla` — истёк срок решения;\n- `CompensationRejectedBySeller` — продавец отказался от компенсации;\n- `MovingToOzon` — едет на склад Ozon;\n- `ReturnedToOzon` — на складе Ozon;\n- `MoneyReturnedBySystem` — быстрый возврат;\n- `WaitingShipment` — ожидает отправки.\n"
    }
  },
  "type": "object",
  "title": "object",
  "description": "Фильтр.",
  "required": [
    "date_from",
    "date_to",
    "status"
  ]
}
```
