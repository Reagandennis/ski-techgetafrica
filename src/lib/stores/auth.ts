/**
 * Authentication Store
 * Manages user login state with Supabase authentication
 */

import { writable } from 'svelte/store';
import type { User, Session } from '@supabase/supabase-js';

// Auth state stores
export const user = writable<User | null>(null);
export const session = writable<Session | null>(null);
export const isAuthenticated = writable(false);
export const isLoading = writable(true);

// Auth service
let _supabaseClient: any = null;

async function getSupabaseClient() {
	if (!_supabaseClient && typeof window !== 'undefined') {
		const { supabase } = await import('$lib/supabase');
		_supabaseClient = supabase;
	}
	return _supabaseClient;
}

// Initialize auth state only in browser
if (typeof window !== 'undefined') {
	getSupabaseClient().then((client) => {
		if (client) {
			client.auth.getSession().then(({ data }: any) => {
				session.set(data.session);
				user.set(data.session?.user ?? null);
				isAuthenticated.set(!!data.session);
				isLoading.set(false);
			});

			// Listen for auth changes
			client.auth.onAuthStateChange((event: string, newSession: any) => {
				session.set(newSession);
				user.set(newSession?.user ?? null);
				isAuthenticated.set(!!newSession);

				if (event === 'SIGNED_IN') {
					console.log('User signed in:', newSession?.user?.email);
				} else if (event === 'SIGNED_OUT') {
					console.log('User signed out');
				}
			});
		}
	});
}

// Auth functions
export const authService = {
	async signUp(email: string, password: string, metadata?: { first_name?: string; last_name?: string }) {
		isLoading.set(true);
		try {
			const client = await getSupabaseClient();
			if (!client) throw new Error('Supabase client not available');

			const { data, error } = await client.auth.signUp({
				email,
				password,
				options: {
					data: metadata,
					emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`
				}
			});

			if (error) {
				console.error('Supabase signup error:', error);
			} else {
				console.log('Signup response:', data);
			}

			return { data, error };
		} finally {
			isLoading.set(false);
		}
	},

	async signIn(email: string, password: string) {
		isLoading.set(true);
		try {
			const client = await getSupabaseClient();
			if (!client) throw new Error('Supabase client not available');

			const { data, error } = await client.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				console.error('Supabase signin error:', error);
			} else {
				console.log('SignIn successful:', data.user.email);
			}

			return { data, error };
		} finally {
			isLoading.set(false);
		}
	},

	async signOut() {
		isLoading.set(true);
		try {
			const client = await getSupabaseClient();
			if (!client) throw new Error('Supabase client not available');

			const { error } = await client.auth.signOut();

			if (error) {
				console.error('Supabase signout error:', error);
			}

			return { error };
		} finally {
			isLoading.set(false);
		}
	},

	async resetPassword(email: string) {
		isLoading.set(true);
		try {
			const client = await getSupabaseClient();
			if (!client) throw new Error('Supabase client not available');

			const { error } = await client.auth.resetPasswordForEmail(email, {
				redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/reset-password`
			});

			if (error) {
				console.error('Supabase reset password error:', error);
			}

			return { error };
		} finally {
			isLoading.set(false);
		}
	},

	async updateProfile(firstName: string, lastName: string) {
		isLoading.set(true);
		try {
			const client = await getSupabaseClient();
			if (!client) throw new Error('Supabase client not available');

			const { data, error } = await client.auth.updateUser({
				data: {
					first_name: firstName,
					last_name: lastName,
				}
			});

			if (error) {
				console.error('Supabase update profile error:', error);
			} else {
				user.set(data.user);
			}

			return { data, error };
		} finally {
			isLoading.set(false);
		}
	}
};
