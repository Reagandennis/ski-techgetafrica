import { type Handle, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';

export const handle: Handle = async ({ event, resolve }) => {
	const ADMIN_EMAIL = 'reaganenochowiti@techgetafrica.com';
	
	event.locals.session = null;
	event.locals.user = null;

	// Gatekeeper: protect all /admin paths on the server
	const path = event.url.pathname;
	if (path.startsWith('/admin')) {
		const userEmail = event.locals.user?.email ?? null;
		const isAdmin = userEmail === ADMIN_EMAIL;
		if (!isAdmin) {
			throw redirect(303, '/');
		}
	}

	const response = await resolve(event);
	return response;
};
