import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Create a server-side Supabase client for server-only contexts
// This is used in +page.server.ts and other server-side functions
export function createServerSupabaseClient(cookies: any) {
	return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => cookies.get(key),
			set: (key, value, options) => {
				cookies.set(key, value, options);
			},
			remove: (key, options) => {
				cookies.delete(key, options);
			},
		},
	});
}
