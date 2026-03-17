import { flatCourses } from '$lib/data/courses';
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

	const fallbackCourse = flatCourses.find((c) => c.slug === slug);

	if (fallbackCourse) {
		return { course: fallbackCourse };
	}

	console.error(`Error loading course with slug "${slug}":`);
	throw error(404, 'Course not found');
};
