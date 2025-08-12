#!/usr/bin/env tsx
/**
 * Code generation script for Ozon Seller API TypeScript SDK
 * 
 * This script parses the API documentation files and generates TypeScript types
 * from the OpenAPI schemas. It processes:
 * 1. INDEX.json - API statistics and file organization
 * 2. components/schemas-part-*.json - Schema definitions 
 * 3. methods/*.json - API endpoint definitions (P0 groups first)
 * 
 * Generated outputs:
 * - src/types/generated/ - TypeScript type definitions
 * - Type mappings and utilities for client code
 */

import path from 'path';
import { CodeGenerator } from './codegen/generator';

// Configuration
const API_DOC_ROOT = path.join(process.cwd(), 'api-doc/ozon-api-documentation');
const OUTPUT_ROOT = path.join(process.cwd(), 'src/types/generated');

// Run if called directly
async function main() {
  if (import.meta.url === `file://${process.argv[1]}`) {
    const generator = new CodeGenerator(API_DOC_ROOT, OUTPUT_ROOT);
    await generator.generate();
  }
}

main().catch(console.error);

export { CodeGenerator };