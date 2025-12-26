import { createServerSupabaseClient } from '$lib/server/supabase';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const supabase = createServerSupabaseClient(cookies);

		const {
			data: { user }
		} = await supabase.auth.getUser();

		if (!user) {
			return fail(401, {
				error: 'You must be logged in to create a blog post.'
			});
		}

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
				data: Object.fromEntries(form.entries())
			});
		}

		const { error } = await supabase.from('blog_posts').insert([
			{
				title,
				slug,
				excerpt,
				content,
				author_id: user.id,
				author_name,
				author_image,
				cover_image,
				tags,
				category,
				seo_title,
				seo_description,
				published,
                read_time,
				published_date: published ? new Date().toISOString() : null
			}
		]);

		if (error) {
			console.error('Error creating blog post:', error);
			if (error.code === '23505') {
				return fail(400, {
					error: `The slug "${slug}" is already in use.`,
					data: Object.fromEntries(form.entries())
				});
			}
			return fail(500, {
				error: 'Failed to create blog post.',
				data: Object.fromEntries(form.entries())
			});
		}

		throw redirect(303, `/admin/blog`);
	}
};