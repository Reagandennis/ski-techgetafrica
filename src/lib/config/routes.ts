/**
 * TECHGETAFRICA SVELTEKIT ROUTING STRUCTURE
 * 
 * Frontend SvelteKit application consuming external LMS API
 * 
 * ROUTE ARCHITECTURE:
 */

export const routes = {
	// PUBLIC ROUTES
	PUBLIC: {
		HOME: '/',
		COURSES: '/courses',
		COURSES_DETAIL: '/courses/[id]',
		CERTIFICATES: '/certificates',
		CERTIFICATES_DETAIL: '/certificates/[id]',
		ABOUT: '/about',
		CONTACT: '/contact',
		BLOG: '/blog',
		BLOG_POST: '/blog/[slug]',
		PRICING: '/pricing',
		SEARCH: '/search',
		LEARNING_PATHS: '/learning-paths',
		LEARNING_PATHS_DETAIL: '/learning-paths/[id]',
	},

	// AUTHENTICATION ROUTES
	AUTH: {
		SIGN_IN: '/auth/signin',
		SIGN_UP: '/auth/signup',
		FORGOT_PASSWORD: '/auth/forgot-password',
		RESET_PASSWORD: '/auth/reset-password/[token]',
		VERIFY_EMAIL: '/auth/verify-email/[token]',
	},

	// PROTECTED USER ROUTES (Requires authentication)
	DASHBOARD: {
		HOME: '/dashboard',
		MY_COURSES: '/dashboard/my-courses',
		ENROLLED_COURSE: '/dashboard/my-courses/[id]',
		PROGRESS: '/dashboard/progress',
		CERTIFICATES: '/dashboard/certificates',
		SETTINGS: '/dashboard/settings',
		SETTINGS_PROFILE: '/dashboard/settings/profile',
		SETTINGS_ACCOUNT: '/dashboard/settings/account',
		SETTINGS_NOTIFICATIONS: '/dashboard/settings/notifications',
		BOOKMARKS: '/dashboard/bookmarks',
		RECOMMENDATIONS: '/dashboard/recommendations',
	},

	// ADMIN ROUTES
	ADMIN: {
		HOME: '/admin',
		USERS: '/admin/users',
		USER_DETAIL: '/admin/users/[id]',
		COURSES: '/admin/courses',
		COURSE_DETAIL: '/admin/courses/[id]',
		ANALYTICS: '/admin/analytics',
		CONTENT: '/admin/content',
		REPORTS: '/admin/reports',
	},

	// ERROR ROUTES
	ERRORS: {
		NOT_FOUND: '/404',
		UNAUTHORIZED: '/401',
		FORBIDDEN: '/403',
		SERVER_ERROR: '/500',
	},
};

/**
 * API ENDPOINTS
 * Base URL configured in environment variables
 * All API calls go through $lib/services/api.ts
 */
export const API_ENDPOINTS = {
	// Courses
	COURSES: '/api/courses',
	COURSE_DETAIL: (id: string) => `/api/courses/${id}`,
	COURSE_SEARCH: '/api/courses/search',
	COURSE_ENROLL: (id: string) => `/api/courses/${id}/enroll`,
	COURSE_PROGRESS: (id: string) => `/api/courses/${id}/progress`,

	// Users
	USER_PROFILE: '/api/users/profile',
	USER_ENROLLMENTS: '/api/users/enrollments',
	USER_CERTIFICATES: '/api/users/certificates',
	USER_UPDATE_PROFILE: '/api/users/profile/update',

	// Authentication
	AUTH_LOGIN: '/api/auth/login',
	AUTH_REGISTER: '/api/auth/register',
	AUTH_LOGOUT: '/api/auth/logout',
	AUTH_REFRESH: '/api/auth/refresh',
	AUTH_FORGOT_PASSWORD: '/api/auth/forgot-password',
	AUTH_RESET_PASSWORD: '/api/auth/reset-password',

	// Certificates
	CERTIFICATES: '/api/certificates',
	CERTIFICATE_DETAIL: (id: string) => `/api/certificates/${id}`,
	CERTIFICATE_VERIFY: (id: string) => `/api/certificates/${id}/verify`,

	// Learning Paths
	LEARNING_PATHS: '/api/learning-paths',
	LEARNING_PATH_DETAIL: (id: string) => `/api/learning-paths/${id}`,

	// Search & Recommendations
	SEARCH: '/api/search',
	RECOMMENDATIONS: '/api/recommendations',
	TRENDING_COURSES: '/api/courses/trending',

	// Analytics
	TRACK_PROGRESS: '/api/analytics/progress',
	TRACK_EVENT: '/api/analytics/event',
};
