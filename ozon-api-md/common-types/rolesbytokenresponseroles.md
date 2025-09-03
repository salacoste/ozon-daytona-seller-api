# RolesByTokenResponseRoles

## Top-level fields
- `RolesByTokenResponseRoles` (top-level fields):
  - `name`: `string`
  - `methods`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Название роли."
    },
    "methods": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Методы, доступные для роли."
    }
  }
}
```
