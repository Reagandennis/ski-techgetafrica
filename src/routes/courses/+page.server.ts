import { flatCourses } from '$lib/data/courses';
import type { PageServerLoad } from './$types';
import { getCourses } from '$lib/server/contentful';

export const load: PageServerLoad = async () => {
	try {
		const courses = await getCourses();

		if (!courses || courses.length === 0) {
			return {
				courses: flatCourses,
				source: 'static',
				error: null,
			};
		}
		return {
			courses: courses,
			source: 'contentful',
			error: null,
		};
	} catch (err: any) {
		console.error('Unexpected error loading courses:', err?.message ?? err);
		return {
			courses: flatCourses,
			source: 'static',
			error: 'Showing catalogue preview while we reconnect to the database.',
		};
	}
};
