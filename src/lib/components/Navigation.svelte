<script lang="ts">
	import { page } from '$app/stores';
	import { user, isAuthenticated, authService } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	interface NavItem {
		label: string;
		href: string;
		icon?: string;
	}

	const navItems: NavItem[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Courses', href: '/courses' },
		{ label: 'Certificates', href: '/certificates' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About', href: '/about' },
	];

	let mobileMenuOpen = $state(false);
	let profileMenuOpen = $state(false);

	// Get user initials for avatar
	const getInitials = (userData: typeof $user) => {
		if (!userData) return '';
		const firstName = userData.user_metadata?.first_name || '';
		const lastName = userData.user_metadata?.last_name || '';
		return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
	};

	// Get full name
	const getFullName = (userData: typeof $user) => {
		if (!userData) return '';
		const firstName = userData.user_metadata?.first_name || '';
		const lastName = userData.user_metadata?.last_name || '';
		return `${firstName} ${lastName}`.trim() || userData.email;
	};

	async function handleSignOut() {
		const { error } = await authService.signOut();
		if (!error) {
			profileMenuOpen = false;
			mobileMenuOpen = false;
			goto('/');
		}
	}

	// Close dropdown when clicking outside
	$effect(() => {
		if (profileMenuOpen && typeof window !== 'undefined') {
			const handleClickOutside = (event: MouseEvent) => {
				const target = event.target as HTMLElement;
				if (!target.closest('[data-profile-menu]')) {
					profileMenuOpen = false;
				}
			};
			
			setTimeout(() => {
				document.addEventListener('click', handleClickOutside);
			}, 0);

			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<!-- Navigation Header -->
<header class="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 shadow-sm">
	<nav class="container-md h-16 flex items-center justify-between">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
			<img src="/logo.png" alt="Techgetafrica" class="h-12 w-auto" />
			<span class="hidden sm:inline text-lg font-bold text-brand-black">Techgetafrica</span>
		</a>

		<!-- Desktop Navigation -->
		<ul class="hidden md:flex items-center gap-8">
			{#each navItems as item (item.href)}
				<li>
					<a
						href={item.href}
						class="text-sm font-medium text-neutral-600 hover:text-brand-red transition-colors {$page.url.pathname ===
						item.href
							? 'text-brand-red border-b-2 border-brand-red pb-1'
							: ''}"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- CTA Buttons -->
		<div class="hidden md:flex items-center gap-4">
			{#if $isAuthenticated && $user}
				<!-- User Profile Dropdown -->
				<div class="relative" data-profile-menu>
					<button
						onclick={() => (profileMenuOpen = !profileMenuOpen)}
						class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
					>
						<!-- Avatar -->
						<div class="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-semibold text-sm">
							{getInitials($user)}
						</div>
						<span class="text-sm font-medium text-brand-black">{getFullName($user)}</span>
						<svg class="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					<!-- Dropdown Menu -->
					{#if profileMenuOpen}
						<div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
							<div class="px-4 py-2 border-b border-neutral-200">
								<p class="text-sm font-semibold text-brand-black">{getFullName($user)}</p>
								<p class="text-xs text-neutral-600 truncate">{$user.email}</p>
							</div>
							<button
								onclick={handleSignOut}
								class="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center gap-2"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								Sign Out
							</button>
						</div>
					{/if}
				</div>
			{:else}
				<a href="/auth/signin" class="btn-secondary">Sign In</a>
				<a href="/auth/signup" class="btn-primary">Get Started</a>
			{/if}
		</div>

		<!-- Mobile Menu Button -->
		<button
			class="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
			aria-label="Toggle mobile menu"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
		>
			<svg
				class="w-6 h-6 text-brand-black"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				{#if !mobileMenuOpen}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				{/if}
			</svg>
		</button>
	</nav>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden border-t border-neutral-200 bg-white">
			<ul class="container-md py-4 space-y-4">
				{#each navItems as item (item.href)}
					<li>
						<a
							href={item.href}
							class="block text-sm font-medium text-neutral-600 hover:text-brand-red transition-colors"
							onclick={() => (mobileMenuOpen = false)}
						>
							{item.label}
						</a>
					</li>
				{/each}
				<li class="pt-4 border-t border-neutral-200 space-y-2">
					{#if $isAuthenticated && $user}
						<!-- Mobile User Profile -->
						<div class="flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-lg">
							<div class="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-semibold">
								{getInitials($user)}
							</div>
							<div class="flex-1">
								<p class="text-sm font-semibold text-brand-black">{getFullName($user)}</p>
								<p class="text-xs text-neutral-600 truncate">{$user.email}</p>
							</div>
						</div>
						<button
							onclick={handleSignOut}
							class="w-full btn-secondary flex items-center justify-center gap-2"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
							Sign Out
						</button>
					{:else}
						<a href="/auth/signin" class="w-full btn-secondary">Sign In</a>
						<a href="/auth/signup" class="w-full btn-primary">Get Started</a>
					{/if}
				</li>
			</ul>
		</div>
	{/if}
</header>

<style>
	/* Custom styles for navigation if needed */
</style>
