import { createServerSupabaseClient } from '$lib/server/supabase';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const supabase = createServerSupabaseClient(cookies);

	try {
		// Fetch total users
		const { count: totalUsers } = await supabase
			.from('profiles')
			.select('*', { count: 'exact', head: true });

		// Fetch total blog posts
		const { count: totalPosts } = await supabase
			.from('blog_posts')
			.select('*', { count: 'exact', head: true });

		// Fetch total courses
		const { count: totalCourses } = await supabase
			.from('courses')
			.select('*', { count: 'exact', head: true });

		// Fetch recent blog posts (last 5)
		const { data: recentPosts } = await supabase
			.from('blog_posts')
			.select('id, title, published, published_date')
			.order('published_date', { ascending: false })
			.limit(5);

		// Fetch recent users (last 5)
		const { data: recentUsers } = await supabase
			.from('profiles')
			.select('id, first_name, last_name, created_at')
			.order('created_at', { ascending: false })
			.limit(5);

		return {
			stats: {
				totalUsers: totalUsers ?? 0,
				totalPosts: totalPosts ?? 0,
				totalCourses: totalCourses ?? 0,
			},
			recentPosts: recentPosts ?? [],
			recentUsers: recentUsers ?? [],
		};
	} catch (error) {
		console.error('Error loading admin dashboard:', error);
		return {
			stats: {
				totalUsers: 0,
				totalPosts: 0,
				totalCourses: 0,
			},
			recentPosts: [],
			recentUsers: [],
			error: 'Failed to load dashboard data',
		};
	}
};

function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

export const actions: Actions = {
	addBlog: async ({ cookies, request }) => {
		const supabase = createServerSupabaseClient(cookies);
		const form = await request.formData();

		const title = String(form.get('title') || '').trim();
		const description = String(form.get('description') || '').trim();
		const image_url = String(form.get('image_url') || '').trim();
		const content = String(form.get('content') || '').trim();

		if (!title || !content) {
			return fail(400, { message: 'Title and content are required.' });
		}

		const { data, error } = await supabase
			.from('blogs')
			.insert({ title, description, image_url, content })
			.select()
			.single();

		if (error) {
			console.error('Insert blog failed:', error);
			return fail(500, { message: `Failed to add blog: ${error.message}` });
		}

		return { success: true, blog: data };
	},

	addCourse: async ({ cookies, request }) => {
		const supabase = createServerSupabaseClient(cookies);
		const form = await request.formData();

		const title = String(form.get('title') || '').trim();
		const description = String(form.get('description') || '').trim();
		const image_url = String(form.get('image_url') || '').trim();
		const content = String(form.get('content') || '').trim();

		if (!title || !description || !image_url) {
			return fail(400, { message: 'Title, description and image_url are required.' });
		}

		// Fill required fields for existing courses schema
		const slug = slugify(title);
		const organization_name = 'Techgetafrica';
		const certification_type = 'Course';
		const difficulty = 'Beginner';
		const duration = 'Self-paced';
		const currency = 'KES';
		const published = true;

		const insertPayload: Record<string, unknown> = {
			title,
			slug,
			organization_name,
			organization_logo: null,
			certification_type,
			description,
			image_url,
			price: 0,
			original_price: null,
			currency,
			difficulty,
			duration,
			published,
			content // added via SQL migration
		};

		const { data, error } = await supabase
			.from('courses')
			.insert(insertPayload)
			.select()
			.single();

		if (error) {
			console.error('Insert course failed:', error);
			return fail(500, { message: `Failed to add course: ${error.message}` });
		}

		return { success: true, course: data };
	},
};
