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
	<nav class="mb-8">
		<a href="/blog" class="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-brand-red transition-colors">
			<span aria-hidden="true">←</span>
			Back to Blog
		</a>
	</nav>

	<!-- Header -->
	<header class="mb-10">
		<div class="flex items-center justify-center mb-5">
			<span class="inline-flex items-center px-3 py-1 bg-brand-red-light text-brand-red text-xs font-semibold rounded-full">
				{post.category}
			</span>
		</div>

		<h1 class="text-4xl md:text-6xl font-extrabold text-brand-black mb-6 text-center tracking-tight">
			{post.title}
		</h1>

		<div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-neutral-600 text-sm">
			<div class="flex items-center gap-2">
				<User class="w-4 h-4" />
				<span class="font-semibold text-brand-black">{post.author_name}</span>
			</div>
			<div class="flex items-center gap-2">
				<Calendar class="w-4 h-4" />
				<span>{formatDate(post.published_date)}</span>
			</div>
			<div class="flex items-center gap-2">
				<Clock class="w-4 h-4" />
				<span class="tabular-nums">{post.read_time} min read</span>
			</div>
		</div>
	</header>

	<!-- Cover Image -->
	<div class="mb-12">
		<div class="relative overflow-hidden rounded-2xl shadow-lg bg-neutral-100">
			<img
				src={post.cover_image}
				alt={post.title}
				class="w-full h-auto max-h-[520px] object-cover"
				loading="eager"
			/>
		</div>
	</div>

	<!-- Content -->
	<div
		class="prose prose-neutral max-w-none lg:prose-lg mx-auto
		prose-headings:tracking-tight prose-headings:text-brand-black prose-headings:scroll-mt-24
		prose-p:leading-8 prose-p:my-6
		prose-li:my-2 prose-ul:my-6 prose-ol:my-6
		prose-blockquote:my-8 prose-blockquote:border-l-brand-red prose-blockquote:text-neutral-700
		prose-hr:my-10
		prose-a:text-brand-red prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
		prose-strong:text-brand-black"
	>
		{@html post.content}
	</div>

	<!-- Tags -->
	{#if post.tags && post.tags.length > 0}
		<div class="mt-12 flex flex-wrap items-center justify-center gap-2">
			{#each post.tags as tag}
				<a
					href={`/blog/tag/${tag}`}
					class="px-3 py-1 bg-neutral-100 text-brand-black rounded-full text-sm font-semibold hover:bg-brand-red hover:text-white transition-colors"
				>
					#{tag}
				</a>
			{/each}
		</div>
	{/if}
</article>