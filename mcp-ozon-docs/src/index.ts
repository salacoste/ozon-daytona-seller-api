// Minimal SDK-free MCP server over stdio (JSON-RPC 2.0)
// Tools: listTags, findByOperationId, findByMethodPath, getChunk, getSchemas

import fs from "fs";
import path from "path";

// -------- Types ----------
type Json = any;
type JsonRpcReq = { jsonrpc: "2.0"; id?: string | number; method: string; params?: any };
type JsonRpcRes = { jsonrpc: "2.0"; id?: string | number; result?: any; error?: { code: number; message: string; data?: any } };

type Manifest = {
  source: string;
  chunk_token_budget: number;
  groups: Record<string, string[]>;
  ops_index: Array<{
    tag: string;
    file: string;
    method: string;
    path: string;
    operationId: string;
    schema_refs?: string[];
  }>;
  schemas: Record<string, string>;
};

// -------- Helpers ----------
function resolveRoot(): string {
  const envRoot = process.env.OZON_MD_ROOT;
  if (envRoot && fs.existsSync(envRoot)) return path.resolve(envRoot);
  // По умолчанию: ../ozon-api-md относительно папки mcp-ozon-docs
  return path.resolve(process.cwd(), "../ozon-api-md");
}

function readManifest(root: string): Manifest {
  const file = path.join(root, "manifest.json");
  if (!fs.existsSync(file)) throw new Error(`manifest.json не найден: ${file}`);
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function slugSchemaName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

// -------- State ----------
let ROOT = "";
let MANIFEST: Manifest | null = null;
function ensureManifest() {
  if (!MANIFEST) {
    ROOT = resolveRoot();
    MANIFEST = readManifest(ROOT);
  }
}

// -------- MCP handlers ----------
async function mcpInitialize(_params: any) {
  // Minimal MCP handshaking
  return {
    protocolVersion: "2024-11-05", // допустимое значение; клиенты обычно принимают
    serverInfo: { name: "mcp-ozon-docs", version: "1.0.0" },
    capabilities: {
      tools: { list: true, call: true }
    }
  };
}

async function mcpToolsList(_params: any) {
  return {
    tools: [
      {
        name: "listTags",
        description: "Список групп (тегов) и их чанков по manifest.json",
        inputSchema: { type: "object", properties: {} }
      },
      {
        name: "findByOperationId",
        description: "Найти markdown-чанк и связанные схемы по operationId",
        inputSchema: {
          type: "object",
          properties: { operationId: { type: "string" } },
          required: ["operationId"]
        }
      },
      {
        name: "findByMethodPath",
        description: "Найти markdown-чанк и схемы по HTTP method и path",
        inputSchema: {
          type: "object",
          properties: { method: { type: "string" }, path: { type: "string" } },
          required: ["method", "path"]
        }
      },
      {
        name: "getChunk",
        description: "Прочитать содержимое markdown-чанка (путь относительно корня /ozon-api-md)",
        inputSchema: {
          type: "object",
          properties: { file: { type: "string" } },
          required: ["file"]
        }
      },
      {
        name: "getSchemas",
        description: "Прочитать содержимое нескольких файлов схем (пути относительно корня папки /ozon-api-md)",
        inputSchema: {
          type: "object",
          properties: { files: { type: "array", items: { type: "string" } } },
          required: ["files"]
        }
      }
    ]
  };
}

async function tool_listTags() {
  ensureManifest();
  const groups = MANIFEST!.groups;
  const tags = Object.keys(groups).map(tag => ({ tag, chunks: groups[tag] }));
  return { tags };
}

async function tool_findByOperationId({ operationId }: { operationId: string }) {
  ensureManifest();
  const hit = MANIFEST!.ops_index.find(o => o.operationId === operationId);
  if (!hit) return { error: `operationId not found: ${operationId}` };

  const fileRel = hit.file;
  const fileAbs = path.join(ROOT, fileRel);

  const schemaNames = hit.schema_refs || [];
  const schemaRelFiles = schemaNames.map(n => MANIFEST!.schemas[n] ?? path.posix.join("common-types", `${slugSchemaName(n)}.md`));
  const schemaAbsFiles = schemaRelFiles.map(f => path.join(ROOT, f));

  return {
    file: fileRel,
    fileAbs,
    schemas: uniq(schemaRelFiles),
    schemasAbs: uniq(schemaAbsFiles),
    method: hit.method,
    path: hit.path,
    tag: hit.tag
  };
}

async function tool_findByMethodPath({ method, path: pth }: { method: string; path: string }) {
  ensureManifest();
  const m = method.toUpperCase();
  const hit = MANIFEST!.ops_index.find(o => o.method === m && o.path === pth);
  if (!hit) return { error: `method+path not found: ${m} ${pth}` };

  const fileRel = hit.file;
  const fileAbs = path.join(ROOT, fileRel);

  const schemaNames = hit.schema_refs || [];
  const schemaRelFiles = schemaNames.map(n => MANIFEST!.schemas[n] ?? path.posix.join("common-types", `${slugSchemaName(n)}.md`));
  const schemaAbsFiles = schemaRelFiles.map(f => path.join(ROOT, f));

  return {
    file: fileRel,
    fileAbs,
    schemas: uniq(schemaRelFiles),
    schemasAbs: uniq(schemaAbsFiles),
    operationId: hit.operationId,
    tag: hit.tag
  };
}

async function tool_getChunk({ file }: { file: string }) {
  ensureManifest();
  const abs = path.join(ROOT, file);
  if (!abs.startsWith(ROOT)) return { error: "Path traversal is not allowed" };
  if (!fs.existsSync(abs)) return { error: `File not found: ${file}` };
  return { content: fs.readFileSync(abs, "utf-8") };
}

async function tool_getSchemas({ files }: { files: string[] }) {
  ensureManifest();
  const items: Array<{file: string; content?: string; error?: string}> = [];
  for (const f of files) {
    const abs = path.join(ROOT, f);
    if (!abs.startsWith(ROOT)) { items.push({ file: f, error: "Path traversal is not allowed" }); continue; }
    if (!fs.existsSync(abs)) { items.push({ file: f, error: "File not found" }); continue; }
    items.push({ file: f, content: fs.readFileSync(abs, "utf-8") });
  }
  return { items };
}

// -------- MCP tool dispatcher (tools/call) ----------
// Возвращаем ВСЕГДА { content: Content[] }, чтобы удовлетворить MCP-клиент (Claude/Code)
async function mcpToolsCall(params: { name: string; arguments?: any }) {
  const { name, arguments: args } = params || { name: "", arguments: {} };

  let res: any;
  switch (name) {
    case "listTags":
      res = await tool_listTags();
      break;
    case "findByOperationId":
      res = await tool_findByOperationId(args || {});
      break;
    case "findByMethodPath":
      res = await tool_findByMethodPath(args || {});
      break;
    case "getChunk":
      res = await tool_getChunk(args || {});
      break;
    case "getSchemas":
      res = await tool_getSchemas(args || {});
      break;
    default:
      return {
        isError: true,
        content: [{ type: "text", text: `Unknown tool: ${name}` }]
      };
  }

  // Ошибки наших tools в едином виде
  if (res && typeof res === "object" && "error" in res && res.error) {
    return {
      isError: true,
      content: [{ type: "text", text: String(res.error) }]
    };
  }

  // Нормализуем выдачу под Content[]
  if (name === "getChunk") {
    const body = (res && res.content) ? String(res.content) : "";
    return { content: [{ type: "text", text: body, mimeType: "text/markdown" }] };
  }

  if (name === "getSchemas") {
    const items = Array.isArray(res?.items) ? res.items : [];
    const content = items.map((it: any) => {
      if (it.error) {
        return { type: "text", text: `ERROR ${it.file}: ${it.error}` };
      }
      const header = `# ${it.file}\n\n`;
      return { type: "text", text: header + String(it.content ?? ""), mimeType: "text/markdown" };
    });
    return { content };
  }

  // Для «поисковых» тулов — JSON как обычный текст
  return {
    content: [{ type: "text", text: JSON.stringify(res, null, 2) }]
  };
}

// -------- JSON-RPC 2.0 loop over stdio ----------

process.stdin.setEncoding("utf-8");
let buffer = "";

function replyOK(id: string | number | undefined, result: any) {
  const res: JsonRpcRes = { jsonrpc: "2.0", id, result };
  process.stdout.write(JSON.stringify(res) + "\n");
}

function replyErr(id: string | number | undefined, code: number, message: string, data?: any) {
  const res: JsonRpcRes = { jsonrpc: "2.0", id, error: { code, message, data } };
  process.stdout.write(JSON.stringify(res) + "\n");
}

async function handle(req: JsonRpcReq) {
  const { id, method, params } = req;
  try {
    if (method === "initialize") {
      const r = await mcpInitialize(params);
      return replyOK(id, r);
    }
    if (method === "tools/list") {
      const r = await mcpToolsList(params);
      return replyOK(id, r);
    }
    if (method === "tools/call") {
      const r = await mcpToolsCall(params);
      return replyOK(id, r);
    }
    // опционно: ping/pong, shutdown и т.п.
    return replyErr(id, -32601, `Method not found: ${method}`);
  } catch (e: any) {
    return replyErr(id, -32000, e?.message || "Internal error", { stack: e?.stack });
  }
}

process.stdin.on("data", (chunk: string) => {
  buffer += chunk;
  // MCP-клиенты обычно посылают по строке на запрос
  let idx: number;
  while ((idx = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (!line) continue;
    let req: JsonRpcReq;
    try {
      req = JSON.parse(line);
    } catch (e) {
      replyErr(undefined, -32700, "Parse error");
      continue;
    }
    handle(req);
  }
});

// Если stdin закрывается — завершаем
process.stdin.on("end", () => process.exit(0));

console.error("[mcp-ozon-docs] SDK-free MCP server started (stdio).");
