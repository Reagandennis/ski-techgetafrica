import { createServerSupabaseClient } from '$lib/server/supabase';
import { flatCourses } from '$lib/data/courses';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const supabase = createServerSupabaseClient(cookies);
	const { slug } = params;

	const { data: course, error: err } = await supabase
		.from('courses')
		.select('*')
		.eq('slug', slug)
		.single();

	if (course) {
		return {
			course: {
				...course,
				organizationName: course.organization_name ?? 'Techgetafrica',
				organizationLogo: course.organization_logo,
				imageUrl: course.image_url,
				certificationType: course.certification_type,
				originalPrice: course.original_price,
				enrollmentCount: course.enrollment_count,
				ratingCount: course.rating_count,
				currency: course.currency ?? 'KES',
			},
		};
	}

	const fallbackCourse = flatCourses.find((c) => c.slug === slug);

	if (fallbackCourse) {
		return { course: fallbackCourse };
	}

	console.error(`Error loading course with slug "${slug}":`, err);
	throw error(404, 'Course not found');
};
