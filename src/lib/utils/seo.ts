/**
 * SEO metadata utilities for consistent meta tags and structured data
 */

export interface SEOMeta {
	title: string;
	description: string;
	keywords?: string;
	ogImage?: string;
	ogType?: 'website' | 'article';
	canonical?: string;
	robots?: string;
}

/**
 * Generate meta tags for svelte:head
 */
export function generateSEOMeta(meta: SEOMeta) {
	return {
		title: meta.title,
		description: meta.description,
		keywords: meta.keywords || '',
		ogTitle: meta.title,
		ogDescription: meta.description,
		ogImage: meta.ogImage || 'https://via.placeholder.com/1200x630/F22B29/ffffff?text=Techgetafrica',
		ogType: meta.ogType || 'website',
		canonical: meta.canonical || '',
		robots: meta.robots || 'index, follow',
	};
}

/**
 * Organization schema for JSON-LD
 */
export function getOrganizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'name': 'Techgetafrica',
		'url': 'https://techgetafrica.com',
		'logo': 'https://via.placeholder.com/200x60/F22B29/ffffff?text=Techgetafrica',
		'description': 'Professional technology certifications and online learning platform for African professionals',
		'sameAs': [
			'https://twitter.com/techgetafrica',
			'https://linkedin.com/company/techgetafrica',
			'https://facebook.com/techgetafrica',
		],
		'contactPoint': {
			'@type': 'ContactPoint',
			'telephone': '+234-1-123-456',
			'contactType': 'Customer Support',
		},
	};
}

/**
 * Breadcrumb schema for JSON-LD
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'itemListElement': items.map((item, index) => ({
			'@type': 'ListItem',
			'position': index + 1,
			'name': item.name,
			'item': item.url,
		})),
	};
}

/**
 * Course schema for JSON-LD (for course pages)
 */
export function getCourseSchema(course: {
	name: string;
	description: string;
	provider: string;
	image: string;
	price: number;
	rating: number;
	ratingCount: number;
	url: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Course',
		'name': course.name,
		'description': course.description,
		'provider': {
			'@type': 'Organization',
			'name': course.provider,
		},
		'image': course.image,
		'aggregateRating': {
			'@type': 'AggregateRating',
			'ratingValue': course.rating,
			'ratingCount': course.ratingCount,
		},
		'offers': {
			'@type': 'Offer',
			'price': course.price,
			'priceCurrency': 'USD',
		},
		'url': course.url,
	};
}
