# ChatMessageModerateImageStatus

Статус модерации изображения: 
  - `SUCCESS` — прошло модерацию;
  - `MODERATION` — на модерации;
  - `FAILED` — не прошло модерацию.


## Full schema (JSON)
```json
{
  "type": "string",
  "enum": [
    "SUCCESS",
    "MODERATION",
    "FAILED"
  ],
  "description": "Статус модерации изображения: \n  - `SUCCESS` — прошло модерацию;\n  - `MODERATION` — на модерации;\n  - `FAILED` — не прошло модерацию.\n"
}
```
