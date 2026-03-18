import type { PageServerLoad } from './$types';
import { getCourses } from '$lib/server/contentful';

export const load: PageServerLoad = async () => {
	try {
		const courses = await getCourses();
		return {
			courses: courses || []
		};
	} catch (err) {
		console.error('Error fetching courses for homepage:', err);
		return {
			courses: []
		};
	}
};
