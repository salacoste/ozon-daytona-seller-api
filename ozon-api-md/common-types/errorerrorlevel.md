# ErrorErrorLevel

Описание уровней ошибок: 
  - `ERROR_LEVEL_UNSPECIFIED` — не определён;
  - `ERROR_LEVEL_ERROR` — критичная ошибка, товар нельзя продавать;
  - `ERROR_LEVEL_INTERNAL` — критичная ошибка, товар нельзя продавать.
  - `ERROR_LEVEL_WARNING` — некритичная ошибка, товар можно продавать.

[Подробнее об ошибках при создании товара в Базе знаний продавца](https://seller-edu.ozon.ru/work-with-goods/zagruzka-tovarov/creating-goods/oshibki-pri-rabote-s-kartochkami)             


## Full schema (JSON)
```json
{
  "type": "string",
  "title": "object",
  "default": "ERROR_LEVEL_UNSPECIFIED",
  "enum": [
    "ERROR_LEVEL_UNSPECIFIED",
    "ERROR_LEVEL_ERROR",
    "ERROR_LEVEL_WARNING",
    "ERROR_LEVEL_INTERNAL"
  ],
  "description": "Описание уровней ошибок: \n  - `ERROR_LEVEL_UNSPECIFIED` — не определён;\n  - `ERROR_LEVEL_ERROR` — критичная ошибка, товар нельзя продавать;\n  - `ERROR_LEVEL_INTERNAL` — критичная ошибка, товар нельзя продавать.\n  - `ERROR_LEVEL_WARNING` — некритичная ошибка, товар можно продавать.\n\n[Подробнее об ошибках при создании товара в Базе знаний продавца](https://seller-edu.ozon.ru/work-with-goods/zagruzka-tovarov/creating-goods/oshibki-pri-rabote-s-kartochkami)             \n"
}
```
