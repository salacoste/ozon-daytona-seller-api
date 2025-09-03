#!/usr/bin/env node

/**
 * Technical Debt Tracking and Monitoring System
 * Tracks, analyzes, and reports technical debt accumulation
 * Prevents technical debt explosion during brownfield expansion (STOP-SHIP #20-23)
 */

/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TechnicalDebtItem {
  id: string;
  type: 'code-smell' | 'todo' | 'hack' | 'deprecation' | 'performance' | 'security' | 'maintainability';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  location: {
    file: string;
    line?: number;
    function?: string;
  };
  estimatedEffort: string; // in hours/days
  impact: string;
  createdDate: string;
  dueDate?: string;
  assignee?: string;
  tags: string[];
  relatedIssues: string[];
}

interface DebtMetrics {
  totalItems: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  estimatedEffort: {
    total: number; // in hours
    byType: Record<string, number>;
  };
  trends: {
    weeklyChange: number;
    monthlyChange: number;
    categories: string[];
  };
}

interface DebtReport {
  projectName: string;
  reportDate: string;
  metrics: DebtMetrics;
  items: TechnicalDebtItem[];
  recommendations: string[];
  actionItems: string[];
}

class TechnicalDebtTracker {
  private readonly projectRoot: string;
  private readonly debtPath: string;
  private readonly reportsPath: string;

  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.debtPath = path.join(this.projectRoot, '.debt', 'items.json');
    this.reportsPath = path.join(this.projectRoot, '.debt', 'reports');
  }

  async scanAndTrack(): Promise<DebtReport> {
    console.log('🔍 Technical Debt Scan Started');
    console.log('===============================');

    // Ensure debt tracking directory exists
    const debtDir = path.dirname(this.debtPath);
    if (!fs.existsSync(debtDir)) {
      fs.mkdirSync(debtDir, { recursive: true });
    }
    if (!fs.existsSync(this.reportsPath)) {
      fs.mkdirSync(this.reportsPath, { recursive: true });
    }

    // Load existing debt items
    const existingItems = this.loadExistingItems();

    // Scan codebase for new debt
    const scannedItems = await this.scanCodebase();

    // Merge and deduplicate
    const allItems = this.mergeDebtItems(existingItems, scannedItems);

    // Calculate metrics
    const metrics = this.calculateMetrics(allItems);

    // Generate report
    const report: DebtReport = {
      projectName: '@spacechemical/ozon-seller-api',
      reportDate: new Date().toISOString(),
      metrics,
      items: allItems,
      recommendations: this.generateRecommendations(allItems, metrics),
      actionItems: this.generateActionItems(allItems, metrics)
    };

    // Save updated items and report
    await this.saveDebtItems(allItems);
    await this.saveReport(report);

    this.displayReport(report);

    return report;
  }

  private loadExistingItems(): TechnicalDebtItem[] {
    if (!fs.existsSync(this.debtPath)) {
      return [];
    }

    try {
      const content = fs.readFileSync(this.debtPath, 'utf-8');
      return JSON.parse(content) as TechnicalDebtItem[];
    } catch (error) {
      console.warn('⚠️  Could not load existing debt items, starting fresh');
      return [];
    }
  }

  private async scanCodebase(): Promise<TechnicalDebtItem[] > {
    console.log('🔍 Scanning codebase for technical debt...');
    
    const items: TechnicalDebtItem[] = [];
    const srcDir = path.join(this.projectRoot, 'src');

    if (!fs.existsSync(srcDir)) {
      console.warn('⚠️  src/ directory not found');
      return items;
    }

    // Scan TypeScript files
    const tsFiles = this.findFiles(srcDir, '.ts');
    
    for (const file of tsFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const fileItems = this.analyzeFile(file, content);
      items.push(...fileItems);
    }

    console.log(`✅ Scanned ${tsFiles.length} files, found ${items.length} debt items`);
    return items;
  }

  private findFiles(dir: string, extension: string): string[] {
    const files: string[] = [];
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
        files.push(...this.findFiles(fullPath, extension));
      } else if (entry.isFile() && entry.name.endsWith(extension)) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  private analyzeFile(filePath: string, content: string): TechnicalDebtItem[] {
    const items: TechnicalDebtItem[] = [];
    const lines = content.split('\n');
    const relativePath = path.relative(this.projectRoot, filePath);

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmed = line.trim();

      // TODO comments
      if (trimmed.includes('TODO') || trimmed.includes('FIXME') || trimmed.includes('HACK')) {
        items.push(this.createDebtItem({
          type: trimmed.includes('HACK') ? 'hack' : 'todo',
          severity: this.determineSeverity(trimmed),
          description: this.extractComment(trimmed),
          location: { file: relativePath, line: lineNumber },
          estimatedEffort: this.estimateEffort(trimmed),
          tags: this.extractTags(trimmed)
        }));
      }

      // Code smells
      if (this.isCodeSmell(trimmed)) {
        items.push(this.createDebtItem({
          type: 'code-smell',
          severity: 'MEDIUM',
          description: `Code smell detected: ${this.identifySmell(trimmed)}`,
          location: { file: relativePath, line: lineNumber },
          estimatedEffort: '2h',
          tags: ['code-quality']
        }));
      }

      // Security concerns  
      if (this.isSecurityConcern(trimmed)) {
        items.push(this.createDebtItem({
          type: 'security',
          severity: 'HIGH',
          description: `Security concern: ${this.identifySecurityIssue(trimmed)}`,
          location: { file: relativePath, line: lineNumber },
          estimatedEffort: '4h',
          tags: ['security']
        }));
      }

      // Performance issues
      if (this.isPerformanceIssue(trimmed)) {
        items.push(this.createDebtItem({
          type: 'performance',
          severity: 'MEDIUM',
          description: `Performance issue: ${this.identifyPerformanceIssue(trimmed)}`,
          location: { file: relativePath, line: lineNumber },
          estimatedEffort: '3h',
          tags: ['performance']
        }));
      }
    });

    return items;
  }

  private createDebtItem(params: Partial<TechnicalDebtItem>): TechnicalDebtItem {
    const id = `debt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id,
      type: params.type || 'maintainability',
      severity: params.severity || 'LOW',
      description: params.description || 'Technical debt item',
      location: params.location || { file: 'unknown' },
      estimatedEffort: params.estimatedEffort || '1h',
      impact: params.impact || 'Low impact on maintainability',
      createdDate: new Date().toISOString(),
      tags: params.tags || [],
      relatedIssues: params.relatedIssues || []
    };
  }

  private determineSeverity(comment: string): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const lower = comment.toLowerCase();
    
    if (lower.includes('critical') || lower.includes('urgent') || lower.includes('security')) {
      return 'CRITICAL';
    }
    if (lower.includes('important') || lower.includes('hack') || lower.includes('fixme')) {
      return 'HIGH';
    }
    if (lower.includes('performance') || lower.includes('refactor')) {
      return 'MEDIUM';
    }
    
    return 'LOW';
  }

  private extractComment(line: string): string {
    const match = line.match(/(?:TODO|FIXME|HACK):?\s*(.+)/i);
    return match ? match[1].trim() : line.trim();
  }

  private estimateEffort(comment: string): string {
    const lower = comment.toLowerCase();
    
    if (lower.includes('refactor') || lower.includes('rewrite')) return '8h';
    if (lower.includes('complex') || lower.includes('difficult')) return '4h';  
    if (lower.includes('quick') || lower.includes('simple')) return '30m';
    
    return '2h';
  }

  private extractTags(comment: string): string[] {
    const tags: string[] = [];
    const lower = comment.toLowerCase();
    
    if (lower.includes('performance')) tags.push('performance');
    if (lower.includes('security')) tags.push('security');
    if (lower.includes('refactor')) tags.push('refactoring');
    if (lower.includes('test')) tags.push('testing');
    if (lower.includes('documentation') || lower.includes('docs')) tags.push('documentation');
    
    return tags;
  }

  private isCodeSmell(line: string): boolean {
    // Detect common code smells
    return (
      line.includes('any') && line.includes(':') || // TypeScript any usage
      line.length > 120 || // Long lines
      (line.includes('if') && line.includes('&&') && line.includes('||')) // Complex conditions
    );
  }

  private identifySmell(line: string): string {
    if (line.includes('any') && line.includes(':')) return 'TypeScript any usage';
    if (line.length > 120) return 'Long line (>120 characters)';
    if (line.includes('if') && line.includes('&&') && line.includes('||')) return 'Complex condition';
    return 'General code smell';
  }

  private isSecurityConcern(line: string): boolean {
    const lower = line.toLowerCase();
    return (
      lower.includes('password') && !lower.includes('hash') ||
      lower.includes('secret') && !lower.includes('env') ||
      lower.includes('api') && lower.includes('key') && lower.includes('=')
    );
  }

  private identifySecurityIssue(line: string): string {
    const lower = line.toLowerCase();
    if (lower.includes('password')) return 'Potential password exposure';
    if (lower.includes('secret')) return 'Potential secret exposure';
    if (lower.includes('api') && lower.includes('key')) return 'Potential API key exposure';
    return 'General security concern';
  }

  private isPerformanceIssue(line: string): boolean {
    return (
      line.includes('for') && line.includes('for') || // Nested loops
      line.includes('JSON.parse(JSON.stringify') || // Deep cloning
      line.includes('map') && line.includes('filter') // Chained array operations
    );
  }

  private identifyPerformanceIssue(line: string): string {
    if (line.includes('for') && line.includes('for')) return 'Nested loops detected';
    if (line.includes('JSON.parse(JSON.stringify')) return 'Inefficient deep cloning';
    if (line.includes('map') && line.includes('filter')) return 'Inefficient array operations';
    return 'General performance concern';
  }

  private mergeDebtItems(existing: TechnicalDebtItem[], scanned: TechnicalDebtItem[]): TechnicalDebtItem[] {
    const merged = [...existing];
    
    for (const scannedItem of scanned) {
      // Check if item already exists (by location and type)
      const existingIndex = merged.findIndex(item => 
        item.location.file === scannedItem.location.file &&
        item.location.line === scannedItem.location.line &&
        item.type === scannedItem.type
      );
      
      if (existingIndex === -1) {
        // New item
        merged.push(scannedItem);
      } else {
        // Update existing item (keep created date, update description)
        merged[existingIndex] = {
          ...merged[existingIndex],
          description: scannedItem.description,
          severity: scannedItem.severity,
          tags: [...new Set([...merged[existingIndex].tags, ...scannedItem.tags])]
        };
      }
    }
    
    return merged;
  }

  private calculateMetrics(items: TechnicalDebtItem[]): DebtMetrics {
    const byType: Record<string, number> = {};
    const bySeverity: Record<string, number> = {};
    const effortByType: Record<string, number> = {};
    let totalEffort = 0;

    for (const item of items) {
      // Count by type
      byType[item.type] = (byType[item.type] || 0) + 1;
      
      // Count by severity
      bySeverity[item.severity] = (bySeverity[item.severity] || 0) + 1;
      
      // Calculate effort
      const effort = this.parseEffort(item.estimatedEffort);
      totalEffort += effort;
      effortByType[item.type] = (effortByType[item.type] || 0) + effort;
    }

    return {
      totalItems: items.length,
      byType,
      bySeverity,
      estimatedEffort: {
        total: totalEffort,
        byType: effortByType
      },
      trends: {
        weeklyChange: 0, // TODO: Calculate from historical data
        monthlyChange: 0, // TODO: Calculate from historical data  
        categories: Object.keys(byType)
      }
    };
  }

  private parseEffort(effort: string): number {
    const match = effort.match(/(\d+(?:\.\d+)?)\s*(m|h|d)/);
    if (!match) return 1;

    const value = parseFloat(match[1]);
    const unit = match[2];

    switch (unit) {
      case 'm': return value / 60; // Convert minutes to hours
      case 'h': return value;
      case 'd': return value * 8; // Convert days to hours (8h/day)
      default: return value;
    }
  }

  private generateRecommendations(items: TechnicalDebtItem[], metrics: DebtMetrics): string[] {
    const recommendations: string[] = [];

    // High severity items
    const criticalCount = metrics.bySeverity['CRITICAL'] || 0;
    const highCount = metrics.bySeverity['HIGH'] || 0;
    
    if (criticalCount > 0) {
      recommendations.push(`🚨 Address ${criticalCount} critical technical debt items immediately`);
    }
    
    if (highCount > 5) {
      recommendations.push(`⚠️  ${highCount} high-severity items require attention within 2 weeks`);
    }

    // Effort recommendations
    if (metrics.estimatedEffort.total > 40) {
      recommendations.push(`⏱️  ${metrics.estimatedEffort.total.toFixed(1)}h of technical debt requires dedicated sprint planning`);
    }

    // Type-specific recommendations
    if (metrics.byType['security'] > 0) {
      recommendations.push('🛡️  Security-related technical debt should be prioritized');
    }
    
    if (metrics.byType['performance'] > 3) {
      recommendations.push('⚡ Multiple performance issues detected - consider performance review');
    }

    // General recommendations
    if (metrics.totalItems > 20) {
      recommendations.push('📊 Consider implementing automated debt prevention measures');
    }

    return recommendations;
  }

  private generateActionItems(items: TechnicalDebtItem[], metrics: DebtMetrics): string[] {
    const actions: string[] = [];

    // Critical and high severity items
    const urgentItems = items.filter(item => 
      item.severity === 'CRITICAL' || item.severity === 'HIGH'
    );

    if (urgentItems.length > 0) {
      actions.push('Create GitHub issues for all critical and high-severity debt items');
      actions.push('Assign owners for urgent technical debt resolution');
    }

    // Security items
    const securityItems = items.filter(item => item.type === 'security');
    if (securityItems.length > 0) {
      actions.push('Schedule security review for identified security debt');
    }

    // Performance items  
    const performanceItems = items.filter(item => item.type === 'performance');
    if (performanceItems.length > 0) {
      actions.push('Run performance benchmarks to quantify impact');
    }

    // Process improvements
    if (metrics.totalItems > 10) {
      actions.push('Implement pre-commit hooks to prevent new technical debt');
      actions.push('Schedule regular technical debt review meetings');
    }

    return actions;
  }

  private async saveDebtItems(items: TechnicalDebtItem[]): Promise<void> {
    fs.writeFileSync(this.debtPath, JSON.stringify(items, null, 2));
    console.log(`✅ Saved ${items.length} technical debt items`);
  }

  private async saveReport(report: DebtReport): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(this.reportsPath, `debt-report-${timestamp}.json`);
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Also save as latest report
    const latestPath = path.join(this.reportsPath, 'latest.json');
    fs.writeFileSync(latestPath, JSON.stringify(report, null, 2));
    
    console.log(`✅ Debt report saved: ${path.basename(reportPath)}`);
  }

  private displayReport(report: DebtReport): void {
    console.log('\n📊 Technical Debt Report');
    console.log('========================');
    console.log(`Total Items: ${report.metrics.totalItems}`);
    console.log(`Estimated Effort: ${report.metrics.estimatedEffort.total.toFixed(1)} hours`);

    console.log('\n📈 By Severity:');
    Object.entries(report.metrics.bySeverity).forEach(([severity, count]) => {
      const icon = severity === 'CRITICAL' ? '🚨' : severity === 'HIGH' ? '⚠️' : severity === 'MEDIUM' ? '📋' : 'ℹ️';
      console.log(`   ${icon} ${severity}: ${count}`);
    });

    console.log('\n🏷️  By Type:');
    Object.entries(report.metrics.byType).forEach(([type, count]) => {
      console.log(`   • ${type}: ${count} (${report.metrics.estimatedEffort.byType[type]?.toFixed(1) || 0}h)`);
    });

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach(rec => console.log(`   ${rec}`));
    }

    if (report.actionItems.length > 0) {
      console.log('\n✅ Action Items:');
      report.actionItems.forEach(action => console.log(`   • ${action}`));
    }

    console.log(`\n📄 Full report: .debt/reports/latest.json`);
  }

  async generateSummary(): Promise<void> {
    const report = await this.scanAndTrack();
    
    // Generate markdown summary
    const summaryPath = path.join(this.projectRoot, 'TECHNICAL_DEBT.md');
    const summaryContent = this.generateMarkdownSummary(report);
    
    fs.writeFileSync(summaryPath, summaryContent);
    console.log(`\n📝 Technical debt summary: TECHNICAL_DEBT.md`);
  }

  private generateMarkdownSummary(report: DebtReport): string {
    return `# Technical Debt Report

**Generated**: ${new Date(report.reportDate).toLocaleDateString()}

## Summary
- **Total Items**: ${report.metrics.totalItems}
- **Estimated Effort**: ${report.metrics.estimatedEffort.total.toFixed(1)} hours
- **Categories**: ${report.metrics.trends.categories.length}

## Breakdown by Severity
${Object.entries(report.metrics.bySeverity).map(([severity, count]) => 
  `- **${severity}**: ${count} items`
).join('\n')}

## Breakdown by Type  
${Object.entries(report.metrics.byType).map(([type, count]) => 
  `- **${type}**: ${count} items (${report.metrics.estimatedEffort.byType[type]?.toFixed(1) || 0}h)`
).join('\n')}

## Critical Items
${report.items.filter(item => item.severity === 'CRITICAL').map(item => 
  `- **${item.location.file}:${item.location.line}** - ${item.description}`
).join('\n') || '_None_'}

## High Priority Items
${report.items.filter(item => item.severity === 'HIGH').slice(0, 10).map(item => 
  `- **${item.location.file}:${item.location.line}** - ${item.description}`
).join('\n') || '_None_'}

## Recommendations
${report.recommendations.map(rec => `- ${rec}`).join('\n')}

## Action Items
${report.actionItems.map(action => `- [ ] ${action}`).join('\n')}

---
_This report is automatically generated by the technical debt tracker._
_Run \`npm run debt:scan\` to update._`;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tracker = new TechnicalDebtTracker();
  
  if (process.argv[2] === 'summary') {
    await tracker.generateSummary();
  } else {
    await tracker.scanAndTrack();
  }
}

export default TechnicalDebtTracker;