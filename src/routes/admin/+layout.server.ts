import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const ADMIN_EMAIL = 'reaganenochowiti@techgetafrica.com';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session, user } = locals;

	return {
		user: {
			email: 'reaganenochowiti@techgetafrica.com',
			firstName: 'Reagan',
			lastName: 'Enoch',
		},
	};
};
