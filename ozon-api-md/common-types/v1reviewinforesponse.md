# v1ReviewInfoResponse

## Top-level fields
- `v1ReviewInfoResponse` (top-level fields):
  - `comments_amount`: `integer`
  - `dislikes_amount`: `integer`
  - `id`: `string`
  - `is_rating_participant`: `boolean`
  - `likes_amount`: `integer`
  - `order_status`: `string`
  - `photos`: `array`
  - `photos_amount`: `integer`
  - `published_at`: `string`
  - `rating`: `integer`
  - `sku`: `integer`
  - `status`: `string`
  - `text`: `string`
  - `videos`: `array`
  - `videos_amount`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "comments_amount": {
      "description": "Количество комментариев к отзыву.",
      "type": "integer",
      "format": "int32"
    },
    "dislikes_amount": {
      "description": "Количество дизлайков на отзыве.",
      "type": "integer",
      "format": "int32"
    },
    "id": {
      "description": "Идентификатор отзыва.",
      "type": "string"
    },
    "is_rating_participant": {
      "description": "`true`, если отзыв участвует в подсчёте рейтинга.\n",
      "type": "boolean"
    },
    "likes_amount": {
      "description": "Количество лайков на отзыве.",
      "type": "integer",
      "format": "int32"
    },
    "order_status": {
      "type": "string",
      "description": "Статус заказа, на который покупатель оставил отзыв:\n- `DELIVERED` — доставлен,\n- `CANCELLED` — отменён.\n"
    },
    "photos": {
      "type": "array",
      "description": "Информация об изображении.",
      "items": {
        "$ref": "#/components/schemas/ReviewInfoResponsePhoto"
      }
    },
    "photos_amount": {
      "description": "Количество изображений у отзыва.",
      "type": "integer",
      "format": "int32"
    },
    "published_at": {
      "description": "Дата публикации отзыва.",
      "type": "string",
      "format": "date-time"
    },
    "rating": {
      "description": "Оценка отзыва.",
      "type": "integer",
      "format": "int32"
    },
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "integer",
      "format": "int64"
    },
    "status": {
      "description": "Статус отзыва:\n- `UNPROCESSED` — не обработан,\n- `PROCESSED` — обработан.\n",
      "type": "string"
    },
    "text": {
      "description": "Текст отзыва.",
      "type": "string"
    },
    "videos": {
      "type": "array",
      "description": "Информация о видео.",
      "items": {
        "$ref": "#/components/schemas/ReviewInfoResponseVideo"
      }
    },
    "videos_amount": {
      "description": "Количество видео у отзыва.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
