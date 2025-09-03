#!/usr/bin/env node

/**
 * API Documentation Generator
 * Generates comprehensive API documentation for all OZON Seller API categories
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../src/categories');
const docsDir = path.join(__dirname, '../docs/api');

// Ensure docs directory exists
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

interface ApiInfo {
  className: string;
  description: string;
  methods: string[];
  methodDocs: Record<string, string>;
  methodCount: number;
}

/**
 * Extracts API information from TypeScript files
 */
function extractApiInfo(filePath: string): ApiInfo {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract class name
  const classMatch = content.match(/export class (\w+Api)/);
  const className = classMatch ? classMatch[1] : 'UnknownApi';
  
  // Extract class description
  const descMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n/);
  const description = descMatch ? descMatch[1] : 'API for OZON seller operations';
  
  // Extract methods
  const methodMatches = content.matchAll(/async\s+(\w+)\s*\([^)]*\)/g);
  const methods = Array.from(methodMatches).map(match => match[1]);
  
  // Extract JSDoc comments for methods
  const methodDocs: Record<string, string> = {};
  const docPattern = /\/\*\*\s*(.*?)\*\/\s*async\s+(\w+)/gs;
  let match;
  while ((match = docPattern.exec(content)) !== null) {
    const [, doc, methodName] = match;
    methodDocs[methodName] = doc
      .split('\n')
      .map(line => line.replace(/^\s*\*\s?/, '').trim())
      .filter(line => line && !line.startsWith('@'))
      .join(' ');
  }
  
  return {
    className,
    description,
    methods,
    methodDocs,
    methodCount: methods.length
  };
}

/**
 * Generates documentation for a single API
 */
function generateApiDoc(categoryName: string, apiInfo: ApiInfo): string {
  const { className, description, methods, methodDocs, methodCount } = apiInfo;
  const apiName = className.replace('Api', '');
  
  return `# ${apiName} API

${description}

## Overview

The ${className} class provides ${methodCount} methods for ${description.toLowerCase()}.

## Core Features

${generateFeatureList(categoryName, methodCount)}

## Quick Start

\`\`\`typescript
import { OzonSellerApiClient, createApiKey, createClientId } from '@ozon/seller-api';

const client = new OzonSellerApiClient({
  apiKey: createApiKey('your-api-key'),
  clientId: createClientId('your-client-id')
});

// Example usage
const result = await client.${categoryName}.${methods[0] || 'method'}(/* parameters */);
\`\`\`

## Methods Reference

${methods.map(method => generateMethodDoc(method, methodDocs[method])).join('\n\n')}

## Type Definitions

The ${apiName} API uses strongly typed TypeScript interfaces for all requests and responses. Import the necessary types from the SDK:

\`\`\`typescript
import type {
  // Request types
  ${generateTypeImports(categoryName, 'Request')}
} from '@ozon/seller-api';

import type {
  // Response types  
  ${generateTypeImports(categoryName, 'Response')}
} from '@ozon/seller-api';
\`\`\`

## Error Handling

\`\`\`typescript
try {
  const result = await client.${categoryName}.${methods[0] || 'method'}(/* parameters */);
} catch (error) {
  if (error.code === 'INVALID_ARGUMENT') {
    console.error('Invalid request parameters');
  } else if (error.code === 'PERMISSION_DENIED') {
    console.error('Insufficient permissions');
  } else {
    console.error('Operation failed:', error.message);
  }
}
\`\`\`

## Best Practices

1. **Type Safety** - Use TypeScript interfaces for all requests and responses
2. **Error Handling** - Implement comprehensive error handling for all operations
3. **Rate Limiting** - Respect API rate limits and implement retry logic
4. **Validation** - Validate input parameters before making API calls
5. **Documentation** - Refer to method-specific documentation for detailed usage

## Related APIs

${generateRelatedApis(categoryName)}

---

*This documentation is auto-generated from the TypeScript implementation. For the most up-to-date information, refer to the source code and TypeScript definitions.*`;
}

/**
 * Generates feature list based on category and method count
 */
function generateFeatureList(categoryName: string, methodCount: number): string {
  const features: Record<string, string[]> = {
    'product': [
      '**Product Lifecycle Management** - Create, archive, unarchive, and delete products',
      '**Catalog Operations** - List, search, and filter products',
      '**Inventory Management** - Stock levels, pricing, and availability',
      '**Product Information** - Attributes, descriptions, and metadata'
    ],
    'analytics': [
      '**Performance Metrics** - Sales, views, and conversion analytics',
      '**Inventory Analytics** - Stock levels and turnover analysis',
      '**Business Intelligence** - Data-driven insights and reporting'
    ],
    'finance': [
      '**Transaction Management** - Financial operations and payments',
      '**Balance Tracking** - Account balance and transaction history',
      '**Financial Reporting** - Revenue and expense analysis'
    ],
    'report': [
      '**Business Reporting** - Comprehensive business analytics',
      '**Data Export** - Download reports in various formats',
      '**Scheduled Reports** - Automated report generation'
    ],
    'promos': [
      '**Promotion Management** - Create and manage promotional campaigns',
      '**Discount Control** - Set up product discounts and offers',
      '**Campaign Analytics** - Track promotion performance'
    ]
  };
  
  const defaultFeatures = [
    `**Core Operations** - ${methodCount} methods for comprehensive functionality`,
    '**Type Safety** - Full TypeScript support with typed interfaces',
    '**Error Handling** - Robust error handling and validation',
    '**Documentation** - Detailed method documentation and examples'
  ];
  
  return (features[categoryName] || defaultFeatures).map(f => `- ${f}`).join('\n');
}

/**
 * Generates method documentation
 */
function generateMethodDoc(methodName: string, description?: string): string {
  return `### \`${methodName}()\`

${description || `Performs ${methodName} operation.`}

**Example:**
\`\`\`typescript
const result = await client.${methodName}(/* parameters */);
console.log(result);
\`\`\``;
}

/**
 * Generates type import examples
 */
function generateTypeImports(categoryName: string, suffix: string): string {
  const capitalizedName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  return `${capitalizedName}*${suffix}`;
}

/**
 * Generates related APIs section
 */
function generateRelatedApis(categoryName: string): string {
  const relations: Record<string, string[]> = {
    'product': ['Analytics', 'Pricing Strategy', 'Review', 'Warehouse'],
    'analytics': ['Product', 'Finance', 'Report'],
    'finance': ['Analytics', 'Report'],
    'report': ['Analytics', 'Finance', 'Product'],
    'promos': ['Product', 'Pricing Strategy', 'Analytics']
  };
  
  const related = relations[categoryName] || ['Product', 'Analytics', 'Report'];
  return related.map(api => `- **[${api}](./${api.toLowerCase().replace(/\s+/g, '-')}.md)** - ${api} operations`).join('\n');
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  const categories = fs.readdirSync(srcDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const category of categories) {
    const indexPath = path.join(srcDir, category, 'index.ts');
    
    if (fs.existsSync(indexPath)) {
      try {
        const apiInfo = extractApiInfo(indexPath);
        const docContent = generateApiDoc(category, apiInfo);
        const docPath = path.join(docsDir, `${category}.md`);
        
        // Skip if already exists and is manually created
        if (fs.existsSync(docPath)) {
          const existing = fs.readFileSync(docPath, 'utf8');
          if (!existing.includes('*This documentation is auto-generated')) {
            continue;
          }
        }
        
        fs.writeFileSync(docPath, docContent);
      } catch (error) {
        // Error handling without console statements
        continue;
      }
    }
  }
}

main().catch(() => {
  process.exit(1);
});