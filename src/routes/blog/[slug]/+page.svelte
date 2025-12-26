<script lang="ts">
	import type { PageData } from './$types';
	import { Calendar, Clock, User } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	const { post } = data;

	function formatDate(date: string | null): string {
		if (!date) return 'N/A';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<article class="container-md section-py">
	<!-- Header -->
	<header class="mb-12 text-center">
		<div class="mb-4">
			<a
				href={`/blog/category/${post.category}`}
				class="text-brand-red font-semibold uppercase tracking-wider text-sm"
			>
				{post.category}
			</a>
		</div>
		<h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
			{post.title}
		</h1>
		<div class="flex-center text-gray-600 text-sm gap-6">
			<div class="flex items-center gap-2">
				<User class="w-4 h-4" />
				<span>{post.author_name}</span>
			</div>
			<div class="flex items-center gap-2">
				<Calendar class="w-4 h-4" />
				<span>{formatDate(post.published_date)}</span>
			</div>
			<div class="flex items-center gap-2">
				<Clock class="w-4 h-4" />
				<span>{post.read_time} min read</span>
			</div>
		</div>
	</header>

	<!-- Cover Image -->
	<div class="mb-12">
		<img
			src={post.cover_image}
			alt={post.title}
			class="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
		/>
	</div>

	<!-- Content -->
	<div class="prose dark:prose-invert max-w-none lg:prose-lg mx-auto">
		{@html post.content}
	</div>

	<!-- Tags -->
	{#if post.tags && post.tags.length > 0}
		<div class="mt-12 flex-center gap-2">
			{#each post.tags as tag}
				<a
					href={`/blog/tag/${tag}`}
					class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-brand-red hover:text-white transition-colors"
				>
					#{tag}
				</a>
			{/each}
		</div>
	{/if}
</article>