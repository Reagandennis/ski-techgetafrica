<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state('');

	let filteredUsers = $derived.by(() => {
		if (!searchQuery.trim()) {
			return data.users;
		}

		const query = searchQuery.toLowerCase();
		return data.users.filter((user) => {
			const firstName = user.first_name?.toLowerCase() ?? '';
			const lastName = user.last_name?.toLowerCase() ?? '';
			const email = user.email?.toLowerCase() ?? '';

			return firstName.includes(query) || lastName.includes(query) || email.includes(query);
		});
	});

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	function getUserInitials(firstName: string, lastName: string): string {
		return (firstName?.charAt(0) ?? '') + (lastName?.charAt(0) ?? '');
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-gray-900">Users</h1>
		<p class="text-gray-600 mt-2">Manage all registered users on your platform.</p>
	</div>

	{#if data.error}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
			{data.error}
		</div>
	{/if}

	<!-- Search Bar -->
	<div class="bg-white rounded-lg shadow-md p-4">
		<input
			type="text"
			placeholder="Search by name or email..."
			bind:value={searchQuery}
			class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
		/>
	</div>

	<!-- Users Table -->
	<div class="bg-white rounded-lg shadow-md overflow-hidden">
		{#if filteredUsers.length > 0}
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50 border-b border-gray-200">
						<tr>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
							<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
							<th class="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each filteredUsers as user}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										<div
											class="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-sm"
										>
											{getUserInitials(user.first_name, user.last_name)}
										</div>
										<div>
											<p class="font-medium text-gray-900">
												{user.first_name} {user.last_name}
											</p>
										</div>
									</div>
								</td>
								<td class="px-6 py-4">
									<p class="text-gray-600">{user.email}</p>
								</td>
								<td class="px-6 py-4">
									<p class="text-gray-600 text-sm">{formatDate(user.created_at)}</p>
								</td>
								<td class="px-6 py-4 text-right">
									<a
										href="/admin/users/{user.id}"
										class="text-brand-red hover:text-brand-red-light transition-colors text-sm font-medium"
									>
										View Details
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div class="p-12 text-center">
				<p class="text-gray-500">
					{searchQuery ? 'No users found matching your search.' : 'No users yet.'}
				</p>
			</div>
		{/if}
	</div>

	<!-- Stats -->
	<div class="bg-white rounded-lg shadow-md p-6">
		<p class="text-gray-600">
			Showing <strong>{filteredUsers.length}</strong> of <strong>{data.users.length}</strong> users
		</p>
	</div>
</div>
