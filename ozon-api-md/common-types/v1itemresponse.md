# v1ItemResponse

## Top-level fields
- `v1ItemResponse` (top-level fields):
  - `icon_path`: `string`
  - `sku`: `integer`
  - `name`: `string`
  - `quantity`: `integer`
  - `barcode`: `string`
  - `product_id`: `integer`
  - `quant`: `integer`
  - `is_quant_editable`: `boolean`
  - `volume_in_litres`: `number`
  - `total_volume_in_litres`: `number`
  - `contractor_item_code`: `string`
  - `sfbo_attribute` → `$ref` v1ItemSfboAttribute
  - `shipment_type` → `$ref` v1BundleItemShipmentType
  - `tags`: `array`
  - `placement_zone`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "icon_path": {
      "type": "string",
      "description": "Ссылка на изображение товара."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товара."
    },
    "barcode": {
      "type": "string",
      "description": "Штрихкод товара."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "quant": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товаров в одной упаковке."
    },
    "is_quant_editable": {
      "type": "boolean",
      "description": "`true`, если количество товаров в одной упаковке можно изменить.\n"
    },
    "volume_in_litres": {
      "type": "number",
      "format": "double",
      "description": "Объём товара в литрах."
    },
    "total_volume_in_litres": {
      "type": "number",
      "format": "double",
      "description": "Объём всех товаров в литрах."
    },
    "contractor_item_code": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "sfbo_attribute": {
      "$ref": "#/components/schemas/v1ItemSfboAttribute"
    },
    "shipment_type": {
      "$ref": "#/components/schemas/v1BundleItemShipmentType"
    },
    "tags": {
      "type": "array",
      "description": "Теги товаров из поставки или заявки на поставку.\n\nВозможные значения:\n- `EVSD_REQUIRED` — товар с сертификацией «Меркурий»;\n- `MARKING_REQUIRED` — товар с обязательной маркировкой «Честный ЗНАК»;\n- `MARKING_POSSIBLE` — товар с возможной маркировкой «Честный ЗНАК»;\n- `JEWELRY` — товар с признаком ювелирного изделия;\n- `TRACEABLE` — товар с признаком прослеживаемости;\n- `ETTN_REQUIRED` — товар с признаком прослеживаемости, для которого необходима электронная ТТН;\n- `UNDEFINED` — неизвестный тег.\n",
      "items": {
        "type": "string",
        "enum": [
          "EVSD_REQUIRED",
          "MARKING_REQUIRED",
          "MARKING_POSSIBLE",
          "JEWELRY",
          "TRACEABLE",
          "ETTN_REQUIRED",
          "UNDEFINED"
        ]
      }
    },
    "placement_zone": {
      "type": "string",
      "default": "UNSPECIFIED",
      "enum": [
        "UNSPECIFIED",
        "CLOSED_ZONE",
        "DANGEROUS_GOODS",
        "PRODUCTS",
        "SORT",
        "NON_SORT",
        "OVERSIZE",
        "JEWELRY",
        "UNRESOLVED"
      ],
      "description": "Зона размещения товара.\n\nВозможные значения:\n- `UNSPECIFIED` — зона не указана;\n- `CLOSED_ZONE` — закрытая зона;\n- `DANGEROUS_GOODS` — товар 2–4 класса опасности;\n- `PRODUCTS` — продукты;\n- `SORT` — сортируемый товар;\n- `NON_SORT` — несортируемый товар;\n- `OVERSIZE` — крупногабаритный товар;\n- `JEWELRY` — ювелирные изделия;\n- `UNRESOLVED` — неизвестная зона.\n"
    }
  }
}
```
