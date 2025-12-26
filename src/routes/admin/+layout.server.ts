import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const ADMIN_EMAIL = 'reaganenochowiti@techgetafrica.com';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session, user } = locals;

	console.log('Admin layout load - session:', !!session);
	console.log('Admin layout load - user email:', user?.email);

	// Check if user is authenticated
	if (!session || !user) {
		console.log('No session/user - redirecting to signin');
		throw redirect(302, '/auth/signin');
	}

	// Check if user is the admin
	const userEmail = user.email;
	console.log('Checking admin email:', userEmail, '===', ADMIN_EMAIL, '?', userEmail === ADMIN_EMAIL);
	if (userEmail !== ADMIN_EMAIL) {
		console.log('Not admin email - redirecting home');
		throw redirect(302, '/');
	}

	// Return user data for the admin layout
	return {
		user: {
			email: user.email,
			firstName: user.user_metadata?.first_name ?? '',
			lastName: user.user_metadata?.last_name ?? '',
		},
	};
};
