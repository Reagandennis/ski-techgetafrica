<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state('');
	let filterStatus = $state('all');
	let isDeleting: { [key: string]: boolean } = $state({});

	let filteredCourses = $derived.by(() => {
		let courses = [...data.courses];

		// Filter by status
		if (filterStatus === 'published') {
			courses = courses.filter((c) => c.published);
		} else if (filterStatus === 'draft') {
			courses = courses.filter((c) => !c.published);
		}

		// Filter by search
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			courses = courses.filter(
				(c) =>
					c.title.toLowerCase().includes(query) ||
					c.slug.toLowerCase().includes(query) ||
					(c.organization_name?.toLowerCase() ?? '').includes(query)
			);
		}

		return courses;
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
			<h1 class="text-3xl font-bold text-gray-900">Courses</h1>
			<p class="text-gray-600 mt-2">Create and manage your courses.</p>
		</div>
		<a
			href="/admin/courses/new"
			class="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-light transition-colors font-medium"
		>
			+ New Course
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
				placeholder="Search by title, slug, or organization..."
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

	<!-- Courses Table -->
	<div class="bg-white rounded-lg shadow-md overflow-hidden">
		{#if filteredCourses.length > 0}
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50 border-b border-gray-200">
						<tr>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Organization</th>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Difficulty</th>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
							<th class="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each filteredCourses as course}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="px-6 py-4">
									<div>
										<p class="font-medium text-gray-900">{course.title}</p>
										<p class="text-sm text-gray-500 mt-1">{course.slug}</p>
									</div>
								</td>
								<td class="px-6 py-4">
									<p class="text-gray-600">{course.organization_name}</p>
								</td>
								<td class="px-6 py-4">
									<span
										class={`px-3 py-1 text-xs rounded-full font-semibold ${
											course.difficulty === 'Beginner'
												? 'bg-green-100 text-green-800'
												: course.difficulty === 'Intermediate'
													? 'bg-yellow-100 text-yellow-800'
													: 'bg-red-100 text-red-800'
										}`}
									>
										{course.difficulty}
									</span>
								</td>
								<td class="px-6 py-4">
									<span
										class={`px-3 py-1 text-xs rounded-full font-semibold ${
											course.published
												? 'bg-green-100 text-green-800'
												: 'bg-yellow-100 text-yellow-800'
										}`}
									>
										{course.published ? 'Published' : 'Draft'}
									</span>
								</td>
								<td class="px-6 py-4">
									<p class="text-gray-600 text-sm">{formatDate(course.created_at)}</p>
								</td>
								<td class="px-6 py-4 text-right space-x-2">
									<a
										href={`/admin/courses/${course.id}`}
										class="text-brand-red hover:text-brand-red-light transition-colors text-sm font-medium"
									>
										Edit
									</a>
									<form method="post" class="inline" onsubmit={() => (isDeleting[course.id] = true)}>
										<input type="hidden" name="id" value={course.id} />
										<button
											formaction="?/delete"
											disabled={isDeleting[course.id]}
											class="text-red-600 hover:text-red-800 transition-colors text-sm font-medium disabled:opacity-50"
										>
											{isDeleting[course.id] ? 'Deleting...' : 'Delete'}
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
						? 'No courses found matching your criteria.'
						: 'No courses yet. Create your first one!'}
				</p>
			</div>
		{/if}
	</div>

	<!-- Stats -->
	<div class="bg-white rounded-lg shadow-md p-6">
		<p class="text-gray-600">
			Showing <strong>{filteredCourses.length}</strong> of <strong>{data.courses.length}</strong> courses
		</p>
	</div>
</div>
