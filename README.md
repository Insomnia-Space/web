# Telco Recommendation System

A comprehensive platform for telecommunication service recommendations built with Next.js, TypeScript, and modern web technologies.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development Standards](#development-standards)
- [Versioning System](#versioning-system)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🚀 Project Overview

Telco Recommendation System adalah platform yang menyediakan rekomendasi layanan telekomunikasi yang komprehensif untuk membantu pengguna memilih paket dan layanan yang sesuai dengan kebutuhan mereka.

### Key Features

- 🔐 Authentication & Authorization dengan NextAuth.js
- 📊 Dashboard interaktif untuk monitoring dan analytics
- 🎯 Sistem rekomendasi cerdas
- 📱 Responsive design dengan Tailwind CSS
- 🔄 State management dengan Redux Toolkit
- ✅ Form validation dengan Formik & Yup
- 🎨 Modern UI dengan shadcn/ui components

## 🛠 Tech Stack

### Core Technologies

- **Frontend Framework**: Next.js 15.5.4 (with App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

### State Management & Forms

- **State Management**: Redux Toolkit
- **Persistence**: Redux Persist
- **Form Handling**: Formik
- **Validation**: Yup
- **React Hook Form**: @hookform/resolvers

### Authentication & Security

- **Authentication**: NextAuth.js
- **Session Management**: JWT Strategy
- **Providers**: Google OAuth, Credentials

### Development Tools

- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky
- **Commit Convention**: Conventional Commits
- **Linting**: lint-staged
- **Package Manager**: npm

### Notifications & UI Enhancements

- **Toast Notifications**: Sonner
- **Date Handling**: date-fns
- **Class Utilities**: clsx, class-variance-authority, tailwind-merge

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── auth/          # NextAuth configuration
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── Providers.tsx     # App providers
├── store/                # Redux store
│   ├── slices/           # Redux slices
│   ├── hooks.ts          # Typed hooks
│   └── index.ts          # Store configuration
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── schemas/              # Validation schemas
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
    ├── constants.ts      # App constants
    └── format.ts         # Formatting utilities
```

## 📐 Development Standards

### Code Style Guidelines

#### 1. TypeScript Standards

- Gunakan TypeScript strict mode
- Definisikan interface untuk semua data structures
- Hindari penggunaan `any`, gunakan `unknown` jika diperlukan
- Gunakan type inference ketika memungkinkan

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

// ❌ Bad
const user: any = {
  /* ... */
};
```

#### 2. Component Standards

- Gunakan functional components dengan hooks
- Props harus memiliki TypeScript interface
- Export default untuk komponen utama, named export untuk utilities

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ variant, onClick, children }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

#### 3. Styling Standards

- Gunakan Tailwind CSS untuk styling
- Manfaatkan shadcn/ui components sebagai base
- Gunakan CSS variables untuk theming
- Mobile-first responsive design

```tsx
// ✅ Good
<div className="flex flex-col gap-4 p-4 md:flex-row">
  <Card className="flex-1">
    <CardContent>Content</CardContent>
  </Card>
</div>
```

#### 4. State Management

- Gunakan Redux Toolkit untuk global state
- Local state dengan useState untuk komponen-specific data
- Gunakan custom hooks untuk reusable logic

```typescript
// ✅ Good - Redux slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});
```

#### 5. Form Handling

- Gunakan Formik untuk form management
- Yup untuk validation schemas
- Integrasikan dengan shadcn/ui form components

```typescript
// ✅ Good
const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Required'),
});
```

### Naming Conventions

#### Files & Directories

- **Components**: PascalCase (`UserProfile.tsx`)
- **Pages**: kebab-case (`user-profile.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

#### Variables & Functions

- **Variables**: camelCase (`userName`, `isLoading`)
- **Functions**: camelCase (`handleSubmit`, `fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Components**: PascalCase (`UserCard`, `LoginForm`)

#### Git Branches

- **Feature**: `feat/feature-name`
- **Bugfix**: `fix/bug-description`
- **Hotfix**: `hotfix/critical-issue`
- **Release**: `release/v1.0.0`

## 📌 Versioning System

Sistem versioning menggunakan format **4 digit** (X.Y.Z.W):

### Format: `MAJOR.MINOR.PATCH.BUILD`

- **MAJOR (X)**: Perubahan besar, breaking changes
- **MINOR (Y)**: Penambahan module/fitur baru
- **PATCH (Z)**: Bug fixes dan perbaikan kecil
- **BUILD (W)**: Setup dependencies, deployment, konfigurasi

### Contoh Versioning:

- `1.0.0.0` - Initial release
- `1.1.0.0` - Menambah module authentication
- `1.1.1.0` - Fix bug di form validation
- `1.1.1.1` - Update dependencies dan deployment config
- `2.0.0.0` - Major refactor dengan breaking changes

### Conventional Commits

Format: `<type>(<scope>): <subject>`

#### Types:

- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Dokumentasi
- `style`: Formatting, missing semicolons
- `refactor`: Code refactoring
- `test`: Menambah tests
- `chore`: Maintenance tasks
- `deps`: Dependency updates
- `deploy`: Deployment related

#### Contoh:

```bash
feat(auth): add Google OAuth login
fix(forms): resolve validation error message
docs(readme): update installation guide
deps(package): update Next.js to v15.5.4
deploy(vercel): configure production environment
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 atau lebih tinggi
- npm 9.0.0 atau lebih tinggi
- Git

### Available Command

npm run dev          # Development server
npm run build        # Production build
npm run lint         # Check linting
npm run lint:fix     # Fix linting issues
npm run prettier     # Check formatting
npm run prettier:fix # Fix formatting
npm run type-check   # TypeScript checking
npm run commit       # Conventional commit

### Installation

1. **Clone repository**

```bash
git clone <repository-url>
cd telco-recommendation
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
cp .env.local.example .env.local
```

Edit `.env.local` dengan konfigurasi yang sesuai:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. **Run development server**

```bash
npm run dev
```

5. **Open browser**
   Buka [http://localhost:3000](http://localhost:3000)

## 💻 Development Workflow

### Daily Development

1. **Pull latest changes**

```bash
git pull origin main
```

2. **Create feature branch**

```bash
git checkout -b feat/new-feature
```

3. **Make changes dan commit**

```bash
# Stage changes
git add .

# Commit dengan conventional format
npm run commit
# atau manual:
git commit -m "feat(component): add user dashboard component"
```

4. **Push dan create PR**

```bash
git push origin feat/new-feature
```

### Code Quality Commands

```bash
# Linting
npm run lint          # Check for lint errors
npm run lint:fix      # Fix autofixable lint errors

# Formatting
npm run prettier      # Check formatting
npm run prettier:fix  # Fix formatting

# Type checking
npm run type-check    # TypeScript type checking

# All checks
npm run pre-commit    # Run all pre-commit checks
```

### Testing

```bash
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🚢 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Setup

Pastikan environment variables sudah dikonfigurasi untuk production:

```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Vercel Deployment

Project ini siap untuk deployment di Vercel:

1. Push ke repository
2. Connect repository di Vercel
3. Configure environment variables
4. Deploy

## 🤝 Contributing

### Code Review Guidelines

1. **Pre-submission Checklist**
   - [ ] Code follows style guidelines
   - [ ] Tests pass
   - [ ] Type checking passes
   - [ ] No console.log statements
   - [ ] Components are properly documented

2. **Pull Request Process**
   - Create descriptive PR title
   - Include screenshots for UI changes
   - Reference related issues
   - Request review from team members

3. **Code Review Criteria**
   - Code readability and maintainability
   - Performance considerations
   - Security best practices
   - Accessibility compliance

### Team Collaboration

#### Branch Protection Rules

- `main` branch requires PR review
- All checks must pass before merge
- Squash merge preferred for feature branches

#### Communication

- Use descriptive commit messages
- Comment complex logic
- Update documentation for new features
- Discuss major changes in team meetings

## 📚 Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Tools & Extensions

- **VS Code Extensions**: ES7+ React/Redux/React-Native snippets, Prettier, ESLint
- **Browser Extensions**: Redux DevTools, React Developer Tools

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Coding! 🚀**

> Dibuat untuk memudahkan pengembangan project Telco Recommendation System.
