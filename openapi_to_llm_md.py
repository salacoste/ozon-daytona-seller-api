#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Split OZON swagger.json into LLM-friendly Markdown chunks.

Input : docs/swagger.json
Output: ozon-api-md/ with categories/* chunk files, common-types/*, 00-index.md, manifest.json
"""

import json, os, re, math, textwrap
from pathlib import Path
from typing import Dict, Any, List, Tuple

# -------- CONFIG (no placeholders) --------
SOURCE_FILE = Path("docs/swagger.json")     # your file as shown in the screenshot
OUT_DIR = Path("ozon-api-md")
CHUNK_TOKEN_BUDGET = 1500                   # ~ context-safe size per chunk
MIN_OPS_PER_CHUNK = 1                       # at least 1 operation per chunk

# -------- helpers --------
def est_tokens(s: str) -> int:              # heuristic: tokens ≈ ceil(chars/4)
    return int(math.ceil(len(s) / 4))

def slug(s: str) -> str:
    s = s.strip().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-') or "misc"

def md(s: str) -> str:
    if not s:
        return ""
    return str(s).replace('<','&lt;').replace('>','&gt;')

def read_spec(path: Path) -> Dict[str, Any]:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)

def ensure_dirs(base: Path):
    (base / "categories").mkdir(parents=True, exist_ok=True)
    (base / "common-types").mkdir(parents=True, exist_ok=True)

def ref_name(ref: str) -> str:
    return ref.split("/")[-1]  # "#/components/schemas/Foo" -> "Foo"

def schema_props(schema: Dict[str, Any]) -> Dict[str, Any]:
    if not isinstance(schema, dict):
        return {}
    if schema.get("type") == "object":
        return schema.get("properties", {}) or {}
    for comb in ("allOf", "oneOf", "anyOf"):
        if comb in schema and isinstance(schema[comb], list):
            acc = {}
            for item in schema[comb]:
                acc.update(schema_props(item))
            return acc
    return {}

def minimal_example_from_schema(schema: Dict[str, Any]) -> Any:
    if not isinstance(schema, dict):
        return None
    if "example" in schema:
        return schema["example"]
    t = schema.get("type")
    if t == "object" or ("properties" in schema or "required" in schema):
        props = schema.get("properties", {}) or {}
        required = schema.get("required", list(props.keys())[:3])
        obj = {}
        for k in required:
            p = props.get(k, {})
            if "$ref" in p:
                obj[k] = {"$ref": p["$ref"]}
                continue
            pt = p.get("type")
            if pt == "string":
                if k.lower().endswith("id"):
                    obj[k] = "1234567890"
                elif "date" in k.lower():
                    obj[k] = "2025-08-21T00:00:00Z"
                elif "currency" in k.lower():
                    obj[k] = "RUB"
                else:
                    obj[k] = "text"
            elif pt == "integer":
                obj[k] = 1
            elif pt == "number":
                obj[k] = 1
            elif pt == "boolean":
                obj[k] = True
            elif pt == "array":
                item = p.get("items", {})
                ex_item = minimal_example_from_schema(item) if item else {}
                obj[k] = [ex_item] if ex_item is not None else []
            elif pt == "object":
                obj[k] = {}
            else:
                obj[k] = None
        return obj
    if t == "array":
        item = schema.get("items", {})
        ex_item = minimal_example_from_schema(item) if item else {}
        return [ex_item] if ex_item is not None else []
    for comb in ("allOf", "oneOf", "anyOf"):
        if comb in schema and isinstance(schema[comb], list) and schema[comb]:
            ex = minimal_example_from_schema(schema[comb][0])
            if ex is not None:
                return ex
    return None

def brief_schema_outline(name: str, schema: Dict[str, Any]) -> str:
    props = schema_props(schema)
    if not props:
        return ""
    lines = [f"- `{name}` (top-level fields):"]
    for k, p in list(props.items())[:20]:
        if "$ref" in p:
            lines.append(f"  - `{k}` → `$ref` {ref_name(p['$ref'])}")
        else:
            t = p.get("type", "object")
            lines.append(f"  - `{k}`: `{t}`")
    return "\n".join(lines)

def extract_all_schema_refs(obj: Any) -> List[str]:
    s = json.dumps(obj, ensure_ascii=False)
    return re.findall(r'#/components/schemas/([A-Za-z0-9_.-]+)', s)

def render_parameters(params: List[Dict[str, Any]]) -> str:
    if not params:
        return "- none\n"
    by_loc = {"path": [], "query": [], "header": [], "cookie": []}
    for p in params:
        loc = p.get("in", "query")
        nm = p.get("name", "")
        req = "required" if p.get("required") else "optional"
        desc = md(p.get("description","")).strip()
        by_loc.setdefault(loc, []).append(f"- `{nm}` ({req}){(' — ' + desc) if desc else ''}")
    parts = []
    for loc in ("path","query","header","cookie"):
        if by_loc[loc]:
            parts.append(f"_{loc}_:\n" + "\n".join(by_loc[loc]))
    return "\n".join(parts) + ("\n" if parts else "")

def first_schema_from_content(content: Dict[str, Any]) -> Dict[str, Any]:
    if not isinstance(content, dict):
        return {}
    # prefer json-like types
    preferred = ["application/json", "application/*+json"]
    for pref in preferred:
        for ct, media in content.items():
            if ct == pref or ct.endswith("+json"):
                sch = media.get("schema")
                if sch:
                    return sch
    # fallback: first one
    for _, media in content.items():
        sch = media.get("schema")
        if sch:
            return sch
    return {}

def render_operation_block(method: str, path: str, op: Dict[str, Any]) -> Tuple[str, List[str]]:
    title = f"{method} {path}"
    summary = md(op.get("summary","")).strip() or "No summary."
    desc = md(op.get("description","")).strip()
    op_id = op.get("operationId", "")

    block = [f"## {title}\n\n**Summary:** {summary}\n\n"]
    if op_id:
        block.append(f"**operationId:** `{op_id}`\n\n")
    if desc:
        block.append(desc + "\n\n")

    block.append("**Parameters (path/query/header/cookie):**\n")
    block.append(render_parameters(op.get("parameters", [])) + "\n")

    rb = op.get("requestBody", {})
    block.append("**Request body (minimal valid example):**\n")
    if rb:
        sch = first_schema_from_content(rb.get("content", {}))
        example = sch.get("example")
        if example is None:
            example = minimal_example_from_schema(sch) or {"note":"no example"}
        block.append("```json\n" + json.dumps(example, ensure_ascii=False, indent=2) + "\n```\n\n")
    else:
        block.append("_no request body_\n\n")

    block.append("**Success response (example):**\n")
    resp = op.get("responses", {})
    ok = None
    for code in ("200","201","202","204"):
        if code in resp:
            ok = resp[code]
            break
    if ok and isinstance(ok, dict):
        sch = first_schema_from_content(ok.get("content", {}))
        example = sch.get("example") or minimal_example_from_schema(sch) or {"result":"ok"}
        block.append("```json\n" + json.dumps(example, ensure_ascii=False, indent=2) + "\n```\n\n")
    else:
        block.append("```json\n{\"result\":\"ok\"}\n```\n\n")

    refs = sorted(set(extract_all_schema_refs(op)))
    if refs:
        block.append("**Related schemas:**\n")
        for r in refs:
            block.append(f"- `{r}` — see [../common-types/{slug(r)}.md](../common-types/{slug(r)}.md)")
        block.append("\n")
    return "".join(block), refs

def write_common_types(components: Dict[str, Any], out_dir: Path) -> Dict[str, str]:
    schemas = components.get("schemas", {}) or {}
    result = {}
    base = out_dir / "common-types"
    base.mkdir(parents=True, exist_ok=True)
    for name, sch in schemas.items():
        p = base / f"{slug(name)}.md"
        lines = [f"# {name}\n\n"]
        if "description" in sch:
            lines.append(md(sch["description"]) + "\n\n")
        outline = brief_schema_outline(name, sch)
        if outline:
            lines.append("## Top-level fields\n" + outline + "\n\n")
        lines.append("## Full schema (JSON)\n")
        lines.append("```json\n" + json.dumps(sch, ensure_ascii=False, indent=2) + "\n```\n")
        p.write_text("".join(lines), encoding="utf-8")
        result[name] = str(p.relative_to(out_dir))
    return result

def build():
    spec = read_spec(SOURCE_FILE)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ensure_dirs(OUT_DIR)

    components = spec.get("components", {})
    paths = spec.get("paths", {}) or {}
    schema_map = write_common_types(components, OUT_DIR)

    groups: Dict[str, List[Tuple[str,str,Dict[str,Any]]]] = {}
    for path, methods in paths.items():
        for method, op in methods.items():
            if method.upper() not in ("GET","POST","PUT","PATCH","DELETE","OPTIONS","HEAD","TRACE"):
                continue
            tags = op.get("tags") or ["misc"]
            for t in tags:
                groups.setdefault(t, []).append((method.upper(), path, op))

    for t in groups:
        groups[t].sort(key=lambda x: (x[1], x[0]))

    manifest = {
        "source": str(SOURCE_FILE),
        "chunk_token_budget": CHUNK_TOKEN_BUDGET,
        "groups": {},
        "ops_index": [],
        "schemas": schema_map
    }

    index_lines = ["# OZON OpenAPI → Markdown (LLM-ready)\n", "## Categories\n"]

    cat_root = OUT_DIR / "categories"
    for tag, ops in sorted(groups.items(), key=lambda x: x[0].lower()):
        tag_dir = cat_root / slug(tag)
        tag_dir.mkdir(parents=True, exist_ok=True)

        chunk_idx = 1
        chunk_lines: List[str] = [f"# {tag}\n\n"]
        chunk_tokens = est_tokens(chunk_lines[-1])
        ops_in_chunk = 0
        chunk_files: List[str] = []

        def flush_chunk():
            nonlocal chunk_idx, chunk_lines, chunk_tokens, ops_in_chunk, chunk_files
            if ops_in_chunk == 0:
                return
            fname = f"{slug(tag)}--chunk-{chunk_idx:03d}.md"
            fpath = tag_dir / fname
            fpath.write_text("".join(chunk_lines), encoding="utf-8")
            chunk_files.append(str(fpath.relative_to(OUT_DIR)))
            chunk_idx += 1
            chunk_lines[:] = [f"# {tag}\n\n"]
            chunk_tokens = est_tokens(chunk_lines[-1])
            ops_in_chunk = 0

        for method, path, op in ops:
            block, refs = render_operation_block(method, path, op)
            block_tokens = est_tokens(block)

            if (chunk_tokens + block_tokens > CHUNK_TOKEN_BUDGET) and (ops_in_chunk >= MIN_OPS_PER_CHUNK):
                flush_chunk()

            if block_tokens > CHUNK_TOKEN_BUDGET and ops_in_chunk > 0:
                flush_chunk()

            chunk_lines.append(block)
            chunk_tokens += block_tokens
            ops_in_chunk += 1

            manifest["ops_index"].append({
                "tag": tag,
                "file": f"categories/{slug(tag)}/{slug(tag)}--chunk-{chunk_idx:03d}.md",
                "method": method,
                "path": path,
                "operationId": op.get("operationId", ""),
                "schema_refs": refs
            })

        flush_chunk()
        manifest["groups"][tag] = chunk_files
        if chunk_files:
            index_lines.append(f"- **{tag}** → " + ", ".join(f"[{Path(f).name}](./{f})" for f in chunk_files))

    (OUT_DIR / "00-index.md").write_text("\n".join(index_lines) + "\n", encoding="utf-8")
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"[OK] Generated into: {OUT_DIR}")
    print(f"      - {OUT_DIR}/00-index.md")
    print(f"      - {OUT_DIR}/manifest.json")

if __name__ == "__main__":
    build()
