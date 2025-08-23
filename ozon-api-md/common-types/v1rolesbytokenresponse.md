# v1RolesByTokenResponse

## Top-level fields
- `v1RolesByTokenResponse` (top-level fields):
  - `roles`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "roles": {
      "type": "array",
      "description": "Информация о доступных ролях и методах.",
      "items": {
        "$ref": "#/components/schemas/RolesByTokenResponseRoles"
      }
    }
  }
}
```
