# Release Checklist for v1.0.0

This checklist ensures all necessary steps are completed before releasing v1.0.0 of the Ozon Seller API SDK.

## Pre-Release Verification

### Code Quality ✅
- [x] All TypeScript files compile without errors
- [x] ESLint passes with no warnings (`npm run lint`)
- [x] Prettier formatting is applied (`npm run format:check`)
- [x] All files are ≤ 500 lines of code
- [x] No `any` types in public API

### Testing ✅
- [x] All unit tests pass (563 tests)
- [x] Contract tests pass
- [x] Test coverage ≥ 80%
- [x] Integration tests verified (if applicable)

### Documentation ✅
- [x] README.md is complete and accurate
- [x] CHANGELOG.md is updated for v1.0.0
- [x] API documentation in code (JSDoc comments)
- [x] Usage examples for all major features
- [x] License file (MIT) is present

### API Coverage ✅
- [x] **Production API Groups (27)**: All implemented
  - [x] FBS (22 endpoints)
  - [x] FBO (13 endpoints)
  - [x] ProductAPI (18 endpoints)
  - [x] Prices&StocksAPI (9 endpoints)
  - [x] WarehouseAPI (2 endpoints)
  - [x] AnalyticsAPI (5 endpoints)
  - [x] ReportAPI (8 endpoints)
  - [x] FinanceAPI (11 endpoints)
  - [x] CategoryAPI (4 endpoints)
  - [x] SupplierAPI (4 endpoints)
  - [x] ChatAPI (8 endpoints)
  - [x] CancellationAPI (7 endpoints)
  - [x] Returns APIs (9 endpoints total)
  - [x] DeliveryFBS (18 endpoints)
  - [x] DeliveryrFBS (8 endpoints)
  - [x] BarcodeAPI (2 endpoints)
  - [x] PolygonAPI (2 endpoints)
  - [x] SellerRating (2 endpoints)
  - [x] BrandAPI (1 endpoint)
  - [x] PromosAPI (8 endpoints)
  - [x] PassAPI (7 endpoints)
  - [x] And 5 more groups...

- [x] **Beta API Groups (5)**: All implemented
  - [x] ReviewAPI (7 endpoints)
  - [x] DigitalAPI (3 endpoints)
  - [x] QuantsAPI (2 endpoints)
  - [x] BetaMethodAPI (9 endpoints)
  - [x] Questions&Answers (8 endpoints)

### Build Verification ✅
- [x] ESM build generates correctly
- [x] CJS build generates correctly
- [x] Type declarations generate correctly
- [x] Package exports are configured properly

### GitHub Setup ✅
- [x] GitHub Actions workflows configured
  - [x] CI/CD pipeline (ci.yml)
  - [x] Release automation (release.yml)
  - [x] PR validation (pr.yml)
- [x] Issue templates created
- [x] PR template created
- [x] Contributing guidelines added
- [x] Code owners defined
- [x] Dependabot configured

## Release Steps

### 1. Final Verification
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Run all quality checks
npm run lint
npm run format:check
npm run typecheck
npm test
npm run test:coverage

# Build verification
npm run build
```

### 2. Version Confirmation
- [x] package.json version is "1.0.0"
- [x] CHANGELOG.md has v1.0.0 entry with release date
- [x] No uncommitted changes

### 3. Git Operations
```bash
# Ensure on main branch
git checkout main
git pull origin main

# Create release commit
git add .
git commit -m "chore: release v1.0.0"

# Create release tag
git tag -a v1.0.0 -m "Release v1.0.0 - Initial stable release"

# Push to GitHub
git push origin main
git push origin v1.0.0
```

### 4. GitHub Release
- Go to [GitHub Releases](https://github.com/salacoste/ozon-seller-api/releases)
- Click "Draft a new release"
- Select tag: v1.0.0
- Release title: "v1.0.0 - Initial Release"
- Copy release notes from CHANGELOG.md
- Attach build artifacts if needed
- Publish release

### 5. NPM Publication
```bash
# Login to NPM (if not already)
npm login

# Publish to NPM
npm publish --access public

# Verify publication
npm view @ozon/sdk
```

### 6. Post-Release Verification
- [ ] Package visible on [npmjs.com](https://www.npmjs.com/package/@ozon/sdk)
- [ ] Installation works: `npm install @ozon/sdk`
- [ ] GitHub release is published
- [ ] CI/CD badges are green

## Success Metrics

### Launch Metrics
- **Package Size**: < 1MB for each build (ESM/CJS)
- **Install Time**: < 30 seconds on average connection
- **TypeScript Compilation**: < 10 seconds
- **Test Execution**: < 2 minutes for full suite

### Quality Metrics
- **Type Coverage**: 100% (no `any` in public API)
- **Test Coverage**: > 80%
- **Documentation**: 100% of public APIs documented
- **Examples**: Working examples for all API groups

### API Coverage
- **Endpoints**: 263 of 263 implemented (100%)
- **API Groups**: 32 of 32 implemented (100%)
- **Type Definitions**: 1069 schemas typed

## Rollback Plan

If issues are discovered post-release:

1. **NPM Deprecation** (if critical):
```bash
npm deprecate @ozon/sdk@1.0.0 "Critical issue found, please wait for 1.0.1"
```

2. **Hotfix Process**:
- Create hotfix branch from v1.0.0 tag
- Fix critical issues
- Bump to v1.0.1
- Fast-track through CI/CD
- Release as patch

3. **Communication**:
- Update GitHub issues
- Post in discussions
- Update README with known issues

## Support Channels

- **Bug Reports**: GitHub Issues
- **Questions**: GitHub Discussions
- **Security**: security@example.com
- **Documentation**: [API Docs](https://github.com/salacoste/ozon-seller-api/wiki)

## Final Sign-Off

- [ ] Technical Lead approval
- [ ] Documentation review complete
- [ ] Security scan passed
- [ ] Performance benchmarks met
- [ ] Release notes reviewed

---

**Release Date**: January 15, 2024
**Release Manager**: @salacoste
**Version**: 1.0.0
**Status**: READY FOR RELEASE ✅