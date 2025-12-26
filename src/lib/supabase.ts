import { createBrowserClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

let _supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

if (typeof window !== 'undefined') {
	_supabaseClient = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}

function getSupabaseClient() {
	if (!_supabaseClient) {
		throw new Error('Supabase client is not available on the server');
	}
	return _supabaseClient;
}

// Export as a proxy for lazy evaluation
export const supabase = new Proxy(
	{},
	{
		get(target, prop) {
			return (getSupabaseClient() as any)[prop];
		},
	}
) as any;

/**
 * Database types for TypeScript
 */
export interface Profile {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	avatar_url?: string;
	created_at: string;
	updated_at: string;
}

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	author_id: string;
	author_name: string;
	author_image: string;
	published_date: string;
	updated_date?: string;
	read_time: number;
	cover_image: string;
	tags: string[];
	category: string;
	seo_title?: string;
	seo_description?: string;
	published: boolean;
	created_at: string;
}

export interface Course {
	id: string;
	title: string;
	slug: string;
	organization_name: string;
	organization_logo: string;
	certification_type: 'Professional Certificate' | 'Specialization' | 'Course';
	rating: number;
	rating_count: number;
	enrollment_count: number;
	description: string;
	image_url: string;
	price: number;
	original_price?: number;
	difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
	duration: string;
	published: boolean;
	created_at: string;
	updated_at: string;
}
