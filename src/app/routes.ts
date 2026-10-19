/**
 * Centralized Route Map for Etcom Frontend.
 * Rule: Paths must NEVER be hardcoded elsewhere in the application.
 */

export const ROUTES = {
  // Auth Flows
  AUTH_WELCOME: '/',
  AUTH_SIGNUP: '/signup',
  AUTH_VERIFY_PHONE: '/verify-phone',

  // Customer Journey
  CUSTOMER_HOME: '/home',
  CUSTOMER_REQUEST_NEW: '/request/new',
  CUSTOMER_RESULTS: '/results',
  CUSTOMER_PRO_DETAIL: (id: string = ':id') => `/professionals/${id}`,
  CUSTOMER_JOBS: '/jobs',
  CUSTOMER_JOB_DETAIL: (id: string = ':id') => `/jobs/${id}`,
  CUSTOMER_JOB_CHAT: (id: string = ':id') => `/jobs/${id}/chat`,
  CUSTOMER_JOB_QUOTE: (id: string = ':id') => `/jobs/${id}/quote`,
  CUSTOMER_JOB_CONFIRM: (id: string = ':id') => `/jobs/${id}/confirm`,
  CUSTOMER_JOB_PAY: (id: string = ':id') => `/jobs/${id}/pay`,
  CUSTOMER_JOB_COMPLETE: (id: string = ':id') => `/jobs/${id}/complete`,
  CUSTOMER_JOB_DISPUTE: (id: string = ':id') => `/jobs/${id}/dispute`,
  CUSTOMER_ACCOUNT: '/account',
  CUSTOMER_NOTIFICATIONS: '/notifications',

  // Professional Journey
  PRO_ONBOARDING: '/p/onboarding',
  PRO_VERIFY_IDENTITY: '/p/verify/identity',
  PRO_VERIFY_SKILLS: '/p/verify/skills',
  PRO_VERIFICATION: '/p/verification',
  PRO_DASHBOARD: '/p/dashboard',
  PRO_REQUESTS: '/p/requests',
  PRO_JOB_DETAIL: (id: string = ':id') => `/p/jobs/${id}`,
  PRO_JOB_QUOTE: (id: string = ':id') => `/p/jobs/${id}/quote`,
  PRO_PORTFOLIO: '/p/portfolio',
  PRO_REVIEWS: '/p/reviews',

  // Admin Journey
  ADMIN_QUEUE: '/admin/queue',
  ADMIN_REVIEW_DETAIL: (id: string = ':id') => `/admin/review/${id}`,
  ADMIN_DISPUTES: '/admin/disputes',
} as const;
