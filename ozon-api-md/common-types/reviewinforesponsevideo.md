# ReviewInfoResponseVideo

## Top-level fields
- `ReviewInfoResponseVideo` (top-level fields):
  - `height`: `integer`
  - `preview_url`: `string`
  - `short_video_preview_url`: `string`
  - `url`: `string`
  - `width`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "height": {
      "description": "Высота.",
      "type": "integer",
      "format": "int64"
    },
    "preview_url": {
      "description": "Ссылка на превью видео.",
      "type": "string"
    },
    "short_video_preview_url": {
      "description": "Ссылка на короткое видео.",
      "type": "string"
    },
    "url": {
      "description": "Ссылка на видео.",
      "type": "string"
    },
    "width": {
      "description": "Ширина.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
