# Migration Guide Template

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
  - Old: `methodName(param: Type): ReturnType`
  - New: `methodName(param: NewType, newParam?: OptionalType): ReturnType`
  - **Migration**: [STEPS]

- [ ] **Type Changes**
  - Old: `interface OldType { ... }`
  - New: `interface NewType { ... }`
  - **Migration**: [STEPS]

### Migration Steps

#### Step 1: Update Dependencies
```bash
npm update @spacechemical/ozon-seller-api
```

#### Step 2: Update Import Statements
```typescript
// Old imports
import { ProductApi } from '@spacechemical/ozon-seller-api';

// New imports (if changed)
import { ProductApi, [NEW_CATEGORY]Api } from '@spacechemical/ozon-seller-api';
```

#### Step 3: Update Usage Patterns
```typescript
// Before
const client = new OzonSellerAPI(config);
const productApi = client.product;

// After
const client = new OzonSellerAPI(config);
const productApi = client.product;
const [newCategory]Api = client.[newCategory];
```

#### Step 4: Handle Breaking Changes
> **Note**: Only include if there are breaking changes

```typescript
// TODO: Document specific migration steps for breaking changes
```

### Testing Your Migration

```typescript
// Test existing functionality still works
describe('Migration Compatibility', () => {
  it('should maintain existing API functionality', async () => {
    // TODO: Add specific tests for your use case
  });
  
  it('should work with new API features', async () => {
    // TODO: Add tests for new features
  });
});
```

### Common Issues and Solutions

#### Issue: [COMMON_PROBLEM]
**Solution**: [SOLUTION_STEPS]

#### Issue: Type errors after update
**Solution**: Update TypeScript types and interfaces

### Rollback Instructions

If you need to rollback to the previous version:

```bash
npm install @spacechemical/ozon-seller-api@[PREVIOUS_VERSION]
```

### Support

- **Documentation**: [LINK]
- **Issues**: [GITHUB_ISSUES_LINK]  
- **Support**: [CONTACT_INFO]

---
**USER ACTION REQUIRED**: Customize this template for each new API category or breaking change.