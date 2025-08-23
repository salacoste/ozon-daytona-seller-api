# Source Tree Integration

## Existing Project Structure
```
src/
├── categories/
│   └── product/                    # Existing - Product API category
│       └── index.ts
├── core/                          # Shared infrastructure (no changes)
│   ├── auth.ts
│   ├── client.ts
│   ├── errors.ts
│   ├── http.ts
│   └── types.ts
├── types/
│   ├── common/
│   │   └── base.ts               # Extended with new branded types
│   ├── requests/
│   │   └── product.ts            # Existing - unchanged
│   └── responses/
│       └── product.ts            # Existing - unchanged
└── index.ts                      # Main exports - extended
```

## New File Organization
```
src/
├── categories/
│   ├── product/                   # Existing - unchanged
│   │   └── index.ts
│   ├── analytics/                 # New category
│   │   └── index.ts
│   ├── finance/                   # New category
│   │   └── index.ts
│   ├── posting/                   # New category
│   │   └── index.ts
│   ├── returns/                   # New category
│   │   └── index.ts
│   ├── stocks/                    # New category
│   │   └── index.ts
│   └── [...28 more categories]/   # Following same pattern
│       └── index.ts
├── types/
│   ├── requests/
│   │   ├── product.ts            # Existing - unchanged
│   │   ├── analytics.ts          # New request types
│   │   ├── finance.ts            # New request types
│   │   └── [...29 more].ts       # One per new category
│   └── responses/
│       ├── product.ts            # Existing - unchanged
│       ├── analytics.ts          # New response types
│       ├── finance.ts            # New response types
│       └── [...29 more].ts       # One per new category
```

## Integration Guidelines
- **File Naming:** Continue existing kebab-case for category folders, PascalCase for TypeScript files
- **Folder Organization:** Each category gets `/src/categories/{category-name}/index.ts` structure  
- **Import/Export Patterns:** Maintain existing barrel export pattern from `/src/index.ts`
