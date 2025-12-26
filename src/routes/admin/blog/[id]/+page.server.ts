import { createServerSupabaseClient } from '$lib/server/supabase';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const supabase = createServerSupabaseClient(cookies);
	const { id } = params;

	const { data: post, error: err } = await supabase
		.from('blog_posts')
		.select('*')
		.eq('id', id)
		.single();

	if (err) {
		console.error('Error loading blog post:', err);
		throw error(404, 'Blog post not found');
	}

	return { post };
};

export const actions: Actions = {
	default: async ({ request, cookies, params }) => {
		const supabase = createServerSupabaseClient(cookies);
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

		const { error: updateError } = await supabase
			.from('blog_posts')
			.update({
				title,
				slug,
				excerpt,
				content,
				author_name,
				author_image,
				cover_image,
				tags,
				category,
				seo_title,
				seo_description,
				published,
                read_time,
				updated_date: new Date().toISOString(),
			})
			.eq('id', id);

		if (updateError) {
			console.error('Error updating blog post:', updateError);
			if (updateError.code === '23505') {
				return fail(400, {
					error: `The slug "${slug}" is already in use.`,
				});
			}
			return fail(500, {
				error: 'Failed to update blog post.',
			});
		}

		throw redirect(303, `/admin/blog`);
	}
};