import { createServerSupabaseClient } from '$lib/server/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const supabase = createServerSupabaseClient(cookies);

	try {
		const { data: users, error } = await supabase
			.from('profiles')
			.select('id, first_name, last_name, email, created_at')
			.order('created_at', { ascending: false });

		if (error) throw error;

		return {
			users: users ?? [],
		};
	} catch (error) {
		console.error('Error loading users:', error);
		return {
			users: [],
			error: 'Failed to load users',
		};
	}
};
