import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCourseBySlug } from '$lib/server/contentful';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const course = await getCourseBySlug(id);

	if (!course) {
		throw error(404, 'Course not found');
	}

	return { course };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();
		const id = params.id;

		const title = form.get('title') as string;
		const slug = form.get('slug') as string;
		const organization_name = form.get('organization_name') as string;
		const organization_logo = form.get('organization_logo') as string | null;
		const certification_type = form.get('certification_type') as string;
		const difficulty = form.get('difficulty') as string;
		const duration = form.get('duration') as string;
		const image_url = form.get('image_url') as string;
		const price = form.get('price') ? parseFloat(form.get('price') as string) : 0.0;
		const original_price = form.get('original_price')
			? parseFloat(form.get('original_price') as string)
			: null;
		const description = form.get('description') as string;
		const published = form.get('published') === 'on';

		// Basic validation
		if (!title || !slug || !organization_name || !certification_type || !difficulty || !duration || !image_url || !description) {
			return fail(400, {
				error: 'Missing required fields. Please fill out the form completely.',
			});
		}

		throw redirect(303, `/admin/courses`);
	}
};