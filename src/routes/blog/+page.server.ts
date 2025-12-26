import { createServerSupabaseClient } from '$lib/server/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const supabase = createServerSupabaseClient(cookies);
	console.log('Fetching blog posts from Supabase...');
	
	// Fetch published blog posts
	const { data: posts, error } = await supabase
		.from('blog_posts')
		.select('*')
		.eq('published', true)
		.order('published_date', { ascending: false });

	console.log('Supabase response:', { posts, error });
	console.log('Number of posts:', posts?.length);

	if (error) {
		console.error('Error fetching blog posts:', error);
		console.error('Error details:', JSON.stringify(error, null, 2));
		return {
			posts: [],
			tags: [],
			categories: [],
			error: `Database error: ${error.message}. Check server console for details.`
		};
	}

	// Check if posts is empty
	if (!posts || posts.length === 0) {
		console.warn('No blog posts found in database.');
		return {
			posts: [],
			tags: [],
			categories: [],
			error: 'No blog posts found. Make sure posts are marked as published=true in Supabase.'
		};
	}

	// Extract unique tags and categories
	const allTags = new Set<string>();
	const allCategories = new Set<string>();

	posts?.forEach((post: { tags: string[]; category: string; }) => {
		post.tags?.forEach((tag: string) => allTags.add(tag));
		if (post.category) allCategories.add(post.category);
	});

	console.log('Returning data:', { 
		postsCount: posts.length, 
		tags: Array.from(allTags), 
		categories: Array.from(allCategories) 
	});

	return {
		posts: posts || [],
		tags: Array.from(allTags),
		categories: Array.from(allCategories)
	};
};
