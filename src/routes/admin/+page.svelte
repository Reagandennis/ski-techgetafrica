<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const statCards = $derived.by(() => [
		{
			label: 'Total Users',
			value: data.stats.totalUsers,
			icon: '👥',
			color: 'bg-blue-500',
		},
		{
			label: 'Blog Posts',
			value: data.stats.totalPosts,
			icon: '📝',
			color: 'bg-purple-500',
		},
		{
			label: 'Courses',
			value: data.stats.totalCourses,
			icon: '🎓',
			color: 'bg-green-500',
		},
	]);

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
		<p class="text-gray-600 mt-2">Welcome back! Here's your site overview.</p>
	</div>

	{#if data.error}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
			{data.error}
		</div>
	{/if}

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		{#each statCards as card}
			<div class="bg-white rounded-lg shadow-md p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-gray-600 text-sm font-medium">{card.label}</p>
						<p class="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
					</div>
					<div class={`${card.color} text-white p-3 rounded-lg text-2xl`}>
						{card.icon}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Recent Activity -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Recent Users -->
		<div class="bg-white rounded-lg shadow-md p-6">
			<h2 class="text-xl font-bold text-gray-900 mb-4">Recent Users</h2>
			{#if data.recentUsers.length > 0}
				<div class="space-y-3">
					{#each data.recentUsers as user}
						<div class="flex items-center justify-between pb-3 border-b border-gray-200 last:border-b-0">
							<div class="flex items-center gap-3">
								<div
									class="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-sm"
								>
									{user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
								</div>
								<div>
									<p class="font-medium text-gray-900">
										{user.first_name} {user.last_name}
									</p>
									<p class="text-xs text-gray-500">
										{formatDate(user.created_at)}
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-gray-500 text-center py-4">No users yet</p>
			{/if}
		</div>

		<!-- Recent Blog Posts -->
		<div class="bg-white rounded-lg shadow-md p-6">
			<h2 class="text-xl font-bold text-gray-900 mb-4">Recent Blog Posts</h2>
			{#if data.recentPosts.length > 0}
				<div class="space-y-3">
					{#each data.recentPosts as post}
						<div class="flex items-center justify-between pb-3 border-b border-gray-200 last:border-b-0">
							<div class="flex-1">
								<a
									href="/admin/blog"
									class="font-medium text-gray-900 hover:text-brand-red transition-colors"
								>
									{post.title}
								</a>
								<p class="text-xs text-gray-500 mt-1">
									{formatDate(post.published_date)}
								</p>
							</div>
							<div class="ml-2">
								<span
									class={`px-2 py-1 text-xs rounded-full font-semibold ${
										post.published
											? 'bg-green-100 text-green-800'
											: 'bg-gray-100 text-gray-800'
									}`}
								>
									{post.published ? 'Published' : 'Draft'}
								</span>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-gray-500 text-center py-4">No blog posts yet</p>
			{/if}
		</div>
	</div>
</div>
