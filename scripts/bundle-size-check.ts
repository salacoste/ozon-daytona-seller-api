#!/usr/bin/env node

/**
 * Bundle Size Validation Script
 * Validates NFR5: Tree-shaking support and reasonable bundle sizes
 * Prevents bundle size explosion (STOP-SHIP #9)
 */

/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bundle size limits (bytes)
const LIMITS = {
  ESM_MAIN: 500 * 1024,        // 500KB for main ESM bundle
  CJS_MAIN: 500 * 1024,        // 500KB for main CommonJS bundle
  TOTAL_PACKAGE: 5 * 1024 * 1024, // 5MB for total package
  INDIVIDUAL_CATEGORY: 100 * 1024   // 100KB per category (future use)
};

interface FileInfo {
  bytes: number;
  kb: number;
  type: string;
}

interface ValidationResults {
  passed: boolean;
  errors: string[];
  warnings: string[];
  sizes: Record<string, FileInfo>;
}

class BundleSizeChecker {
  private readonly projectRoot: string;
  private readonly distPath: string;
  private readonly results: ValidationResults;

  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.distPath = path.join(this.projectRoot, 'dist');
    this.results = {
      passed: true,
      errors: [],
      warnings: [],
      sizes: {}
    };
  }

  async check(): Promise<ValidationResults> {
    console.log('📦 Bundle Size Validation Started');
    console.log('=====================================');

    if (!fs.existsSync(this.distPath)) {
      this.addError('dist/ folder not found. Run `npm run build` first.');
      return this.results;
    }

    await this.checkMainBundles();
    await this.checkPackageStructure();
    await this.checkTreeShakingSupport();
    await this.generateReport();

    return this.results;
  }

  private async checkMainBundles(): Promise<void> {
    console.log('\n🔍 Checking main bundle files...');

    const files = [
      { name: 'index.js', limit: LIMITS.ESM_MAIN, type: 'ESM' },
      { name: 'index.cjs', limit: LIMITS.CJS_MAIN, type: 'CommonJS' },
      { name: 'index.d.ts', limit: 50 * 1024, type: 'TypeScript Definitions' }
    ];

    for (const file of files) {
      const filePath = path.join(this.distPath, file.name);
      
      if (!fs.existsSync(filePath)) {
        this.addError(`Missing ${file.type} bundle: ${file.name}`);
        continue;
      }

      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      
      this.results.sizes[file.name] = {
        bytes: stats.size,
        kb: parseFloat(sizeKB),
        type: file.type
      };

      if (stats.size > file.limit) {
        this.addError(`${file.type} bundle too large: ${sizeKB}KB (limit: ${(file.limit/1024).toFixed(0)}KB)`);
      } else {
        console.log(`  ✅ ${file.name}: ${sizeKB}KB`);
      }
    }
  }

  private async checkPackageStructure(): Promise<void> {
    console.log('\n🔍 Checking package structure...');

    const expectedStructure = [
      'core',
      'categories', 
      'types'
    ];

    for (const dir of expectedStructure) {
      const dirPath = path.join(this.distPath, dir);
      if (!fs.existsSync(dirPath)) {
        this.addError(`Missing expected directory: ${dir}/`);
      } else {
        console.log(`  ✅ ${dir}/ exists`);
      }
    }

    // Check for unexpected large files
    await this.checkForLargeFiles(this.distPath);
  }

  private async checkForLargeFiles(directory: string, maxSize = 200 * 1024): Promise<void> {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        await this.checkForLargeFiles(fullPath, maxSize);
      } else if (file.isFile() && file.name.endsWith('.js')) {
        const stats = fs.statSync(fullPath);
        const relativePath = path.relative(this.distPath, fullPath);
        
        if (stats.size > maxSize) {
          this.addWarning(`Large file detected: ${relativePath} (${(stats.size/1024).toFixed(2)}KB)`);
        }
      }
    }
  }

  private async checkTreeShakingSupport(): Promise<void> {
    console.log('\n🔍 Checking tree-shaking support...');

    // Check package.json exports
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as Record<string, unknown>;

    // Verify module field for tree-shaking
    if (packageJson.type !== 'module') {
      this.addWarning('package.json type is not "module" - may impact tree-shaking');
    }

    // Check exports field
    if (!packageJson.exports) {
      this.addError('Missing exports field in package.json - tree-shaking not supported');
    } else {
      console.log('  ✅ exports field present');
      
      const mainExport = (packageJson.exports as Record<string, unknown>)['.'] as Record<string, unknown> | undefined;
      if (!mainExport || !mainExport.import) {
        this.addError('Missing ESM import in exports - tree-shaking not supported');
      } else {
        console.log('  ✅ ESM import path configured');
      }
    }

    // Check for sideEffects field
    if (packageJson.sideEffects === undefined) {
      this.addWarning('Missing sideEffects field - add "sideEffects": false for better tree-shaking');
    } else if (packageJson.sideEffects === false) {
      console.log('  ✅ sideEffects: false - optimal for tree-shaking');
    }
  }

  private async generateReport(): Promise<void> {
    console.log('\n📊 Bundle Size Report');
    console.log('=====================');

    let totalSize = 0;
    for (const [filename, info] of Object.entries(this.results.sizes)) {
      totalSize += info.bytes;
      console.log(`${filename.padEnd(15)} ${info.kb.toString().padStart(8)}KB (${info.type})`);
    }

    const totalKB = (totalSize / 1024).toFixed(2);
    console.log(`${'TOTAL'.padEnd(15)} ${totalKB.toString().padStart(8)}KB`);

    if (totalSize > LIMITS.TOTAL_PACKAGE) {
      this.addError(`Total bundle size too large: ${totalKB}KB (limit: ${(LIMITS.TOTAL_PACKAGE/1024/1024).toFixed(0)}MB)`);
    }

    // Generate bundle analysis
    this.generateBundleAnalysis();
  }

  private generateBundleAnalysis(): void {
    console.log('\n💡 Recommendations');
    console.log('==================');

    if (this.results.warnings.length === 0 && this.results.errors.length === 0) {
      console.log('✅ All bundle size checks passed!');
      return;
    }

    if ((this.results.sizes['index.js']?.kb ?? 0) > 300) {
      console.log('📝 Consider code splitting for large bundles');
    }

    if (!this.hasTreeShakingOptimizations()) {
      console.log('📝 Optimize package.json for better tree-shaking');
    }

    console.log('📝 Monitor bundle size growth with each category addition');
  }

  private hasTreeShakingOptimizations(): boolean {
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as Record<string, unknown>;
    
    return packageJson.sideEffects === false && 
           Boolean(packageJson.exports) && 
           packageJson.type === 'module';
  }

  private addError(message: string): void {
    this.results.errors.push(message);
    this.results.passed = false;
    console.log(`  ❌ ${message}`);
  }

  private addWarning(message: string): void {
    this.results.warnings.push(message);
    console.log(`  ⚠️  ${message}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const checker = new BundleSizeChecker();
  const results = await checker.check();

  console.log(`\n${'='.repeat(50)}`);
  if (results.passed) {
    console.log('✅ Bundle size validation PASSED');
    process.exit(0);
  } else {
    console.log('❌ Bundle size validation FAILED');
    console.log(`Errors: ${results.errors.length}`);
    console.log(`Warnings: ${results.warnings.length}`);
    process.exit(1);
  }
}

export default BundleSizeChecker;