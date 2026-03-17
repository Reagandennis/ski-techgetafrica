import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/server/contentful';

export const load: PageServerLoad = async () => {
	try {
		const posts = await getBlogPosts();

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
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		if (typeof id !== 'string' || !id) {
			return fail(400, { message: 'Invalid post id' });
		}

 		throw redirect(303, '/admin/blog');
 	}
};
