/**
 * API Service Layer
 * Centralized service for all API communication with the LMS backend
 * Handles authentication, error handling, and request/response management
 */

import { browser } from '$app/environment';
import { goto } from '$app/navigation';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Types
interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
	statusCode?: number;
}

interface ApiRequestConfig {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	headers?: Record<string, string>;
	body?: any;
	timeout?: number;
}

interface PaginationParams {
	page?: number;
	limit?: number;
	search?: string;
	sort?: string;
	filter?: Record<string, any>;
}

// Auth token management
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
	authToken = token;
	if (browser) {
		if (token) {
			localStorage.setItem('auth_token', token);
		} else {
			localStorage.removeItem('auth_token');
		}
	}
};

export const getAuthToken = (): string | null => {
	if (authToken) return authToken;
	if (browser) {
		authToken = localStorage.getItem('auth_token');
	}
	return authToken;
};

// Core API request function with timeout handling
const apiRequest = async <T>(
	endpoint: string,
	config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> => {
	const { method = 'GET', headers = {}, body, timeout = REQUEST_TIMEOUT } = config;

	const url = `${API_BASE_URL}${endpoint}`;

	// Add auth header if token exists
	const token = getAuthToken();
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	// Add default headers
	headers['Content-Type'] = 'application/json';

	// Create abort controller for timeout
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		// Handle authentication errors
		if (response.status === 401) {
			setAuthToken(null);
			if (browser) {
				await goto('/auth/signin');
			}
			return {
				success: false,
				error: 'Unauthorized. Please sign in again.',
				statusCode: 401,
			};
		}

		// Handle forbidden access
		if (response.status === 403) {
			return {
				success: false,
				error: 'You do not have permission to access this resource.',
				statusCode: 403,
			};
		}

		// Parse response
		const data = await response.json();

		// Handle success
		if (response.ok) {
			return {
				success: true,
				data: data.data || data,
				statusCode: response.status,
			};
		}

		// Handle error response
		return {
			success: false,
			error: data.message || data.error || 'An error occurred',
			statusCode: response.status,
		};
	} catch (error: any) {
		clearTimeout(timeoutId);

		// Handle abort/timeout
		if (error.name === 'AbortError') {
			return {
				success: false,
				error: 'Request timeout. Please try again.',
				statusCode: 408,
			};
		}

		// Handle network errors
		return {
			success: false,
			error: error.message || 'Network error. Please check your connection.',
			statusCode: 0,
		};
	}
};

// ==================== COURSE API ====================

export const courseApi = {
	/**
	 * Get all courses with pagination and filtering
	 */
	getAll: async (params?: PaginationParams) => {
		const queryString = new URLSearchParams();
		if (params?.page) queryString.append('page', params.page.toString());
		if (params?.limit) queryString.append('limit', params.limit.toString());
		if (params?.search) queryString.append('search', params.search);
		if (params?.sort) queryString.append('sort', params.sort);

		return apiRequest<any[]>(`/courses?${queryString.toString()}`);
	},

	/**
	 * Get single course details
	 */
	getById: async (id: string) => {
		return apiRequest<any>(`/courses/${id}`);
	},

	/**
	 * Search courses
	 */
	search: async (query: string, params?: PaginationParams) => {
		const queryString = new URLSearchParams({ q: query });
		if (params?.page) queryString.append('page', params.page.toString());
		if (params?.limit) queryString.append('limit', params.limit.toString());

		return apiRequest<any[]>(`/courses/search?${queryString.toString()}`);
	},

	/**
	 * Get trending courses
	 */
	getTrending: async (limit = 10) => {
		return apiRequest<any[]>(`/courses/trending?limit=${limit}`);
	},

	/**
	 * Enroll in a course
	 */
	enroll: async (courseId: string) => {
		return apiRequest<any>(`/courses/${courseId}/enroll`, {
			method: 'POST',
		});
	},

	/**
	 * Get course progress
	 */
	getProgress: async (courseId: string) => {
		return apiRequest<any>(`/courses/${courseId}/progress`);
	},

	/**
	 * Update course progress
	 */
	updateProgress: async (courseId: string, progress: number) => {
		return apiRequest<any>(`/courses/${courseId}/progress`, {
			method: 'PUT',
			body: { progress },
		});
	},
};

// ==================== USER API ====================

export const userApi = {
	/**
	 * Get user profile
	 */
	getProfile: async () => {
		return apiRequest<any>('/users/profile');
	},

	/**
	 * Update user profile
	 */
	updateProfile: async (data: any) => {
		return apiRequest<any>('/users/profile', {
			method: 'PUT',
			body: data,
		});
	},

	/**
	 * Get user enrollments
	 */
	getEnrollments: async (params?: PaginationParams) => {
		const queryString = new URLSearchParams();
		if (params?.page) queryString.append('page', params.page.toString());
		if (params?.limit) queryString.append('limit', params.limit.toString());

		return apiRequest<any[]>(`/users/enrollments?${queryString.toString()}`);
	},

	/**
	 * Get user certificates
	 */
	getCertificates: async (params?: PaginationParams) => {
		const queryString = new URLSearchParams();
		if (params?.page) queryString.append('page', params.page.toString());
		if (params?.limit) queryString.append('limit', params.limit.toString());

		return apiRequest<any[]>(`/users/certificates?${queryString.toString()}`);
	},
};

// ==================== AUTHENTICATION API ====================

export const authApi = {
	/**
	 * Sign in user
	 */
	signIn: async (email: string, password: string) => {
		const response = await apiRequest<{ token: string; user: any }>('/auth/login', {
			method: 'POST',
			body: { email, password },
		});

		if (response.success && response.data?.token) {
			setAuthToken(response.data.token);
		}

		return response;
	},

	/**
	 * Register new user
	 */
	register: async (data: { email: string; password: string; name: string }) => {
		const response = await apiRequest<{ token: string; user: any }>('/auth/register', {
			method: 'POST',
			body: data,
		});

		if (response.success && response.data?.token) {
			setAuthToken(response.data.token);
		}

		return response;
	},

	/**
	 * Sign out user
	 */
	signOut: async () => {
		const response = await apiRequest('/auth/logout', { method: 'POST' });
		setAuthToken(null);
		return response;
	},

	/**
	 * Refresh authentication token
	 */
	refreshToken: async () => {
		const response = await apiRequest<{ token: string }>('/auth/refresh', {
			method: 'POST',
		});

		if (response.success && response.data?.token) {
			setAuthToken(response.data.token);
		}

		return response;
	},

	/**
	 * Request password reset
	 */
	forgotPassword: async (email: string) => {
		return apiRequest('/auth/forgot-password', {
			method: 'POST',
			body: { email },
		});
	},

	/**
	 * Reset password with token
	 */
	resetPassword: async (token: string, newPassword: string) => {
		return apiRequest('/auth/reset-password', {
			method: 'POST',
			body: { token, newPassword },
		});
	},
};

// ==================== CERTIFICATE API ====================

export const certificateApi = {
	/**
	 * Get all certificates
	 */
	getAll: async (params?: PaginationParams) => {
		const queryString = new URLSearchParams();
		if (params?.page) queryString.append('page', params.page.toString());
		if (params?.limit) queryString.append('limit', params.limit.toString());

		return apiRequest<any[]>(`/certificates?${queryString.toString()}`);
	},

	/**
	 * Get certificate by ID
	 */
	getById: async (id: string) => {
		return apiRequest<any>(`/certificates/${id}`);
	},

	/**
	 * Verify certificate authenticity
	 */
	verify: async (id: string) => {
		return apiRequest<any>(`/certificates/${id}/verify`);
	},
};

// ==================== ANALYTICS API ====================

export const analyticsApi = {
	/**
	 * Track page view or event
	 */
	trackEvent: async (eventName: string, eventData?: any) => {
		return apiRequest('/analytics/event', {
			method: 'POST',
			body: { eventName, eventData },
		});
	},

	/**
	 * Track course progress
	 */
	trackProgress: async (courseId: string, progressData: any) => {
		return apiRequest('/analytics/progress', {
			method: 'POST',
			body: { courseId, ...progressData },
		});
	},
};

// ==================== SEARCH & RECOMMENDATIONS ====================

export const searchApi = {
	/**
	 * Global search
	 */
	search: async (query: string, filters?: any) => {
		const body = { query, ...filters };
		return apiRequest<any[]>('/search', {
			method: 'POST',
			body,
		});
	},

	/**
	 * Get personalized recommendations
	 */
	getRecommendations: async (limit = 10) => {
		return apiRequest<any[]>(`/recommendations?limit=${limit}`);
	},
};

export default {
	courseApi,
	userApi,
	authApi,
	certificateApi,
	analyticsApi,
	searchApi,
	setAuthToken,
	getAuthToken,
};
