export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/signin',
    LOGOUT: '/api/auth/signout',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile',
  },
  RECOMMENDATIONS: {
    LIST: '/api/recommendations',
    DETAIL: (id: string) => `/api/recommendations/${id}`,
    CREATE: '/api/recommendations',
    UPDATE: (id: string) => `/api/recommendations/${id}`,
    DELETE: (id: string) => `/api/recommendations/${id}`,
  },
  USERS: {
    LIST: '/api/users',
    DETAIL: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
  },
} as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  RECOMMENDATIONS: '/recommendations',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    ERROR: '/auth/error',
  },
} as const;

export const APP_CONFIG = {
  NAME: 'Telco Recommendation',
  DESCRIPTION: 'A comprehensive platform for telecommunication service recommendations',
  VERSION: '1.0.0.0',
  COMPANY: 'Telco Solutions',
} as const;
