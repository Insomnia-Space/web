# Contributing to Telco Recommendation System

Terima kasih atas minat Anda untuk berkontribusi pada project Telco Recommendation System! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)

## Code of Conduct

Dengan berpartisipasi dalam project ini, Anda setuju untuk menjaga lingkungan yang respectful dan inclusive untuk semua kontributor.

### Aturan Dasar:

- Gunakan bahasa yang sopan dan profesional
- Hormati pendapat dan perspektif yang berbeda
- Fokus pada konstruktif feedback
- Bantu sesama developer dengan sabar

## Getting Started

1. **Fork repository** ini ke akun GitHub Anda
2. **Clone** fork Anda ke local machine:
   ```bash
   git clone https://github.com/your-username/telco-recommendation.git
   cd telco-recommendation
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Setup environment**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local dengan konfigurasi yang sesuai
   ```
5. **Run development server**:
   ```bash
   npm run dev
   ```

## Development Process

### Branch Strategy

Kami menggunakan **Git Flow** strategy:

- `main` - Production ready code
- `develop` - Development branch
- `feat/*` - Feature branches
- `fix/*` - Bug fix branches
- `hotfix/*` - Critical fixes

### Workflow Steps

1. **Create branch** dari `develop`:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/your-feature-name
   ```

2. **Make changes** dan test locally

3. **Commit changes** dengan conventional commit format:

   ```bash
   git add .
   npm run commit  # atau manual commit
   ```

4. **Push branch**:

   ```bash
   git push origin feat/your-feature-name
   ```

5. **Create Pull Request** ke `develop` branch

## Coding Standards

### TypeScript Guidelines

#### ✅ DO

```typescript
// Interface untuk props
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
  className?: string;
}

// Proper type definitions
type Status = 'pending' | 'approved' | 'rejected';

// Use type inference when obvious
const users = await fetchUsers(); // Type inferred from function return
```

#### ❌ DON'T

```typescript
// Avoid any
const data: any = response.data;

// Avoid implicit any
function handleClick(event) {
  // Should be (event: MouseEvent)
  // ...
}
```

### React Component Guidelines

#### ✅ DO

```typescript
// Named function with proper typing
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant,
  size = 'md',
  children,
  onClick
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

#### ❌ DON'T

```typescript
// Avoid default exports for components
export default function Button(props: any) {
  return <button {...props} />;
}
```

### CSS/Styling Guidelines

#### ✅ DO

```tsx
// Use Tailwind utility classes
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <p className="text-gray-600">Description</p>
</div>

// Use cn() for conditional classes
<Button
  className={cn(
    "w-full",
    isLoading && "opacity-50 cursor-not-allowed"
  )}
>
  Submit
</Button>
```

#### ❌ DON'T

```tsx
// Avoid inline styles
<div style={{ padding: '24px', backgroundColor: 'white' }}>
  Content
</div>

// Avoid long className strings without organization
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
```

## Commit Guidelines

Kami menggunakan **Conventional Commits** specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `deps`: Dependency updates
- `deploy`: Deployment related changes

### Examples

```bash
feat(auth): add Google OAuth login integration

Add Google OAuth provider to NextAuth configuration
- Configure Google OAuth credentials
- Add login button component
- Update authentication flow

Closes #123

fix(forms): resolve validation error display issue

The error messages were not showing properly due to
incorrect field name mapping in the validation schema.

deps(package): update Next.js to v15.5.4

Update Next.js and related dependencies to latest stable version
for improved performance and security fixes.

deploy(vercel): add production environment variables

Configure production environment variables for:
- NextAuth secret
- Google OAuth credentials
- Database connection string
```

## Pull Request Process

### PR Checklist

Sebelum submit PR, pastikan:

- [ ] ✅ Branch up-to-date dengan `develop`
- [ ] ✅ All tests passing (`npm test`)
- [ ] ✅ No TypeScript errors (`npm run type-check`)
- [ ] ✅ No ESLint errors (`npm run lint`)
- [ ] ✅ Code formatted properly (`npm run prettier`)
- [ ] ✅ Components documented with proper TypeScript interfaces
- [ ] ✅ Added tests for new functionality
- [ ] ✅ Updated documentation if needed

### PR Template

```markdown
## Description

Brief description of changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)

Add screenshots here for UI changes.

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

### Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least 1 approval dari team member
3. **Testing**: Manual testing untuk UI changes
4. **Documentation**: Update docs jika ada perubahan API/interface

## Testing Guidelines

### Unit Tests

```typescript
// Component testing example
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

```typescript
// API route testing example
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/users';

describe('/api/users', () => {
  it('returns users list', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        users: expect.any(Array),
      })
    );
  });
});
```

### Testing Commands

```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
npm run test:e2e          # Run end-to-end tests (if available)
```

## Project Structure Guidelines

### File Naming

- **Components**: PascalCase (`UserProfile.tsx`)
- **Pages**: kebab-case (`user-settings.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`User.types.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### Directory Organization

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── forms/           # Form-specific components
│   └── layout/          # Layout components
├── app/                 # Next.js app directory
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── store/               # Redux store and slices
├── types/               # TypeScript type definitions
└── utils/               # Helper functions
```

## Getting Help

### Resources

- 📚 **Documentation**: Check the README.md dan inline comments
- 🐛 **Issues**: Search existing issues sebelum create new one
- 💬 **Discussions**: Use GitHub Discussions untuk general questions
- 📧 **Direct Contact**: Reach out ke maintainers untuk urgent issues

### Questions?

- Check existing documentation first
- Search closed issues dan PRs
- Ask in team chat atau create discussion
- Be specific tentang problem Anda

---

## Thank You! 🙏

Kontribusi Anda sangat berarti untuk project ini. Every bug report, feature request, dan code contribution membantu membuat Telco Recommendation System menjadi lebih baik.

**Happy Contributing! 🚀**
