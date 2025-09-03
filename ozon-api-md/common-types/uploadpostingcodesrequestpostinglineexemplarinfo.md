# UploadPostingCodesRequestPostingLineExemplarInfo

## Top-level fields
- `UploadPostingCodesRequestPostingLineExemplarInfo` (top-level fields):
  - `exemplar_keys`: `array`
  - `exemplar_qty`: `integer`
  - `not_available_exemplar_qty`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "required": [
    "exemplar_qty",
    "not_available_exemplar_qty",
    "sku",
    "posting_number"
  ],
  "properties": {
    "exemplar_keys": {
      "type": "array",
      "description": "Список кодов цифрового товара. Количество кодов должно совпадать со значением параметра `exemplar_qty`.",
      "items": {
        "type": "string"
      }
    },
    "exemplar_qty": {
      "type": "integer",
      "format": "int32",
      "description": "Количество кодов цифрового товара, которые вы передаёте покупателю. <br><br>  Сумма значений в параметрах `exemplar_qty ` и `not_available_exemplar_qty` должна равняться количеству кодов в заказе. Получите это значение в параметре `required_qty_for_digital_code` в ответе метода [/v1/posting/digital/list](#operation/ListPostingCodes)."
    },
    "not_available_exemplar_qty": {
      "type": "integer",
      "format": "int32",
      "description": "Количество кодов цифрового товара, которые вы не можете передать покупателю. <br><br> Сумма значений в параметрах `exemplar_qty ` и `not_available_exemplar_qty` должна равняться количеству кодов в заказе. Получите это значение в параметре `required_qty_for_digital_code` в ответе метода [/v1/posting/digital/list](#operation/ListPostingCodes)."
    },
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
