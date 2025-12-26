<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let searchQuery = $state('');
	let selectedTag = $state<string | null>(null);
	let selectedCategory = $state<string | null>(null);

	// Filter posts based on search and filters
	let filteredPosts = $derived.by(() => {
		let posts = data.posts;

		// Filter by category
		if (selectedCategory) {
			posts = posts.filter((post: { category: string | null; }) => post.category === selectedCategory);
		}

		// Filter by tag
		if (selectedTag) {
			posts = posts.filter((post: { tags: (string | null)[]; }) => post.tags?.includes(selectedTag));
		}

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			posts = posts.filter((post: { title: string; excerpt: string; content: string; }) => 
				post.title.toLowerCase().includes(query) ||
				post.excerpt.toLowerCase().includes(query) ||
				post.content.toLowerCase().includes(query)
			);
		}

		return posts;
	});
</script>

<svelte:head>
	<title>Blog - Techgetafrica</title>
	<meta
		name="description"
		content="Read the latest articles and insights about technology careers, certifications, and professional development."
	/>
	<meta name="keywords" content="blog, technology, careers, certifications, learning, tutorials, insights" />
	<meta property="og:title" content="Blog - Techgetafrica" />
	<meta property="og:description" content="Read insights about tech careers, certifications, and professional development." />
	<meta property="og:url" content="https://techgetafrica.com/blog" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://techgetafrica.com/blog" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-brand-black-dark via-brand-black to-neutral-800 text-white section-py">
	<div class="container-md">
		<div class="max-w-3xl mx-auto text-center">
			<span class="inline-block text-sm font-semibold text-brand-red-light mb-4 uppercase tracking-wider">
				Our Blog
			</span>
			<h1 class="text-5xl md:text-6xl font-extrabold mb-6">Latest Insights & Resources</h1>
			<p class="text-xl text-neutral-300 leading-relaxed">
				Stay updated with the latest trends, tutorials, and success stories from Africa's tech community.
			</p>
		</div>
	</div>
</section>

<!-- Search and Filter Section -->
<section class="bg-white section-py border-b border-neutral-200">
	<div class="container-md">
		<!-- Search Bar -->
		<div class="max-w-2xl mx-auto mb-12">
			<div class="relative">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search articles..."
					class="w-full px-6 py-4 pl-12 rounded-lg border border-neutral-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
				/>
				<svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
		</div>

		<!-- Category Filter -->
		<div class="mb-8">
			<h3 class="text-sm font-semibold text-neutral-700 mb-4 uppercase tracking-wider">Categories</h3>
			<div class="flex flex-wrap gap-2">
				<button
					onclick={() => (selectedCategory = null)}
					class={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
						selectedCategory === null
							? 'bg-brand-red text-white'
							: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
					}`}
				>
					All Categories
				</button>
				{#each data.categories as category}
					<button
						onclick={() => (selectedCategory = selectedCategory === category ? null : category)}
						class={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
							selectedCategory === category
								? 'bg-brand-red text-white'
								: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
						}`}
					>
						{category}
					</button>
				{/each}
			</div>
		</div>

		<!-- Tags Filter -->
		<div>
			<h3 class="text-sm font-semibold text-neutral-700 mb-4 uppercase tracking-wider">Tags</h3>
			<div class="flex flex-wrap gap-2">
				<button
					onclick={() => (selectedTag = null)}
					class={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
						selectedTag === null
							? 'bg-accent-blue text-white'
							: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
					}`}
				>
					All Tags
				</button>
				{#each data.tags as tag}
					<button
						onclick={() => (selectedTag = selectedTag === tag ? null : tag)}
						class={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
							selectedTag === tag
								? 'bg-accent-blue text-white'
								: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
						}`}
					>
						#{tag}
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Blog Posts Grid -->
<section class="bg-neutral-50 section-py">
	<div class="container-md">
		{#if data.error}
			<!-- Database Error Message -->
			<div class="max-w-2xl mx-auto text-center py-16">
				<svg class="w-20 h-20 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
				<h3 class="text-2xl font-bold text-neutral-700 mb-4">Database Not Initialized</h3>
				<p class="text-neutral-600 mb-6">{data.error}</p>
				<div class="bg-neutral-100 border border-neutral-300 rounded-lg p-6 text-left">
					<p class="font-semibold text-brand-black mb-2">To fix this:</p>
					<ol class="list-decimal list-inside space-y-2 text-sm text-neutral-700">
						<li>Open your <a href="https://vdcwpsipktxgekqgcopr.supabase.co" target="_blank" class="text-brand-red underline">Supabase Dashboard</a></li>
						<li>Go to <strong>SQL Editor</strong> in the left sidebar</li>
						<li>Click <strong>New Query</strong></li>
						<li>Copy and paste the contents of <code class="bg-neutral-200 px-2 py-1 rounded">supabase-schema.sql</code></li>
						<li>Click <strong>Run</strong> to create tables</li>
						<li>Create another query with <code class="bg-neutral-200 px-2 py-1 rounded">supabase-seed.sql</code></li>
						<li>Click <strong>Run</strong> to add sample blog posts</li>
						<li>Refresh this page</li>
					</ol>
				</div>
			</div>
		{:else if filteredPosts.length > 0}
			<div class="mb-12">
				<p class="text-neutral-600 text-sm">
					Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each filteredPosts as post (post.id)}
					<article class="card overflow-hidden hover:border-brand-red transition-all duration-300 group h-full flex flex-col">
						<!-- Cover Image -->
						<div class="overflow-hidden h-48">
							<img
								src={post.cover_image}
								alt={post.title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						</div>

						<!-- Content -->
						<div class="p-6 flex flex-col flex-grow">
							<!-- Category Badge -->
							<div class="mb-3">
								<span class="inline-block px-3 py-1 bg-brand-red-light text-brand-red text-xs font-semibold rounded-full">
									{post.category}
								</span>
							</div>

							<!-- Title -->
							<h3 class="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
								<a href={`/blog/${post.slug}`}>{post.title}</a>
							</h3>

							<!-- Excerpt -->
							<p class="text-neutral-600 text-sm mb-4 line-clamp-3 flex-grow">
								{post.excerpt}
							</p>

							<!-- Meta -->
							<div class="pt-4 border-t border-neutral-200 space-y-3">
								<!-- Tags -->
								<div class="flex flex-wrap gap-1">
									{#each (post.tags || []).slice(0, 2) as tag}
										<span class="text-xs text-neutral-500">#{tag}</span>
									{/each}
									{#if (post.tags || []).length > 2}
										<span class="text-xs text-neutral-500">+{(post.tags || []).length - 2}</span>
									{/if}
								</div>

								<!-- Author & Read Time -->
								<div class="flex items-center justify-between text-xs text-neutral-600">
									<div class="flex items-center gap-2">
										{#if post.author_image}
											<img src={post.author_image} alt={post.author_name} class="w-6 h-6 rounded-full" />
										{:else}
											<div class="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold">
												{post.author_name.charAt(0).toUpperCase()}
											</div>
										{/if}
										<span>{post.author_name}</span>
									</div>
									<span>{post.read_time} min read</span>
								</div>

								<!-- Date -->
								<p class="text-xs text-neutral-500">
									{new Date(post.published_date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>

								<!-- Read More Link -->
								<a href={`/blog/${post.slug}`} class="inline-block text-brand-red font-semibold text-sm hover:text-brand-red-dark transition-colors mt-2">
									Read Article →
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div class="text-center py-16">
				<svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
				<h3 class="text-2xl font-bold text-neutral-700 mb-2">No articles found</h3>
				<p class="text-neutral-600">Try adjusting your search or filters</p>
			</div>
		{/if}
	</div>
</section>

<!-- Newsletter CTA -->
<section class="bg-white section-py border-t border-neutral-200">
	<div class="container-md">
		<div class="max-w-2xl mx-auto bg-gradient-to-r from-brand-red-light to-brand-red rounded-xl p-8 text-center">
			<h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
			<p class="text-white/90 mb-6">Get the latest articles and insights delivered to your inbox</p>
			
			<form onsubmit={(e) => { e.preventDefault(); }} class="flex gap-2">
				<input
					type="email"
					placeholder="Enter your email"
					required
					class="flex-1 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-red/50"
				/>
				<button type="submit" class="px-6 py-3 bg-brand-black text-white font-semibold rounded-lg hover:bg-brand-black-dark transition-colors">
					Subscribe
				</button>
			</form>
		</div>
	</div>
</section>
