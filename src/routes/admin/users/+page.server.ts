import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		return {
			users: [],
		};
	} catch (error) {
		console.error('Error loading users:', error);
		return {
			users: [],
			error: 'Failed to load users',
		};
	}
};
