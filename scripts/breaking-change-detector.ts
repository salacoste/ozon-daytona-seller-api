#!/usr/bin/env node

/**
 * Breaking Change Detection Script
 * Prevents breaking changes to existing Product API (STOP-SHIP #8)
 * Validates export structure compatibility and API surface preservation
 */

/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ApiMethod {
  name: string;
  signature: string;
  returnType: string;
}

interface ApiClass {
  name: string;
  methods: ApiMethod[];
  exports: string[];
}

interface CompatibilityReport {
  passed: boolean;
  errors: string[];
  warnings: string[];
  baseline: ApiClass[];
  current: ApiClass[];
}

class BreakingChangeDetector {
  private readonly projectRoot: string;
  private readonly baselinePath: string;
  private readonly currentPath: string;

  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.baselinePath = path.join(this.projectRoot, '.baseline', 'api-surface.json');
    this.currentPath = path.join(this.projectRoot, 'dist');
  }

  async checkCompatibility(): Promise<CompatibilityReport> {
    console.log('🔍 Breaking Change Detection Started');
    console.log('====================================');

    const report: CompatibilityReport = {
      passed: true,
      errors: [],
      warnings: [],
      baseline: [],
      current: []
    };

    // Load or create baseline
    const baseline = await this.loadOrCreateBaseline();
    
    // Analyze current API surface
    const current = await this.analyzeCurrentApiSurface();

    report.baseline = baseline;
    report.current = current;

    // Compare APIs
    this.compareApiSurfaces(baseline, current, report);

    return report;
  }

  private async loadOrCreateBaseline(): Promise<ApiClass[]> {
    if (!fs.existsSync(this.baselinePath)) {
      console.log('📝 Creating API surface baseline...');
      
      // Create baseline directory
      const baselineDir = path.dirname(this.baselinePath);
      if (!fs.existsSync(baselineDir)) {
        fs.mkdirSync(baselineDir, { recursive: true });
      }

      // Analyze current state as baseline
      const baseline = await this.analyzeCurrentApiSurface();
      
      // Save baseline
      fs.writeFileSync(this.baselinePath, JSON.stringify(baseline, null, 2));
      
      console.log(`✅ Baseline created with ${baseline.length} API classes`);
      return baseline;
    }

    console.log('📖 Loading existing baseline...');
    const baselineContent = fs.readFileSync(this.baselinePath, 'utf-8');
    return JSON.parse(baselineContent) as ApiClass[];
  }

  private async analyzeCurrentApiSurface(): Promise<ApiClass[]> {
    const apiClasses: ApiClass[] = [];

    // Check if dist exists
    if (!fs.existsSync(this.currentPath)) {
      console.log('⚠️  dist/ folder not found, analyzing source...');
      return this.analyzeSourceApiSurface();
    }

    // Analyze main exports
    const indexPath = path.join(this.currentPath, 'index.d.ts');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      apiClasses.push(this.analyzeTypeDefinitions('index', indexContent));
    }

    // Analyze ProductApi specifically
    const productApiPath = path.join(this.currentPath, 'categories', 'product', 'index.d.ts');
    if (fs.existsSync(productApiPath)) {
      const productApiContent = fs.readFileSync(productApiPath, 'utf-8');
      apiClasses.push(this.analyzeTypeDefinitions('ProductApi', productApiContent));
    }

    return apiClasses;
  }

  private async analyzeSourceApiSurface(): Promise<ApiClass[]> {
    const apiClasses: ApiClass[] = [];

    // Analyze ProductApi from source
    const productApiPath = path.join(this.projectRoot, 'src', 'categories', 'product', 'index.ts');
    if (fs.existsSync(productApiPath)) {
      const productApiContent = fs.readFileSync(productApiPath, 'utf-8');
      apiClasses.push(this.analyzeSourceFile('ProductApi', productApiContent));
    }

    // Analyze main index exports
    const indexPath = path.join(this.projectRoot, 'src', 'index.ts');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      apiClasses.push(this.analyzeSourceFile('index', indexContent));
    }

    return apiClasses;
  }

  private analyzeTypeDefinitions(className: string, content: string): ApiClass {
    const methods: ApiMethod[] = [];
    const exports: string[] = [];

    // Extract method signatures from .d.ts files
    const methodRegex = /^\s*(\w+)\s*\([^)]*\)\s*:\s*([^;]+);/gm;
    let match;

    while ((match = methodRegex.exec(content)) !== null) {
      methods.push({
        name: match[1]!,
        signature: match[0]!.trim(),
        returnType: match[2]!.trim()
      });
    }

    // Extract exports
    const exportRegex = /^export\s+(?:(?:declare\s+)?(?:class|interface|type|const|function)\s+(\w+)|{\s*([^}]+)\s*})/gm;
    while ((match = exportRegex.exec(content)) !== null) {
      if (match[1]) {
        exports.push(match[1]);
      } else if (match[2]) {
        // Handle named exports
        const namedExports = match[2].split(',').map(e => e.trim().split(/\s+/)[0]!);
        exports.push(...namedExports);
      }
    }

    return {
      name: className,
      methods,
      exports
    };
  }

  private analyzeSourceFile(className: string, content: string): ApiClass {
    const methods: ApiMethod[] = [];
    const exports: string[] = [];

    // Extract public methods from TypeScript source
    const methodRegex = /^\s*public\s+(?:async\s+)?(\w+)\s*\([^)]*\)\s*:\s*([^{]+)\s*{/gm;
    let match;

    while ((match = methodRegex.exec(content)) !== null) {
      methods.push({
        name: match[1]!,
        signature: match[0]!.split('{')[0]!.trim(),
        returnType: match[2]!.trim()
      });
    }

    // Extract exports
    const exportRegex = /^export\s+(?:(?:class|interface|type|const|function)\s+(\w+)|{\s*([^}]+)\s*})/gm;
    while ((match = exportRegex.exec(content)) !== null) {
      if (match[1]) {
        exports.push(match[1]);
      } else if (match[2]) {
        const namedExports = match[2].split(',').map(e => e.trim().split(/\s+/)[0]!);
        exports.push(...namedExports);
      }
    }

    return {
      name: className,
      methods,
      exports
    };
  }

  private compareApiSurfaces(baseline: ApiClass[], current: ApiClass[], report: CompatibilityReport): void {
    console.log('\n🔍 Comparing API surfaces...');

    for (const baselineClass of baseline) {
      const currentClass = current.find(c => c.name === baselineClass.name);
      
      if (!currentClass) {
        this.addError(report, `API class removed: ${baselineClass.name}`);
        continue;
      }

      // Compare methods
      this.compareMethods(baselineClass, currentClass, report);
      
      // Compare exports
      this.compareExports(baselineClass, currentClass, report);
    }

    // Check for new classes (not necessarily breaking, but worth noting)
    for (const currentClass of current) {
      const baselineClass = baseline.find(c => c.name === currentClass.name);
      if (!baselineClass) {
        this.addWarning(report, `New API class added: ${currentClass.name}`);
      }
    }

    this.generateCompatibilityReport(report);
  }

  private compareMethods(baseline: ApiClass, current: ApiClass, report: CompatibilityReport): void {
    for (const baselineMethod of baseline.methods) {
      const currentMethod = current.methods.find(m => m.name === baselineMethod.name);
      
      if (!currentMethod) {
        this.addError(report, `Method removed: ${baseline.name}.${baselineMethod.name}`);
        continue;
      }

      // Check if signature changed (simplified check)
      if (this.normalizeSignature(baselineMethod.signature) !== this.normalizeSignature(currentMethod.signature)) {
        this.addError(report, `Method signature changed: ${baseline.name}.${baselineMethod.name}`);
        console.log(`  Baseline: ${baselineMethod.signature}`);
        console.log(`  Current:  ${currentMethod.signature}`);
      }

      // Check return type
      if (baselineMethod.returnType !== currentMethod.returnType) {
        this.addError(report, `Return type changed: ${baseline.name}.${baselineMethod.name}`);
        console.log(`  Baseline return: ${baselineMethod.returnType}`);
        console.log(`  Current return:  ${currentMethod.returnType}`);
      }
    }

    // Check for new methods (not breaking, but worth noting)
    for (const currentMethod of current.methods) {
      const baselineMethod = baseline.methods.find(m => m.name === currentMethod.name);
      if (!baselineMethod) {
        this.addWarning(report, `New method added: ${current.name}.${currentMethod.name}`);
      }
    }
  }

  private compareExports(baseline: ApiClass, current: ApiClass, report: CompatibilityReport): void {
    for (const baselineExport of baseline.exports) {
      if (!current.exports.includes(baselineExport)) {
        this.addError(report, `Export removed: ${baselineExport}`);
      }
    }

    // New exports are generally not breaking
    for (const currentExport of current.exports) {
      if (!baseline.exports.includes(currentExport)) {
        this.addWarning(report, `New export added: ${currentExport}`);
      }
    }
  }

  private normalizeSignature(signature: string): string {
    return signature
      .replace(/\s+/g, ' ')
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*\(\s*/g, '(')
      .replace(/\s*\)\s*/g, ')')
      .trim();
  }

  private generateCompatibilityReport(report: CompatibilityReport): void {
    console.log('\n📊 Compatibility Report');
    console.log('========================');

    if (report.errors.length === 0) {
      console.log('✅ No breaking changes detected');
    } else {
      console.log(`❌ ${report.errors.length} breaking changes found:`);
      report.errors.forEach(error => console.log(`   • ${error}`));
    }

    if (report.warnings.length > 0) {
      console.log(`\n⚠️  ${report.warnings.length} non-breaking changes:`);
      report.warnings.forEach(warning => console.log(`   • ${warning}`));
    }

    console.log(`\nAPI Classes analyzed: ${report.current.length}`);
    console.log(`Total methods: ${report.current.reduce((sum, cls) => sum + cls.methods.length, 0)}`);
    console.log(`Total exports: ${report.current.reduce((sum, cls) => sum + cls.exports.length, 0)}`);
  }

  private addError(report: CompatibilityReport, message: string): void {
    report.errors.push(message);
    report.passed = false;
    console.log(`  ❌ ${message}`);
  }

  private addWarning(report: CompatibilityReport, message: string): void {
    report.warnings.push(message);
    console.log(`  ⚠️  ${message}`);
  }

  async updateBaseline(): Promise<void> {
    console.log('📝 Updating API surface baseline...');
    
    const current = await this.analyzeCurrentApiSurface();
    
    // Create baseline directory if it doesn't exist
    const baselineDir = path.dirname(this.baselinePath);
    if (!fs.existsSync(baselineDir)) {
      fs.mkdirSync(baselineDir, { recursive: true });
    }
    
    fs.writeFileSync(this.baselinePath, JSON.stringify(current, null, 2));
    console.log('✅ Baseline updated successfully');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const detector = new BreakingChangeDetector();
  
  const command = process.argv[2];
  
  if (command === 'update-baseline') {
    await detector.updateBaseline();
  } else {
    const report = await detector.checkCompatibility();
    
    console.log(`\n${'='.repeat(50)}`);
    if (report.passed) {
      console.log('✅ Breaking change detection PASSED');
      process.exit(0);
    } else {
      console.log('❌ Breaking changes detected!');
      console.log('Run with "update-baseline" to accept current state as new baseline.');
      process.exit(1);
    }
  }
}

export default BreakingChangeDetector;