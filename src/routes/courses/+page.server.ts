import type { PageServerLoad } from './$types';
import { getCourses } from '$lib/server/contentful';

export const load: PageServerLoad = async () => {
	try {
		const courses = await getCourses();

		return {
			courses: courses || [],
			source: 'contentful',
			error: null,
		};
	} catch (err: any) {
		console.error('Unexpected error loading courses:', err?.message ?? err);
		return {
			courses: [],
			source: 'contentful',
			error: 'Unable to connect to the database. Please try again later.',
		};
	}
};
