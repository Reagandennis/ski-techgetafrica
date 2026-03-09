import { type Handle, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';

export const handle: Handle = async ({ event, resolve }) => {
	const ADMIN_EMAIL = 'reaganenochowiti@techgetafrica.com';
	const PUBLIC_SUPABASE_URL = env.PUBLIC_SUPABASE_URL;
	const PUBLIC_SUPABASE_ANON_KEY = env.PUBLIC_SUPABASE_ANON_KEY;
	const supabaseEnabled = Boolean(PUBLIC_SUPABASE_URL) && Boolean(PUBLIC_SUPABASE_ANON_KEY);

	// Create a Supabase client only if configured (so Supabase is optional)
	const supabase = supabaseEnabled
		? createServerClient(PUBLIC_SUPABASE_URL!, PUBLIC_SUPABASE_ANON_KEY!, {
				cookies: {
					get: (key) => event.cookies.get(key),
					set: (key, value, options) => {
						event.cookies.set(key, value, {
							...options,
							httpOnly: true,
							secure: !dev,
							sameSite: 'lax',
							path: '/',
						});
					},
					remove: (key, options) => {
						event.cookies.delete(key, {
							...options,
							path: '/',
						});
					},
				},
		  })
		: null;

	// Try to get the session from the request cookies
	try {
		if (!supabase) {
			event.locals.session = null;
			event.locals.user = null;
		} else {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			// Use getUser() for authenticated verification instead of relying on stored session
			let user = null;
			if (session) {
				const { data: userData, error } = await supabase.auth.getUser();
				if (!error && userData.user) {
					user = userData.user;
				}
			}

			// Attach session and user to event.locals
			event.locals.session = session;
			event.locals.user = user;

			console.log('Session loaded from cookies - user:', user?.email);
		}
	} catch (error) {
		console.error('Error fetching session from cookies:', error);
		event.locals.session = null;
		event.locals.user = null;
	}

	// Gatekeeper: protect all /admin paths on the server
	const path = event.url.pathname;
	if (path.startsWith('/admin')) {
		if (!supabaseEnabled) {
			throw redirect(303, '/');
		}
		const userEmail = event.locals.user?.email ?? null;
		const isAdmin = userEmail === ADMIN_EMAIL;
		if (!isAdmin) {
			throw redirect(303, '/');
		}
	}

	const response = await resolve(event);
	return response;
};
