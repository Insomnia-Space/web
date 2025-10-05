# Error Handling Guide

This document outlines the comprehensive error handling system implemented in the Telco Recommendation System.

## 📋 Error Pages Overview

### Built-in Next.js Error Pages

#### 1. **Global Error Page** (`/src/app/global-error.tsx`)

- **Purpose**: Handles critical application crashes
- **Trigger**: When the entire app crashes and needs restart
- **Features**:
  - Full HTML wrapper (required for global errors)
  - Reload application button
  - Critical error messaging

#### 2. **Error Page** (`/src/app/error.tsx`)

- **Purpose**: Handles errors within specific routes/components
- **Trigger**: JavaScript errors in React components
- **Features**:
  - Error boundary with reset functionality
  - Development error details
  - User-friendly error messages

#### 3. **Not Found Page** (`/src/app/not-found.tsx`)

- **Purpose**: Handles 404 errors for missing routes
- **Trigger**: When user navigates to non-existent pages
- **Features**:
  - Clear 404 messaging
  - Navigation to popular pages
  - Homepage and dashboard links

#### 4. **Loading Page** (`/src/app/loading.tsx`)

- **Purpose**: Global loading state for route transitions
- **Trigger**: Automatic during page navigation
- **Features**:
  - Loading spinner with progress bar
  - Branded loading message

### Custom Error Pages

#### 5. **Authentication Error** (`/src/app/auth/error/page.tsx`)

- **Purpose**: Handles NextAuth.js authentication errors
- **URL**: `/auth/error?error=ErrorCode`
- **Features**:
  - Specific error code explanations
  - Retry authentication option
  - Support contact information

#### 6. **Unauthorized Access** (`/src/app/unauthorized/page.tsx`)

- **Purpose**: Handles access denied scenarios
- **URL**: `/unauthorized`
- **Features**:
  - Permission denied messaging
  - Sign-in redirect
  - Contact administrator option

#### 7. **Maintenance Mode** (`/src/app/maintenance/page.tsx`)

- **Purpose**: System maintenance notifications
- **URL**: `/maintenance`
- **Features**:
  - Maintenance duration estimates
  - Contact support options
  - Auto-refresh functionality

## 🛠 Error Utilities

### Error Handling Utilities (`/src/utils/errors.ts`)

#### Functions:

- `redirectToUnauthorized()` - Redirect to unauthorized page
- `redirectToAuthError(error, callbackUrl)` - Redirect with error details
- `redirectToMaintenance()` - Redirect to maintenance page
- `checkUserRole(userRole, requiredRole)` - Role validation
- `handleApiError(error)` - Standardized API error handling
- `createErrorResponse(message, statusCode, code)` - Error response format

#### Custom Error Class:

```typescript
class AppError extends Error {
  statusCode: number;
  code: string;
}
```

## 🔒 Middleware Protection (`/src/middleware.ts`)

### Features:

- **Route Protection**: Automatic authentication checks
- **Role-based Access**: Admin route protection
- **Maintenance Mode**: Global maintenance redirect
- **Error Handling**: Graceful middleware error recovery

### Route Categories:

- **Public Routes**: `/`, `/auth/*`, error pages
- **Protected Routes**: `/dashboard`, `/profile`, `/settings`
- **Admin Routes**: `/admin/*`

### Configuration:

```typescript
// Enable maintenance mode
MAINTENANCE_MODE = true;

// Middleware will redirect all traffic to /maintenance
```

## 🚨 Error Scenarios & Responses

### 1. Authentication Errors

| Error Code              | Description                               | User Action                          |
| ----------------------- | ----------------------------------------- | ------------------------------------ |
| `CredentialsSignin`     | Invalid login credentials                 | Retry with correct credentials       |
| `OAuthAccountNotLinked` | Email already linked to different account | Use different email or link accounts |
| `AccessDenied`          | User doesn't have permission              | Contact administrator                |
| `Configuration`         | Server configuration issue                | Contact support                      |

### 2. Authorization Errors

| Scenario                 | Page            | Action                     |
| ------------------------ | --------------- | -------------------------- |
| Not logged in            | `/auth/signin`  | Sign in required           |
| Insufficient permissions | `/unauthorized` | Contact admin              |
| Token expired            | `/auth/signin`  | Re-authentication required |

### 3. Application Errors

| Type            | Page            | Recovery               |
| --------------- | --------------- | ---------------------- |
| Component crash | `/error`        | Reset component        |
| Global crash    | `/global-error` | Reload application     |
| Route not found | `/not-found`    | Navigate to valid page |
| Network issues  | Error boundary  | Retry operation        |

## 📱 User Experience Features

### Consistent Design

- **Visual Hierarchy**: Clear error messaging with icons
- **Action Buttons**: Prominent recovery actions
- **Help Text**: Guidance for next steps
- **Brand Consistency**: Matches overall app design

### Accessibility

- **Screen Reader Support**: Proper ARIA labels
- **Keyboard Navigation**: Focus management
- **Color Contrast**: Error colors meet WCAG standards
- **Text Alternatives**: Icon meanings explained

### Progressive Enhancement

- **JavaScript Disabled**: Basic functionality still works
- **Slow Networks**: Loading states and timeouts
- **Mobile Responsive**: Works on all device sizes

## 🔧 Implementation Examples

### Using Error Utilities in API Routes

```typescript
import { handleApiError, createErrorResponse } from '@/utils/errors';

export async function GET() {
  try {
    // API logic here
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const errorResponse = handleApiError(error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
```

### Protecting Routes with Middleware

```typescript
// Middleware automatically protects routes
// Add new protected routes to the array:
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/new-protected-route', // Add new routes here
];
```

### Using Error Boundaries in Components

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

function MyComponent() {
  return (
    <ErrorBoundary>
      <RiskyComponent />
    </ErrorBoundary>
  );
}
```

### Custom Error Pages for Specific Routes

```typescript
// Create error.tsx in any route folder for route-specific errors
// src/app/dashboard/error.tsx
export default function DashboardError({ error, reset }) {
  return (
    <div>Dashboard-specific error handling</div>
  );
}
```

## 🧪 Testing Error Scenarios

### Manual Testing

1. **404 Errors**: Navigate to `/non-existent-page`
2. **Auth Errors**: Try signing in with invalid credentials
3. **Unauthorized**: Access `/admin` without admin role
4. **Component Errors**: Trigger JavaScript errors in components
5. **Network Errors**: Disconnect internet during API calls

### Error Simulation

```typescript
// Trigger component error for testing
function TestErrorComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Test error for development');
  }

  return (
    <button onClick={() => setShouldError(true)}>
      Trigger Error
    </button>
  );
}
```

## 📊 Error Monitoring

### Development

- **Console Logging**: All errors logged to browser console
- **Error Details**: Full stack traces in development mode
- **Component Stack**: React component error boundaries

### Production

- **Error Reporting**: Integrate with services like Sentry
- **User Feedback**: Contact forms on error pages
- **Analytics**: Track error frequency and types

### Recommended Error Monitoring Setup

```typescript
// Add to your error reporting service
if (process.env.NODE_ENV === 'production') {
  // Report error to monitoring service
  reportError(error, { userId, route, timestamp });
}
```

## 🔄 Error Recovery Strategies

### Automatic Recovery

- **Retry Logic**: API calls with exponential backoff
- **State Reset**: Component state restoration
- **Route Refresh**: Automatic page reloads when appropriate

### User-Initiated Recovery

- **Try Again Buttons**: Clear recovery actions
- **Navigation Options**: Multiple paths forward
- **Support Contacts**: When self-service isn't enough

### Graceful Degradation

- **Feature Fallbacks**: Core functionality when advanced features fail
- **Offline Support**: Basic functionality without network
- **Progressive Loading**: Show partial content during errors

---

This comprehensive error handling system ensures users always have a clear path forward when things go wrong, while providing developers with the tools needed to diagnose and fix issues quickly.
