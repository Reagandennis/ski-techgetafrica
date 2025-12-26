import { createServerSupabaseClient } from '$lib/server/supabase';
import { flatCourses } from '$lib/data/courses';
import type { PageServerLoad } from './$types';

const normalizeCourse = (course: any) => ({
	// Ensure IDs and slugs are present for Svelte keyed lists and routing
	id: course.id?.toString() ?? course.slug,
	slug: course.slug,
	title: course.title,
	organizationName: course.organization_name ?? 'Techgetafrica',
	organizationLogo: course.organization_logo,
	difficulty: course.difficulty ?? 'Intermediate',
	description: course.description,
	imageUrl: course.image_url,
	price: course.price,
	originalPrice: course.original_price,
	rating: course.rating ?? 4.7,
	ratingCount: course.rating_count ?? 0,
	enrollmentCount: course.enrollment_count ?? 0,
	certificationType: course.certification_type ?? 'Certification',
	duration: course.duration,
	currency: course.currency ?? 'KES',
});

export const load: PageServerLoad = async ({ cookies }) => {
	const supabase = createServerSupabaseClient(cookies);

	try {
		const { data: courses, error } = await supabase
			.from('courses')
			.select(
				'id, title, slug, organization_name, organization_logo, difficulty, published, created_at, description, image_url, price, original_price, rating, rating_count, enrollment_count, certification_type, duration'
			)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error loading courses:', error);
			return {
				courses: flatCourses,
				source: 'static',
				error: 'Showing catalogue preview while we reconnect to the database.',
			};
		}

		if (!courses || courses.length === 0) {
			return {
				courses: flatCourses,
				source: 'static',
				error: null,
			};
		}

		return {
			courses: courses.map(normalizeCourse),
			source: 'supabase',
			error: null,
		};
	} catch (err) {
		console.error('Unexpected error loading courses:', err);
		return {
			courses: flatCourses,
			source: 'static',
			error: 'Showing catalogue preview while we reconnect to the database.',
		};
	}
};
