import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCourses } from '$lib/server/contentful';

export const load: PageServerLoad = async () => {
	try {
		const courses = await getCourses();
		return {
			courses: courses ?? [],
		};
	} catch (error) {
		console.error('Error loading courses:', error);
		return {
			courses: [],
			error: 'Failed to load courses',
		};
	}
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		if (typeof id !== 'string' || !id) {
			return fail(400, { message: 'Invalid course id' });
		}

		throw redirect(303, '/admin/courses');
	}
};
