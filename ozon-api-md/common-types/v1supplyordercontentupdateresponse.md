# v1SupplyOrderContentUpdateResponse

## Top-level fields
- `v1SupplyOrderContentUpdateResponse` (top-level fields):
  - `errors`: `array`
  - `operation_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "errors": {
      "type": "array",
      "description": "Ошибки при редактировании товарного состава:\n- `INVALID_DRAFT_BUNDLE_ID`, `SOME_SERVICE_ERROR`, `ORDER_IS_NOT_FOUND`, `SUPPLY_IS_NOT_FOUND`, `SUPPLY_DOES_NOT_BELONGS_TO_ORDER` — ошибка при редактировании поставки.\n- `HAS_UTD`, `UTD_IS_UPLOADED` — документы в системе ЭДО не удалены. Аннулируйте документы в системе ЭДО. Когда отредактируете состав, сформируйте и подпишите новые документы.\n- `ORDER_SKU_LIMIT` — количество товаров в поставке должно быть меньше или равно 5000.\n- `SAME_SKU` — товарный состав поставки остался прежним.\n- `SUPPLY_LOCKED` — обновление товарного состава в процессе, попробуйте позже.\n- `INBOUND_NO_CAPACITY` — на складе недостаточно места для поставки.\n- `INBOUND_LOCK`, `ORDER_LOCKED`, `STORAGE_WAREHOUSE_IS_NOT_WMS` — нельзя редактировать товарный состав.\n- `SUPPLY_CONTENT_NOT_VALID` — в составе поставки есть товары, которые склад не может принять.\n- `SUPPLY_BELONG_TO_ANOTHER_CONTRACTOR`, `COMPANY_DOES_NOT_BELONGS_TO_CONTRACTOR`, `ORDER_DOES_NOT_BELONG_TO_CONTRACTOR` — заявка на поставку не принадлежит вашему юридическому лицу.\n- `SUPPLY_BELONG_TO_ANOTHER_COMPANY`, `ORDER_DOES_NOT_BELONGS_TO_COMPANY` — заявка на поставку не принадлежит вашему кабинету.\n- `INCORRECT_SUPPLY_STATE` — нельзя изменить поставку в этом статусе.\n- `INCORRECT_SUPPLY_SOURCE` — нельзя изменить поставку с этим источником данных.\n- `INCORRECT_STORAGE_WAREHOUSE` — нельзя изменить поставку с этим складом хранения.\n- `NO_SUPPLY_PRODUCT_BUNDLE_ID` — отсутствует идентификатор товарного состава поставки.\n- `ONLY_DOCLESS_ALLOWED` — нельзя редактировать поставку при наличии документов.\n- `INVALID_VOLUME` — некорректный объём поставки.\n- `SUPPLY_IS_VIRTUAL` — нельзя редактировать виртуальную поставку.\n- `DEADLINE` — нельзя изменить поставку за час до таймслота.\n- `INACTIVE_CONTRACT` — нельзя редактировать состав поставки с истекшим договором.\n- `QUANTITY_OUT_OF_RANGE_BOTTOM` — количество экземпляров каждого товара должно быть больше 0.\n- `QUANTITY_OUT_OF_RANGE_UPPER` — количество экземпляров каждого товара должно быть меньше или равно 1 000 000.\n- `EMPTY_CONTENT` — не сможем принять пустую поставку, добавьте товары.\n- `CONTRACT_IS_NOT_FOUND`, `CONTRACT_IS_NOT_VALID_FOR_HANDLING_ORDERS` — в этом личном кабинете нельзя изменить поставку.\n",
      "items": {
        "$ref": "#/components/schemas/v1SupplyOrderContentUpdateResponseErrorEnum"
      }
    },
    "operation_id": {
      "type": "string",
      "description": "Идентификатор операции."
    }
  }
}
```
