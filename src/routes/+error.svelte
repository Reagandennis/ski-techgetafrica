<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
	<div class="text-center">
		<h1 class="text-9xl font-extrabold text-brand-red">{$page.status}</h1>
		<p class="text-2xl md:text-3xl font-light text-gray-800 dark:text-gray-200 mt-4">
			{$page.error?.message}
		</p>
		<p class="text-md text-gray-600 dark:text-gray-400 mt-2">
			Sorry about that! Please check the URL or go back home.
		</p>
		<a
			href="/"
			class="mt-8 inline-block px-6 py-3 text-sm font-medium text-white bg-brand-red rounded-lg hover:bg-brand-red-light transition-colors"
		>
			Go Home
		</a>
	</div>
</div>
