# Contributing to Personal Finance Management (PFM)

Thank you for your interest in contributing to the Personal Finance Management (PFM) application. This document outlines the standards and guidelines that should be followed when contributing to this project.

## Development Principles

### SOLID Principles

All code should follow the SOLID principles where possible:

1. **Single Responsibility Principle**: Each class should have only one reason to change.
2. **Open/Closed Principle**: Software entities should be open for extension but closed for modification.
3. **Liskov Substitution Principle**: Derived classes must be substitutable for their base classes.
4. **Interface Segregation**: Many specific interfaces are better than one general interface.
5. **Dependency Inversion**: Depend upon abstractions, not concretions.

### Code Reusability

- Avoid duplicated code in both backend and frontend.
- Componentize any code that could potentially be reused.
- Use services, traits, and other abstractions to share functionality.
- Create reusable UI components for the frontend.

## Language

- **English** is the language used throughout the codebase.
- All class names, method names, variable names, and comments must be written in English.
- Use meaningful and descriptive names for all code elements.

## Code Documentation

- Write self-documenting code with clear, descriptive names.
- Add comments only when strictly necessary to explain complex logic or algorithms.
- Document classes and public methods with PHPDoc/JSDoc when additional context is needed.
- Do not add redundant comments that merely restate what the code is doing.

## Coding Standards

### PHP (Backend)

- Follow [PSR-12](https://www.php-fig.org/psr/psr-12/) coding standard.
- Use PHP 8.2+ features where appropriate.
- Key points:
  - Use 4 spaces for indentation (not tabs).
  - Lines should be 80 characters or less.
  - Namespace declarations should be followed by a blank line.
  - Class opening braces should be on the next line after the class declaration.
  - Method opening braces should be on the next line after the method declaration.
  - Always use strict type declarations (`declare(strict_types=1);`).
  - Always include visibility modifiers (`public`, `protected`, `private`).
  - Use type hints for method parameters and return types.

### JavaScript/TypeScript (Frontend)

- Follow [StandardJS](https://standardjs.com/) style.
- Key points:
  - Use 2 spaces for indentation (not tabs).
  - No semicolons.
  - Use single quotes for strings.
  - No unused variables.
  - Add a space after keywords `if`, `for`, `while`, etc.
  - Add a space after function name in function declarations.
  - Use ES6+ features where appropriate.

## Pull Request Process

1. Ensure any install or build dependencies are removed before submitting a PR.
2. Update the README.md with details of changes to the interface, if applicable.
3. Update the documentation accordingly.
4. The PR may be merged once it has been reviewed and approved by a maintainer.

## Testing

- Write tests for all new features and bug fixes.
- For backend:
  - Use PHPUnit for unit and feature tests.
  - Ensure all tests pass before submitting a PR.
- For frontend:
  - Use Jest or Vue Testing Library for component tests.
  - Ensure all tests pass before submitting a PR.

## Git Workflow

- Use feature branches for all new features or bug fixes.
- Branch naming convention: `feature/feature-name` or `fix/bug-name`.
- Keep commits small and focused on a single change.
- Write clear commit messages describing what the change does.
- Rebase your branch on the latest main branch before submitting a PR.

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

#### Scope
The scope should be the name of the module affected (as perceived by the person reading the changelog).

#### Description
- Use imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No period (.) at the end

#### Examples
```
feat(accounts): add new bank account reconciliation feature
fix(transactions): prevent duplicate transaction entries
docs(readme): update installation instructions
refactor(auth): improve authentication flow
```

### Best Practices for Commits

- **Atomic Commits**: Each commit should represent a single logical change. This makes it easier to review, revert, or cherry-pick changes.
- **Consistent History**: Avoid "fix typo" or "oops" commits by using `git commit --amend` or interactive rebasing to clean up your history before pushing.
- **Meaningful Changes**: Don't mix unrelated changes in the same commit.
- **Reviewable Size**: Keep commits at a reviewable size. Large commits are difficult to review and understand.
- **Working State**: Each commit should leave the codebase in a working state. Tests should pass after each commit.
- **Reference Issues**: When a commit addresses an issue, reference it in the commit message (e.g., "fix: resolve issue #42").
- **Sign Your Commits**: If possible, use GPG to sign your commits to verify authenticity.

## Code Review

All code changes require a code review. During code reviews, reviewers should check:

1. Code follows the specified coding standards.
2. SOLID principles are applied where appropriate.
3. No code duplication.
4. Proper error handling.
5. Adequate test coverage.
6. Documentation is updated if necessary.

## Version Control

- Follow [Semantic Versioning](https://semver.org/) for release versioning.
- Format: MAJOR.MINOR.PATCH
  - MAJOR: Incompatible API changes
  - MINOR: Backwards-compatible functionality added
  - PATCH: Backwards-compatible bug fixes

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.