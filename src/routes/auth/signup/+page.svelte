<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/stores/auth';
	
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let agreeToTerms = $state(false);
	let isLoading = $state(false);
	let error = $state('');
	let successMessage = $state('');

	async function handleSignUp() {
		error = '';
		successMessage = '';
		
		// Validation
		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			error = 'Please fill in all fields';
			return;
		}

		if (!email.includes('@')) {
			error = 'Please enter a valid email address';
			return;
		}

		if (password.length < 8) {
			error = 'Password must be at least 8 characters long';
			return;
		}

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		if (!agreeToTerms) {
			error = 'You must agree to the Terms of Service and Privacy Policy';
			return;
		}

		isLoading = true;

		try {
			const { data, error: signUpError } = await authService.signUp(
				email, 
				password,
				{
					first_name: firstName,
					last_name: lastName
				}
			);
			
			if (signUpError) {
				// Handle specific Supabase errors
				if (signUpError.message.includes('Email rate limit exceeded')) {
					error = 'Too many signup attempts. Please try again later.';
				} else if (signUpError.message.includes('email confirmation')) {
					successMessage = 'Account created! You can sign in now (email confirmation is disabled for development).';
					// Clear form
					firstName = '';
					lastName = '';
					email = '';
					password = '';
					confirmPassword = '';
				} else {
					error = signUpError.message || 'Sign up failed. Please try again.';
				}
				return;
			}

			if (data?.user) {
				console.log('Sign up successful:', data.user.email);
				
				// Check if user was created but email confirmation is pending
				if (data.user.confirmed_at === null) {
					successMessage = 'Account created! Please check your email to confirm your account, or sign in if email confirmation is disabled.';
					// Clear password fields for security
					password = '';
					confirmPassword = '';
				} else {
					// User is confirmed, redirect to courses
					successMessage = 'Account created successfully! Redirecting...';
					setTimeout(() => goto('/courses'), 2000);
				}
			}
		} catch (err: any) {
			console.error('Signup error:', err);
			error = 'An unexpected error occurred. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	function handleGoogleSignUp() {
		console.log('Google sign up clicked');
		// TODO: Implement Google OAuth
	}

	function handleMicrosoftSignUp() {
		console.log('Microsoft sign up clicked');
		// TODO: Implement Microsoft OAuth
	}
</script>

<svelte:head>
	<title>Sign Up - Techgetafrica</title>
	<meta name="description" content="Create your Techgetafrica account and start your learning journey today." />
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
			<h1 class="text-3xl font-bold text-brand-black-dark mb-2">Get Started</h1>
			<p class="text-neutral-600">Create your account and start learning today</p>
		</div>

		<!-- Sign Up Card -->
		<div class="bg-white rounded-lg shadow-lg p-8">
			<!-- Social Sign Up Buttons -->
			<div class="space-y-3 mb-6">
				<button
					type="button"
					onclick={handleGoogleSignUp}
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
					onclick={handleMicrosoftSignUp}
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
					<span class="px-2 bg-white text-neutral-500">Or sign up with email</span>
				</div>
			</div>

			<!-- Success Message -->
			{#if successMessage}
				<div class="mb-4 p-3 bg-green-50 border border-green-500 rounded-lg">
					<p class="text-sm text-green-700">{successMessage}</p>
				</div>
			{/if}

			<!-- Error Message -->
			{#if error}
				<div class="mb-4 p-3 bg-error-red-light border border-error-red rounded-lg">
					<p class="text-sm text-error-red">{error}</p>
				</div>
			{/if}

			<!-- Sign Up Form -->
			<form onsubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
				<div class="space-y-4">
					<!-- Name Fields -->
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="firstName" class="block text-sm font-medium text-neutral-700 mb-1">
								First Name
							</label>
							<input
								id="firstName"
								type="text"
								bind:value={firstName}
								placeholder="John"
								required
								class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all outline-none"
							/>
						</div>
						<div>
							<label for="lastName" class="block text-sm font-medium text-neutral-700 mb-1">
								Last Name
							</label>
							<input
								id="lastName"
								type="text"
								bind:value={lastName}
								placeholder="Doe"
								required
								class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all outline-none"
							/>
						</div>
					</div>

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
						<p class="text-xs text-neutral-500 mt-1">Must be at least 8 characters</p>
					</div>

					<!-- Confirm Password Field -->
					<div>
						<label for="confirmPassword" class="block text-sm font-medium text-neutral-700 mb-1">
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							type="password"
							bind:value={confirmPassword}
							placeholder="••••••••"
							required
							class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all outline-none"
						/>
					</div>

					<!-- Terms Checkbox -->
					<div class="flex items-start gap-2">
						<input
							id="terms"
							type="checkbox"
							bind:checked={agreeToTerms}
							class="w-4 h-4 mt-1 text-brand-red border-neutral-300 rounded focus:ring-brand-red"
						/>
						<label for="terms" class="text-sm text-neutral-700">
							I agree to the
							<a href="/terms" class="text-brand-red hover:underline">Terms of Service</a>
							and
							<a href="/privacy" class="text-brand-red hover:underline">Privacy Policy</a>
						</label>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={isLoading}
						class="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'Creating account...' : 'Create Account'}
					</button>
				</div>
			</form>

			<!-- Sign In Link -->
			<div class="mt-6 text-center">
				<p class="text-sm text-neutral-600">
					Already have an account?
					<a href="/auth/signin" class="text-brand-red hover:text-brand-red-dark font-semibold">
						Sign in
					</a>
				</p>
			</div>
		</div>

		<!-- Benefits -->
		<div class="mt-8 text-center">
			<p class="text-sm text-neutral-600 mb-4">Join 50,000+ learners and get:</p>
			<ul class="space-y-2 text-sm text-neutral-700">
				<li class="flex items-center justify-center gap-2">
					<svg class="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
					Access to 1,000+ professional courses
				</li>
				<li class="flex items-center justify-center gap-2">
					<svg class="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
					Industry-recognized certifications
				</li>
				<li class="flex items-center justify-center gap-2">
					<svg class="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
					Career support and job placement
				</li>
			</ul>
		</div>
	</div>
</div>
