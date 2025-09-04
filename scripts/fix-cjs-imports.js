#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Simple CommonJS import fixer - just remove .js extensions from require() calls
 */

const cjsFilePath = join(process.cwd(), 'dist/index.cjs');

try {
  // Read the current content
  const content = readFileSync(cjsFilePath, 'utf-8');
  
  // Replace .js imports - remove .js extension for CommonJS
  const fixedContent = content.replace(/require\("\.\/([^"]+)\.js"\)/g, 'require("./$1")');
  
  // Write the fixed content back
  writeFileSync(cjsFilePath, fixedContent, 'utf-8');
  
  // eslint-disable-next-line no-console
  console.log('✅ Fixed CommonJS imports in', cjsFilePath);
  
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('❌ Error fixing CommonJS imports:', error.message);
  process.exit(1);
}