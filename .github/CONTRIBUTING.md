# Contributing to Ozon Seller API SDK

Thank you for your interest in contributing to the Ozon Seller API TypeScript SDK! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm (comes with Node.js)
- Git

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/salacoste/ozon-seller-api.git
cd ozon-seller-api

# Install dependencies
npm install

# Run tests to ensure everything works
npm test

# Build the project
npm run build
```

## 📋 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier (configured in the project)
- Maximum 500 lines per file
- Write clear, self-documenting code
- Add JSDoc comments for public APIs

### Testing Requirements
- Write unit tests for all new functionality
- Maintain test coverage ≥80%
- Add contract tests for API examples
- Use descriptive test names
- Test edge cases and error conditions

### Commit Message Format
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
type(scope): description

Examples:
feat(fbs): add new shipment tracking method
fix(product): handle null product descriptions
docs(readme): update installation instructions
test(analytics): add missing test cases
```

### Branch Naming
- `feature/short-description` - New features
- `fix/short-description` - Bug fixes  
- `docs/short-description` - Documentation updates
- `test/short-description` - Test improvements

## 🏗️ Project Structure

```
src/
├── clients/           # API group clients
│   ├── fbs/          # FBS API implementation
│   ├── fbo/          # FBO API implementation
│   └── ...           # Other API groups
├── http/             # HTTP client and middleware
├── errors/           # Error handling
├── pagination/       # Pagination utilities
└── types/           # TypeScript type definitions

tests/
├── unit/            # Unit tests
├── contract/        # Contract tests
└── integration/     # Integration tests
```

## 📝 Adding New Features

### Adding New API Methods
1. Check the official Ozon API documentation
2. Add types in the appropriate `types/` directory
3. Implement the method in the corresponding client
4. Add comprehensive unit tests
5. Update documentation and examples

### Adding New API Groups
1. Create directory: `src/clients/newgroup/`
2. Create types: `src/clients/newgroup/types.ts`
3. Create client: `src/clients/newgroup/index.ts`
4. Add to main client: `src/clients/OzonClient.ts`
5. Export from: `src/index.ts`
6. Add comprehensive tests
7. Update documentation

## 🧪 Testing Guidelines

### Running Tests
```bash
# Run all tests
npm test

# Run specific test types
npm run test:unit
npm run test:contract
npm run test:e2e

# Run with coverage
npm run test:coverage

# Watch mode during development
npm run test:watch
```

### Writing Tests
```typescript
describe('NewFeatureAPI', () => {
  let client: NewFeatureAPI;
  let mockHttpClient: MockHttpClient;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    client = new NewFeatureAPI(mockHttpClient);
  });

  it('should handle successful response', async () => {
    // Arrange
    const expectedResponse = { /* mock data */ };
    mockHttpClient.post.mockResolvedValueOnce(expectedResponse);

    // Act
    const result = await client.someMethod(params);

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/endpoint', params);
  });

  it('should handle errors gracefully', async () => {
    // Test error conditions
  });
});
```

## 🔍 Code Review Process

### Before Submitting a PR
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Breaking changes are documented
- [ ] Self-review completed

### PR Review Checklist
- Code quality and maintainability
- Test coverage and quality
- Documentation completeness
- Performance implications
- Security considerations
- Backward compatibility

## 📚 Documentation

### Update Documentation When:
- Adding new API methods or clients
- Changing existing API behavior
- Adding configuration options
- Fixing bugs that affect usage

### Documentation Files
- `README.md` - Main project documentation
- `CHANGELOG.md` - Version history
- Inline JSDoc comments for all public APIs
- Example code in appropriate locations

## 🐛 Reporting Issues

### Bug Reports
- Use the bug report template
- Include reproducible example
- Specify SDK version and environment
- Provide complete error messages

### Feature Requests  
- Use the feature request template
- Explain the use case clearly
- Suggest API design if applicable
- Consider backward compatibility

## 📦 Release Process

### Version Numbering
Follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes (backward compatible)

### Release Steps (Maintainers)
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release tag
4. GitHub Actions handles the rest

## 💬 Getting Help

### Communication Channels
- GitHub Issues - Bug reports and feature requests
- GitHub Discussions - General questions and ideas
- Pull Request comments - Code-specific discussions

### Response Times
- Critical bugs: Within 24 hours
- Feature requests: Within 1 week
- General questions: Within 3 days

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors are recognized in:
- Release notes
- `CHANGELOG.md`
- GitHub contributors page

Thank you for making the Ozon Seller API SDK better! 🎉