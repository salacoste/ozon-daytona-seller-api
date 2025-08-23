#!/usr/bin/env node

/**
 * Documentation Generation and Validation Script
 * Creates baseline documentation templates for brownfield expansion
 * Validates documentation completeness (STOP-SHIP #14-19)
 */

/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DocumentationTemplate {
  filename: string;
  path: string;
  content: string;
  required: boolean;
  category: 'baseline' | 'migration' | 'api' | 'maintenance';
}

class DocumentationGenerator {
  private readonly projectRoot: string;
  private readonly docsPath: string;

  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.docsPath = path.join(this.projectRoot, 'docs');
  }

  async generateDocumentation(): Promise<void> {
    console.log('📝 Documentation Generation Started');
    console.log('===================================');

    const templates = this.getDocumentationTemplates();

    // Ensure docs directory exists
    if (!fs.existsSync(this.docsPath)) {
      fs.mkdirSync(this.docsPath, { recursive: true });
    }

    // Generate each template
    for (const template of templates) {
      await this.generateTemplate(template);
    }

    // Validate documentation completeness
    await this.validateDocumentation(templates);

    console.log('\n✅ Documentation generation completed');
    console.log('👥 USER ACTION REQUIRED: Review and complete generated templates');
  }

  private getDocumentationTemplates(): DocumentationTemplate[] {
    return [
      {
        filename: 'existing-api-baseline.md',
        path: path.join(this.docsPath, 'existing-api-baseline.md'),
        required: true,
        category: 'baseline',
        content: this.generateBaselineTemplate()
      },
      {
        filename: 'migration-guide-template.md',
        path: path.join(this.docsPath, 'migration-guide-template.md'),
        required: true,
        category: 'migration',
        content: this.generateMigrationTemplate()
      },
      {
        filename: 'rollback-procedures.md',
        path: path.join(this.docsPath, 'rollback-procedures.md'),
        required: true,
        category: 'maintenance',
        content: this.generateRollbackTemplate()
      },
      {
        filename: 'api-categories-overview.md',
        path: path.join(this.docsPath, 'api-categories-overview.md'),
        required: true,
        category: 'api',
        content: this.generateApiOverviewTemplate()
      },
      {
        filename: 'breaking-changes-policy.md',
        path: path.join(this.docsPath, 'breaking-changes-policy.md'),
        required: true,
        category: 'baseline',
        content: this.generateBreakingChangesTemplate()
      },
      {
        filename: 'testing-strategy.md',
        path: path.join(this.docsPath, 'testing-strategy.md'),
        required: true,
        category: 'maintenance',
        content: this.generateTestingStrategyTemplate()
      }
    ];
  }

  private generateBaselineTemplate(): string {
    return `# Existing API Baseline Documentation

## Overview
This document establishes the baseline for the existing Product API that must be preserved during brownfield expansion.

**CRITICAL**: Any changes to existing API surface require explicit approval and breaking change documentation.

## Current API Surface (v0.1.0)

### ProductApi Class
Current implementation: \`src/categories/product/index.ts\`

#### Public Methods
\`\`\`typescript
// TODO: Document all public methods from existing ProductApi
// Run: npm run breaking:update to capture current baseline

class ProductApi {
  // Method signatures to be documented
}
\`\`\`

#### Exported Types
\`\`\`typescript
// TODO: Document all exported types from product category
// These types form the public contract
\`\`\`

#### Usage Examples
\`\`\`typescript
// TODO: Document current usage patterns
// These examples must continue working
\`\`\`

## Backward Compatibility Requirements

### Non-Breaking Changes (Allowed)
- [ ] Adding new optional parameters
- [ ] Adding new methods
- [ ] Adding new exported types
- [ ] Improving error messages
- [ ] Performance optimizations

### Breaking Changes (Require Approval)
- [ ] Removing methods
- [ ] Changing method signatures
- [ ] Removing exported types
- [ ] Changing return types
- [ ] Renaming public members

## Validation Process

1. **Automated Baseline Check**: \`npm run breaking:check\`
2. **Manual Review**: Product Owner approval for any breaking changes
3. **Migration Documentation**: Required for any breaking changes
4. **Customer Communication**: 30-day notice for breaking changes

## Last Updated
- **Date**: [TO BE COMPLETED]
- **Version**: v0.1.0
- **Baseline Hash**: [TO BE COMPLETED]

---
**USER ACTION REQUIRED**: Complete the API documentation above by running the baseline analyzer and documenting all public methods and types.`;
  }

  private generateMigrationTemplate(): string {
    return `# Migration Guide Template

## Overview
This template provides the structure for migration guides when introducing new API categories or breaking changes.

## Migration Guide: [CATEGORY_NAME] API

### Summary
- **Affected Version**: [VERSION]
- **Migration Complexity**: [Low/Medium/High]
- **Estimated Migration Time**: [TIME]
- **Breaking Changes**: [Yes/No]

### What's New
- [ ] New API category: [CATEGORY_NAME]
- [ ] New methods: [LIST]
- [ ] New types: [LIST]
- [ ] Enhanced functionality: [DESCRIPTION]

### Breaking Changes
> **Note**: If no breaking changes, remove this section

- [ ] **Method Signature Changes**
  - Old: \`methodName(param: Type): ReturnType\`
  - New: \`methodName(param: NewType, newParam?: OptionalType): ReturnType\`
  - **Migration**: [STEPS]

- [ ] **Type Changes**
  - Old: \`interface OldType { ... }\`
  - New: \`interface NewType { ... }\`
  - **Migration**: [STEPS]

### Migration Steps

#### Step 1: Update Dependencies
\`\`\`bash
npm update @spacechemical/ozon-seller-api
\`\`\`

#### Step 2: Update Import Statements
\`\`\`typescript
// Old imports
import { ProductApi } from '@spacechemical/ozon-seller-api';

// New imports (if changed)
import { ProductApi, [NEW_CATEGORY]Api } from '@spacechemical/ozon-seller-api';
\`\`\`

#### Step 3: Update Usage Patterns
\`\`\`typescript
// Before
const client = new OzonSellerAPI(config);
const productApi = client.product;

// After
const client = new OzonSellerAPI(config);
const productApi = client.product;
const [newCategory]Api = client.[newCategory];
\`\`\`

#### Step 4: Handle Breaking Changes
> **Note**: Only include if there are breaking changes

\`\`\`typescript
// TODO: Document specific migration steps for breaking changes
\`\`\`

### Testing Your Migration

\`\`\`typescript
// Test existing functionality still works
describe('Migration Compatibility', () => {
  it('should maintain existing API functionality', async () => {
    // TODO: Add specific tests for your use case
  });
  
  it('should work with new API features', async () => {
    // TODO: Add tests for new features
  });
});
\`\`\`

### Common Issues and Solutions

#### Issue: [COMMON_PROBLEM]
**Solution**: [SOLUTION_STEPS]

#### Issue: Type errors after update
**Solution**: Update TypeScript types and interfaces

### Rollback Instructions

If you need to rollback to the previous version:

\`\`\`bash
npm install @spacechemical/ozon-seller-api@[PREVIOUS_VERSION]
\`\`\`

### Support

- **Documentation**: [LINK]
- **Issues**: [GITHUB_ISSUES_LINK]  
- **Support**: [CONTACT_INFO]

---
**USER ACTION REQUIRED**: Customize this template for each new API category or breaking change.`;
  }

  private generateRollbackTemplate(): string {
    return `# Rollback Procedures

## Overview
Comprehensive rollback procedures for brownfield development safety.

## Automated Rollback Triggers

### Breaking Change Detection
- **Trigger**: \`npm run breaking:check\` fails in CI/CD
- **Action**: Automatic deployment halt
- **Recovery**: Revert to last known good version

### Performance Regression
- **Trigger**: Response times >200ms sustained for >5 minutes  
- **Action**: Performance alert and manual rollback decision
- **Recovery**: Revert performance-critical changes

### Test Coverage Degradation
- **Trigger**: Coverage drops below 95%
- **Action**: Block deployment
- **Recovery**: Fix tests or revert changes

## Manual Rollback Procedures

### Emergency Rollback (Production Issues)

#### Prerequisites
- [ ] Identify last known good version
- [ ] Verify rollback target is stable
- [ ] Notify stakeholders of rollback

#### Steps
1. **Stop Current Deployment**
   \`\`\`bash
   # Stop any ongoing deployment
   # Platform-specific commands
   \`\`\`

2. **Revert Code Changes**
   \`\`\`bash
   git revert [COMMIT_HASH]
   git push origin main
   \`\`\`

3. **Rebuild and Test**
   \`\`\`bash
   npm run clean
   npm run build
   npm run test:unit
   npm run breaking:check
   \`\`\`

4. **Deploy Rollback Version**
   \`\`\`bash
   # Platform-specific deployment commands
   \`\`\`

5. **Validate Rollback**
   \`\`\`bash
   npm run test:integration
   npm run test:performance
   \`\`\`

### Partial Rollback (Feature-Specific)

When only specific features need to be rolled back:

1. **Identify Affected Components**
   - [ ] API endpoints
   - [ ] Type definitions  
   - [ ] Client code
   - [ ] Tests

2. **Selective Revert**
   \`\`\`bash
   git revert [FEATURE_COMMIT_1] [FEATURE_COMMIT_2]
   \`\`\`

3. **Update Documentation**
   - [ ] Update API documentation
   - [ ] Update migration guides
   - [ ] Notify users of reverted features

## Rollback Testing

### Pre-Rollback Validation
\`\`\`bash
# Validate rollback target
npm run test:unit
npm run breaking:check
npm run bundle:check
\`\`\`

### Post-Rollback Validation
\`\`\`bash
# Confirm system stability
npm run test:integration
npm run test:performance
npm run risk:monitor
\`\`\`

## Communication Plan

### Internal Team
- [ ] Notify development team immediately
- [ ] Update project status dashboard
- [ ] Document rollback reason and timeline

### External Users
- [ ] Update API status page
- [ ] Send notification to registered users
- [ ] Provide timeline for resolution

## Recovery Plan

### Root Cause Analysis
1. **Immediate Actions**
   - [ ] Identify what caused the rollback need
   - [ ] Document timeline and impact
   - [ ] Assess data integrity

2. **Analysis**
   - [ ] Review failed tests/metrics
   - [ ] Examine deployment logs
   - [ ] Interview team members

3. **Prevention**
   - [ ] Update testing procedures
   - [ ] Enhance monitoring
   - [ ] Improve review process

### Re-deployment Strategy
1. **Fix Development**
   - [ ] Address root cause
   - [ ] Add comprehensive tests
   - [ ] Validate in staging environment

2. **Gradual Rollout**
   - [ ] Deploy to staging
   - [ ] Limited production rollout
   - [ ] Full production deployment

## Rollback Decision Matrix

| Severity | Impact | Response Time | Approval Required |
|----------|--------|---------------|-------------------|
| Critical | Production Down | Immediate | Team Lead |
| High | Functionality Broken | < 1 hour | Tech Lead + PM |
| Medium | Performance Issues | < 4 hours | Tech Lead |
| Low | Minor Issues | Next Release | Development Team |

---
**USER ACTION REQUIRED**: Customize rollback procedures for your specific deployment environment and approval processes.`;
  }

  private generateApiOverviewTemplate(): string {
    return `# OZON Seller API Categories Overview

## Current Implementation Status

### ✅ Implemented Categories
- **Product API** (\`v0.1.0\`)
  - Methods: [TO BE DOCUMENTED]
  - Types: [TO BE DOCUMENTED]  
  - Status: Production Ready
  - Documentation: Complete

### 🚧 Planned Categories (31 remaining)

#### High Priority (Phase 1)
- [ ] **Orders API** - Order management and fulfillment
- [ ] **Returns API** - Return processing and management
- [ ] **Reports API** - Analytics and reporting
- [ ] **Warehouse API** - Inventory management

#### Medium Priority (Phase 2)  
- [ ] **Finance API** - Financial operations and reporting
- [ ] **Chat API** - Customer communication
- [ ] **Analytics API** - Business intelligence
- [ ] **Posting API** - Product posting and updates

#### Lower Priority (Phase 3)
- [ ] **Brands API** - Brand management
- [ ] **Categories API** - Category operations
- [ ] **Attributes API** - Product attribute management
- [ ] **[Additional 20 categories...]**

## API Category Template

Each new API category must follow this structure:

\`\`\`
src/categories/[category-name]/
├── index.ts          # Main API class
├── types.ts          # TypeScript interfaces
├── schemas.ts        # Zod validation schemas  
├── tests/
│   ├── unit.test.ts  # Unit tests (95% coverage)
│   └── integration.test.ts # Integration tests
└── README.md         # Category documentation
\`\`\`

## Integration Requirements

### Backward Compatibility
- [ ] Existing Product API must remain unchanged
- [ ] All breaking changes require migration guide
- [ ] Automated breaking change detection

### Quality Standards
- [ ] 95% test coverage minimum
- [ ] Type safety with Zod validation
- [ ] Performance: <200ms response times
- [ ] Documentation completeness

### Development Process
1. **Design Phase**
   - [ ] API design document
   - [ ] Schema definition  
   - [ ] Breaking change analysis

2. **Implementation Phase**
   - [ ] Core functionality
   - [ ] Type definitions
   - [ ] Comprehensive tests

3. **Integration Phase**
   - [ ] Main client integration
   - [ ] Documentation updates
   - [ ] Migration guide (if needed)

4. **Validation Phase**
   - [ ] Breaking change check
   - [ ] Performance validation
   - [ ] Bundle size check

## Risk Management

### High-Risk Categories
Categories that could impact existing functionality:
- [ ] **Core Client Changes** - Changes to main OzonSellerAPI class
- [ ] **HTTP Client Updates** - Changes to core HTTP functionality
- [ ] **Type System Changes** - Changes to base types

### Medium-Risk Categories  
Categories with moderate complexity:
- [ ] **Large API Surface** - Categories with >20 methods
- [ ] **Complex Dependencies** - Categories requiring significant dependencies
- [ ] **Performance Critical** - Categories handling high-volume operations

### Low-Risk Categories
Isolated categories with minimal impact:
- [ ] **Self-Contained APIs** - No dependencies on other categories
- [ ] **Simple Operations** - Basic CRUD operations only
- [ ] **Optional Features** - Non-essential functionality

## Quality Gates

Before any category can be marked as complete:

- [ ] **Breaking Change Check**: \`npm run breaking:check\` passes
- [ ] **Test Coverage**: \`npm run test:coverage\` shows ≥95%
- [ ] **Performance Test**: \`npm run test:performance\` passes
- [ ] **Bundle Size**: \`npm run bundle:check\` within limits
- [ ] **Risk Assessment**: \`npm run risk:assess\` acceptable
- [ ] **Documentation**: Complete API documentation
- [ ] **Integration Test**: Works with main client

---
**USER ACTION REQUIRED**: Update this document as each category is implemented with specific details about methods, types, and implementation status.`;
  }

  private generateBreakingChangesTemplate(): string {
    return `# Breaking Changes Policy

## Overview
This document defines the policy for managing breaking changes during brownfield API expansion.

## Definition of Breaking Changes

### API Breaking Changes
- [ ] Removing public methods or properties
- [ ] Changing method signatures (parameters, return types)
- [ ] Renaming public methods or properties  
- [ ] Changing public interface contracts
- [ ] Removing or renaming exported types
- [ ] Changing constructor parameters

### Type Breaking Changes
- [ ] Removing properties from interfaces
- [ ] Making optional properties required
- [ ] Changing property types incompatibly
- [ ] Removing enum values
- [ ] Changing union type membership

### Behavioral Breaking Changes
- [ ] Changing error handling behavior
- [ ] Modifying validation logic
- [ ] Altering side effects
- [ ] Changing default values
- [ ] Modifying async/sync behavior

## Non-Breaking Changes (Safe)

### Additive Changes
- [ ] Adding new optional parameters (with defaults)
- [ ] Adding new methods
- [ ] Adding new properties to response objects
- [ ] Adding new exported types or interfaces
- [ ] Adding new enum values

### Enhancement Changes
- [ ] Performance improvements
- [ ] Better error messages  
- [ ] Internal refactoring
- [ ] Documentation updates
- [ ] Adding overloaded method signatures

## Breaking Change Approval Process

### 1. Impact Assessment
- [ ] **Scope Analysis**: Which APIs/types are affected?
- [ ] **User Impact**: How many users will be affected?
- [ ] **Migration Complexity**: How difficult is migration?
- [ ] **Timeline**: How urgent is this change?

### 2. Approval Requirements

#### Minor Breaking Changes
- **Definition**: Affects <10% of API surface, easy migration
- **Approval**: Tech Lead + Product Owner
- **Timeline**: 2 weeks notice minimum

#### Major Breaking Changes  
- **Definition**: Affects >10% of API surface, complex migration
- **Approval**: Tech Lead + Product Owner + Stakeholder Review
- **Timeline**: 4 weeks notice minimum

#### Critical Breaking Changes
- **Definition**: Affects core functionality, very complex migration
- **Approval**: Full team review + external stakeholder approval
- **Timeline**: 8 weeks notice minimum

### 3. Documentation Requirements

All breaking changes must include:
- [ ] **Change Description**: What is changing and why
- [ ] **Migration Guide**: Step-by-step migration instructions
- [ ] **Timeline**: When change takes effect
- [ ] **Rollback Plan**: How to revert if needed
- [ ] **Support Plan**: How users can get help

## Implementation Process

### 1. Pre-Implementation
\`\`\`bash
# Capture current baseline
npm run breaking:update

# Create feature branch
git checkout -b breaking-change/[DESCRIPTION]
\`\`\`

### 2. Development
\`\`\`bash
# Implement changes
# Update tests to reflect new behavior
# Update documentation

# Validate breaking changes are detected
npm run breaking:check  # Should fail
\`\`\`

### 3. Migration Guide Creation
- [ ] Create migration guide from template
- [ ] Include before/after code examples
- [ ] Document all affected users patterns
- [ ] Provide automated migration tools (if possible)

### 4. Review Process
- [ ] Code review focusing on API impact
- [ ] Migration guide review
- [ ] Stakeholder approval (if required)
- [ ] Communication plan approval

### 5. Release Process
- [ ] Update CHANGELOG.md with breaking changes
- [ ] Version bump (major version for breaking changes)
- [ ] Pre-release testing with migration guide
- [ ] Communication to users
- [ ] Release with migration guide

## Communication Templates

### Breaking Change Notice
\`\`\`
Subject: Breaking Change Notice - [API_NAME] v[VERSION]

Dear OZON Seller API users,

We are announcing a breaking change in [API_NAME] that will take effect on [DATE].

WHAT'S CHANGING:
[Description of change]

WHY:
[Reason for change]

ACTION REQUIRED:
[Migration steps]

TIMELINE:
- [DATE]: Breaking change announced
- [DATE]: Migration guide available  
- [DATE]: Change takes effect
- [DATE]: Support for old version ends

GETTING HELP:
[Support information]
\`\`\`

## Automated Detection

### Breaking Change Detection
\`\`\`bash
# Check for breaking changes before commit
npm run breaking:check

# Update baseline after approved breaking changes
npm run breaking:update
\`\`\`

### CI/CD Integration
Breaking change detection runs automatically:
- [ ] On every pull request
- [ ] Before deployment
- [ ] In release pipeline

### Rollback Triggers
Automatic rollback if:
- [ ] Breaking change detection fails unexpectedly
- [ ] Customer integration issues reported
- [ ] Performance degradation >30%

## Metrics and Monitoring

### Track Breaking Change Impact
- [ ] **API Usage Analytics**: Which methods are used most
- [ ] **Migration Success Rate**: How many users migrate successfully  
- [ ] **Support Ticket Volume**: Increase after breaking changes
- [ ] **Customer Satisfaction**: Impact on user experience

### Success Criteria
- [ ] <5% increase in support tickets
- [ ] >90% migration success rate within 30 days
- [ ] No critical customer escalations
- [ ] Maintained performance benchmarks

---
**USER ACTION REQUIRED**: Review and approve this policy with stakeholders, customize communication templates for your organization.`;
  }

  private generateTestingStrategyTemplate(): string {
    return `# Testing Strategy for Brownfield API Expansion

## Overview
Comprehensive testing strategy to ensure safe brownfield expansion from 1 to 32 API categories.

## Testing Pyramid

### Unit Tests (Foundation - 95% Coverage Target)
- **Scope**: Individual methods, classes, and functions
- **Coverage Requirement**: ≥95% lines/branches/functions
- **Location**: \`src/**/*.test.ts\`
- **Command**: \`npm run test:unit\`

#### Critical Areas
- [ ] **Existing Product API**: Zero regression tolerance
- [ ] **Core HTTP Client**: All error scenarios
- [ ] **Type Validations**: All Zod schemas  
- [ ] **New API Categories**: Complete method coverage

### Integration Tests (API Contract Testing)
- **Scope**: API interactions and data flow
- **Coverage Target**: All API endpoints
- **Location**: \`tests/integration/\`
- **Command**: \`npm run test:integration\`

#### Test Categories
- [ ] **Backward Compatibility**: Existing Product API unchanged
- [ ] **Cross-Category Integration**: Categories working together
- [ ] **Error Handling**: Network failures, API errors
- [ ] **Configuration**: Different client configurations

### Performance Tests (Non-Functional Requirements)
- **Scope**: Response times, memory usage, bundle size
- **Requirements**: NFR1 (<200ms), NFR5 (bundle limits)
- **Location**: \`tests/performance/\`
- **Command**: \`npm run test:performance\`

#### Performance Targets
- [ ] **Response Time**: <200ms for cached operations
- [ ] **Memory Usage**: <100MB heap for typical usage
- [ ] **Bundle Size**: <500KB ESM, <500KB CJS
- [ ] **Concurrent Requests**: Handle 10+ simultaneous calls

## Breaking Change Testing

### Automated Baseline Testing
\\\`\\\`\\\`bash
# Capture current API surface
npm run breaking:update

# Detect any breaking changes
npm run breaking:check
\\\`\\\`\\\`

### API Contract Validation
- [ ] **Method Signatures**: All existing methods unchanged
- [ ] **Return Types**: Compatible response structures  
- [ ] **Error Formats**: Consistent error handling
- [ ] **Usage Patterns**: Common usage scenarios still work

### Regression Test Suite
Comprehensive tests for existing functionality:
\\\`\\\`\\\`typescript
describe('Backward Compatibility', () => {
  describe('Product API', () => {
    it('should maintain all existing method signatures', () => {
      // Test existing method calls
    });
    
    it('should return compatible response formats', () => {
      // Test response structure compatibility
    });
    
    it('should handle errors in the same way', () => {
      // Test error handling consistency  
    });
  });
});
\\\`\\\`\\\`

## Quality Gates

### Pre-Commit Validation
\\\`\\\`\\\`bash
# Run before every commit
npm run typecheck
npm run lint  
npm run test:unit
npm run breaking:check
\\\`\\\`\\\`

### Pre-Release Validation
\\\`\\\`\\\`bash
# Complete validation suite
npm run clean
npm run build
npm run test:unit
npm run test:integration  
npm run test:performance
npm run breaking:check
npm run bundle:check
npm run risk:assess
\\\`\\\`\\\`

## Success Metrics

### Coverage Metrics
- [ ] **Unit Test Coverage**: ≥95% maintained
- [ ] **Integration Coverage**: All endpoints tested
- [ ] **Performance Coverage**: All NFRs validated
- [ ] **Regression Coverage**: All existing functionality

### Quality Metrics
- [ ] **Zero Regressions**: No existing functionality broken
- [ ] **Performance Maintained**: <200ms response times
- [ ] **Bundle Size**: Within defined limits
- [ ] **Error Rate**: <0.1% in production

---
**USER ACTION REQUIRED**: Implement comprehensive test suites for each new API category following this strategy.`;
  }

  private async generateTemplate(template: DocumentationTemplate): Promise<void> {
    if (fs.existsSync(template.path)) {
      console.log(`⚠️  ${template.filename} already exists, skipping...`);
      return;
    }

    fs.writeFileSync(template.path, template.content);
    console.log(`✅ Generated: ${template.filename}`);
  }

  private async validateDocumentation(templates: DocumentationTemplate[]): Promise<void> {
    console.log('\n📋 Documentation Validation');
    console.log('============================');

    const missing: string[] = [];
    const incomplete: string[] = [];

    for (const template of templates) {
      if (!fs.existsSync(template.path)) {
        missing.push(template.filename);
      } else {
        const content = fs.readFileSync(template.path, 'utf-8');
        if (this.isIncomplete(content)) {
          incomplete.push(template.filename);
        }
      }
    }

    if (missing.length > 0) {
      console.log(`❌ Missing: ${missing.length} files`);
      missing.forEach(file => console.log(`   • ${file}`));
    }

    if (incomplete.length > 0) {
      console.log(`⚠️  Incomplete: ${incomplete.length} files`);  
      incomplete.forEach(file => console.log(`   • ${file}`));
    }

    if (missing.length === 0 && incomplete.length === 0) {
      console.log('✅ All documentation templates are complete');
    } else {
      console.log('\n👥 USER ACTION REQUIRED:');
      console.log('   1. Complete missing documentation files');
      console.log('   2. Fill in template placeholders');
      console.log('   3. Review and customize for your project');
    }
  }

  private isIncomplete(content: string): boolean {
    const placeholders = [
      'TO BE COMPLETED',
      'TODO:',
      '[TO BE DOCUMENTED]',
      '[CATEGORY_NAME]',
      '[VERSION]',
      'USER ACTION REQUIRED'
    ];

    return placeholders.some(placeholder => content.includes(placeholder));
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new DocumentationGenerator();
  await generator.generateDocumentation();
}

export default DocumentationGenerator;