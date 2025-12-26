import { createServerSupabaseClient } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const supabase = createServerSupabaseClient(cookies);
	const { slug } = params;

	const { data: post, error: err } = await supabase
		.from('blog_posts')
		.select('*')
		.eq('slug', slug)
		.single();

	if (err || !post) {
		console.error(`Error loading blog post with slug "${slug}":`, err);
		throw error(404, 'Blog post not found');
	}

	return { post };
};