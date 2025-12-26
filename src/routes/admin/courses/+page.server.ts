import { createServerSupabaseClient } from '$lib/server/supabase';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const supabase = createServerSupabaseClient(cookies);

	try {
		const { data: courses, error } = await supabase
			.from('courses')
			.select('id, title, slug, organization_name, difficulty, published, created_at')
			.order('created_at', { ascending: false });

		if (error) throw error;

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
	delete: async ({ request, cookies }) => {
		const supabase = createServerSupabaseClient(cookies);
		const form = await request.formData();
		const id = form.get('id');

		if (typeof id !== 'string' || !id) {
			return fail(400, { message: 'Invalid course id' });
		}

		const { error } = await supabase.from('courses').delete().eq('id', id);
		if (error) {
			console.error('Delete course error:', error);
			return fail(500, { message: 'Failed to delete course' });
		}

		throw redirect(303, '/admin/courses');
	}
};
