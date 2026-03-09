import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/server/contentful';

export const load: PageServerLoad = async () => {
	try {
		const posts = await getBlogPosts();

		const allTags = new Set<string>();
		const allCategories = new Set<string>();
		for (const post of posts) {
			for (const tag of post.tags || []) allTags.add(tag);
			if (post.category) allCategories.add(post.category);
		}

		return {
			posts,
			tags: Array.from(allTags),
			categories: Array.from(allCategories),
		};
	} catch (err) {
		console.error('Error fetching blog posts from Contentful:', err);
		const message =
			err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error';
		const isMissingEnv = message.startsWith('Missing environment variable:');
		return {
			posts: [],
			tags: [],
			categories: [],
			error:
				isMissingEnv
					? 'Blog content is not configured. Add Contentful env vars (SPACE_ID + DELIVERY token) in .env.local and restart the dev server.'
					: `Contentful error: ${message}`,
		};
	}
};
