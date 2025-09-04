#!/usr/bin/env node

/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

/**
 * Fix CommonJS imports - remove .js extensions from require() calls in all CommonJS files
 */

function fixJsImportsInFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const fixedContent = content.replace(/require\("([^"]+)\.js"\)/g, 'require("$1")');
    
    if (content !== fixedContent) {
      writeFileSync(filePath, fixedContent, 'utf-8');
      // eslint-disable-next-line no-console
      console.log('✅ Fixed CommonJS imports in', filePath);
      return true;
    }
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error fixing CommonJS imports in', filePath, ':', error.message);
    return false;
  }
}

function fixJsImportsInDirectory(dirPath) {
  let fixedCount = 0;
  
  try {
    const entries = readdirSync(dirPath);
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        fixedCount += fixJsImportsInDirectory(fullPath);
      } else if (extname(entry) === '.js') {
        if (fixJsImportsInFile(fullPath)) {
          fixedCount++;
        }
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error processing directory', dirPath, ':', error.message);
  }
  
  return fixedCount;
}

// Fix the main CJS file
const mainCjsFile = join(process.cwd(), 'dist/index.cjs');
let totalFixed = 0;

if (fixJsImportsInFile(mainCjsFile)) {
  totalFixed++;
}

// Fix all files in dist-cjs directory
const distCjsDir = join(process.cwd(), 'dist-cjs');
totalFixed += fixJsImportsInDirectory(distCjsDir);

// eslint-disable-next-line no-console
console.log(`🎯 Fixed CommonJS imports in ${totalFixed} files`);