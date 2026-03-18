import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCourseBySlug } from '$lib/server/contentful';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const course = await getCourseBySlug(slug);

	if (course) {
		return {
			course,
		};
	}

	console.error(`Error loading course with slug "${slug}": Not found in Contentful`);
	throw error(404, 'Course not found');
};
