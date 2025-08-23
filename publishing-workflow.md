# NPM Package Publishing Workflow

## Package Configuration Strategy

### Package Identity
- **Name**: `@spacechemical/ozon-seller-api`
- **Scope**: Organization-scoped for better namespace management
- **Version**: Semantic versioning (0.1.0 → 1.0.0 → 1.1.0)
- **License**: MIT (developer-friendly, commercial use allowed)

### Distribution Strategy
- **ES Modules**: Primary distribution format (`type: "module"`)
- **CommonJS**: Compatibility build for legacy Node.js projects
- **TypeScript**: Full type definitions included
- **Node.js**: Minimum version 18.0.0 (LTS with native fetch support)

## Build Pipeline

### TypeScript Compilation
```bash
# Primary ES module build
tsc

# CommonJS compatibility build
tsc -p tsconfig.cjs.json
```

### Output Structure
```
dist/
├── index.js          # ES module entry point
├── index.d.ts        # TypeScript definitions
├── index.cjs         # CommonJS entry point
├── core/             # Core infrastructure
├── categories/       # API category modules
└── types/           # Type definitions
```

### Quality Gates
1. **TypeScript Compilation**: No type errors
2. **Linting**: ESLint passes with zero warnings
3. **Testing**: 85%+ coverage, all tests pass
4. **Format**: Prettier code formatting enforced

## Release Process

### Automated Release Pipeline
```bash
# Development workflow
npm run clean          # Clean previous builds
npm run typecheck      # Validate TypeScript
npm run lint           # Code quality checks
npm run test:coverage  # Full test suite with coverage
npm run build          # Compile TypeScript
npm run format:check   # Verify code formatting

# Release preparation (automated via prepublishOnly)
npm publish            # Triggers full pipeline + publish
```

### Version Management
- **Patch** (0.1.0 → 0.1.1): Bug fixes, documentation
- **Minor** (0.1.0 → 0.2.0): New API categories, backward-compatible features
- **Major** (0.1.0 → 1.0.0): Breaking changes, API redesigns

### Release Automation
```json
{
  "scripts": {
    "prepublishOnly": "npm run clean && npm run build && npm run test:unit && npm run lint",
    "release": "release-it",
    "release:patch": "release-it patch",
    "release:minor": "release-it minor", 
    "release:major": "release-it major"
  }
}
```

## Documentation Strategy

### Package Documentation
- **README.md**: Installation, quick start, API overview
- **API Documentation**: Auto-generated with TypeDoc
- **Examples**: Real-world usage patterns
- **Migration Guides**: Version upgrade instructions

### TypeScript Integration
- Full type definitions exported
- IntelliSense support in VS Code
- Compile-time type checking
- Auto-completion for all API methods

## Security & Maintenance

### Security Measures
- **No secrets in package**: All examples use placeholder credentials
- **Dependency scanning**: Regular updates for security vulnerabilities
- **Audit logs**: Track all published versions

### Maintenance Strategy
- **Regular updates**: Keep dependencies current
- **API compatibility**: Monitor Ozon API changes
- **Community support**: Issue tracking and bug reports

## Distribution Channels

### NPM Registry
- **Primary**: npm publish to registry.npmjs.org
- **Scope**: @spacechemical organization
- **Access**: Public package (free to install)

### GitHub Packages (Optional)
- **Secondary**: Backup distribution channel
- **Integration**: Automatic publishing via GitHub Actions
- **Authentication**: GitHub token-based access

## Monitoring & Analytics

### Package Analytics
- **Download metrics**: NPM download statistics
- **Usage patterns**: Most popular API categories
- **Version adoption**: Migration rates to new versions

### Quality Metrics
- **Bundle size**: Track package size growth
- **Performance**: API response time benchmarks
- **Error rates**: Real-world usage error tracking

## CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Publish Package
on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Quality Checks
- **Pre-commit hooks**: Lint and format code
- **PR validation**: Full test suite execution
- **Release validation**: Integration tests against live API
- **Post-release**: Package installation verification

## Beta Testing Strategy

### Pre-release Channels
```bash
# Beta releases for testing
npm publish --tag beta
npm install @spacechemical/ozon-seller-api@beta

# Release candidates
npm publish --tag rc
npm install @spacechemical/ozon-seller-api@rc
```

### Testing Pipeline
1. **Alpha**: Internal development testing
2. **Beta**: Community testing with real Ozon accounts
3. **RC**: Release candidate with feature freeze
4. **Stable**: Production-ready release

## Support & Community

### Issue Management
- **Bug reports**: GitHub Issues with reproduction templates
- **Feature requests**: Community-driven enhancement proposals
- **Documentation**: Wiki and usage examples

### Community Guidelines
- **Code of conduct**: Respectful collaboration
- **Contribution guide**: How to submit improvements
- **Support channels**: GitHub Discussions for questions

## Migration Strategy

### Breaking Changes
- **Deprecation warnings**: 2+ minor versions before removal
- **Migration guides**: Step-by-step upgrade instructions
- **Backward compatibility**: Maintained for major version lifecycle

### API Evolution
- **New categories**: Additive changes (minor version bump)
- **Method signatures**: Breaking changes (major version bump)
- **Response formats**: Aligned with Ozon API evolution