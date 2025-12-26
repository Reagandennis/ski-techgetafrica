<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService, isLoading as authLoading } from '$lib/stores/auth';
	
	let email = $state('');
	let password = $state('');
	let rememberMe = $state(false);
	let isLoading = $state(false);
	let error = $state('');

	async function handleSignIn() {
		error = '';
		
		// Basic validation
		if (!email || !password) {
			error = 'Please fill in all fields';
			return;
		}

		if (!email.includes('@')) {
			error = 'Please enter a valid email address';
			return;
		}

		isLoading = true;

		try {
			const { data, error: signInError } = await authService.signIn(email, password);
			
			if (signInError) {
				error = signInError.message || 'Sign in failed. Please try again.';
				return;
			}

			if (data?.user) {
				console.log('Sign in successful:', data.user.email);
				// Redirect to courses page
				goto('/courses');
			}
		} catch (err: any) {
			error = err.message || 'Sign in failed. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	function handleGoogleSignIn() {
		console.log('Google sign in clicked');
		// TODO: Implement Google OAuth with Supabase
		// await supabase.auth.signInWithOAuth({ provider: 'google' })
	}

	function handleMicrosoftSignIn() {
		console.log('Microsoft sign in clicked');
		// TODO: Implement Microsoft OAuth
	}
</script>

<svelte:head>
	<title>Sign In - Techgetafrica</title>
	<meta name="description" content="Sign in to your Techgetafrica account to access your courses and certifications." />
</svelte:head>

<div class="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full">
		<!-- Logo and Header -->
		<div class="text-center mb-8">
			<a href="/" class="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
				<div class="w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center">
					<span class="text-white font-bold text-2xl">T</span>
				</div>
				<span class="text-2xl font-bold text-brand-black">Techgetafrica</span>
			</a>
			<h1 class="text-3xl font-bold text-brand-black-dark mb-2">Welcome Back</h1>
			<p class="text-neutral-600">Sign in to continue your learning journey</p>
		</div>

		<!-- Sign In Card -->
		<div class="bg-white rounded-lg shadow-lg p-8">
			<!-- Social Sign In Buttons -->
			<div class="space-y-3 mb-6">
				<button
					type="button"
					onclick={handleGoogleSignIn}
					class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-neutral-700"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24">
						<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
						<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
						<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
						<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
					</svg>
					Continue with Google
				</button>

				<button
					type="button"
					onclick={handleMicrosoftSignIn}
					class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-neutral-700"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24">
						<path fill="#f25022" d="M1 1h10v10H1z"/>
						<path fill="#00a4ef" d="M13 1h10v10H13z"/>
						<path fill="#7fba00" d="M1 13h10v10H1z"/>
						<path fill="#ffb900" d="M13 13h10v10H13z"/>
					</svg>
					Continue with Microsoft
				</button>
			</div>

			<!-- Divider -->
			<div class="relative my-6">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-neutral-300"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="px-2 bg-white text-neutral-500">Or continue with email</span>
				</div>
			</div>

			<!-- Error Message -->
			{#if error}
				<div class="mb-4 p-3 bg-error-red-light border border-error-red rounded-lg">
					<p class="text-sm text-error-red">{error}</p>
				</div>
			{/if}

			<!-- Sign In Form -->
			<form onsubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
				<div class="space-y-4">
					<!-- Email Field -->
					<div>
						<label for="email" class="block text-sm font-medium text-neutral-700 mb-1">
							Email Address
						</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder="you@example.com"
							required
							class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all outline-none"
						/>
					</div>

					<!-- Password Field -->
					<div>
						<label for="password" class="block text-sm font-medium text-neutral-700 mb-1">
							Password
						</label>
						<input
							id="password"
							type="password"
							bind:value={password}
							placeholder="••••••••"
							required
							class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all outline-none"
						/>
					</div>

					<!-- Remember Me & Forgot Password -->
					<div class="flex items-center justify-between">
						<label class="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								bind:checked={rememberMe}
								class="w-4 h-4 text-brand-red border-neutral-300 rounded focus:ring-brand-red"
							/>
							<span class="text-sm text-neutral-700">Remember me</span>
						</label>
						<a href="/auth/forgot-password" class="text-sm text-brand-red hover:text-brand-red-dark font-medium">
							Forgot password?
						</a>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={isLoading}
						class="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'Signing in...' : 'Sign In'}
					</button>
				</div>
			</form>

			<!-- Sign Up Link -->
			<div class="mt-6 text-center">
				<p class="text-sm text-neutral-600">
					Don't have an account?
					<a href="/auth/signup" class="text-brand-red hover:text-brand-red-dark font-semibold">
						Sign up for free
					</a>
				</p>
			</div>
		</div>

		<!-- Terms -->
		<p class="text-center text-xs text-neutral-500 mt-6">
			By signing in, you agree to our
			<a href="/terms" class="text-brand-red hover:underline">Terms of Service</a>
			and
			<a href="/privacy" class="text-brand-red hover:underline">Privacy Policy</a>
		</p>
	</div>
</div>
