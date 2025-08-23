#!/usr/bin/env node

/**
 * Risk Management and Rollback Procedures
 * Implements automated risk assessment and rollback triggers
 * Validates brownfield development safety (STOP-SHIP #6-13)
 */

/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RiskMetrics {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  probability: number; // 0-1
  impact: number; // 0-1
  riskScore: number;
}

interface RiskAssessment {
  riskId: string;
  category: string;
  description: string;
  metrics: RiskMetrics;
  mitigations: string[];
  rollbackTriggers: string[];
  automatedChecks: string[];
  lastAssessed: string;
}

interface RollbackProcedure {
  procedureId: string;
  name: string;
  triggerConditions: string[];
  steps: RollbackStep[];
  estimatedTime: string;
  requiredApprovals: string[];
  communicationPlan: string[];
}

interface RollbackStep {
  order: number;
  action: string;
  command?: string;
  validation: string;
  timeout: string;
}

class RiskManagementSystem {
  private readonly projectRoot: string;
  private readonly riskDataPath: string;
  private readonly rollbackPath: string;

  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.riskDataPath = path.join(this.projectRoot, '.risk', 'assessments.json');
    this.rollbackPath = path.join(this.projectRoot, '.risk', 'procedures.json');
  }

  async assessRisks(): Promise<RiskAssessment[]> {
    console.log('🔍 Risk Assessment Started');
    console.log('==========================');

    const risks: RiskAssessment[] = [];

    // Critical Risks for Brownfield Development
    risks.push(this.assessBreakingChangeRisk());
    risks.push(this.assessPerformanceRegressionRisk());
    risks.push(this.assessSecurityRisk());
    risks.push(this.assessDependencyRisk());
    risks.push(this.assessBuildRisk());
    risks.push(this.assessTestCoverageRisk());
    risks.push(this.assessDocumentationRisk());

    // Save risk assessment
    await this.saveRiskAssessment(risks);

    // Generate automated checks
    await this.generateAutomatedChecks(risks);

    return risks;
  }

  private assessBreakingChangeRisk(): RiskAssessment {
    const hasBreakingDetection = fs.existsSync(path.join(this.projectRoot, 'scripts', 'breaking-change-detector.ts'));
    const hasBaseline = fs.existsSync(path.join(this.projectRoot, '.baseline', 'api-surface.json'));

    const probability = hasBreakingDetection && hasBaseline ? 0.1 : 0.8;
    const impact = 0.9; // Breaking changes are critical

    return {
      riskId: 'RISK-001',
      category: 'Breaking Changes',
      description: 'Existing Product API compatibility broken during brownfield expansion',
      metrics: {
        severity: probability > 0.5 ? 'CRITICAL' : 'MEDIUM',
        probability,
        impact,
        riskScore: probability * impact
      },
      mitigations: [
        'Automated breaking change detection',
        'API baseline comparison',
        'Comprehensive integration tests',
        'Semantic versioning enforcement'
      ],
      rollbackTriggers: [
        'Breaking change detection fails',
        'Existing tests fail',
        'API contract violations',
        'Performance degradation >30%'
      ],
      automatedChecks: [
        'npm run breaking:check',
        'npm run test:integration',
        'npm run test:performance'
      ],
      lastAssessed: new Date().toISOString()
    };
  }

  private assessPerformanceRegressionRisk(): RiskAssessment {
    const hasPerformanceTests = fs.existsSync(path.join(this.projectRoot, 'tests', 'performance'));
    
    return {
      riskId: 'RISK-002',
      category: 'Performance Regression',
      description: 'API response times exceed 200ms after expansion',
      metrics: {
        severity: 'HIGH',
        probability: hasPerformanceTests ? 0.2 : 0.6,
        impact: 0.8,
        riskScore: (hasPerformanceTests ? 0.2 : 0.6) * 0.8
      },
      mitigations: [
        'Performance baseline monitoring',
        'Load testing automation',
        'Bundle size limits',
        'Memory usage monitoring'
      ],
      rollbackTriggers: [
        'Response time >200ms',
        'Memory usage >2x baseline',
        'Bundle size >500KB increase',
        'CPU usage >50% increase'
      ],
      automatedChecks: [
        'npm run test:performance',
        'npm run bundle:check'
      ],
      lastAssessed: new Date().toISOString()
    };
  }

  private assessSecurityRisk(): RiskAssessment {
    return {
      riskId: 'RISK-003',
      category: 'Security Vulnerabilities',
      description: 'New API endpoints introduce security vulnerabilities',
      metrics: {
        severity: 'CRITICAL',
        probability: 0.4,
        impact: 1.0,
        riskScore: 0.4
      },
      mitigations: [
        'Security audit automation',
        'Dependency vulnerability scanning',
        'Input validation enforcement',
        'API key protection validation'
      ],
      rollbackTriggers: [
        'Security audit failures',
        'Vulnerability scanner alerts',
        'API key exposure detected',
        'Input validation bypassed'
      ],
      automatedChecks: [
        'npm audit --audit-level=moderate',
        'Security code scanning'
      ],
      lastAssessed: new Date().toISOString()
    };
  }

  private assessDependencyRisk(): RiskAssessment {
    return {
      riskId: 'RISK-004',
      category: 'Dependency Management',
      description: 'Dependency conflicts or vulnerabilities introduced',
      metrics: {
        severity: 'MEDIUM',
        probability: 0.3,
        impact: 0.6,
        riskScore: 0.18
      },
      mitigations: [
        'Dependency pinning',
        'Automated security updates',
        'Compatibility testing',
        'License compliance checking'
      ],
      rollbackTriggers: [
        'Dependency security alerts',
        'Version conflicts detected',
        'Build failures from dependencies',
        'License violations'
      ],
      automatedChecks: [
        'npm audit',
        'npm outdated'
      ],
      lastAssessed: new Date().toISOString()
    };
  }

  private assessBuildRisk(): RiskAssessment {
    return {
      riskId: 'RISK-005',
      category: 'Build System',
      description: 'Build system failures preventing deployment',
      metrics: {
        severity: 'HIGH',
        probability: 0.2,
        impact: 0.8,
        riskScore: 0.16
      },
      mitigations: [
        'Build validation in CI/CD',
        'Multiple build targets testing',
        'Build time monitoring',
        'Artifact validation'
      ],
      rollbackTriggers: [
        'Build failures',
        'Build time >2x baseline',
        'Invalid artifacts generated',
        'TypeScript compilation errors'
      ],
      automatedChecks: [
        'npm run build',
        'npm run typecheck',
        'npm run lint'
      ],
      lastAssessed: new Date().toISOString()
    };
  }

  private assessTestCoverageRisk(): RiskAssessment {
    return {
      riskId: 'RISK-006',
      category: 'Test Coverage',
      description: 'Insufficient test coverage for new functionality',
      metrics: {
        severity: 'HIGH',
        probability: 0.5,
        impact: 0.7,
        riskScore: 0.35
      },
      mitigations: [
        '95% coverage requirement',
        'Integration test automation',
        'E2E test coverage',
        'Coverage trend monitoring'
      ],
      rollbackTriggers: [
        'Coverage drops below 95%',
        'Critical paths untested',
        'Integration tests failing',
        'E2E tests failing'
      ],
      automatedChecks: [
        'npm run test:coverage',
        'npm run test:integration'
      ],
      lastAssessed: new Date().toISOString()
    };
  }

  private assessDocumentationRisk(): RiskAssessment {
    return {
      riskId: 'RISK-007',
      category: 'Documentation',
      description: 'Inadequate documentation for new API categories',
      metrics: {
        severity: 'MEDIUM',
        probability: 0.6,
        impact: 0.4,
        riskScore: 0.24
      },
      mitigations: [
        'Automated API documentation',
        'Migration guide maintenance',
        'Example code validation',
        'Documentation testing'
      ],
      rollbackTriggers: [
        'Documentation build failures',
        'Missing API documentation',
        'Broken examples',
        'Migration guide outdated'
      ],
      automatedChecks: [
        'npm run docs:generate'
      ],
      lastAssessed: new Date().toISOString()
    };
  }

  private generateRollbackProcedures(): RollbackProcedure[] {
    return [
      {
        procedureId: 'ROLLBACK-001',
        name: 'Breaking Change Emergency Rollback',
        triggerConditions: [
          'Breaking change detected in production',
          'Existing API tests failing',
          'Customer integration broken'
        ],
        steps: [
          {
            order: 1,
            action: 'Stop deployment pipeline',
            validation: 'Deployment stopped within 30 seconds',
            timeout: '30s'
          },
          {
            order: 2,
            action: 'Revert to last known good version',
            command: 'git revert HEAD && npm run build && npm run breaking:check',
            validation: 'Breaking change check passes',
            timeout: '5m'
          },
          {
            order: 3,
            action: 'Run full test suite',
            command: 'npm run test:unit && npm run test:integration',
            validation: 'All tests pass',
            timeout: '10m'
          },
          {
            order: 4,
            action: 'Deploy rollback version',
            validation: 'Deployment successful and healthy',
            timeout: '15m'
          }
        ],
        estimatedTime: '30 minutes',
        requiredApprovals: ['Tech Lead', 'Product Owner'],
        communicationPlan: [
          'Notify all stakeholders within 5 minutes',
          'Update status page immediately',
          'Communicate resolution timeline'
        ]
      },
      {
        procedureId: 'ROLLBACK-002',
        name: 'Performance Regression Rollback',
        triggerConditions: [
          'Response times >200ms sustained',
          'Memory usage >2x baseline',
          'Error rate >1%'
        ],
        steps: [
          {
            order: 1,
            action: 'Identify performance baseline',
            command: 'npm run test:performance',
            validation: 'Baseline performance metrics available',
            timeout: '5m'
          },
          {
            order: 2,
            action: 'Revert performance-critical changes',
            validation: 'Performance tests pass',
            timeout: '10m'
          },
          {
            order: 3,
            action: 'Validate performance recovery',
            command: 'npm run test:performance',
            validation: 'Response times <200ms',
            timeout: '15m'
          }
        ],
        estimatedTime: '30 minutes',
        requiredApprovals: ['Performance Engineer', 'Tech Lead'],
        communicationPlan: [
          'Alert performance team immediately',
          'Update monitoring dashboards',
          'Document performance impact'
        ]
      }
    ];
  }

  private async saveRiskAssessment(risks: RiskAssessment[]): Promise<void> {
    const riskDir = path.dirname(this.riskDataPath);
    if (!fs.existsSync(riskDir)) {
      fs.mkdirSync(riskDir, { recursive: true });
    }

    fs.writeFileSync(this.riskDataPath, JSON.stringify(risks, null, 2));
    console.log(`✅ Risk assessment saved: ${risks.length} risks analyzed`);
  }

  private async generateAutomatedChecks(risks: RiskAssessment[]): Promise<void> {
    const procedures = this.generateRollbackProcedures();
    
    const procedureDir = path.dirname(this.rollbackPath);
    if (!fs.existsSync(procedureDir)) {
      fs.mkdirSync(procedureDir, { recursive: true });
    }

    fs.writeFileSync(this.rollbackPath, JSON.stringify(procedures, null, 2));
    console.log(`✅ Rollback procedures saved: ${procedures.length} procedures defined`);

    // Generate risk monitoring script
    const monitoringScript = this.generateMonitoringScript(risks);
    const monitoringPath = path.join(this.projectRoot, 'scripts', 'risk-monitor.ts');
    fs.writeFileSync(monitoringPath, monitoringScript);
    console.log('✅ Risk monitoring script generated');
  }

  private generateMonitoringScript(risks: RiskAssessment[]): string {
    return `#!/usr/bin/env node

/**
 * Automated Risk Monitoring
 * Generated by risk-management.ts
 */

/* eslint-disable no-console */

import { execSync } from 'child_process';

interface CheckResult {
  riskId: string;
  passed: boolean;
  message: string;
  timestamp: string;
}

class RiskMonitor {
  private results: CheckResult[] = [];

  async runAllChecks(): Promise<CheckResult[]> {
    console.log('🔍 Running automated risk checks...');
    
${risks.map(risk => `
    // ${risk.description}
    await this.runCheck('${risk.riskId}', [
${risk.automatedChecks.map(check => `      '${check}'`).join(',\n')}
    ]);`).join('')}

    return this.results;
  }

  private async runCheck(riskId: string, commands: string[]): Promise<void> {
    for (const command of commands) {
      try {
        execSync(command, { stdio: 'pipe' });
        this.results.push({
          riskId,
          passed: true,
          message: \`✅ \` + command + \` passed\`,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        this.results.push({
          riskId,
          passed: false,
          message: \`❌ \` + command + \` failed\`,
          timestamp: new Date().toISOString()
        });
      }
    }
  }

  displayResults(): void {
    console.log('\\n📊 Risk Check Results');
    console.log('=====================');
    
    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;
    
    console.log(\`Passed: \` + passed + \`/\` + total);
    
    this.results.forEach(result => {
      console.log(result.message);
    });
    
    if (passed < total) {
      console.log('\\n🚨 Risk mitigation required!');
      process.exit(1);
    } else {
      console.log('\\n✅ All risk checks passed');
      process.exit(0);
    }
  }
}

// Run if called directly
if (import.meta.url === \`file://\` + process.argv[1]) {
  const monitor = new RiskMonitor();
  const results = await monitor.runAllChecks();
  monitor.displayResults();
}
`;
  }

  async generateRiskReport(): Promise<void> {
    const risks = await this.assessRisks();
    
    console.log('\n📊 Risk Assessment Summary');
    console.log('===========================');

    const criticalRisks = risks.filter(r => r.metrics.severity === 'CRITICAL');
    const highRisks = risks.filter(r => r.metrics.severity === 'HIGH');
    const mediumRisks = risks.filter(r => r.metrics.severity === 'MEDIUM');
    const lowRisks = risks.filter(r => r.metrics.severity === 'LOW');

    console.log(`🚨 Critical: ${criticalRisks.length}`);
    console.log(`⚠️  High: ${highRisks.length}`);
    console.log(`📋 Medium: ${mediumRisks.length}`);
    console.log(`ℹ️  Low: ${lowRisks.length}`);

    if (criticalRisks.length > 0) {
      console.log('\n🚨 CRITICAL RISKS REQUIRING IMMEDIATE ATTENTION:');
      criticalRisks.forEach(risk => {
        console.log(`   • ${risk.description}`);
        console.log(`     Risk Score: ${(risk.metrics.riskScore * 100).toFixed(1)}%`);
      });
    }

    console.log('\n💡 Recommended Actions:');
    console.log('   1. Run automated risk checks: npm run risk:monitor');
    console.log('   2. Review rollback procedures in .risk/procedures.json');
    console.log('   3. Implement missing mitigations');
    console.log('   4. Test rollback procedures in staging environment');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const riskManager = new RiskManagementSystem();
  await riskManager.generateRiskReport();
}

export default RiskManagementSystem;