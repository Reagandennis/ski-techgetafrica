import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBlogPostBySlug } from '$lib/server/contentful';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const post = await getBlogPostBySlug(slug);
	if (!post) {
		throw error(404, 'Blog post not found');
	}

	return { post };
};