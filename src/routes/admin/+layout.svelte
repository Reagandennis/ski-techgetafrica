<script lang="ts">
	import { page } from '$app/stores';
	import { authService } from '$lib/stores/auth';

	let sidebarOpen = false;

	const menuItems = [
		{ label: 'Dashboard', href: '/admin', icon: '📊' },
		{ label: 'Users', href: '/admin/users', icon: '👥' },
		{ label: 'Blog Posts', href: '/admin/blog', icon: '📝' },
		{ label: 'Courses', href: '/admin/courses', icon: '🎓' },
		{ label: 'Settings', href: '/admin/settings', icon: '⚙️' },
	];

	function isActive(href: string): boolean {
		return $page.url.pathname === href;
	}

	async function handleSignOut() {
		await authService.signOut();
	}
</script>

<div class="flex h-screen bg-gray-100">
	<!-- Sidebar -->
	<div
		class={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-black text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
			sidebarOpen ? 'translate-x-0' : '-translate-x-full'
		}`}
	>
		<div class="p-6">
			<h1 class="text-2xl font-bold text-brand-red">TechGetAfrica</h1>
			<p class="text-sm text-gray-400 mt-1">Admin Dashboard</p>
		</div>

		<nav class="mt-8">
			{#each menuItems as item}
				<a
					href={item.href}
					class={`flex items-center px-6 py-3 text-lg transition-colors ${
						isActive(item.href)
							? 'bg-brand-red text-white border-l-4 border-brand-red-light'
							: 'text-gray-300 hover:bg-gray-800 hover:text-white'
					}`}
					onclick={() => (sidebarOpen = false)}
				>
					<span class="mr-3">{item.icon}</span>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Sign out button at bottom -->
		<div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
			<button
				onclick={handleSignOut}
				class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
			>
				Sign Out
			</button>
		</div>
	</div>

	<!-- Mobile overlay -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
			role="button"
			tabindex="0"
			onclick={() => (sidebarOpen = false)}
			onkeydown={(e) => ((e.key === 'Escape' || e.key === 'Enter') && (sidebarOpen = false))}
		></div>
	{/if}

	<!-- Main content -->
	<div class="flex-1 flex flex-col">
		<!-- Top bar -->
		<header class="bg-white shadow-md">
			<div class="flex items-center justify-between px-6 py-4">
				<button
					onclick={() => (sidebarOpen = !sidebarOpen)}
					class="md:hidden p-2 rounded-lg hover:bg-gray-100"
					aria-label="Toggle navigation menu"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				<div class="flex items-center gap-4">
					<span class="text-sm text-gray-600">
						Welcome, <strong>{$page.data.user.firstName}</strong>
					</span>
					<div
						class="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold"
					>
						{$page.data.user.firstName.charAt(0)}{$page.data.user.lastName.charAt(0)}
					</div>
				</div>
			</div>
		</header>

		<!-- Page content -->
		<main class="flex-1 overflow-auto p-6">
			<slot />
		</main>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
