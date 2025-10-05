import { redirect } from 'next/navigation';

/**
 * Error handling utilities for Next.js App Router
 */

export const ERROR_PAGES = {
  NOT_FOUND: '/not-found',
  UNAUTHORIZED: '/unauthorized',
  AUTH_ERROR: '/auth/error',
  MAINTENANCE: '/maintenance',
} as const;

/**
 * Redirect to unauthorized page
 */
export function redirectToUnauthorized() {
  redirect(ERROR_PAGES.UNAUTHORIZED);
}

/**
 * Redirect to auth error page with error code
 */
export function redirectToAuthError(error?: string, callbackUrl?: string) {
  const params = new URLSearchParams();
  if (error) params.set('error', error);
  if (callbackUrl) params.set('callbackUrl', callbackUrl);

  const url = params.toString()
    ? `${ERROR_PAGES.AUTH_ERROR}?${params.toString()}`
    : ERROR_PAGES.AUTH_ERROR;

  redirect(url);
}

/**
 * Redirect to maintenance page
 */
export function redirectToMaintenance() {
  redirect(ERROR_PAGES.MAINTENANCE);
}

/**
 * Check if user has required role
 */
export function checkUserRole(userRole: string, requiredRole: string | string[]) {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
}

/**
 * Utility to handle API errors consistently
 */
export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: false,
    error: 'An unexpected error occurred',
  };
}

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Create standardized error responses
 */
export function createErrorResponse(message: string, statusCode = 500, code = 'INTERNAL_ERROR') {
  return {
    success: false,
    error: message,
    code,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}
