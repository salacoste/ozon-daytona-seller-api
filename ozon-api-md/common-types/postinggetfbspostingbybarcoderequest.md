# postingGetFbsPostingByBarcodeRequest

## Top-level fields
- `postingGetFbsPostingByBarcodeRequest` (top-level fields):
  - `barcode`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "barcode": {
      "type": "string",
      "description": "Штрихкод отправления. Можно получить с помощью методов: [/v3/posting/fbs/get](#operation/PostingAPI_GetFbsPostingV3), [/v3/posting/fbs/list](#operation/PostingAPI_GetFbsPostingListV3) и [/v3/posting/fbs/unfulfilled/list](#operation/PostingAPI_GetFbsPostingUnfulfilledList) в массиве `barcodes`.\n"
    }
  },
  "type": "object",
  "title": "object"
}
```
