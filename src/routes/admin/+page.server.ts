import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		stats: {
			totalUsers: 0,
			totalPosts: 0,
			totalCourses: 0,
		},
		recentPosts: [],
		recentUsers: [],
	};
};

function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

export const actions: Actions = {
	addBlog: async ({ request }) => {
		const form = await request.formData();

		const title = String(form.get('title') || '').trim();
		const description = String(form.get('description') || '').trim();
		const image_url = String(form.get('image_url') || '').trim();
		const content = String(form.get('content') || '').trim();

		if (!title || !content) {
			return fail(400, { message: 'Title and content are required.' });
		}

		return { success: true, blog: {} };
	},

	addCourse: async ({ request }) => {
		const form = await request.formData();

		const title = String(form.get('title') || '').trim();
		const description = String(form.get('description') || '').trim();
		const image_url = String(form.get('image_url') || '').trim();
		const content = String(form.get('content') || '').trim();

		if (!title || !description || !image_url) {
			return fail(400, { message: 'Title, description and image_url are required.' });
		}

		return { success: true, course: {} };
	},
};
