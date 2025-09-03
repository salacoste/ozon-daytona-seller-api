# Rollback Procedures

## Overview
Comprehensive rollback procedures for brownfield development safety.

## Automated Rollback Triggers

### Breaking Change Detection
- **Trigger**: `npm run breaking:check` fails in CI/CD
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
   ```bash
   # Stop any ongoing deployment
   # Platform-specific commands
   ```

2. **Revert Code Changes**
   ```bash
   git revert [COMMIT_HASH]
   git push origin main
   ```

3. **Rebuild and Test**
   ```bash
   npm run clean
   npm run build
   npm run test:unit
   npm run breaking:check
   ```

4. **Deploy Rollback Version**
   ```bash
   # For GitHub Actions / npm publishing
   npm run build
   npm version patch --no-git-tag-version
   npm publish --tag rollback
   
   # For Docker-based deployment
   docker build -t ozon-sdk:rollback .
   docker push your-registry/ozon-sdk:rollback
   kubectl set image deployment/ozon-sdk-deployment ozon-sdk=your-registry/ozon-sdk:rollback
   
   # For direct server deployment
   rsync -av dist/ user@server:/path/to/deployment/
   systemctl restart ozon-sdk-service
   
   # Verify deployment
   curl -f https://your-api.com/health || echo "Deployment failed"
   ```

5. **Validate Rollback**
   ```bash
   npm run test:integration
   npm run test:performance
   ```

### Partial Rollback (Feature-Specific)

When only specific features need to be rolled back:

1. **Identify Affected Components**
   - [ ] API endpoints
   - [ ] Type definitions  
   - [ ] Client code
   - [ ] Tests

2. **Selective Revert**
   ```bash
   git revert [FEATURE_COMMIT_1] [FEATURE_COMMIT_2]
   ```

3. **Update Documentation**
   - [ ] Update API documentation
   - [ ] Update migration guides
   - [ ] Notify users of reverted features

## Rollback Testing

### Pre-Rollback Validation
```bash
# Validate rollback target
npm run test:unit
npm run breaking:check
npm run bundle:check
```

### Post-Rollback Validation
```bash
# Confirm system stability
npm run test:integration
npm run test:performance
npm run risk:monitor
```

## Communication Plan

### Internal Team
- [ ] **Immediate Notification** (within 5 minutes)
  - Slack: #ozon-sdk-alerts
  - Email: team-leads@spacechemical.com
  - PagerDuty: P1 incident for production issues
- [ ] **Status Updates** 
  - Update GitHub repository status badge
  - Update internal dashboard: https://status.internal.com/ozon-sdk
  - Document in incident log: docs/incidents/YYYY-MM-DD-rollback.md

### External Users
- [ ] **API Status Page**
  - Update https://status.spacechemical.com/ozon-sdk
  - Set status to "Under Maintenance" or "Degraded Performance"
- [ ] **User Notifications**
  - Send email to SDK users mailing list: sdk-users@spacechemical.com
  - Post update on GitHub repository issues
  - Update npm package deprecation warning if needed
- [ ] **Timeline Communication**
  - Provide ETA for resolution (within 30 minutes of rollback)
  - Send hourly updates until resolved
  - Post-incident report within 24 hours

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
| Critical | Production Down | Immediate | Team Lead (@tech-lead) + On-call Engineer |
| High | Functionality Broken | < 1 hour | Tech Lead (@tech-lead) + Product Manager (@pm) |
| Medium | Performance Issues | < 4 hours | Tech Lead (@tech-lead) |
| Low | Minor Issues | Next Release | Development Team |

---
**ROLLBACK PROCEDURES CONFIGURED**: ✅ Deployment commands, communication plan, and approval matrix customized for SpaceChemical environment.