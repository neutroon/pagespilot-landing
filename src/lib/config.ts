// Configuration for API endpoints
export const API_CONFIG = {
  // Backend API base URL
  BACKEND_URL: process.env.NEXT_PUBLIC_API || "http://localhost:8080",

  // Facebook API endpoints
  FACEBOOK: {
    LOGIN: "/api/v1/facebook/login",
    CALLBACK: "/api/v1/facebook/login/callback",
    PAGES: "/api/v1/facebook/pages",
    POST: "/api/v1/facebook/post",
    SCHEDULE: "/api/v1/facebook/schedule",
    UPLOAD_IMAGE: "/api/v1/facebook/upload-image",
    GENERATE_POST: "/api/v1/facebook/generate-post",
  },

  // Authentication API endpoints
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    LOGOUT: "/api/v1/auth/logout",
    REFRESH: "/api/v1/auth/refresh",
    ME: "/api/v1/auth/me",
  },

  // User endpoints
  USER: {
    PROFILE: "/api/v1/user/profile",
    PREFERENCES: "/api/v1/user/preferences",
  },

  // Dashboard API endpoints
  DASHBOARD: {
    STATS: "/api/v1/dashboard/stats",
    ACTIVITY: "/api/v1/dashboard/activity",
  },

  // Admin API endpoints
  ADMIN: {
    // Authentication
    LOGIN: "/api/v1/admin/login",
    REFRESH: "/api/v1/admin/refresh",
    LOGOUT: "/api/v1/users/logout", // Shared logout endpoint

    // User Management
    USERS: "/api/v1/admin/users",
    USER_BY_ID: "/api/v1/admin/users/:id",
    USER_DEACTIVATE: "/api/v1/admin/users/:id/deactivate",
    USER_REACTIVATE: "/api/v1/admin/users/:id/reactivate",
    USER_DELETE: "/api/v1/admin/users/:id",
    USER_UPDATE: "/api/v1/admin/users/:id",

    // Role Management
    ADD_ADMIN: "/api/v1/admin/addAdmin",
    CREATE_MANAGER: "/api/v1/admin/create-manager",
    CREATE_USER: "/api/v1/admin/create-user",

    // User Assignments
    ASSIGN_USER: "/api/v1/admin/assign-user",
    ASSIGNMENTS: "/api/v1/admin/assignments",
    ASSIGNMENT_DELETE: "/api/v1/admin/assignments/:id",

    // Facebook Analytics
    FACEBOOK_ANALYTICS: "/api/v1/admin/facebook/analytics",
    USER_FACEBOOK_ACCOUNTS: "/api/v1/admin/facebook/users/:id/accounts",
    DELETE_FACEBOOK_ACCOUNT: "/api/v1/admin/facebook/accounts/:id",
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
};

// Facebook API URLs
export const FACEBOOK_API = {
  LOGIN: buildApiUrl(API_CONFIG.FACEBOOK.LOGIN),
  CALLBACK: buildApiUrl(API_CONFIG.FACEBOOK.CALLBACK),
  PAGES: buildApiUrl(API_CONFIG.FACEBOOK.PAGES),
  POST: buildApiUrl(API_CONFIG.FACEBOOK.POST),
  SCHEDULE: buildApiUrl(API_CONFIG.FACEBOOK.SCHEDULE),
  UPLOAD_IMAGE: buildApiUrl(API_CONFIG.FACEBOOK.UPLOAD_IMAGE),
  GENERATE_POST: buildApiUrl(API_CONFIG.FACEBOOK.GENERATE_POST),
};

// Auth API URLs
export const AUTH_API = {
  REGISTER: buildApiUrl(API_CONFIG.AUTH.REGISTER),
  LOGIN: buildApiUrl(API_CONFIG.AUTH.LOGIN),
  LOGOUT: buildApiUrl(API_CONFIG.AUTH.LOGOUT),
  REFRESH: buildApiUrl(API_CONFIG.AUTH.REFRESH),
  ME: buildApiUrl(API_CONFIG.AUTH.ME),
};

// Dashboard API URLs
export const DASHBOARD_API = {
  STATS: buildApiUrl(API_CONFIG.DASHBOARD.STATS),
  ACTIVITY: buildApiUrl(API_CONFIG.DASHBOARD.ACTIVITY),
};

// Admin API URLs
export const ADMIN_API = {
  // Authentication
  LOGIN: buildApiUrl(API_CONFIG.ADMIN.LOGIN),
  REFRESH: buildApiUrl(API_CONFIG.ADMIN.REFRESH),
  LOGOUT: buildApiUrl(API_CONFIG.ADMIN.LOGOUT),

  // User Management
  USERS: buildApiUrl(API_CONFIG.ADMIN.USERS),
  USER_BY_ID: (id: number) =>
    buildApiUrl(API_CONFIG.ADMIN.USER_BY_ID.replace(":id", id.toString())),
  USER_DEACTIVATE: (id: number) =>
    buildApiUrl(API_CONFIG.ADMIN.USER_DEACTIVATE.replace(":id", id.toString())),
  USER_REACTIVATE: (id: number) =>
    buildApiUrl(API_CONFIG.ADMIN.USER_REACTIVATE.replace(":id", id.toString())),
  USER_DELETE: (id: number) =>
    buildApiUrl(API_CONFIG.ADMIN.USER_DELETE.replace(":id", id.toString())),
  USER_UPDATE: (id: number) =>
    buildApiUrl(API_CONFIG.ADMIN.USER_UPDATE.replace(":id", id.toString())),

  // Role Management
  ADD_ADMIN: buildApiUrl(API_CONFIG.ADMIN.ADD_ADMIN),
  CREATE_MANAGER: buildApiUrl(API_CONFIG.ADMIN.CREATE_MANAGER),
  CREATE_USER: buildApiUrl(API_CONFIG.ADMIN.CREATE_USER),

  // User Assignments
  ASSIGN_USER: buildApiUrl(API_CONFIG.ADMIN.ASSIGN_USER),
  ASSIGNMENTS: buildApiUrl(API_CONFIG.ADMIN.ASSIGNMENTS),
  ASSIGNMENT_DELETE: (id: number) =>
    buildApiUrl(
      API_CONFIG.ADMIN.ASSIGNMENT_DELETE.replace(":id", id.toString())
    ),

  // Facebook Analytics
  FACEBOOK_ANALYTICS: buildApiUrl(API_CONFIG.ADMIN.FACEBOOK_ANALYTICS),
  USER_FACEBOOK_ACCOUNTS: (id: number) =>
    buildApiUrl(
      API_CONFIG.ADMIN.USER_FACEBOOK_ACCOUNTS.replace(":id", id.toString())
    ),
  DELETE_FACEBOOK_ACCOUNT: (id: number) =>
    buildApiUrl(
      API_CONFIG.ADMIN.DELETE_FACEBOOK_ACCOUNT.replace(":id", id.toString())
    ),
};
