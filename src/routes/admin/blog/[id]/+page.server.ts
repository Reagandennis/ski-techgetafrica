import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBlogPostBySlug } from '$lib/server/contentful';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const post = await getBlogPostBySlug(id);

	if (!post) {
		throw error(404, 'Blog post not found');
	}

	return { post };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const { id } = params;
		const form = await request.formData();

		const title = form.get('title') as string;
		const slug = form.get('slug') as string;
		const excerpt = form.get('excerpt') as string;
		const content = form.get('content') as string;
		const author_name = form.get('author_name') as string;
		const author_image = form.get('author_image') as string | null;
		const cover_image = form.get('cover_image') as string;
		const tags = (form.get('tags') as string)?.split(',').map((t) => t.trim()) || [];
		const category = form.get('category') as string;
		const seo_title = form.get('seo_title') as string | null;
		const seo_description = form.get('seo_description') as string | null;
		const published = form.get('published') === 'on';
        const read_time = form.get('read_time') ? parseInt(form.get('read_time') as string) : 5;

		if (!title || !slug || !excerpt || !content || !author_name || !cover_image || !category) {
			return fail(400, {
				error: 'Missing required fields.',
			});
		}

		throw redirect(303, `/admin/blog`);
	}
};