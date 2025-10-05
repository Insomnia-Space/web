# Git Setup Guide untuk Telco Recommendation System

## 🚀 Quick Setup Guide

### 1. Initial Setup & Push to GitHub

```bash
# 1. Add all files to staging
git add .

# 2. Make initial commit with conventional format
git commit -m "feat: initial project setup with complete tech stack

- Next.js 15.5.4 with TypeScript and App Router
- Authentication with NextAuth.js (Google OAuth + Credentials)
- State management with Redux Toolkit + Persist
- UI components with shadcn/ui and Tailwind CSS
- Form handling with Formik + Yup validation
- Testing setup with Jest + React Testing Library
- Code quality tools (ESLint, Prettier, Husky)
- Comprehensive error handling system
- Complete documentation and development guidelines

Features included:
- Dashboard page with sample components
- Authentication pages and error handling
- Custom hooks and utilities
- Responsive layouts and components
- VSCode workspace configuration
- Development scripts and setup tools"

# 3. Rename branch from master to main
git branch -M main

# 4. Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# 5. Push to main branch
git push -u origin main
```

### 2. Create Development Branch

```bash
# 1. Create and checkout dev branch from main
git checkout -b dev

# 2. Push dev branch to remote
git push -u origin dev

# 3. Set dev as default development branch
git checkout dev
```

### 3. Setup Branch Protection (On GitHub)

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Add protection rule for `main` branch:
   - ☑️ Require pull request reviews before merging
   - ☑️ Require status checks to pass before merging
   - ☑️ Require branches to be up to date before merging
   - ☑️ Restrict pushes to matching branches

## 📋 Complete Git Workflow Commands

### Initial Repository Setup
```bash
# Navigate to project directory
cd "e:\Become Full Stack\Course\Asah X Dicoding\capstone\web"

# Check current status
git status

# Add all files
git add .

# Make initial commit
git commit -m "feat: initial project setup with complete tech stack"

# Rename to main branch
git branch -M main

# Add remote origin (replace URL with your repo)
git remote add origin https://github.com/YOUR_USERNAME/telco-recommendation.git

# Push to main
git push -u origin main

# Create dev branch
git checkout -b dev
git push -u origin dev

# Switch back to dev for development
git checkout dev
```

### Daily Development Workflow
```bash
# Start working on new feature
git checkout dev
git pull origin dev
git checkout -b feat/new-feature

# Make changes and commit
git add .
npm run commit  # Use conventional commit tool

# Push feature branch
git push origin feat/new-feature

# Create PR on GitHub: feat/new-feature → dev
# After PR approved and merged, cleanup
git checkout dev
git pull origin dev
git branch -d feat/new-feature
```

### Release Workflow
```bash
# When ready to release to production
git checkout main
git pull origin main
git merge dev
git push origin main

# Tag the release
git tag -a v1.0.0.0 -m "Release version 1.0.0.0"
git push origin v1.0.0.0
```

## 🔧 Branch Strategy

### Main Branch (`main`)
- **Purpose**: Production-ready code
- **Protection**: Requires PR review
- **Deploy**: Automatic to production
- **Merges from**: `dev` branch only

### Development Branch (`dev`) 
- **Purpose**: Integration branch for features
- **Protection**: Optional PR review
- **Deploy**: Automatic to staging
- **Merges from**: Feature branches

### Feature Branches (`feat/feature-name`)
- **Purpose**: Individual feature development
- **Naming**: `feat/`, `fix/`, `docs/`, `refactor/`
- **Merges to**: `dev` branch
- **Cleanup**: Delete after merge

## 🏷️ Commit Message Convention

We use conventional commits for automated versioning:

```bash
# Types
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
deps: dependency updates
deploy: deployment changes

# Examples
feat(auth): add Google OAuth login
fix(forms): resolve validation error display
docs(readme): update installation guide
deps(package): update Next.js to v15.5.4
```

## 🔄 Version Bumping

Our 4-digit versioning system:
- **MAJOR.MINOR.PATCH.BUILD** (e.g., 1.2.3.4)

```bash
# Update version in package.json
npm version patch  # 1.0.0.0 → 1.0.0.1 (dependencies/deployment)
npm version minor  # 1.0.0.0 → 1.0.1.0 (new features/modules)
npm version major  # 1.0.0.0 → 1.1.0.0 (major changes)

# For build number (manual update in package.json)
# 1.0.0.0 → 1.0.0.1 (deployment/config changes)
```

## 🚀 GitHub Repository Settings

### Repository Settings
```yaml
Repository Name: telco-recommendation
Description: A comprehensive platform for telecommunication service recommendations
Topics: nextjs, typescript, react, tailwindcss, shadcn-ui, nextauth, redux
License: MIT
```

### Branch Protection Rules

#### Main Branch Protection:
- ☑️ Require pull request reviews before merging (1 reviewer)
- ☑️ Dismiss stale reviews when new commits are pushed
- ☑️ Require status checks to pass before merging
- ☑️ Require branches to be up to date before merging
- ☑️ Restrict pushes to matching branches
- ☑️ Allow force pushes (disabled)
- ☑️ Allow deletions (disabled)

### GitHub Actions (Optional)
Create `.github/workflows/ci.yml` for automated testing:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main, dev ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test
```

## 📁 .gitignore Additions

Make sure these are in your `.gitignore`:

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Next.js
.next/
out/

# Production
build/
dist/

# Environment variables
.env*.local
.env.production

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/settings.json
.idea/

# OS
.DS_Store
Thumbs.db

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

## 🤝 Collaboration Guidelines

### Pull Request Template
Create `.github/pull_request_template.md`:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

### Issue Templates
Create issue templates for better bug reporting and feature requests.

---

**Ready to push to GitHub! 🚀**

Replace `YOUR_USERNAME/YOUR_REPOSITORY` with your actual GitHub repository URL and follow the commands above.