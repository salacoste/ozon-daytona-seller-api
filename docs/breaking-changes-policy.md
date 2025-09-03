# Breaking Changes Policy

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
```bash
# Capture current baseline
npm run breaking:update

# Create feature branch
git checkout -b breaking-change/[DESCRIPTION]
```

### 2. Development
```bash
# Implement changes
# Update tests to reflect new behavior
# Update documentation

# Validate breaking changes are detected
npm run breaking:check  # Should fail
```

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
```
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
```

## Automated Detection

### Breaking Change Detection
```bash
# Check for breaking changes before commit
npm run breaking:check

# Update baseline after approved breaking changes
npm run breaking:update
```

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
**USER ACTION REQUIRED**: Review and approve this policy with stakeholders, customize communication templates for your organization.