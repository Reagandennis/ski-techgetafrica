import { createServerSupabaseClient } from '$lib/server/supabase';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const supabase = createServerSupabaseClient(cookies);

	try {
		const { data: posts, error } = await supabase
			.from('blog_posts')
			.select('id, title, slug, category, published, published_date, author_name')
			.order('published_date', { ascending: false });

		if (error) throw error;

		return {
			posts: posts ?? [],
		};
	} catch (error) {
		console.error('Error loading blog posts:', error);
		return {
			posts: [],
			error: 'Failed to load blog posts',
		};
	}
};

export const actions: Actions = {
	delete: async ({ request, cookies }) => {
		const supabase = createServerSupabaseClient(cookies);
		const form = await request.formData();
		const id = form.get('id');

		if (typeof id !== 'string' || !id) {
			return fail(400, { message: 'Invalid post id' });
		}

		const { error } = await supabase.from('blog_posts').delete().eq('id', id);
 
 		if (error) {
 			console.error('Delete blog post error:', error);
 			return fail(500, { message: 'Failed to delete blog post' });
 		}

 		throw redirect(303, '/admin/blog');
 	}
};
