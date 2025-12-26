<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state('');
	let filterStatus = $state('all');
	let isDeleting: { [key: string]: boolean } = $state({});

	let filteredPosts = $derived.by(() => {
		let posts = [...data.posts];

		// Filter by status
		if (filterStatus === 'published') {
			posts = posts.filter((p) => p.published);
		} else if (filterStatus === 'draft') {
			posts = posts.filter((p) => !p.published);
		}

		// Filter by search
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			posts = posts.filter(
				(p) =>
					p.title.toLowerCase().includes(query) ||
					p.slug.toLowerCase().includes(query) ||
					(p.author_name?.toLowerCase() ?? '').includes(query)
			);
		}

		return posts;
	});

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	}

	// Deletion handled via server action now
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-gray-900">Blog Posts</h1>
			<p class="text-gray-600 mt-2">Create and manage your blog posts.</p>
		</div>
		<a
			href="/admin/blog/new"
			class="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-light transition-colors font-medium"
		>
			+ New Post
		</a>
	</div>

	{#if data.error}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
			{data.error}
		</div>
	{/if}

	<!-- Filters and Search -->
	<div class="bg-white rounded-lg shadow-md p-4 space-y-4">
		<div>
			<input
				type="text"
				placeholder="Search by title, slug, or author..."
				bind:value={searchQuery}
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
			/>
		</div>

		<div>
			<p class="block text-sm font-medium text-gray-700 mb-2">Filter by Status</p>
			<div class="flex gap-3">
				<button
					onclick={() => (filterStatus = 'all')}
					class={`px-4 py-2 rounded-lg font-medium transition-colors ${
						filterStatus === 'all'
							? 'bg-brand-red text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
					}`}
				>
					All
				</button>
				<button
					onclick={() => (filterStatus = 'published')}
					class={`px-4 py-2 rounded-lg font-medium transition-colors ${
						filterStatus === 'published'
							? 'bg-green-500 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
					}`}
				>
					Published
				</button>
				<button
					onclick={() => (filterStatus = 'draft')}
					class={`px-4 py-2 rounded-lg font-medium transition-colors ${
						filterStatus === 'draft'
							? 'bg-yellow-500 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
					}`}
				>
					Draft
				</button>
			</div>
		</div>
	</div>

	<!-- Posts Table -->
	<div class="bg-white rounded-lg shadow-md overflow-hidden">
		{#if filteredPosts.length > 0}
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50 border-b border-gray-200">
						<tr>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Author</th>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Published</th>
							<th class="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each filteredPosts as post}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="px-6 py-4">
									<div>
										<p class="font-medium text-gray-900">{post.title}</p>
										<p class="text-sm text-gray-500 mt-1">{post.slug}</p>
									</div>
								</td>
								<td class="px-6 py-4">
									<p class="text-gray-600">{post.author_name}</p>
								</td>
								<td class="px-6 py-4">
									<span
										class={`px-3 py-1 text-xs rounded-full font-semibold ${
											post.published
												? 'bg-green-100 text-green-800'
												: 'bg-yellow-100 text-yellow-800'
										}`}
									>
										{post.published ? 'Published' : 'Draft'}
									</span>
								</td>
								<td class="px-6 py-4">
									<p class="text-gray-600 text-sm">{formatDate(post.published_date)}</p>
								</td>
								<td class="px-6 py-4 text-right space-x-2">
									<a
										href={`/admin/blog/${post.id}`}
										class="text-brand-red hover:text-brand-red-light transition-colors text-sm font-medium"
									>
										Edit
									</a>
									<form method="post" class="inline" onsubmit={() => (isDeleting[post.id] = true)}>
										<input type="hidden" name="id" value={post.id} />
										<button
											formaction="?/delete"
											disabled={isDeleting[post.id]}
											class="text-red-600 hover:text-red-800 transition-colors text-sm font-medium disabled:opacity-50"
										>
											{isDeleting[post.id] ? 'Deleting...' : 'Delete'}
										</button>
									</form>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div class="p-12 text-center">
				<p class="text-gray-500">
					{searchQuery || filterStatus !== 'all'
						? 'No posts found matching your criteria.'
						: 'No blog posts yet. Create your first one!'}
				</p>
			</div>
		{/if}
	</div>

	<!-- Stats -->
	<div class="bg-white rounded-lg shadow-md p-6">
		<p class="text-gray-600">
			Showing <strong>{filteredPosts.length}</strong> of <strong>{data.posts.length}</strong> posts
		</p>
	</div>
</div>
