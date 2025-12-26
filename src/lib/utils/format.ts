/**
 * Format Utilities
 * Helpers for formatting data (currency, dates, numbers)
 */

/**
 * Format currency for display
 * @param amount - Amount in cents or dollars
 * @param currency - Currency code (default: USD)
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(amount);
};

/**
 * Format date for display
 * @param date - Date object or ISO string
 * @param format - 'short' | 'long' | 'relative'
 */
export const formatDate = (date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string => {
	const dateObj = typeof date === 'string' ? new Date(date) : date;

	if (format === 'relative') {
		return formatRelativeDate(dateObj);
	}

	return new Intl.DateTimeFormat('en-US', {
		dateStyle: format === 'short' ? 'medium' : 'long',
		timeStyle: undefined,
	}).format(dateObj);
};

/**
 * Format relative date (e.g., "2 days ago")
 */
const formatRelativeDate = (date: Date): string => {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / 3600000);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffMins < 1) return 'Just now';
	if (diffMins < 60) return `${diffMins}m ago`;
	if (diffHours < 24) return `${diffHours}h ago`;
	if (diffDays < 7) return `${diffDays}d ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
	if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
	return `${Math.floor(diffDays / 365)}y ago`;
};

/**
 * Format large numbers (1000 -> 1K, 1000000 -> 1M)
 */
export const formatNumber = (num: number): string => {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
	}
	return num.toString();
};

/**
 * Format duration (seconds -> "1h 30m" or "45m")
 */
export const formatDuration = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
};

/**
 * Truncate text to max length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Slugify text for URLs
 */
export const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals = 1): string => {
	return (Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals) + '%';
};
