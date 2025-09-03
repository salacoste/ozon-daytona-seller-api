# MCP OZON Docs Server

MCP-A5@25@, :>B>@K9 >1A;C68205B OZON OpenAPI, @0718BK9 =0 Markdown-G0=:8:
- ?>8A: ?> `operationId` 8;8 `method+path`,
- 2K40G0 A>45@68<>3> G0=:>2 8 A2O70==KE AE5<,
- A?8A>: B53>2/G0=:>2 87 `manifest.json`.

## "@51>20=8O
- Node.js 18+
- 0?:0 `ozon-api-md/` 2 :>@=5 (A35=5@8@>20=0 20H8< A:@8?B><)
  - `manifest.json`
  - `categories/**`
  - `common-types/**`

>6=> ?5@5>?@545;8BL :>@5=L G5@57 ?5@5<5==CN >:@C65=8O:
```bash
export OZON_API_MD_PATH="/path/to/ozon-api-md"
```

## #AB0=>2:0 8 70?CA:

```bash
cd mcp-ozon-docs
npm install
npm run build
npm start
```

## A?>;L7>20=85 2 Claude Desktop

>102LB5 2 `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ozon-api-docs": {
      "command": "node",
      "args": ["/path/to/bmad-ozon-seller-api/mcp-ozon-docs/dist/index.js"],
      "env": {
        "OZON_API_MD_PATH": "/path/to/bmad-ozon-seller-api/ozon-api-md"
      }
    }
  }
}
```

## Docker

```bash
cd mcp-ozon-docs
docker-compose up -d
```

!5@25@ 1C45B 4>ABC?5= G5@57 MCP protocol.

## >ABC?=K5 8=AB@C<5=BK

- `listTags`  A?8A>: 2A5E 3@C?? (B53>2) 8 G0=:>2
- `findByOperationId`  =09B8 G0=: ?> operationId  
- `findByMethodPath`  =09B8 G0=: ?> HTTP <5B>4C 8 ?CB8
- `getChunk`  ?>;CG8BL A>45@68<>5 markdown-G0=:0
- `getSchemas`  ?>;CG8BL A>45@68<>5 =5A:>;L:8E D09;>2 AE5<

---

**Note**: -B>B MCP A5@25@ 8A?>;L7C5BAO B>;L:> 4;O @07@01>B:8 SDK.  production SDK >= =5 8A?>;L7C5BAO.